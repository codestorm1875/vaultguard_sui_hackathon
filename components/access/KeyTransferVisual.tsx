'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Key, User, Shield } from 'lucide-react';

const KeyTransferVisual = () => {
    return (
        <div className="relative h-48 w-full rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden backdrop-blur-sm">
            <div className="absolute inset-0 flex items-center justify-between px-12">
                {/* Vault Node */}
                <div className="flex flex-col items-center gap-2 z-10">
                    <div className="h-12 w-12 rounded-full bg-slate-800 border-2 border-indigo-500 flex items-center justify-center">
                        <Shield className="h-6 w-6 text-indigo-400" />
                    </div>
                    <span className="text-xs text-slate-400">Vault Contract</span>
                </div>

                {/* Connection Line */}
                <div className="absolute left-12 right-12 top-1/2 -translate-y-1/2 h-0.5 bg-slate-800">
                    <motion.div
                        className="absolute top-1/2 -translate-y-1/2"
                        animate={{
                            left: ["0%", "100%"],
                            opacity: [0, 1, 1, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <div className="flex items-center gap-2 bg-slate-900 px-3 py-1 rounded-full border border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                            <Key className="h-3 w-3 text-amber-500" />
                            <span className="text-[10px] font-mono text-amber-300">0x...key</span>
                        </div>
                    </motion.div>
                </div>

                {/* Beneficiary Node */}
                <div className="flex flex-col items-center gap-2 z-10">
                    <div className="h-12 w-12 rounded-full bg-slate-800 border-2 border-emerald-500 flex items-center justify-center">
                        <User className="h-6 w-6 text-emerald-400" />
                    </div>
                    <span className="text-xs text-slate-400">You</span>
                </div>
            </div>
        </div>
    );
};

export default KeyTransferVisual;
