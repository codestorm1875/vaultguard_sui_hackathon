'use client';

import { useCurrentAccount } from '@mysten/dapp-kit';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function DashboardGuard({ children }: { children: React.ReactNode }) {
    const currentAccount = useCurrentAccount();
    const router = useRouter();

    useEffect(() => {
        if (!currentAccount) {
            toast.error('Please connect your wallet to access the dashboard');
            router.push('/onboarding');
        }
    }, [currentAccount, router]);

    // Show nothing while checking/redirecting
    if (!currentAccount) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
                    <p className="text-slate-400">Checking authentication...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
