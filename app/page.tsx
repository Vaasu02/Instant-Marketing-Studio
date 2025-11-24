'use client';

import { useState } from 'react';
import { InputForm } from './components/InputForm';
import { BentoGrid } from './components/BentoGrid';
import { Sparkles } from 'lucide-react';
import AnimatedBackground from './components/AnimatedBackground';

export default function Home() {
  const [generatedData, setGeneratedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (data: { productName: string; description: string }) => {
    setIsLoading(true);
    setError('');
    setGeneratedData(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate assets');
      }

      setGeneratedData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <AnimatedBackground />


      <div className="text-center max-w-2xl mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <Sparkles className="w-5 h-5 text-black" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-black">
            BrandBlast
          </h1>
        </div>

        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4 text-black">
          Instant Marketing Studio
        </h2>

        <p className="text-lg text-black">
          Turn a simple idea into a professional marketing kit in seconds.
          Powered by Gemini & Stability AI.
        </p>
      </div>


      <div className="w-full flex justify-center mb-12">
        <InputForm onSubmit={handleGenerate} isLoading={isLoading} />
      </div>


      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
          {error}
        </div>
      )}


      <div className="w-full flex justify-center">
        <BentoGrid data={generatedData} />
      </div>
    </main>
  );
}
