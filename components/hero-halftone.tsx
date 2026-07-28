'use client';

import { useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useIsDesktop } from '@/hooks/use-is-desktop';
import { HERO_SEQUENCE } from '@/data/hero-sequence';

const VIEW_W = 400;
const VIEW_H = 260;
const CELL = 8;
const DOT_RADIUS = 2.3;

/** Glifo original de laptop + "</>" armado con primitivas simples (rects y segmentos). */
const SCREEN = { x: 100, y: 20, w: 200, h: 140 };
const SCREEN_BORDER = 9;
const BASE = { x: 66, y: 168, w: 268, h: 13 };
const BRACKET_THICKNESS = 7;
const BRACKET_SEGMENTS: [number, number, number, number][] = [
  // chevron izquierdo "<"
  [176, 54, 148, 80],
  [148, 80, 176, 106],
  // chevron derecho ">"
  [224, 54, 252, 80],
  [252, 80, 224, 106],
  // barra "/"
  [206, 112, 194, 48],
];

function pointInRect(x: number, y: number, rx: number, ry: number, rw: number, rh: number) {
  return x >= rx && x <= rx + rw && y >= ry && y <= ry + rh;
}

function distToSegment(px: number, py: number, x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lengthSq = dx * dx + dy * dy;
  const t = lengthSq === 0 ? 0 : Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / lengthSq));
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}

function isInsideLaptopGlyph(x: number, y: number): boolean {
  const inOuterScreen = pointInRect(x, y, SCREEN.x, SCREEN.y, SCREEN.w, SCREEN.h);
  const inInnerScreen = pointInRect(
    x,
    y,
    SCREEN.x + SCREEN_BORDER,
    SCREEN.y + SCREEN_BORDER,
    SCREEN.w - SCREEN_BORDER * 2,
    SCREEN.h - SCREEN_BORDER * 2,
  );
  if (inOuterScreen && !inInnerScreen) return true;
  if (pointInRect(x, y, BASE.x, BASE.y, BASE.w, BASE.h)) return true;
  return BRACKET_SEGMENTS.some(([x1, y1, x2, y2]) => distToSegment(x, y, x1, y1, x2, y2) <= BRACKET_THICKNESS / 2);
}

type Dot = { x: number; y: number; delay: number; scale: number };

function buildDots(): Dot[] {
  const dots: { x: number; y: number }[] = [];
  for (let gy = 0; gy * CELL < VIEW_H; gy++) {
    for (let gx = 0; gx * CELL < VIEW_W; gx++) {
      const x = gx * CELL + CELL / 2;
      const y = gy * CELL + CELL / 2;
      if (isInsideLaptopGlyph(x, y)) dots.push({ x, y });
    }
  }

  // Orden de barrido izquierda -> derecha para el reveal, con leve variación por fila.
  const sorted = [...dots].sort((a, b) => a.x - b.x || a.y - b.y);
  const total = sorted.length || 1;

  return sorted.map((dot, index) => ({
    ...dot,
    delay: (index / total) * HERO_SEQUENCE.halftoneLaptop.sweepDuration,
    scale: 0.75 + ((dot.x + dot.y) % 5) / 10,
  }));
}

export function HeroHalftone() {
  const isDesktop = useIsDesktop();
  const shouldReduceMotion = useReducedMotion();
  const dots = useMemo(() => buildDots(), []);

  if (!isDesktop || shouldReduceMotion) return null;

  return (
    <motion.svg
      className="pointer-events-none absolute right-[9%] top-[22%] hidden h-auto w-[22vw] max-w-[340px] lg:block"
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: HERO_SEQUENCE.halftoneLaptop.enter }}
      aria-hidden
    >
      {dots.map((dot, index) => (
        <motion.circle
          key={index}
          cx={dot.x}
          cy={dot.y}
          r={DOT_RADIUS * dot.scale}
          className="fill-foreground/25"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: HERO_SEQUENCE.halftoneLaptop.enter + dot.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </motion.svg>
  );
}
