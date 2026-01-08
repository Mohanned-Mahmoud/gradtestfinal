import { useLoading } from '@/context/LoadingContext';

export default function LoadingOverlay() {
  const { isLoadingAssets } = useLoading();

  return (
    <div
      className={`fixed inset-0 z-[9999] backdrop-blur-xl bg-black/80 transition-opacity duration-500 flex items-center justify-center ${
        isLoadingAssets ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
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
