import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, useProgress } from '@react-three/drei';
import { sections } from '@/data';
import { useLoading } from '@/context/LoadingContext';

function GLTFPreloader({ url }: { url: string }) {
  // Trigger GLTF loading without rendering anything
  useGLTF(url);
  return null;
}

export default function GlobalAssetLoader() {
  const { active, progress } = useProgress();
  const { setIsLoadingAssets } = useLoading();
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const isCurrentlyLoading = active || progress < 100;

    if (isCurrentlyLoading) {
      // Cancel any pending hide and ensure overlay is shown
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
      setIsLoadingAssets(true);
    } else {
      // Add a small delay before hiding to prevent flicker
      if (!hideTimerRef.current) {
        hideTimerRef.current = setTimeout(() => {
          setIsLoadingAssets(false);
          hideTimerRef.current = null;
        }, 1200); // adjustable hold duration
      }
    }

    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    };
  }, [active, progress, setIsLoadingAssets]);

  return (
    <div style={{ position: 'fixed', width: 0, height: 0, overflow: 'hidden' }}>
      <Canvas dpr={[1, 2]}> 
        <React.Suspense fallback={null}>
          {sections.map((s) => (
            <GLTFPreloader key={s.id + s.modelUrl} url={s.modelUrl} />
          ))}
        </React.Suspense>
      </Canvas>
    </div>
  );
}
