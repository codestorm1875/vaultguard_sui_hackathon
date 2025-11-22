'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface SecurityScoreProps {
    score: number;
}

const SecurityScore = ({ score }: SecurityScoreProps) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-center p-6 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
            <div className="relative h-32 w-32 flex items-center justify-center">
                {/* Background Circle */}
                <svg className="transform -rotate-90 h-full w-full">
                    <circle
                        cx="64"
                        cy="64"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-slate-800"
                    />
                    {/* Progress Circle */}
                    <motion.circle
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        cx="64"
                        cy="64"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeLinecap="round"
                        className="text-emerald-500"
                    />
                </svg>

                {/* Center Icon/Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <ShieldCheck className="h-8 w-8 text-emerald-500 mb-1" />
                    <span className="text-2xl font-bold text-white">{score}%</span>
                </div>
            </div>

            <h3 className="mt-4 font-medium text-white">Security Score</h3>
            <p className="text-xs text-slate-400 text-center mt-1">
                Your vault is well protected.
            </p>
        </div>
    );
};

export default SecurityScore;
