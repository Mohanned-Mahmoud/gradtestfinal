import { useState, useEffect } from 'react';

export default function LoadingOverlay() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure overlay shows for at least 1.5 seconds
    const minDisplayTime = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Also listen for window load event
    const handleLoad = () => {
      setTimeout(() => setIsLoading(false), 1500);
    };

    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(minDisplayTime);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] backdrop-blur-xl bg-black/80 transition-opacity duration-500 flex items-center justify-center ${
        isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
        <p className="text-cyan-400 font-mono text-xs tracking-[0.2em] uppercase opacity-70">
          Loading Assets
        </p>
      </div>
    </div>
  );
}
