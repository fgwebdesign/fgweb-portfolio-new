'use client';

import { motion } from 'motion/react';
import { useIsDesktop } from '@/hooks/use-is-desktop';

interface FloatingAssetProps {
  type: 'code' | 'bug' | 'palette' | 'layers';
  position: 'left' | 'right';
  index: number;
}

export function FloatingAsset({ type, position, index }: FloatingAssetProps) {
  const isDesktop = useIsDesktop();

  if (!isDesktop) return null;

  const assets = {
    code: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <path
          d="M35 45L20 60L35 75M85 45L100 60L85 75M65 30L55 90"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    bug: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="25" stroke="currentColor" strokeWidth="3" />
        <path
          d="M60 35V20M60 100V85M35 60H20M100 60H85"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="52" cy="55" r="3" fill="currentColor" />
        <circle cx="68" cy="55" r="3" fill="currentColor" />
      </svg>
    ),
    palette: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <path
          d="M60 20C40 20 24 36 24 56C24 76 40 92 60 92C62 92 63 91 63 89C63 88 62.7 87 62.2 86.5C61.8 86 61.5 85.2 61.5 84.5C61.5 83 62.8 81.8 64.5 81.8H72C84 81.8 94 71.8 94 59.8C94 37.2 79 20 60 20Z"
          stroke="currentColor"
          strokeWidth="3"
        />
        <circle cx="45" cy="48" r="4" fill="currentColor" />
        <circle cx="60" cy="38" r="4" fill="currentColor" />
        <circle cx="75" cy="48" r="4" fill="currentColor" />
        <circle cx="81" cy="65" r="4" fill="currentColor" />
      </svg>
    ),
    layers: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <path
          d="M30 50L60 35L90 50L60 65L30 50Z"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M30 65L60 80L90 65"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M30 80L60 95L90 80"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  };

  const positionClasses = {
    left: 'left-[5%]',
    right: 'right-[5%]',
  };

  const verticalPosition = 20 + index * 25;

  return (
    <motion.div
      className={`absolute ${positionClasses[position]} text-foreground/15 hover:text-foreground/30 transition-colors cursor-pointer z-20`}
      style={{
        top: `${verticalPosition}%`,
      }}
      initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: 0,
        y: [0, -30, 0],
      }}
      transition={{
        opacity: { duration: 1, delay: 1.5 + index * 0.3 },
        scale: { duration: 1, delay: 1.5 + index * 0.3 },
        rotate: { duration: 1, delay: 1.5 + index * 0.3 },
        y: {
          duration: 4 + index,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        },
      }}
      whileHover={{
        scale: 1.2,
        rotate: 180,
        transition: { duration: 0.3 },
      }}
    >
      {assets[type]}
    </motion.div>
  );
}
