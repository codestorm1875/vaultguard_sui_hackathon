'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeartbeatPulseProps {
    status: 'active' | 'warning' | 'critical';
    nextCheckIn: string;
}

const HeartbeatPulse = ({ status, nextCheckIn }: HeartbeatPulseProps) => {
    const getColor = () => {
        switch (status) {
            case 'active': return 'text-emerald-500 bg-emerald-500';
            case 'warning': return 'text-amber-500 bg-amber-500';
            case 'critical': return 'text-red-500 bg-red-500';
            default: return 'text-emerald-500 bg-emerald-500';
        }
    };

    const colorClass = getColor();
    const baseColor = status === 'active' ? '#10B981' : status === 'warning' ? '#F59E0B' : '#EF4444';

    return (
        <div className="relative flex flex-col items-center justify-center py-12">
            {/* Pulse Animation */}
            <div className="relative mb-8">
                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className={cn("absolute inset-0 rounded-full opacity-50 blur-xl", colorClass.split(' ')[1])}
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.8, 0, 0.8],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.2,
                    }}
                    className={cn("absolute inset-0 rounded-full opacity-30", colorClass.split(' ')[1])}
                />

                <div className={cn("relative h-32 w-32 rounded-full border-4 flex items-center justify-center bg-slate-900 z-10",
                    status === 'active' ? "border-emerald-500" :
                        status === 'warning' ? "border-amber-500" : "border-red-500"
                )}>
                    {status === 'active' ? (
                        <Activity className={cn("h-16 w-16", colorClass.split(' ')[0])} />
                    ) : (
                        <AlertTriangle className={cn("h-16 w-16", colorClass.split(' ')[0])} />
                    )}
                </div>
            </div>

            {/* Status Text */}
            <h2 className="text-2xl font-bold text-white mb-2">
                Status: <span className={cn("uppercase", colorClass.split(' ')[0])}>{status}</span>
            </h2>

            <p className="text-slate-400 text-lg">
                Next check-in required in: <span className="text-white font-mono font-bold">{nextCheckIn}</span>
            </p>

            {status !== 'active' && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium"
                >
                    Heartbeat Missed - Vault Release in 60 days
                </motion.div>
            )}
        </div>
    );
};

export default HeartbeatPulse;
