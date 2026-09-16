'use client';

import { motion, useReducedMotion } from 'motion/react';
import { HERO_SEQUENCE } from '@/data/hero-sequence';

interface HeroPortraitPhotoProps {
  delay?: number;
  active?: boolean;
}

/**
 * Foto halftone (dithering B/N) en el lugar que antes ocupaba el glifo
 * de laptop en puntos. Solo desktop.
 */
export function HeroPortraitPhoto({ delay = 0, active = true }: HeroPortraitPhotoProps) {
  const shouldReduceMotion = useReducedMotion();

  const hiddenPose = { opacity: 0, y: 20, rotate: -2, scale: 0.9 } as const;
  const shownPose = { opacity: 1, y: 0, rotate: -3, scale: 1 } as const;

  return (
    <motion.div
      className="pointer-events-none absolute right-[9%] top-[18%] hidden lg:block z-20"
      initial={hiddenPose}
      animate={active ? shownPose : hiddenPose}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.6, delay, ease: HERO_SEQUENCE.ease }
      }
      style={{ transformOrigin: 'top right' }}
    >
      <motion.div
        className="relative w-[15vw] min-w-[200px] max-w-[300px] border-4 border-background bg-background shadow-2xl pointer-events-auto"
        animate={shouldReduceMotion ? {} : { y: [0, -10, 0], rotate: [-3, -1, -3] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{ perspective: 900 }}
      >
        <motion.div
          className="relative aspect-square overflow-hidden"
          whileHover={shouldReduceMotion ? undefined : { rotateY: 360 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- imagen dithered: pixelated evita el suavizado/moiré del optimizador */}
          <img
            src="/felipe-halftone-portrait.png"
            alt="Felipe Gutiérrez"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ imageRendering: 'pixelated' }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
