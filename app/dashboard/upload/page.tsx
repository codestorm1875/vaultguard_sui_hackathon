import React from 'react';
import FileUploader from '@/components/dashboard/FileUploader';

export default function UploadPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Upload Documents</h1>
                <p className="text-slate-400">Securely upload and encrypt your digital assets.</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-8 backdrop-blur-sm">
                <FileUploader />
            </div>
        </div>
    );
}
