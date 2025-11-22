'use client';

import React, { useState } from 'react';
import { FileText, Lock, Unlock, Download, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface InheritedFile {
    id: string;
    name: string;
    size: string;
    type: string;
}

const InheritedFilesList = () => {
    const [files, setFiles] = useState([
        { id: '1', name: 'Last Will and Testament.pdf', size: '2.4 MB', type: 'pdf', status: 'locked' },
        { id: '2', name: 'Property Deeds.zip', size: '45.1 MB', type: 'zip', status: 'locked' },
        { id: '3', name: 'Crypto Wallet Keys.txt', size: '12 KB', type: 'txt', status: 'locked' },
    ]);

    const handleDecrypt = (id: string) => {
        setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'decrypting' } : f));

        setTimeout(() => {
            setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'unlocked' } : f));
        }, 1500);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-4">Inherited Assets</h3>
            <div className="grid gap-4">
                {files.map((file) => (
                    <div
                        key={file.id}
                        className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm"
                    >
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "p-3 rounded-lg transition-colors",
                                file.status === 'unlocked' ? "bg-emerald-500/10 text-emerald-500" : "bg-slate-800 text-slate-400"
                            )}>
                                <FileText className="h-6 w-6" />
                            </div>
                            <div>
                                <h4 className="font-medium text-white">{file.name}</h4>
                                <p className="text-sm text-slate-400">{file.size}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {file.status === 'locked' && (
                                <Button
                                    onClick={() => handleDecrypt(file.id)}
                                    className="bg-indigo-500 hover:bg-indigo-600 text-white gap-2"
                                >
                                    <Lock className="h-4 w-4" />
                                    Decrypt
                                </Button>
                            )}

                            {file.status === 'decrypting' && (
                                <div className="flex items-center gap-2 text-amber-500 bg-amber-500/10 px-4 py-2 rounded-md">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Unlock className="h-4 w-4" />
                                    </motion.div>
                                    <span className="text-sm font-medium">Decrypting...</span>
                                </div>
                            )}

                            {file.status === 'unlocked' && (
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-2 text-emerald-500 bg-emerald-500/10 px-4 py-2 rounded-md mr-2">
                                        <CheckCircle2 className="h-4 w-4" />
                                        <span className="text-sm font-medium">Decrypted</span>
                                    </div>
                                    <Button variant="outline" className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 gap-2">
                                        <Download className="h-4 w-4" />
                                        Download
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InheritedFilesList;
