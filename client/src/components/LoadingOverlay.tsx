import { useState, useEffect } from 'react';

export default function LoadingOverlay() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if window has finished loading
    if (document.readyState === 'complete') {
      setIsLoading(false);
    }

    const handleLoad = () => setIsLoading(false);
    window.addEventListener('load', handleLoad);

    // Fallback: hide overlay after 3 seconds
    const timeout = setTimeout(() => setIsLoading(false), 3000);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 backdrop-blur-lg bg-black/70 transition-opacity duration-500 pointer-events-none ${
        isLoading ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
        <p className="text-cyan-500 font-mono text-[10px] tracking-[0.3em] uppercase opacity-50 mt-4">
          Loading Assets
        </p>
      </div>
    </div>
  );
}
