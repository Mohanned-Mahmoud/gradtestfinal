import React, { useRef, useEffect, Suspense, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, Html, Float, useProgress } from '@react-three/drei';
import { sections } from '../data';

interface ModelProps {
  url: string;
  scale: number;
  position: [number, number, number];
  isActive: boolean;
}

function Model({ url, scale, position, isActive }: ModelProps) {
  const { scene } = useGLTF(url);
  const ref = useRef<any>(null);

  const normalizedUrl = url.toLowerCase();

  useFrame((state) => {
    if (ref.current) {
      // Slow auto-rotation for specific models
      if (normalizedUrl.includes('duck') || normalizedUrl.includes('blood.glb')) {
        ref.current.rotation.y += 0.005;
        ref.current.rotation.z += 0.002;
      } else {
        // Rotation depends on scroll position of either the window or the closest scrolling parent
        // For the WebDemo, we check for both the window and the demo-specific scroll container
        const scrollContainer = document.querySelector('.overflow-y-auto') || document.documentElement;
        const scrollY = scrollContainer.scrollTop || window.scrollY;
        const scrollHeight = scrollContainer.scrollHeight || document.documentElement.scrollHeight;
        const clientHeight = scrollContainer.clientHeight || window.innerHeight;
        
        const maxScroll = scrollHeight - clientHeight;
        const scrollOffset = scrollY / (maxScroll || 1);
        ref.current.rotation.y = scrollOffset * Math.PI * 4;
      }
      
      // Manual smoothing for scale
      const targetScale = isActive ? scale : 0;
      ref.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale } as any, 0.1);
    }
  });

  return (
    <primitive 
      ref={ref} 
      object={scene} 
      position={position}
      visible={isActive || (ref.current && ref.current.scale.x > 0.01)}
    />
  );
}

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
        <span className="text-cyan-500 font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">Loading Assets</span>
        <span className="text-cyan-400 font-mono text-[14px]">{progress.toFixed(0)}%</span>
      </div>
    </Html>
  );
}

class ModelErrorBoundary extends Component<{ children: React.ReactNode, fallback?: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode, fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <mesh><boxGeometry /><meshStandardMaterial color="#22d3ee" wireframe /></mesh>
      );
    }
    return this.props.children;
  }
}

interface SceneProps {
  activeSectionId: string;
  onLoaded?: () => void;
}

export function LoadingScreen({ progress }: { progress: number }) {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#020202] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full" />
          <div 
            className="absolute inset-0 border-4 border-cyan-500 rounded-full border-t-transparent animate-spin"
            style={{ animationDuration: '1s' }}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-cyan-500 font-mono text-sm tracking-[0.3em] uppercase opacity-70">Loading Experience</span>
          <span className="text-cyan-400 font-mono text-2xl font-bold">{progress.toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
}

export default function Scene({ activeSectionId, onLoaded }: SceneProps) {
  useEffect(() => {
    const preloadModels = async () => {
      const promises = sections.map(section => 
        new Promise((resolve) => {
          useGLTF.preload(section.modelUrl);
          // Give a small delay to ensure the model is actually loaded
          setTimeout(resolve, 100);
        })
      );
      await Promise.all(promises);
      // Additional delay to ensure everything is rendered
      setTimeout(() => {
        onLoaded?.();
      }, 500);
    };
    preloadModels();
  }, [onLoaded]);

  return (
    <div className="fixed inset-0 z-0 bg-[#020202]">
      <Canvas camera={{ position: [0, 0, 8], fov: 35 }} dpr={[1, 2]}>
        <color attach="background" args={['#020202']} />
        <fog attach="fog" args={['#020202', 5, 25]} />
        
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={6} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} intensity={4} color="#ff00ff" />
        <directionalLight position={[0, 5, 0]} intensity={1.5} />
        
        <Suspense fallback={<Loader />}>
          {sections.map((section) => {
            const modelX = section.align === 'left' ? 2.5 : section.align === 'right' ? -2.5 : 0;
            
            if (section.id === 'home' && activeSectionId === 'home') {
              return (
                <group key="home-ducks">
                  <ModelErrorBoundary fallback={<mesh><boxGeometry /><meshStandardMaterial color="#22d3ee" wireframe /></mesh>}>
                    <Model 
                      url={section.modelUrl} 
                      scale={section.scale}
                      position={[0, -0.5, 0]} 
                      isActive={true}
                    />
                  </ModelErrorBoundary>
                  <ModelErrorBoundary fallback={null}>
                    <Model 
                      url={section.modelUrl} 
                      scale={section.scale * 0.4}
                      position={[-2, 1.5, -2]} 
                      isActive={true}
                    />
                  </ModelErrorBoundary>
                  <ModelErrorBoundary fallback={null}>
                    <Model 
                      url={section.modelUrl} 
                      scale={section.scale * 0.6}
                      position={[2, -1, -1]} 
                      isActive={true}
                    />
                  </ModelErrorBoundary>
                </group>
              );
            }

            return (
              <ModelErrorBoundary key={section.id} fallback={<mesh><boxGeometry /><meshStandardMaterial color="#22d3ee" wireframe /></mesh>}>
                <Model 
                  url={section.modelUrl} 
                  scale={section.scale}
                  position={section.position || [modelX, -0.5, 0]} 
                  isActive={section.id === activeSectionId}
                />
              </ModelErrorBoundary>
            );
          })}
        </Suspense>
        
        <ContactShadows resolution={1024} scale={20} blur={3} opacity={0.5} far={10} color="#000000" />
        <Environment preset="sunset" />
      </Canvas>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
    </div>
  );
}
