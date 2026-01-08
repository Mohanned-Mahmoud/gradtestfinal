import { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { sections } from '../data';

// 📋 EDIT THIS LIST to change download order
// IDs listed here will be downloaded FIRST, in this exact order.
const PRIORITY_IDS = [
  "home",           // 1. The Hero/First model (Critical)
   "products",        // 4. Skeleton
  "vr-experience",  // 2. Big VR headset model (Maybe you want this ready fast)
  "ai-mobile"      // 3. The Phone model
 
];


// 🔒 Global flag to track if we already started loading
// Being outside the function means it survives re-renders.
let hasStartedLoading = false;

export default function BackgroundLoader() {
  useEffect(() => {
    // 🛑 STOP if we already ran this logic
    if (hasStartedLoading) return;
    
    // ✅ Mark as started immediately so we never run again
    hasStartedLoading = true;

    const loadModels = async () => {
      console.log("🚀 Starting background asset download...");

      // 1. Get Priority URLs
      const priorityModels = PRIORITY_IDS.map(id => 
        sections.find(s => s.id === id)?.modelUrl
      ).filter((url): url is string => !!url);

      // 2. Get Remaining URLs
      const remainingModels = sections
        .filter(s => !PRIORITY_IDS.includes(s.id))
        .map(s => s.modelUrl)
        .filter((url): url is string => !!url);

      // 3. Merge unique values
      const finalLoadList = Array.from(new Set([...priorityModels, ...remainingModels]));

      // 4. Download loop
      for (const url of finalLoadList) {
        try {
          await useGLTF.preload(url);
          console.log(`✅ Cached: ${url}`);
        } catch (e) {
          console.error(`❌ Failed to preload ${url}`, e);
        }
      }
      
      console.log("🏁 All assets downloaded and cached.");
    };

    loadModels();
  }, []);

  return null;
}