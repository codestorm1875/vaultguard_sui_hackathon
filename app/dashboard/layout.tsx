import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { DashboardGuard } from '@/components/DashboardGuard';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <DashboardGuard>
            <div className="min-h-screen bg-[#0F172A]">
                <Sidebar />
                <main className="pl-64 min-h-screen">
                    <div className="container mx-auto p-8">
                        {children}
                    </div>
                </main>
            </div>
        </DashboardGuard>
    );
}
