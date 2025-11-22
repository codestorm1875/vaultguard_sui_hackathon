'use client';

import React from 'react';
import { Shield, Smartphone, Globe, Key } from 'lucide-react';

const SecurityAuditLog = () => {
    const events = [
        { id: 1, action: 'Vault Settings Updated', device: 'Chrome / MacOS', location: 'New York, US', time: '2 mins ago', icon: Shield },
        { id: 2, action: 'Successful Login', device: 'iPhone 13', location: 'New York, US', time: '1 hour ago', icon: Smartphone },
        { id: 3, action: 'Backup Phrase Exported', device: 'Chrome / MacOS', location: 'New York, US', time: '2 days ago', icon: Key },
        { id: 4, action: 'New IP Address Detected', device: 'Firefox / Windows', location: 'London, UK', time: '5 days ago', icon: Globe },
    ];

    return (
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm overflow-hidden">
            <div className="p-6 border-b border-slate-800">
                <h3 className="font-bold text-white">Security Audit Log</h3>
                <p className="text-xs text-slate-400">Recent activity and security events</p>
            </div>

            <div className="divide-y divide-slate-800/50">
                {events.map((event) => (
                    <div key={event.id} className="p-4 flex items-center gap-4 hover:bg-slate-800/30 transition-colors">
                        <div className="p-2 rounded-full bg-slate-800 text-slate-400">
                            <event.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white">{event.action}</p>
                            <p className="text-xs text-slate-500 flex items-center gap-2">
                                <span>{event.device}</span>
                                <span>•</span>
                                <span>{event.location}</span>
                            </p>
                        </div>
                        <span className="text-xs text-slate-500 whitespace-nowrap">{event.time}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SecurityAuditLog;
