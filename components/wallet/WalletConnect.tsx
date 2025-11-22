'use client';

import { useCurrentAccount, useDisconnectWallet, ConnectButton } from '@mysten/dapp-kit';
import { Wallet, ChevronDown, LogOut, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Network = 'devnet' | 'testnet' | 'mainnet';

export function WalletConnect() {
    const currentAccount = useCurrentAccount();
    const { mutate: disconnect } = useDisconnectWallet();
    const [selectedNetwork, setSelectedNetwork] = useState<Network>('devnet');

    const truncateAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const handleDisconnect = () => {
        try {
            disconnect();
            toast.success('Wallet disconnected');
        } catch (error) {
            toast.error('Failed to disconnect wallet');
        }
    };

    const handleNetworkChange = (network: Network) => {
        setSelectedNetwork(network);
        toast.success(`Switched to ${network}`);
    };

    if (!currentAccount) {
        return (
            <ConnectButton
                connectText="Connect Wallet"
                className="!w-full !bg-indigo-500 hover:!bg-indigo-600 !text-white !gap-2 !rounded-lg !px-4 !py-2 !font-medium !text-sm"
            />
        );
    }

    return (
        <div className="space-y-2">
            {/* Network Selector */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-full border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 justify-between"
                    >
                        <span className="text-xs capitalize">{selectedNetwork}</span>
                        <ChevronDown className="h-3 w-3" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full bg-slate-900 border-slate-800">
                    {(['devnet', 'testnet', 'mainnet'] as Network[]).map((network) => (
                        <DropdownMenuItem
                            key={network}
                            onClick={() => handleNetworkChange(network)}
                            className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
                        >
                            <span className="capitalize">{network}</span>
                            {selectedNetwork === network && <Check className="h-4 w-4 ml-auto" />}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Connected Wallet */}
            <div className="flex items-center gap-2 rounded-lg bg-slate-800/50 p-3">
                <div className="h-10 w-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <Wallet className="h-5 w-5 text-indigo-400" />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-sm font-medium text-white">Connected</span>
                    <span className="text-xs text-slate-400 font-mono truncate">
                        {truncateAddress(currentAccount.address)}
                    </span>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDisconnect}
                    className="text-slate-400 hover:text-red-400 hover:bg-slate-800"
                >
                    <LogOut className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
