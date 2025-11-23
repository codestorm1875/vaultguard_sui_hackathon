# VaultGuard Smart Contract

A Sui Move smart contract for managing digital inheritance vaults with automatic release mechanisms.

## Overview

The VaultGuard contract enables users to create encrypted inheritance vaults that automatically release to designated beneficiaries after a period of inactivity. The contract uses a "heartbeat" mechanism where vault owners must periodically signal they are still active.

## Features

- **Vault Creation**: Create vaults with encrypted data references (Walrus blob IDs)
- **Heartbeat Mechanism**: Owners send periodic heartbeats to prove activity
- **Automatic Release**: Vaults automatically release to beneficiaries after inactivity period
- **Multi-Beneficiary Support**: Distribute access to multiple beneficiaries
- **Time-Based Logic**: Uses Sui's Clock for precise timestamp management

## Contract Structure

### Main Structs

#### `Vault`
```move
public struct Vault has key, store {
    id: UID,
    owner: address,
    encrypted_data_blob_id: vector<u8>, // Walrus blob reference
    beneficiaries: vector<address>,
    last_heartbeat: u64, // Timestamp in milliseconds
    inactivity_period: u64, // Period in milliseconds
    is_released: bool,
}
```

#### `BeneficiaryAccess`
```move
public struct BeneficiaryAccess has key, store {
    id: UID,
    vault_id: ID,
    beneficiary: address,
    encrypted_data_blob_id: vector<u8>,
}
```

## Functions

### `create_vault`
Creates a new inheritance vault.

**Parameters:**
- `beneficiaries: vector<address>` - List of beneficiary addresses
- `inactivity_period_days: u64` - Days of inactivity before release
- `blob_id: vector<u8>` - Walrus blob reference for encrypted data
- `clock: &Clock` - Sui Clock object
- `ctx: &mut TxContext` - Transaction context

**Example:**
```bash
sui client call \
  --package $PACKAGE_ID \
  --module inheritance_vault \
  --function create_vault \
  --args "[\"0xBENEFICIARY1\",\"0xBENEFICIARY2\"]" 30 "[1,2,3,4]" $CLOCK_ID \
  --gas-budget 10000000
```

### `send_heartbeat`
Updates the vault's last heartbeat timestamp.

**Parameters:**
- `vault: &mut Vault` - Mutable reference to vault
- `clock: &Clock` - Sui Clock object
- `ctx: &mut TxContext` - Transaction context

**Example:**
```bash
sui client call \
  --package $PACKAGE_ID \
  --module inheritance_vault \
  --function send_heartbeat \
  --args $VAULT_ID $CLOCK_ID \
  --gas-budget 10000000
```

### `check_and_release`
Checks if vault is ready for release and releases it to beneficiaries.

**Parameters:**
- `vault: &mut Vault` - Mutable reference to vault
- `clock: &Clock` - Sui Clock object
- `ctx: &mut TxContext` - Transaction context

**Example:**
```bash
sui client call \
  --package $PACKAGE_ID \
  --module inheritance_vault \
  --function check_and_release \
  --args $VAULT_ID $CLOCK_ID \
  --gas-budget 10000000
```

### `get_vault_status`
Returns the current status of the vault.

**Returns:** `(bool, u64, u64, u64)`
- `is_released` - Whether vault has been released
- `last_heartbeat` - Timestamp of last heartbeat
- `inactivity_period` - Configured inactivity period
- `time_until_release` - Milliseconds until vault can be released

## Events

### `VaultCreated`
Emitted when a new vault is created.

### `HeartbeatSent`
Emitted when owner sends a heartbeat.

### `VaultReleased`
Emitted when vault is released to beneficiaries.

## Deployment

### Prerequisites
1. Install Sui CLI:
   ```bash
   cargo install --locked --git https://github.com/MystenLabs/sui.git --branch testnet sui
   ```

2. Configure Sui client:
   ```bash
   sui client
   ```

### Deploy Contract
```bash
cd move
chmod +x deploy.sh
./deploy.sh
```

The script will:
1. Prompt for network selection (devnet/testnet/mainnet)
2. Build the Move package
3. Deploy to selected network
4. Save deployment info to `deployment-info.json`

### Manual Deployment
```bash
cd move/vaultguard
sui move build
sui client publish --gas-budget 100000000
```

## Usage Example

### 1. Create a Vault
```typescript
import { TransactionBlock } from '@mysten/sui.js/transactions';

const tx = new TransactionBlock();
const beneficiaries = ['0xBENEFICIARY1', '0xBENEFICIARY2'];
const inactivityPeriodDays = 30;
const blobId = new Uint8Array([1, 2, 3, 4]); // Walrus blob reference

tx.moveCall({
  target: `${PACKAGE_ID}::inheritance_vault::create_vault`,
  arguments: [
    tx.pure(beneficiaries),
    tx.pure(inactivityPeriodDays),
    tx.pure(Array.from(blobId)),
    tx.object('0x6'), // Clock object
  ],
});
```

### 2. Send Heartbeat
```typescript
const tx = new TransactionBlock();

tx.moveCall({
  target: `${PACKAGE_ID}::inheritance_vault::send_heartbeat`,
  arguments: [
    tx.object(vaultId),
    tx.object('0x6'), // Clock object
  ],
});
```

### 3. Check and Release Vault
```typescript
const tx = new TransactionBlock();

tx.moveCall({
  target: `${PACKAGE_ID}::inheritance_vault::check_and_release`,
  arguments: [
    tx.object(vaultId),
    tx.object('0x6'), // Clock object
  ],
});
```

## Security Considerations

1. **Access Control**: Only vault owners can send heartbeats
2. **Time-Based Release**: Release only occurs after inactivity period
3. **Immutable Release**: Once released, vault cannot be un-released
4. **Shared Objects**: Vaults are shared objects for transparency

## Error Codes

- `ENotOwner (1)`: Caller is not the vault owner
- `EVaultAlreadyReleased (2)`: Vault has already been released
- `EVaultNotReadyForRelease (3)`: Inactivity period has not elapsed
- `EInvalidInactivityPeriod (4)`: Inactivity period must be > 0

## Integration with Walrus

The contract stores Walrus blob IDs as `vector<u8>`. To integrate:

1. Upload encrypted data to Walrus
2. Get the blob ID
3. Convert blob ID to bytes
4. Pass to `create_vault` function

## Testing

```bash
cd move/vaultguard
sui move test
```

## License

MIT
