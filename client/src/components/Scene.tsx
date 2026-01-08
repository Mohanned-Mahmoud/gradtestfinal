import React, { useRef, Suspense, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, Html } from '@react-three/drei';
import { sections } from '../data';

// ✅ Keep this. Preload ONLY the first model so the landing page is instant.
useGLTF.preload(sections[0].modelUrl);

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
      if (normalizedUrl.includes('duck') || normalizedUrl.includes('blood.glb')) {
        ref.current.rotation.y += 0.005;
        ref.current.rotation.z += 0.002;
      } else {
        const scrollContainer = document.querySelector('.overflow-y-auto') || document.documentElement;
        const scrollY = scrollContainer.scrollTop || window.scrollY;
        const scrollHeight = scrollContainer.scrollHeight || document.documentElement.scrollHeight;
        const clientHeight = scrollContainer.clientHeight || window.innerHeight;
        
        const maxScroll = scrollHeight - clientHeight;
        const scrollOffset = scrollY / (maxScroll || 1);
        const baseRotation = rotation || [0, 0, 0];
        ref.current.rotation.x = baseRotation[0];
        ref.current.rotation.y = baseRotation[1] + scrollOffset * Math.PI * 4;
        ref.current.rotation.z = baseRotation[2];
      }
      
      const targetScale = isActive ? scale : 0;
      // Faster lerp for snappier feel
      ref.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale } as any, 0.1);
    }
  });

  return (
    <primitive 
      ref={ref} 
      object={scene} 
      position={position}
      // Hide completely if scale is tiny to save GPU
      visible={isActive || (ref.current && ref.current.scale.x > 0.01)}
    />
  );
}

// A smaller, non-intrusive loader for individual sections
function MiniLoader() {
  return null; // Return null to make loading invisible, or a tiny spinner if you prefer
}

class ModelErrorBoundary extends Component<{ children: React.ReactNode, fallback?: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode, fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

interface SceneProps {
  activeSectionId: string;
  className?: string;
}

export default function Scene({ activeSectionId, className }: SceneProps) {
  // ❌ DELETED: The useEffect loop that was forcing all downloads at once

  return (
    <div className={`fixed inset-0 z-0 bg-[#020202] transition-opacity duration-500 ${className || ''}`}>
      <Canvas camera={{ position: [0, 0, 8], fov: 35 }} dpr={[1, 2]}>
        <color attach="background" args={['#020202']} />
        <fog attach="fog" args={['#020202', 5, 25]} />
        
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={6} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} intensity={4} color="#ff00ff" />
        <directionalLight position={[0, 5, 0]} intensity={1.5} />
        
        {sections.map((section) => {
            const modelX = section.align === 'left' ? 2.5 : section.align === 'right' ? -2.5 : 0;
            const isHome = section.id === 'home';

            // Special logic for Home (Ducks)
            if (isHome && activeSectionId === 'home') {
              return (
                <group key="home-ducks">
                  {/* Home gets its own Suspense so it renders FIRST */}
                  <Suspense fallback={null}>
                    <ModelErrorBoundary>
                        <Model 
                        url={section.modelUrl} 
                        scale={section.scale}
                        position={[0, -0.5, 0]} 
                        isActive={true}
                        />
                         {/* Extra decorative ducks */}
                        <Model url={section.modelUrl} scale={section.scale * 0.4} position={[-2, 1.5, -2]} isActive={true} />
                        <Model url={section.modelUrl} scale={section.scale * 0.6} position={[2, -1, -1]} isActive={true} />
                    </ModelErrorBoundary>
                  </Suspense>
                </group>
              );
            }

            // All other sections get their OWN individual Suspense boundary
            // This prevents "Section 5" from blocking "Section 2"
            return (
              <Suspense key={section.id} fallback={<MiniLoader />}>
                <ModelErrorBoundary fallback={null}>
                    <Model 
                    url={section.modelUrl} 
                    scale={section.scale}
                    position={section.position || [modelX, -0.5, 0]} 
                    isActive={section.id === activeSectionId}
                    rotation={section.rotation}
                    />
                </ModelErrorBoundary>
              </Suspense>
            );
        })}
        
        <ContactShadows resolution={1024} scale={20} blur={3} opacity={0.5} far={10} color="#000000" />
        <Environment preset="sunset" />
      </Canvas>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
    </div>
  );
}