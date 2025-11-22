import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    description?: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    className?: string;
}

const StatCard = ({ title, value, icon: Icon, description, trend, className }: StatCardProps) => {
    return (
        <div className={cn("rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm", className)}>
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-slate-400">{title}</h3>
                <div className="rounded-lg bg-indigo-500/10 p-2 text-indigo-400">
                    <Icon className="h-5 w-5" />
                </div>
            </div>
            <div className="mt-4">
                <div className="text-3xl font-bold text-white">{value}</div>
                {(description || trend) && (
                    <p className="mt-1 text-xs text-slate-400 flex items-center gap-2">
                        {trend && (
                            <span className={cn("font-medium", trend.isPositive ? "text-emerald-400" : "text-red-400")}>
                                {trend.isPositive ? "+" : ""}{trend.value}%
                            </span>
                        )}
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};

export default StatCard;
