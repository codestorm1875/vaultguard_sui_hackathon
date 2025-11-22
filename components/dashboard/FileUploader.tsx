'use client';

import React, { useState, useCallback } from 'react';
import { Upload, FileText, Image as ImageIcon, File, Lock, ShieldCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface FileItem {
    id: string;
    name: string;
    type: string;
    size: string;
    progress: number;
    status: 'uploading' | 'encrypting' | 'completed' | 'error';
}

const FileUploader = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState<FileItem[]>([]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        // Mock file addition
        const newFiles: FileItem[] = Array.from(e.dataTransfer.files).map((file) => ({
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            type: file.type,
            size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
            progress: 0,
            status: 'uploading',
        }));

        setFiles((prev) => [...prev, ...newFiles]);

        // Mock upload progress
        newFiles.forEach((file) => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 10;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    setFiles((prev) =>
                        prev.map((f) =>
                            f.id === file.id ? { ...f, progress: 100, status: 'encrypting' } : f
                        )
                    );

                    // Mock encryption delay
                    setTimeout(() => {
                        setFiles((prev) =>
                            prev.map((f) =>
                                f.id === file.id ? { ...f, status: 'completed' } : f
                            )
                        );
                    }, 1500);
                } else {
                    setFiles((prev) =>
                        prev.map((f) =>
                            f.id === file.id ? { ...f, progress } : f
                        )
                    );
                }
            }, 200);
        });
    }, []);

    const getFileIcon = (type: string) => {
        if (type.includes('pdf')) return <FileText className="h-6 w-6 text-red-400" />;
        if (type.includes('image')) return <ImageIcon className="h-6 w-6 text-blue-400" />;
        return <File className="h-6 w-6 text-slate-400" />;
    };

    const removeFile = (id: string) => {
        setFiles((prev) => prev.filter((f) => f.id !== id));
    };

    return (
        <div className="w-full max-w-3xl mx-auto space-y-8">
            {/* Upload Zone */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                    "relative rounded-3xl border-2 border-dashed p-12 transition-all duration-300 ease-in-out flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden group",
                    isDragging
                        ? "border-indigo-500 bg-indigo-500/10 scale-[1.02]"
                        : "border-slate-700 bg-slate-900/50 hover:border-indigo-500/50 hover:bg-slate-800/50"
                )}
            >
                <div className="rounded-full bg-indigo-500/10 p-4 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Upload className="h-8 w-8 text-indigo-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Drag & Drop files here</h3>
                <p className="text-slate-400 mb-6 max-w-md">
                    Support for PDF, Images, Text documents, and Crypto Wallet files.
                    <br />
                    <span className="text-indigo-400 text-sm">Max file size: 50MB</span>
                </p>
                <Button className="bg-indigo-500 hover:bg-indigo-600 text-white">
                    Browse Files
                </Button>

                {/* Encryption Indicator */}
                <div className="absolute bottom-4 flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full">
                    <ShieldCheck className="h-3 w-3" />
                    Files will be sealed with enterprise-grade encryption
                </div>
            </div>

            {/* File List */}
            <div className="space-y-4">
                <AnimatePresence>
                    {files.map((file) => (
                        <motion.div
                            key={file.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 p-4 backdrop-blur-sm"
                        >
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="rounded-lg bg-slate-800 p-2">
                                    {getFileIcon(file.type)}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="text-sm font-medium text-white truncate">{file.name}</h4>
                                        <span className="text-xs text-slate-400">{file.size}</span>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-amber-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${file.progress}%` }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between mt-1">
                                        <span className="text-xs text-slate-500 capitalize">
                                            {file.status === 'encrypting' ? 'Encrypting...' : file.status}
                                        </span>
                                        {file.status === 'completed' && (
                                            <div className="flex items-center gap-1 text-xs text-indigo-400">
                                                <Lock className="h-3 w-3" />
                                                Encrypted
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <button
                                    onClick={() => removeFile(file.id)}
                                    className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Success Glow */}
                            {file.status === 'completed' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 bg-indigo-500/5 pointer-events-none"
                                />
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default FileUploader;
