'use client';

import { useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';

interface InputFormProps {
    onSubmit: (data: { productName: string; description: string }) => Promise<void>;
    isLoading: boolean;
}

export function InputForm({ onSubmit, isLoading }: InputFormProps) {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ productName, description });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-4">
            <div className="space-y-2">
                <label htmlFor="productName" className="text-sm font-medium text-gray-700">
                    Product Name
                </label>
                <input
                    id="productName"
                    type="text"
                    placeholder="e.g. Midnight Brew"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all bg-white/50 backdrop-blur-sm text-gray-900"
                    required
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Product Description
                </label>
                <textarea
                    id="description"
                    placeholder="e.g. A premium coffee brand for hackers and night owls..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all bg-white/50 backdrop-blur-sm resize-none text-gray-900"
                    required
                />
            </div>

            <button
                type="submit"
                disabled={isLoading || !productName || !description}
                className="w-full py-3 px-4 bg-black text-white rounded-xl font-medium hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Generating Magic...
                    </>
                ) : (
                    <>
                        <Sparkles className="w-4 h-4 group-hover:text-yellow-300 transition-colors" />
                        Generate Marketing Kit
                    </>
                )}
            </button>
        </form>
    );
}
