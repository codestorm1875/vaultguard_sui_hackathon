import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VaultCard from '@/components/dashboard/VaultCard';

export default function VaultsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">My Vaults</h1>
                    <p className="text-slate-400">Manage your digital inheritance vaults.</p>
                </div>

                <Button className="bg-indigo-500 hover:bg-indigo-600 text-white gap-2">
                    <Plus className="h-4 w-4" />
                    Create New Vault
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <VaultCard
                    id="1"
                    name="Family Trust"
                    status="active"
                    beneficiaries={4}
                    files={12}
                    lastHeartbeat="2 days ago"
                    nextCheck="28 days"
                />
                <VaultCard
                    id="2"
                    name="Crypto Assets"
                    status="active"
                    beneficiaries={2}
                    files={5}
                    lastHeartbeat="2 days ago"
                    nextCheck="28 days"
                />
                <VaultCard
                    id="3"
                    name="Business Documents"
                    status="locked"
                    beneficiaries={3}
                    files={8}
                    lastHeartbeat="5 days ago"
                    nextCheck="25 days"
                />
            </div>
        </div>
    );
}
