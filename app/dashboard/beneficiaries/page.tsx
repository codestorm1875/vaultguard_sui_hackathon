'use client';

import React, { useState } from 'react';
import { Plus, Shield, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import BeneficiaryCard from '@/components/dashboard/BeneficiaryCard';
import { motion } from 'framer-motion';

export default function BeneficiariesPage() {
    const [isPrivacyMode, setIsPrivacyMode] = useState(true);
    const [beneficiaries, setBeneficiaries] = useState([
        { id: '1', name: 'Sarah Connor', walletAddress: '0x71C...9A2', relationship: 'Spouse' },
        { id: '2', name: 'John Connor', walletAddress: '0x3B2...1C4', relationship: 'Child' },
    ]);

    const addBeneficiary = () => {
        const newId = Math.random().toString(36).substr(2, 9);
        setBeneficiaries([...beneficiaries, {
            id: newId,
            name: '',
            walletAddress: '',
            relationship: 'Other'
        }]);
    };

    const updateBeneficiary = (id: string, data: any) => {
        setBeneficiaries(prev => prev.map(b => b.id === id ? { ...b, ...data } : b));
    };

    const removeBeneficiary = (id: string) => {
        setBeneficiaries(prev => prev.filter(b => b.id !== id));
    };

    return (
        <div className="space-y-8 relative min-h-[80vh]">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Beneficiaries</h1>
                    <p className="text-slate-400">Manage who can access your vault.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20">
                        <Shield className="h-4 w-4 text-purple-400" />
                        <span className="text-sm font-medium text-purple-300">Zero-Knowledge Privacy</span>
                        <Switch
                            checked={isPrivacyMode}
                            onCheckedChange={setIsPrivacyMode}
                            className="data-[state=checked]:bg-purple-500"
                        />
                    </div>
                    <Button onClick={addBeneficiary} className="bg-indigo-500 hover:bg-indigo-600 text-white gap-2">
                        <Plus className="h-4 w-4" />
                        Add Beneficiary
                    </Button>
                </div>
            </div>

            {/* Visual Connection Graph */}
            <div className="relative pt-12 pb-20">
                {/* Owner Node */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 z-20">
                    <div className="flex flex-col items-center gap-2">
                        <div className="h-20 w-20 rounded-full bg-slate-900 border-4 border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.3)] flex items-center justify-center relative z-10">
                            <User className="h-10 w-10 text-indigo-400" />
                            <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-emerald-500 rounded-full border-4 border-slate-900" />
                        </div>
                        <span className="font-bold text-white">Vault Owner</span>
                    </div>
                </div>

                {/* Connection Lines Container */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                    <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#6366F1" stopOpacity="0.1" />
                        </linearGradient>
                    </defs>
                    {beneficiaries.map((_, index) => {
                        // Calculate positions dynamically based on index and count
                        // This is a simplified visual representation
                        const total = beneficiaries.length;
                        const startX = "50%";
                        const startY = "80"; // Bottom of owner node
                        // Distribute beneficiaries horizontally
                        const endX = `${(index + 1) * (100 / (total + 1))}%`;
                        const endY = "180"; // Top of beneficiary cards area

                        return (
                            <path
                                key={index}
                                d={`M ${startX} ${startY} C ${startX} ${130}, ${endX} ${130}, ${endX} ${endY}`}
                                stroke="url(#lineGradient)"
                                strokeWidth="2"
                                fill="none"
                                className="animate-pulse"
                                style={{ animationDuration: `${3 + index}s` }}
                            />
                        );
                    })}
                </svg>

                {/* Beneficiaries Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-24 relative z-10">
                    {beneficiaries.map((beneficiary) => (
                        <motion.div
                            key={beneficiary.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            layout
                        >
                            <BeneficiaryCard
                                {...beneficiary}
                                // @ts-ignore
                                onUpdate={updateBeneficiary}
                                onRemove={removeBeneficiary}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
