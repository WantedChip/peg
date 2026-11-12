import { useEffect, useRef, useState, createContext, useContext } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { useReducedMotion } from './useReducedMotion';

interface LenisContextValue {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement | number, offset?: number) => void;
  stop: () => void;
  start: () => void;
}

export const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export function useLenisContext() {
  return useContext(LenisContext);
}

export function useLenis() {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Under prefers-reduced-motion: reduce, do not run smooth scrolling
    if (prefersReducedMotion) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
        setLenisInstance(null);
      }
      return;
    }

    // Keep native touch momentum on mobile touch devices
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) {
      // Mobile / touch only device: rely on native momentum scroll
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis from GSAP ticker with lagSmoothing(0)
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, [prefersReducedMotion]);

  const scrollTo = (target: string | HTMLElement | number, offset = -86) => {
    if (target === '#top' || target === 0) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { offset: 0, duration: 1.1 });
      } else {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
      return;
    }

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset, duration: 1.1 });
    } else {
      if (typeof target === 'string') {
        const el = document.querySelector(target);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY + offset;
          window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        }
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      } else if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    }
  };

  const stop = () => {
    lenisRef.current?.stop();
  };

  const start = () => {
    lenisRef.current?.start();
  };

  return {
    lenis: lenisInstance,
    scrollTo,
    stop,
    start,
  };
}
