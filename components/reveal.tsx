'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useIsDesktop } from '@/hooks/use-is-desktop';

interface RevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  className?: string;
  amount?: number;
}

export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
  amount = 0.3,
}: RevealProps) {
  const isDesktop = useIsDesktop();
  const shouldReduceMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Si reduce motion está activado, no animamos
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  // Desktop: movimiento completo (40px), mobile: sutil (20px)
  const distance = isDesktop ? 40 : 20;

  const directionOffset = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };

  const variants = {
    hidden: {
      opacity: 0,
      ...directionOffset[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: isDesktop ? duration : duration * 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  // Evitar hidratación mismatch
  if (!isMounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      exit="hidden"
      viewport={{ once: false, amount }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
