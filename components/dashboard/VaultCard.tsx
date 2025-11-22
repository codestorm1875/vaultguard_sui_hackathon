import React from 'react';
import { Shield, Clock, Users, FileText, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VaultCardProps {
    name: string;
    status: 'active' | 'inactive' | 'locked';
    beneficiaries: number;
    files: number;
    lastHeartbeat: string;
    nextCheck: string;
}

const VaultCard = ({ name, status, beneficiaries, files, lastHeartbeat, nextCheck }: VaultCardProps) => {
    return (
        <div className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm transition-all hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]">
            {/* Status Indicator */}
            <div className="absolute top-0 right-0 p-6">
                <div className={cn("h-2 w-2 rounded-full shadow-[0_0_10px_currentColor]",
                    status === 'active' ? "bg-emerald-500 text-emerald-500" :
                        status === 'locked' ? "bg-amber-500 text-amber-500" : "bg-red-500 text-red-500"
                )} />
            </div>

            <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="rounded-lg bg-indigo-500/10 p-2 text-indigo-400">
                        <Shield className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{name}</h3>
                </div>
                <p className="text-sm text-slate-400 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-500" />
                    Next check: <span className="text-slate-200">{nextCheck}</span>
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="rounded-lg bg-slate-800/50 p-3">
                    <div className="flex items-center gap-2 text-slate-400 mb-1">
                        <Users className="h-4 w-4" />
                        <span className="text-xs">Beneficiaries</span>
                    </div>
                    <span className="text-lg font-bold text-white">{beneficiaries}</span>
                </div>
                <div className="rounded-lg bg-slate-800/50 p-3">
                    <div className="flex items-center gap-2 text-slate-400 mb-1">
                        <FileText className="h-4 w-4" />
                        <span className="text-xs">Files</span>
                    </div>
                    <span className="text-lg font-bold text-white">{files}</span>
                </div>
            </div>

            <div className="flex gap-3">
                <Button className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white">
                    Manage Vault
                </Button>
                <Button variant="outline" size="icon" className="border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

export default VaultCard;
