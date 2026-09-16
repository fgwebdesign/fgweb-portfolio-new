'use client';

import { motion, useReducedMotion } from 'motion/react';
import { HERO_SEQUENCE } from '@/data/hero-sequence';

interface HeroPortraitPhotoProps {
  delay?: number;
  active?: boolean;
}

/**
 * Foto halftone (dithering B/N) en el lugar que antes ocupaba el glifo
 * de laptop en puntos. Foto fija, como pegada — sin animación de hover
 * (el giro 3D sobre una imagen dithered se comprime feo al pasar de canto).
 * Solo desktop.
 */
export function HeroPortraitPhoto({ delay = 0, active = true }: HeroPortraitPhotoProps) {
  const shouldReduceMotion = useReducedMotion();

  const hiddenPose = { opacity: 0, x: 260, y: 30, rotate: 4, scale: 0.8 } as const;
  const shownPose = { opacity: 1, x: 0, y: 0, rotate: -3, scale: 1 } as const;

  return (
    <motion.div
      className="pointer-events-none absolute right-[-9%] top-[14%] hidden lg:block z-20"
      initial={hiddenPose}
      animate={active ? shownPose : hiddenPose}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 1.6, delay, ease: HERO_SEQUENCE.ease }
      }
      style={{ transformOrigin: 'top right' }}
    >
      <div className="relative w-[28vw] min-w-[380px] max-w-[560px] border-4 border-background bg-background shadow-2xl">
        <div className="relative aspect-square overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element -- imagen dithered: pixelated evita el suavizado/moiré del optimizador */}
          <img
            src="/felipe-halftone-portrait.png"
            alt="Felipe Gutiérrez"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
      </div>
    </motion.div>
  );
}
