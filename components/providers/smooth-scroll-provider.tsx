'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isDesktop || prefersReducedMotion) {
      return;
    }

    const instance = new Lenis({
      duration: 1.45,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.6,
    });

    setLenis(instance);

    function raf(time: number) {
      instance.raf(time);
      // Framer Motion's scroll-linked reveals (Services/Portfolio) only
      // re-measure on a native "scroll" event. Lenis can settle a fast/large
      // scroll without one firing on the final frame, leaving those reveals
      // stuck mid-transition until the next manual scroll. Force one on every
      // frame Lenis is actually animating so they never fall out of sync.
      if (instance.isScrolling) {
        window.dispatchEvent(new Event('scroll'));
      }
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
