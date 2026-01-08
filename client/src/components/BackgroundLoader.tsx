import { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { sections } from '../data'; // Import your sections data

export default function BackgroundLoader() {
  useEffect(() => {
    // 1. Get all model URLs from your data
    const modelsToLoad = sections
      .map((section) => section.modelUrl)
      .filter((url) => url); // Remove undefined/null

    // 2. Define a sequential loader function
    const loadSequentially = async () => {
      for (const url of modelsToLoad) {
        try {
          // This downloads the file and caches it in memory
          await useGLTF.preload(url);
          console.log(`Cached: ${url}`);
        } catch (e) {
          console.error(`Failed to preload ${url}`, e);
        }
      }
    };

    // 3. Start loading
    loadSequentially();
  }, []);

  return null; // This component renders nothing
}