'use client';

import { useTransform, useSpring, useScroll, type MotionValue } from 'motion/react';
import type { RefObject } from 'react';

export const SCROLL_REVEAL_SPRING = {
  stiffness: 260,
  damping: 32,
  mass: 0.7,
} as const;

/** Mismo offset que Experience: 0 al entrar, 1 al salir, reversible al subir. */
export const SECTION_SCROLL_OFFSET: ['start end', 'end start'] = ['start end', 'end start'];

/** Progreso de scroll de toda la sección (bidireccional). */
export function useSectionScrollProgress(ref: RefObject<HTMLElement | null>) {
  return useScroll({
    target: ref,
    offset: SECTION_SCROLL_OFFSET,
  }).scrollYProgress;
}

/**
 * Reparte un tramo del scroll entre N ítems (como cardRange en Experience).
 * @param band ventana del scroll de sección reservada para estos ítems
 */
export function scrollItemRange(
  index: number,
  count: number,
  band: [number, number] = [0.08, 0.92],
): [number, number] {
  if (count <= 0) return band;

  const [bandStart, bandEnd] = band;
  const slot = (bandEnd - bandStart) / count;
  const start = bandStart + index * slot;
  const end = start + slot * 0.9;

  return [start, end];
}

/** Sub-rango dentro del tramo de un ítem (meta → título → imagen). */
export function scrollItemPartRange(
  itemRange: [number, number],
  partStart: number,
  partEnd: number,
): [number, number] {
  const [start, end] = itemRange;
  const span = end - start;
  return [start + span * partStart, start + span * partEnd];
}

/** Mapea un tramo del scroll de sección a progreso 0→1 con spring (como RoadmapCardAnimated). */
export function useSegmentProgress(
  sectionScroll: MotionValue<number>,
  range: [number, number],
) {
  const raw = useTransform(sectionScroll, range, [0, 1], { clamp: true });
  return useSpring(raw, SCROLL_REVEAL_SPRING);
}

export type RevealMotionConfig = {
  y?: number;
  x?: number;
  scale?: number;
  blur?: number;
  rotate?: number;
};

/** Estilos derivados de progreso 0→1 — al bajar aparece, al subir desaparece. */
export function useRevealMotion(
  progress: MotionValue<number>,
  config: RevealMotionConfig = {},
) {
  const {
    y = 32,
    x = 0,
    scale = 0.9,
    blur = 12,
    rotate = 0,
  } = config;

  const opacity = useTransform(progress, [0, 1], [0, 1]);
  const translateY = useTransform(progress, [0, 1], [y, 0]);
  const translateX = useTransform(progress, [0, 1], [x, 0]);
  const scaleValue = useTransform(progress, [0, 1], [scale, 1]);
  const rotateValue = useTransform(progress, [0, 1], [rotate, 0]);
  const blurValue = useTransform(progress, [0, 1], [blur, 0]);
  const filter = useTransform(blurValue, (value) => `blur(${value}px)`);

  return {
    opacity,
    y: translateY,
    x: translateX,
    scale: scaleValue,
    rotate: rotateValue,
    filter,
  };
}

// Alias legacy
export const useScrollRevealProgress = useSectionScrollProgress;
export const useStaggeredScrollProgress = useSegmentProgress;
