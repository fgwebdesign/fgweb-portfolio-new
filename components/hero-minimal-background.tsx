'use client';

import { motion, useReducedMotion } from 'motion/react';
import { HeroCornerShapes } from './hero-corner-shapes';
import { HERO_SEQUENCE } from '@/data/hero-sequence';

const PALETTE = [
  '#0a0a0a',
  '#4f46e5',
  '#7c3aed',
  '#0891b2',
  '#db2777',
  '#64748b',
  '#0d9488',
  '#ea580c',
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;
const W = 1920;
const H = 1080;

type BrushStroke = {
  id: string;
  d: string;
  color: string;
  strokeWidth: number;
  duration: number;
  delay: number;
  repeatDelay: number;
  opacity?: number;
  dasharray?: string;
};

// Trazos que atraviesan todo el viewport — esquina a esquina, borde a borde
const BRUSH_STROKES: BrushStroke[] = [
  // Diagonales completas
  {
    id: 'diag-tl-br',
    d: `M -40 -40 Q ${W * 0.25} ${H * 0.35} ${W * 0.5} ${H * 0.5} T ${W + 40} ${H + 40}`,
    color: PALETTE[1],
    strokeWidth: 2,
    duration: 12,
    delay: 0,
    repeatDelay: 3,
  },
  {
    id: 'diag-tr-bl',
    d: `M ${W + 40} -40 Q ${W * 0.75} ${H * 0.35} ${W * 0.5} ${H * 0.5} T -40 ${H + 40}`,
    color: PALETTE[2],
    strokeWidth: 2,
    duration: 13,
    delay: 1.5,
    repeatDelay: 2.5,
  },
  // Ondas horizontales de borde a borde
  {
    id: 'wave-top',
    d: `M -20 ${H * 0.12} Q ${W * 0.25} ${H * 0.05} ${W * 0.5} ${H * 0.14} T ${W + 20} ${H * 0.1}`,
    color: PALETTE[3],
    strokeWidth: 1.5,
    duration: 10,
    delay: 0.8,
    repeatDelay: 2,
  },
  {
    id: 'wave-mid',
    d: `M -20 ${H * 0.5} C ${W * 0.2} ${H * 0.3}, ${W * 0.35} ${H * 0.7}, ${W * 0.5} ${H * 0.5} S ${W * 0.8} ${H * 0.25}, ${W + 20} ${H * 0.5}`,
    color: PALETTE[4],
    strokeWidth: 2,
    duration: 14,
    delay: 2,
    repeatDelay: 3,
  },
  {
    id: 'wave-bottom',
    d: `M ${W + 20} ${H * 0.88} Q ${W * 0.75} ${H * 0.95} ${W * 0.5} ${H * 0.86} T -20 ${H * 0.9}`,
    color: PALETTE[6],
    strokeWidth: 1.5,
    duration: 11,
    delay: 3,
    repeatDelay: 2,
  },
  // Arcos que abrazan todo el ancho
  {
    id: 'arc-top',
    d: `M -30 ${H * 0.05} Q ${W * 0.5} ${H * 0.55} ${W + 30} ${H * 0.05}`,
    color: PALETTE[7],
    strokeWidth: 1.5,
    duration: 12,
    delay: 0.5,
    repeatDelay: 2.5,
  },
  {
    id: 'arc-bottom',
    d: `M -30 ${H * 0.95} Q ${W * 0.5} ${H * 0.45} ${W + 30} ${H * 0.95}`,
    color: PALETTE[1],
    strokeWidth: 1.5,
    duration: 12,
    delay: 4,
    repeatDelay: 2.5,
  },
  // Verticales de arriba a abajo
  {
    id: 'vert-left',
    d: `M ${W * 0.08} -30 Q ${W * 0.12} ${H * 0.35} ${W * 0.1} ${H * 0.5} T ${W * 0.14} ${H + 30}`,
    color: PALETTE[5],
    strokeWidth: 1.5,
    duration: 10,
    delay: 1.2,
    repeatDelay: 3,
  },
  {
    id: 'vert-right',
    d: `M ${W * 0.92} -30 Q ${W * 0.88} ${H * 0.35} ${W * 0.9} ${H * 0.5} T ${W * 0.86} ${H + 30}`,
    color: PALETTE[3],
    strokeWidth: 1.5,
    duration: 10,
    delay: 2.5,
    repeatDelay: 3,
  },
  // Marco del viewport — se dibuja como un pincel recorriendo el perímetro
  {
    id: 'frame-top',
    d: `M 60 60 L ${W - 60} 60`,
    color: PALETTE[0],
    strokeWidth: 1,
    duration: 8,
    delay: 0,
    repeatDelay: 4,
    opacity: 0.35,
  },
  {
    id: 'frame-right',
    d: `M ${W - 60} 60 L ${W - 60} ${H - 60}`,
    color: PALETTE[0],
    strokeWidth: 1,
    duration: 6,
    delay: 2,
    repeatDelay: 4,
    opacity: 0.35,
  },
  {
    id: 'frame-bottom',
    d: `M ${W - 60} ${H - 60} L 60 ${H - 60}`,
    color: PALETTE[0],
    strokeWidth: 1,
    duration: 8,
    delay: 4,
    repeatDelay: 4,
    opacity: 0.35,
  },
  {
    id: 'frame-left',
    d: `M 60 ${H - 60} L 60 60`,
    color: PALETTE[0],
    strokeWidth: 1,
    duration: 6,
    delay: 6,
    repeatDelay: 4,
    opacity: 0.35,
  },
  // Formas grandes de ancho completo
  {
    id: 'ellipse-wide',
    d: `M 40 ${H * 0.5} A ${W * 0.5 - 40} ${H * 0.42} 0 1 1 ${W - 40} ${H * 0.5} A ${W * 0.5 - 40} ${H * 0.42} 0 1 1 40 ${H * 0.5}`,
    color: PALETTE[2],
    strokeWidth: 1.5,
    duration: 16,
    delay: 1,
    repeatDelay: 3,
    opacity: 0.5,
  },
  {
    id: 'infinity-wide',
    d: `M ${W * 0.15} ${H * 0.5} C ${W * 0.15} ${H * 0.28}, ${W * 0.32} ${H * 0.28}, ${W * 0.5} ${H * 0.5} C ${W * 0.68} ${H * 0.72}, ${W * 0.85} ${H * 0.72}, ${W * 0.85} ${H * 0.5} C ${W * 0.85} ${H * 0.28}, ${W * 0.68} ${H * 0.28}, ${W * 0.5} ${H * 0.5} C ${W * 0.32} ${H * 0.72}, ${W * 0.15} ${H * 0.72}, ${W * 0.15} ${H * 0.5}`,
    color: PALETTE[4],
    strokeWidth: 2,
    duration: 15,
    delay: 5,
    repeatDelay: 4,
    opacity: 0.55,
  },
  // Zigzag horizontal de punta a punta
  {
    id: 'zigzag',
    d: `M -20 ${H * 0.72} L ${W * 0.2} ${H * 0.62} L ${W * 0.4} ${H * 0.78} L ${W * 0.6} ${H * 0.58} L ${W * 0.8} ${H * 0.75} L ${W + 20} ${H * 0.65}`,
    color: PALETTE[7],
    strokeWidth: 1.5,
    duration: 13,
    delay: 3.5,
    repeatDelay: 2.5,
    opacity: 0.45,
  },
  // Curva tipo firma que cruza toda la pantalla
  {
    id: 'signature-sweep',
    d: `M -40 ${H * 0.35} Q ${W * 0.2} ${H * 0.15} ${W * 0.4} ${H * 0.4} T ${W * 0.7} ${H * 0.25} T ${W + 40} ${H * 0.45}`,
    color: PALETTE[1],
    strokeWidth: 2.5,
    duration: 14,
    delay: 0.3,
    repeatDelay: 3,
    opacity: 0.5,
  },
  {
    id: 'signature-sweep-2',
    d: `M ${W + 40} ${H * 0.65} Q ${W * 0.8} ${H * 0.85} ${W * 0.6} ${H * 0.6} T ${W * 0.3} ${H * 0.75} T -40 ${H * 0.55}`,
    color: PALETTE[6],
    strokeWidth: 2,
    duration: 13,
    delay: 6,
    repeatDelay: 3,
    opacity: 0.45,
  },
];

function BrushPath({ stroke, reduceMotion }: { stroke: BrushStroke; reduceMotion: boolean }) {
  const peakOpacity = stroke.opacity ?? 0.6;

  if (reduceMotion) {
    return (
      <path
        d={stroke.d}
        fill="none"
        stroke={stroke.color}
        strokeWidth={stroke.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={peakOpacity * 0.5}
        strokeDasharray={stroke.dasharray}
      />
    );
  }

  return (
    <motion.path
      d={stroke.d}
      fill="none"
      stroke={stroke.color}
      strokeWidth={stroke.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={stroke.dasharray}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{
        pathLength: [0, 1, 1, 0],
        opacity: [0, peakOpacity, peakOpacity, 0],
      }}
      transition={{
        duration: stroke.duration,
        delay: stroke.delay,
        ease: EASE,
        // 40% dibujando, 35% visible, 25% desvaneciendo — sensación de pincel lento
        times: [0, 0.4, 0.75, 1],
        repeat: Infinity,
        repeatDelay: stroke.repeatDelay,
      }}
    />
  );
}

export function HeroMinimalBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden pointer-events-none"
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
        <defs>
          {/* Filtro pincel: bordes suaves como trazo de tinta */}
          <filter id="brush-soft" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradiente animado para algunos trazos */}
          <linearGradient id="brush-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <motion.stop
              offset="0%"
              animate={{ stopColor: [PALETTE[1], PALETTE[3], PALETTE[4], PALETTE[1]] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.stop
              offset="50%"
              animate={{ stopColor: [PALETTE[2], PALETTE[4], PALETTE[6], PALETTE[2]] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            />
            <motion.stop
              offset="100%"
              animate={{ stopColor: [PALETTE[3], PALETTE[7], PALETTE[1], PALETTE[3]] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
            />
          </linearGradient>
        </defs>

        <g filter={shouldReduceMotion ? undefined : 'url(#brush-soft)'}>
          {BRUSH_STROKES.map((stroke) => (
            <BrushPath
              key={stroke.id}
              stroke={stroke}
              reduceMotion={!!shouldReduceMotion}
            />
          ))}
        </g>
      </svg>

      <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.01] via-transparent to-foreground/[0.015]" />
    </motion.div>
  );
}
