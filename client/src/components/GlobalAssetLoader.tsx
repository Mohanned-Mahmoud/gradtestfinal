import React, { useEffect } from 'react';
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

  useEffect(() => {
    setIsLoadingAssets(active || progress < 100);
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
