'use client';

import React, { useState } from 'react';
import { Shield, Key, Smartphone, Download, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import SecurityScore from '@/components/dashboard/SecurityScore';
import InactivitySlider from '@/components/dashboard/InactivitySlider';
import SecurityAuditLog from '@/components/dashboard/SecurityAuditLog';

export default function SettingsPage() {
    const [inactivityDays, setInactivityDays] = useState(60);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Security Settings</h1>
                <p className="text-slate-400">Manage encryption, access protocols, and vault security.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Settings Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Encryption Settings */}
                    <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                                <Lock className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">Encryption Settings</h3>
                                <p className="text-xs text-slate-400">Manage your vault's cryptographic parameters</p>
                            </div>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-white">Two-Factor Authentication</p>
                                    <p className="text-sm text-slate-400">Require 2FA for all sensitive actions</p>
                                </div>
                                <Switch
                                    checked={twoFactorEnabled}
                                    onCheckedChange={setTwoFactorEnabled}
                                    className="data-[state=checked]:bg-purple-500"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-white">Biometric Unlock</p>
                                    <p className="text-sm text-slate-400">Allow FaceID/TouchID for quick access</p>
                                </div>
                                <Switch className="data-[state=checked]:bg-purple-500" />
                            </div>
                        </div>
                    </div>

                    {/* Inactivity Slider */}
                    <InactivitySlider value={inactivityDays} onChange={setInactivityDays} />

                    {/* Emergency Contacts */}
                    <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6">
                        <h3 className="font-bold text-white mb-4">Emergency Contacts</h3>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <Input placeholder="Contact Name" className="bg-slate-950/50 border-slate-800" />
                                <Input placeholder="Email Address" className="bg-slate-950/50 border-slate-800" />
                                <Button variant="outline" className="border-slate-700 hover:bg-slate-800">Add</Button>
                            </div>
                            <p className="text-xs text-slate-500">
                                These contacts will be notified 7 days before vault release protocol completes.
                            </p>
                        </div>
                    </div>

                    {/* Backup Recovery */}
                    <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-white">Backup Recovery Phrase</h3>
                            <Button variant="outline" className="border-slate-700 hover:bg-slate-800 gap-2 text-slate-300">
                                <Download className="h-4 w-4" />
                                Export Vault Configuration
                            </Button>
                        </div>
                        <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 font-mono text-sm text-slate-400 break-all">
                            •••• •••• •••• •••• •••• •••• •••• •••• •••• •••• •••• ••••
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                            Never share your recovery phrase with anyone. Store it in a secure offline location.
                        </p>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-8">
                    <SecurityScore score={92} />
                    <SecurityAuditLog />
                </div>
            </div>
        </div>
    );
}
