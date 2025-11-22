'use client';

import React from 'react';
import { Quote } from 'lucide-react';
import VaultAccessAnimation from '@/components/access/VaultAccessAnimation';
import KeyTransferVisual from '@/components/access/KeyTransferVisual';
import InheritedFilesList from '@/components/access/InheritedFilesList';

export default function AccessPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white p-8">
            <div className="max-w-4xl mx-auto space-y-12">

                {/* Header Section */}
                <div className="text-center space-y-4">
                    <VaultAccessAnimation />
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
                        Vault Successfully Accessed
                    </h1>
                    <p className="text-slate-400 max-w-lg mx-auto">
                        The smart contract has verified the conditions for release. The digital legacy has been securely transferred to your possession.
                    </p>
                </div>

                {/* Message from Owner */}
                <div className="relative rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-8 border border-indigo-500/20">
                    <Quote className="absolute top-6 left-6 h-8 w-8 text-indigo-500/30" />
                    <div className="relative z-10 space-y-4 text-center">
                        <p className="text-lg font-medium text-indigo-100 italic">
                            "To my dearest family, if you are reading this, it means I am no longer with you. I have prepared this vault to ensure you are taken care of and have access to everything you need. I love you all."
                        </p>
                        <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
                            <span>— Message from Vault Owner</span>
                            <span>•</span>
                            <span>Recorded on Oct 15, 2024</span>
                        </div>
                    </div>
                </div>

                {/* Key Transfer Visualization */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">Security Verification</h3>
                    <KeyTransferVisual />
                </div>

                {/* Files List */}
                <InheritedFilesList />

            </div>
        </div>
    );
}
