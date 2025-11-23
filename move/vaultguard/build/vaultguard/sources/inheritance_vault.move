#[allow(lint(public_entry))]
module vaultguard::inheritance_vault {
    use sui::object::{Self, UID, ID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::clock::{Self, Clock};
    use sui::event;
    use std::vector;

    // ==================== Error Codes ====================
    const ENotOwner: u64 = 1;
    const EVaultAlreadyReleased: u64 = 2;
    const EVaultNotReadyForRelease: u64 = 3;
    const EInvalidInactivityPeriod: u64 = 4;

    // ==================== Structs ====================
    
    /// Main Vault object containing encrypted data and beneficiary information
    public struct Vault has key, store {
        id: UID,
        owner: address,
        encrypted_data_blob_id: vector<u8>, // Walrus blob reference
        beneficiaries: vector<address>,
        last_heartbeat: u64, // Timestamp in milliseconds
        inactivity_period: u64, // Period in milliseconds
        is_released: bool,
    }

    /// Capability object given to beneficiaries when vault is released
    public struct BeneficiaryAccess has key, store {
        id: UID,
        vault_id: ID,
        beneficiary: address,
        encrypted_data_blob_id: vector<u8>,
    }

    // ==================== Events ====================
    
    public struct VaultCreated has copy, drop {
        vault_id: ID,
        owner: address,
        beneficiaries: vector<address>,
        inactivity_period: u64,
    }

    public struct HeartbeatSent has copy, drop {
        vault_id: ID,
        owner: address,
        timestamp: u64,
    }

    public struct VaultReleased has copy, drop {
        vault_id: ID,
        owner: address,
        beneficiaries: vector<address>,
        release_timestamp: u64,
    }

    // ==================== Functions ====================

    /// Create a new inheritance vault
    /// @param beneficiaries: List of addresses who will receive access when vault is released
    /// @param inactivity_period_days: Number of days of inactivity before vault can be released
    /// @param blob_id: Walrus blob reference containing encrypted data
    public entry fun create_vault(
        beneficiaries: vector<address>,
        inactivity_period_days: u64,
        blob_id: vector<u8>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(inactivity_period_days > 0, EInvalidInactivityPeriod);
        
        let vault_id = object::new(ctx);
        let vault_id_copy = object::uid_to_inner(&vault_id);
        let owner = tx_context::sender(ctx);
        let current_time = clock::timestamp_ms(clock);
        
        // Convert days to milliseconds (days * 24 * 60 * 60 * 1000)
        let inactivity_period_ms = inactivity_period_days * 86400000;

        let vault = Vault {
            id: vault_id,
            owner,
            encrypted_data_blob_id: blob_id,
            beneficiaries,
            last_heartbeat: current_time,
            inactivity_period: inactivity_period_ms,
            is_released: false,
        };

        event::emit(VaultCreated {
            vault_id: vault_id_copy,
            owner,
            beneficiaries: vault.beneficiaries,
            inactivity_period: inactivity_period_ms,
        });

        transfer::share_object(vault);
    }

    /// Send a heartbeat to prove the owner is still active
    /// Resets the last_heartbeat timestamp to current time
    public entry fun send_heartbeat(
        vault: &mut Vault,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        assert!(sender == vault.owner, ENotOwner);
        assert!(!vault.is_released, EVaultAlreadyReleased);

        let current_time = clock::timestamp_ms(clock);
        vault.last_heartbeat = current_time;

        event::emit(HeartbeatSent {
            vault_id: object::uid_to_inner(&vault.id),
            owner: vault.owner,
            timestamp: current_time,
        });
    }

    /// Check if vault is ready for release and release it to beneficiaries
    /// Can be called by anyone, but only releases if inactivity period has passed
    public entry fun check_and_release(
        vault: &mut Vault,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(!vault.is_released, EVaultAlreadyReleased);

        let current_time = clock::timestamp_ms(clock);
        let time_since_heartbeat = current_time - vault.last_heartbeat;
        
        assert!(time_since_heartbeat >= vault.inactivity_period, EVaultNotReadyForRelease);

        // Mark vault as released
        vault.is_released = true;

        // Create access objects for each beneficiary
        let mut i = 0;
        let len = vector::length(&vault.beneficiaries);
        while (i < len) {
            let beneficiary = *vector::borrow(&vault.beneficiaries, i);
            
            let access = BeneficiaryAccess {
                id: object::new(ctx),
                vault_id: object::uid_to_inner(&vault.id),
                beneficiary,
                encrypted_data_blob_id: vault.encrypted_data_blob_id,
            };

            transfer::transfer(access, beneficiary);
            i = i + 1;
        };

        event::emit(VaultReleased {
            vault_id: object::uid_to_inner(&vault.id),
            owner: vault.owner,
            beneficiaries: vault.beneficiaries,
            release_timestamp: current_time,
        });
    }

    /// Get the current status of the vault
    /// Returns: (is_released, last_heartbeat, inactivity_period, time_until_release)
    public fun get_vault_status(
        vault: &Vault,
        clock: &Clock
    ): (bool, u64, u64, u64) {
        let current_time = clock::timestamp_ms(clock);
        let time_since_heartbeat = current_time - vault.last_heartbeat;
        
        let time_until_release = if (time_since_heartbeat >= vault.inactivity_period) {
            0
        } else {
            vault.inactivity_period - time_since_heartbeat
        };

        (vault.is_released, vault.last_heartbeat, vault.inactivity_period, time_until_release)
    }

    /// Check if vault can be released (inactivity period has passed)
    public fun can_release(vault: &Vault, clock: &Clock): bool {
        if (vault.is_released) {
            return false
        };
        
        let current_time = clock::timestamp_ms(clock);
        let time_since_heartbeat = current_time - vault.last_heartbeat;
        time_since_heartbeat >= vault.inactivity_period
    }

    /// Get vault owner
    public fun get_owner(vault: &Vault): address {
        vault.owner
    }

    /// Get vault beneficiaries
    public fun get_beneficiaries(vault: &Vault): vector<address> {
        vault.beneficiaries
    }

    /// Get encrypted data blob ID
    public fun get_blob_id(vault: &Vault): vector<u8> {
        vault.encrypted_data_blob_id
    }

    // ==================== Test Functions ====================
    
    #[test_only]
    public fun init_for_testing(ctx: &mut TxContext) {
        // Initialization function for testing
    }
}
