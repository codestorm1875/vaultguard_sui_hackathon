'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-background flex items-center justify-center">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#312E81] opacity-80" />

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            {/* Floating Elements */}
            <motion.div
                className="absolute top-1/4 left-10 w-24 h-24 md:w-32 md:h-32 opacity-80"
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <Image src="/lock.png" alt="Secure Lock" width={128} height={128} className="object-contain drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
            </motion.div>

            <motion.div
                className="absolute bottom-1/4 right-10 w-20 h-20 md:w-28 md:h-28 opacity-70"
                animate={{
                    y: [0, 20, 0],
                    rotate: [0, -5, 0],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            >
                <Image src="/document.png" alt="Encrypted Document" width={112} height={112} className="object-contain drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]" />
            </motion.div>

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl"
                >
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-lg">
                        Protect Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Digital Legacy</span> Forever
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto">
                        The world's first encrypted inheritance vault powered by blockchain technology. Secure, decentralized, and eternal.
                    </p>


                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/onboarding">
                            <Button
                                size="lg"
                                className="bg-indigo-500 hover:bg-indigo-600 text-white text-lg px-8 py-6 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all duration-300"
                            >
                                Create Your Vault
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* Vault Illustration */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="mt-16 relative w-full max-w-3xl h-[400px] md:h-[500px]"
                >
                    <Image
                        src="/vault.png"
                        alt="Secure Vault"
                        fill
                        className="object-contain drop-shadow-[0_0_50px_rgba(99,102,241,0.2)]"
                        priority
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
