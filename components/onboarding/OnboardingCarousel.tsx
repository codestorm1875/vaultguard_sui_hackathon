'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCurrentAccount, ConnectButton } from '@mysten/dapp-kit';
import { toast } from 'sonner';

const screens = [
    {
        id: 1,
        image: '/onboarding-1.png',
        title: 'Your Digital Legacy, Protected Forever',
        description: 'Enterprise-grade encryption ensures your digital assets remain secure and accessible only to your designated beneficiaries when the time comes.',
    },
    {
        id: 2,
        image: '/onboarding-2.png',
        title: 'Automatic Release When You\'re Gone',
        description: 'Our heartbeat mechanism monitors your activity. If you become inactive, the smart contract automatically initiates the vault release protocol to your loved ones.',
    },
    {
        id: 3,
        image: '/onboarding-3.png',
        title: 'Give Your Loved Ones Peace of Mind',
        description: 'Ensure your family has access to important documents, crypto assets, and digital inheritance exactly when they need it most.',
    },
];

const OnboardingCarousel = () => {
    const [currentScreen, setCurrentScreen] = useState(0);
    const router = useRouter();
    const currentAccount = useCurrentAccount();

    // Auto-navigate to dashboard when wallet is connected on the last screen
    useEffect(() => {
        if (currentAccount && currentScreen === screens.length - 1) {
            toast.success('Wallet connected! Redirecting to dashboard...');
            setTimeout(() => {
                router.push('/dashboard');
            }, 1500);
        }
    }, [currentAccount, currentScreen, router]);

    const handleNext = () => {
        if (currentScreen < screens.length - 1) {
            setCurrentScreen(currentScreen + 1);
        }
    };

    const handleSkip = () => {
        // Skip requires wallet connection too
        if (!currentAccount) {
            toast.error('Please connect your wallet to access the dashboard');
            setCurrentScreen(screens.length - 1); // Go to last screen
        } else {
            router.push('/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-2xl">
                {/* Skip Button */}
                <div className="flex justify-end mb-8">
                    <button
                        onClick={handleSkip}
                        className="text-slate-400 hover:text-white transition-colors text-sm"
                    >
                        Skip
                    </button>
                </div>

                {/* Screen Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentScreen}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="text-center space-y-8"
                    >
                        {/* Illustration */}
                        <div className="relative h-80 w-full flex items-center justify-center">
                            <Image
                                src={screens[currentScreen].image}
                                alt={screens[currentScreen].title}
                                width={400}
                                height={320}
                                className="object-contain"
                            />
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                            {screens[currentScreen].title}
                        </h1>

                        {/* Description */}
                        <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
                            {screens[currentScreen].description}
                        </p>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-2 mt-12 mb-8">
                    {screens.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentScreen(index)}
                            className={`h-2 rounded-full transition-all ${index === currentScreen
                                ? 'w-8 bg-indigo-500'
                                : 'w-2 bg-slate-700 hover:bg-slate-600'
                                }`}
                        />
                    ))}
                </div>

                {/* CTA Button */}
                <div className="flex justify-center">
                    {currentScreen === screens.length - 1 ? (
                        currentAccount ? (
                            <Button
                                size="lg"
                                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 gap-2"
                                disabled
                            >
                                Redirecting...
                            </Button>
                        ) : (
                            <ConnectButton
                                connectText="Connect Wallet to Get Started"
                                className="!bg-indigo-500 hover:!bg-indigo-600 !text-white !px-8 !py-3 !text-lg !rounded-lg !font-medium"
                            />
                        )
                    ) : (
                        <Button
                            onClick={handleNext}
                            size="lg"
                            className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 gap-2"
                        >
                            Next
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OnboardingCarousel;
