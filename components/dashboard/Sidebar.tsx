'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Lock, Users, Settings, Shield, Upload, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WalletConnect } from '@/components/wallet/WalletConnect';

const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Lock, label: 'My Vaults', href: '/dashboard/vaults' },
    { icon: Upload, label: 'Upload Files', href: '/dashboard/upload' },
    { icon: Activity, label: 'Heartbeat', href: '/dashboard/heartbeat' },
    { icon: Users, label: 'Beneficiaries', href: '/dashboard/beneficiaries' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl">
            <div className="flex h-full flex-col">
                {/* Logo */}
                <div className="flex h-16 items-center border-b border-slate-800 px-6">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
                        <Shield className="h-6 w-6 text-indigo-500" />
                        <span>VaultGuard</span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 px-3 py-4">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-indigo-500/10 text-indigo-400"
                                        : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
                                )}
                            >
                                <item.icon className={cn("h-5 w-5", isActive ? "text-indigo-400" : "text-slate-400")} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Wallet Connection */}
                <div className="border-t border-slate-800 p-4">
                    <WalletConnect />
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
