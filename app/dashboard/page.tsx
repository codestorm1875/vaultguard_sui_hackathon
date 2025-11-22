import React from 'react';
import { Shield, Clock, Users } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import VaultCard from '@/components/dashboard/VaultCard';
import ActivityGraph from '@/components/dashboard/ActivityGraph';

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-slate-400">Welcome back, manage your digital legacy.</p>
            </div>

            {/* Stats Row */}
            <div className="grid gap-6 md:grid-cols-3">
                <StatCard
                    title="Active Vaults"
                    value="3"
                    icon={Shield}
                    trend={{ value: 12, isPositive: true }}
                />
                <StatCard
                    title="Last Heartbeat"
                    value="2d ago"
                    icon={Clock}
                    description="Next check in 28 days"
                />
                <StatCard
                    title="Total Beneficiaries"
                    value="8"
                    icon={Users}
                    trend={{ value: 2, isPositive: true }}
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Column: Vaults */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-white">Your Vaults</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        <VaultCard
                            name="Family Trust"
                            status="active"
                            beneficiaries={4}
                            files={12}
                            lastHeartbeat="2 days ago"
                            nextCheck="28 days"
                        />
                        <VaultCard
                            name="Crypto Assets"
                            status="active"
                            beneficiaries={2}
                            files={5}
                            lastHeartbeat="2 days ago"
                            nextCheck="28 days"
                        />
                        <VaultCard
                            name="Business Documents"
                            status="locked"
                            beneficiaries={3}
                            files={8}
                            lastHeartbeat="5 days ago"
                            nextCheck="25 days"
                        />
                    </div>
                </div>

                {/* Right Column: Activity */}
                <div className="space-y-6">
                    <ActivityGraph />

                    {/* Recent Activity / Notifications could go here */}
                    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
                        <h3 className="mb-4 text-lg font-bold text-white">Recent Activity</h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-3 border-b border-slate-800 pb-3 last:border-0 last:pb-0">
                                    <div className="h-2 w-2 rounded-full bg-indigo-500" />
                                    <div>
                                        <p className="text-sm text-slate-200">Heartbeat verified</p>
                                        <p className="text-xs text-slate-500">{i} days ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
