'use client';

import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Clock } from 'lucide-react';

interface InactivitySliderProps {
    value: number;
    onChange: (value: number) => void;
}

const InactivitySlider = ({ value, onChange }: InactivitySliderProps) => {
    return (
        <div className="space-y-6 p-6 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                        <Clock className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="font-medium text-white">Inactivity Period</h3>
                        <p className="text-xs text-slate-400">Time before vault release protocol initiates</p>
                    </div>
                </div>
                <span className="text-2xl font-bold text-indigo-400">{value} <span className="text-sm font-normal text-slate-500">days</span></span>
            </div>

            <div className="px-2">
                <Slider
                    defaultValue={[value]}
                    max={365}
                    min={30}
                    step={1}
                    onValueChange={(vals) => onChange(vals[0])}
                    className="cursor-pointer"
                />
            </div>

            <div className="flex justify-between text-xs text-slate-500 px-2">
                <span>30 days</span>
                <span>1 year</span>
            </div>
        </div>
    );
};

export default InactivitySlider;
