'use client';

import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

const Timeline = () => {
    const events = [
        { date: 'Today', status: 'pending', label: 'Next Check-in' },
        { date: 'Oct 24', status: 'completed', label: 'Verified' },
        { date: 'Sep 24', status: 'completed', label: 'Verified' },
        { date: 'Aug 24', status: 'completed', label: 'Verified' },
        { date: 'Jul 24', status: 'completed', label: 'Verified' },
    ];

    return (
        <div className="w-full overflow-x-auto pb-4">
            <div className="flex items-center justify-between min-w-[600px] relative">
                {/* Line */}
                <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-800 -z-10" />

                {events.map((event, index) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                        <div className={cn(
                            "h-8 w-8 rounded-full flex items-center justify-center border-4 border-slate-900",
                            event.status === 'completed' ? "bg-emerald-500 text-slate-900" : "bg-slate-800 text-slate-500"
                        )}>
                            {event.status === 'completed' ? (
                                <CheckCircle2 className="h-4 w-4" />
                            ) : (
                                <Circle className="h-4 w-4" />
                            )}
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-medium text-white">{event.date}</p>
                            <p className="text-xs text-slate-500">{event.label}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Timeline;
