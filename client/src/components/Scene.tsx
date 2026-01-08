import React, { useRef, useEffect, Suspense, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, Html, Float, useProgress } from '@react-three/drei';
import { sections } from '../data';

interface ModelProps {
  url: string;
  scale: number;
  position: [number, number, number];
  isActive: boolean;
  rotation?: [number, number, number];
}

function Model({ url, scale, position, isActive, rotation }: ModelProps) {
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
        const baseRotation = rotation || [0, 0, 0];
        // Slow down rotation for Quest3 (VR) and phone (mobile) models
        const rotationFactor = (normalizedUrl.includes('quest3') || normalizedUrl.includes('phone'))
          ? Math.PI * 2 // slower spin for VR and mobile pages
          : Math.PI * 4;
        ref.current.rotation.x = baseRotation[0];
        ref.current.rotation.y = baseRotation[1] + scrollOffset * rotationFactor;
        ref.current.rotation.z = baseRotation[2];
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
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
        <span className="text-cyan-500 font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">Loading Assets</span>
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
}

export default function Scene({ activeSectionId }: SceneProps) {
  const { active, progress } = useProgress(); // track loading to drive blur overlay
  const isLoading = active || progress < 100;

  useEffect(() => {
    sections.forEach(section => {
      useGLTF.preload(section.modelUrl);
    });
  }, []);

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
                  rotation={section.rotation}
                />
              </ModelErrorBoundary>
            );
          })}
        </Suspense>
        
        <ContactShadows resolution={1024} scale={20} blur={3} opacity={0.5} far={10} color="#000000" />
        <Environment preset="sunset" />
      </Canvas>
      <div className={`absolute inset-0 pointer-events-none transition-all duration-300 z-20 ${isLoading ? 'backdrop-blur-md bg-black/60 opacity-100' : 'opacity-0'}`} />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] z-10" />
    </div>
  );
}