'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Unlock } from 'lucide-react';

const VaultAccessAnimation = () => {
    return (
        <div className="relative flex items-center justify-center py-12">
            {/* Golden Glow Background */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute inset-0 bg-amber-500/20 blur-[100px] rounded-full"
            />

            {/* Particle Effects */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute h-1 w-1 bg-amber-400 rounded-full"
                    initial={{
                        x: 0,
                        y: 0,
                        opacity: 0,
                    }}
                    animate={{
                        x: (Math.random() - 0.5) * 200,
                        y: (Math.random() - 0.5) * 200,
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                    }}
                    transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeOut",
                    }}
                />
            ))}

            {/* Central Vault Icon */}
            <div className="relative z-10">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-32 w-32 rounded-full bg-slate-900 border-4 border-amber-500 flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.3)]"
                >
                    <Unlock className="h-16 w-16 text-amber-500" />
                </motion.div>

                {/* Orbiting Rings */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-20px] rounded-full border border-amber-500/30 border-dashed"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-40px] rounded-full border border-amber-500/20 border-dotted"
                />
            </div>
        </div>
    );
};

export default VaultAccessAnimation;
