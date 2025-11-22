'use client';

import React from 'react';
import { cn } from '@/lib/utils';

const CalendarView = () => {
    const days = Array.from({ length: 35 }, (_, i) => i + 1);
    const currentDay = 24;
    const nextCheckIn = 22; // Next month

    return (
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-white">November 2025</h3>
                <div className="flex gap-2 text-xs">
                    <span className="flex items-center gap-1 text-slate-400">
                        <div className="h-2 w-2 rounded-full bg-emerald-500" /> Verified
                    </span>
                    <span className="flex items-center gap-1 text-slate-400">
                        <div className="h-2 w-2 rounded-full bg-amber-500" /> Scheduled
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
                    <div key={d} className="text-xs font-medium text-slate-500">{d}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
                {days.map((day) => {
                    const isToday = day === currentDay;
                    const isVerified = day === 15; // Mock data
                    const isScheduled = day === 22; // Mock data

                    return (
                        <div
                            key={day}
                            className={cn(
                                "aspect-square rounded-lg flex items-center justify-center text-sm relative",
                                isToday ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/50" : "bg-slate-800/30 text-slate-400",
                                (day > 30) && "opacity-0" // Hide extra days
                            )}
                        >
                            {day <= 30 && day}
                            {isVerified && day <= 30 && (
                                <div className="absolute bottom-1 h-1 w-1 rounded-full bg-emerald-500" />
                            )}
                            {isScheduled && day <= 30 && (
                                <div className="absolute bottom-1 h-1 w-1 rounded-full bg-amber-500" />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarView;
