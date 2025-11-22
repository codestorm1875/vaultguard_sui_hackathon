'use client';

import React from 'react';
import { User, Wallet, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface BeneficiaryCardProps {
    id: string;
    name: string;
    walletAddress: string;
    relationship: 'Spouse' | 'Child' | 'Trustee' | 'Other';
    onRemove?: (id: string) => void;
    onUpdate?: (id: string, data: any) => void;
}

const RELATIONSHIPS = ['Spouse', 'Child', 'Trustee', 'Other'];

const BeneficiaryCard = ({ id, name, walletAddress, relationship, onRemove, onUpdate }: BeneficiaryCardProps) => {
    return (
        <div className="group relative rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm transition-all hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]">
            {/* Remove Button */}
            <button
                onClick={() => onRemove?.(id)}
                className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
            >
                <X className="h-4 w-4" />
            </button>

            <div className="flex items-start gap-4">
                {/* Avatar Placeholder */}
                <div className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center border-2 border-slate-700 group-hover:border-indigo-500/50 transition-colors">
                    <User className="h-8 w-8 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                </div>

                <div className="flex-1 space-y-4">
                    {/* Name Input */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-400">Full Name</label>
                        <Input
                            value={name}
                            onChange={(e) => onUpdate?.(id, { name: e.target.value })}
                            className="bg-slate-950/50 border-slate-800 focus:border-indigo-500"
                            placeholder="Enter full name"
                        />
                    </div>

                    {/* Wallet Address Input */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-400">Wallet Address</label>
                        <div className="relative">
                            <Wallet className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                            <Input
                                value={walletAddress}
                                onChange={(e) => onUpdate?.(id, { walletAddress: e.target.value })}
                                className="pl-9 bg-slate-950/50 border-slate-800 focus:border-indigo-500 font-mono text-xs"
                                placeholder="0x..."
                            />
                        </div>
                    </div>

                    {/* Relationship Tags */}
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-400">Relationship</label>
                        <div className="flex flex-wrap gap-2">
                            {RELATIONSHIPS.map((rel) => (
                                <button
                                    key={rel}
                                    onClick={() => onUpdate?.(id, { relationship: rel })}
                                    className={cn(
                                        "px-3 py-1 rounded-full text-xs font-medium transition-all border",
                                        relationship === rel
                                            ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50"
                                            : "bg-slate-800/50 text-slate-400 border-transparent hover:border-slate-600"
                                    )}
                                >
                                    {rel}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeneficiaryCard;
