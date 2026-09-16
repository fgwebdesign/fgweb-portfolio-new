'use client';

import { motion, useReducedMotion } from 'motion/react';
import { HeroCornerShapes } from './hero-corner-shapes';
import { HERO_SEQUENCE } from '@/data/hero-sequence';

const EASE = [0.22, 1, 0.36, 1] as const;
const W = 1920;
const H = 1080;

type BrushStroke = {
  id: string;
  d: string;
  strokeWidth: number;
  delay: number;
  opacity: number;
};

// Trazos finos y monocromos — se dibujan una sola vez al entrar y quedan
// quietos. Sin loop infinito, sin blur, sin color: solo textura sutil.
const BRUSH_STROKES: BrushStroke[] = [
  {
    id: 'arc-top',
    d: `M -30 ${H * 0.05} Q ${W * 0.5} ${H * 0.55} ${W + 30} ${H * 0.05}`,
    strokeWidth: 1,
    delay: 0.2,
    opacity: 0.08,
  },
  {
    id: 'arc-bottom',
    d: `M -30 ${H * 0.95} Q ${W * 0.5} ${H * 0.45} ${W + 30} ${H * 0.95}`,
    strokeWidth: 1,
    delay: 0.5,
    opacity: 0.08,
  },
  {
    id: 'diag-tl-br',
    d: `M -40 -40 Q ${W * 0.25} ${H * 0.35} ${W * 0.5} ${H * 0.5} T ${W + 40} ${H + 40}`,
    strokeWidth: 1,
    delay: 0.35,
    opacity: 0.06,
  },
];

function BrushPath({ stroke, reduceMotion }: { stroke: BrushStroke; reduceMotion: boolean }) {
  if (reduceMotion) {
    return (
      <path
        d={stroke.d}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke.strokeWidth}
        strokeLinecap="round"
        opacity={stroke.opacity}
      />
    );
  }

  return (
    <motion.path
      d={stroke.d}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke.strokeWidth}
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: stroke.opacity }}
      transition={{ duration: 2.2, delay: stroke.delay, ease: EASE }}
    />
  );
}

export function HeroMinimalBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden pointer-events-none text-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: HERO_SEQUENCE.background.duration,
        delay: HERO_SEQUENCE.background.enter,
        ease: HERO_SEQUENCE.ease,
      }}
    >
      <HeroCornerShapes
        reduceMotion={!!shouldReduceMotion}
        enterDelay={HERO_SEQUENCE.cornerShapes.enter}
        enterDuration={HERO_SEQUENCE.cornerShapes.duration}
      />

      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        {BRUSH_STROKES.map((stroke) => (
          <BrushPath key={stroke.id} stroke={stroke} reduceMotion={!!shouldReduceMotion} />
        ))}
      </svg>
    </motion.div>
  );
}
