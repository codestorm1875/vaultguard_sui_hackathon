'use client';

import React, { useState } from 'react';
import { Activity, AlertTriangle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import HeartbeatPulse from '@/components/dashboard/HeartbeatPulse';
import Timeline from '@/components/dashboard/Timeline';
import CalendarView from '@/components/dashboard/CalendarView';

export default function HeartbeatPage() {
    const [status, setStatus] = useState<'active' | 'warning'>('active');

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Heartbeat Monitor</h1>
                    <p className="text-slate-400">Prove your life status to maintain vault security.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700">
                        <span className="text-sm font-medium text-slate-400">Simulate Warning</span>
                        <Switch
                            checked={status === 'warning'}
                            onCheckedChange={(checked) => setStatus(checked ? 'warning' : 'active')}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Pulse Section */}
                <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-sm flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none" />

                    <HeartbeatPulse
                        status={status}
                        nextCheckIn={status === 'active' ? '28 days' : 'OVERDUE'}
                    />

                    <div className="mt-12 w-full max-w-md">
                        <Button
                            size="lg"
                            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white text-lg h-14 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all"
                        >
                            <Send className="mr-2 h-5 w-5" />
                            Send Heartbeat Now
                        </Button>
                        <p className="text-center text-xs text-slate-500 mt-4">
                            This action will sign a transaction on the blockchain to verify your status.
                        </p>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-8">
                    <CalendarView />

                    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <Activity className="h-4 w-4 text-indigo-400" />
                            Check-in History
                        </h3>
                        <Timeline />
                    </div>

                    <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-6 backdrop-blur-sm">
                        <h3 className="font-bold text-amber-400 mb-2 flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            Dead Man's Switch
                        </h3>
                        <p className="text-sm text-slate-400">
                            If you fail to check in for <strong>60 days</strong>, the smart contract will automatically initiate the vault release process to your beneficiaries.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
