import { useState, useEffect } from 'react';

export default function LoadingOverlay() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAllLoaded = () => {
      // Check if document is fully loaded
      if (document.readyState === 'complete') {
        // Wait much longer to ensure all 3D assets are rendered
        setTimeout(() => setIsLoading(false), 3000);
      }
    };

    // Initial check
    if (document.readyState === 'complete') {
      checkAllLoaded();
    } else {
      // Listen for when document finishes loading
      window.addEventListener('load', checkAllLoaded);
      document.addEventListener('readystatechange', checkAllLoaded);
    }

    // Also add a fallback max timeout of 8 seconds
    const maxTimeout = setTimeout(() => setIsLoading(false), 8000);

    return () => {
      window.removeEventListener('load', checkAllLoaded);
      document.removeEventListener('readystatechange', checkAllLoaded);
      clearTimeout(maxTimeout);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] backdrop-blur-xl bg-black/80 transition-opacity duration-500 flex items-center justify-center ${
        isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
        <div className="text-center space-y-2">
          <p className="text-cyan-400 font-mono text-xs tracking-[0.2em] uppercase opacity-90">
            Initializing System
          </p>
          <p className="text-neutral-500 font-mono text-[10px] tracking-[0.15em] uppercase opacity-60">
            Loading All Assets
          </p>
        </div>
      </div>
    </div>
  );
}
