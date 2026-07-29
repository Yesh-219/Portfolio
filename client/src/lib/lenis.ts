import Lenis from '@studio-freight/lenis';
import { useEffect } from 'react';

let lenisInstance: Lenis | null = null;
let rafId: number | null = null;

export const initLenis = (): Lenis => {
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    lerp: 0.03, // Even lower for maximum smoothness
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 2,
    orientation: 'vertical',
    gestureOrientation: 'vertical',
  });

  const raf = (time: number) => {
    lenisInstance?.raf(time);
    rafId = requestAnimationFrame(raf);
  };

  if (rafId === null) {
    rafId = requestAnimationFrame(raf);
  }

  return lenisInstance;
};

export const getLenis = (): Lenis | null => lenisInstance;

export function useLenisSmoothScroll() {
  useEffect(() => {
    initLenis();
    
    // Cleanup for HMR
    return () => {
      if (lenisInstance) {
        lenisInstance.destroy();
        lenisInstance = null;
      }
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };
  }, []);
}
