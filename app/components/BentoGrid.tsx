'use client';

import { useState } from 'react';
import { Download, Copy, Check } from 'lucide-react';
import Image from 'next/image';

interface GeneratedData {
    slogan: string;
    socialPost: string;
    imageUrl: string;
}

interface BentoGridProps {
    data: GeneratedData | null;
}

export function BentoGrid({ data }: BentoGridProps) {
    const [copiedState, setCopiedState] = useState<string | null>(null);

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedState(id);
        setTimeout(() => setCopiedState(null), 2000);
    };

    if (!data) return null;

    return (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
            {/* Large Image Card (2x3) */}
            <div className="md:col-span-2 md:row-span-3 relative group rounded-3xl overflow-hidden border border-gray-100 bg-white shadow-sm">
                <Image
                    src={data.imageUrl}
                    alt="Generated Product Lifestyle"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <button
                        onClick={() => {
                            const link = document.createElement('a');
                            link.href = data.imageUrl;
                            link.download = 'brandblast-lifestyle.png';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        }}
                        className="text-white text-sm font-medium flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full hover:bg-white/30 transition-colors"
                    >
                        <Download className="w-4 h-4" /> Download Image
                    </button>
                </div>
            </div>

            {/* Slogan Card (1x1) */}
            <div className="md:col-span-1 md:row-span-1 p-6 rounded-3xl border border-gray-100 bg-white shadow-sm flex flex-col justify-center relative group">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Slogan</h3>
                <p className="text-xl font-bold text-gray-900 leading-tight">
                    "{data.slogan}"
                </p>
                <button
                    onClick={() => handleCopy(data.slogan, 'slogan')}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black transition-all flex items-center gap-2"
                >
                    {copiedState === 'slogan' ? (
                        <>
                            <span className="text-xs font-medium text-green-600">Copied</span>
                            <Check className="w-4 h-4 text-green-600" />
                        </>
                    ) : (
                        <Copy className="w-4 h-4" />
                    )}
                </button>
            </div>

            {/* Social Post Card (1x2) */}
            <div className="md:col-span-1 md:row-span-2 p-6 rounded-3xl border border-gray-100 bg-white shadow-sm flex flex-col relative group">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Social Post</h3>
                <div className="flex-1 font-medium text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {data.socialPost}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs text-gray-400">280 chars</span>
                    <button
                        onClick={() => handleCopy(data.socialPost, 'social')}
                        className="text-gray-400 hover:text-black transition-colors flex items-center gap-2"
                    >
                        {copiedState === 'social' ? (
                            <>
                                <span className="text-xs font-medium text-green-600">Copied</span>
                                <Check className="w-4 h-4 text-green-600" />
                            </>
                        ) : (
                            <Copy className="w-4 h-4" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
