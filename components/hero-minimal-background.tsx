'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useIsDesktop } from '@/hooks/use-is-desktop';

export function HeroMinimalBackground() {
  const isDesktop = useIsDesktop();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isDesktop) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Líneas que se dibujan como firma - visibles y dinámicas */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.45" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* Línea 1 - Diagonal principal (esquina superior izquierda a inferior derecha) */}
        <motion.path
          d="M 0 0 Q 480 270 960 540 T 1920 1080"
          fill="none"
          stroke="url(#lineGradient1)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 1, 0],
            opacity: [0, 1, 1, 0]
          }}
          transition={{ 
            duration: 6,
            ease: [0.22, 1, 0.36, 1] as const,
            repeat: Infinity,
            repeatDelay: 2
          }}
        />
        
        {/* Línea 2 - Curva desde arriba */}
        <motion.path
          d="M 400 0 Q 800 200 1200 300 T 1920 450"
          fill="none"
          stroke="url(#lineGradient1)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 1, 0],
            opacity: [0, 1, 1, 0]
          }}
          transition={{ 
            duration: 5.5,
            ease: [0.22, 1, 0.36, 1] as const,
            repeat: Infinity,
            repeatDelay: 2,
            delay: 0.8
          }}
        />

        {/* Línea 3 - Diagonal inversa */}
        <motion.path
          d="M 1920 0 Q 1440 270 960 540 T 0 1080"
          fill="none"
          stroke="url(#lineGradient1)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 1, 0],
            opacity: [0, 1, 1, 0]
          }}
          transition={{ 
            duration: 6.5,
            ease: [0.22, 1, 0.36, 1] as const,
            repeat: Infinity,
            repeatDelay: 2,
            delay: 1.5
          }}
        />

        {/* Línea 4 - Curva desde abajo */}
        <motion.path
          d="M 0 1080 Q 400 800 800 750 T 1600 600"
          fill="none"
          stroke="url(#lineGradient1)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 1, 0],
            opacity: [0, 1, 1, 0]
          }}
          transition={{ 
            duration: 5,
            ease: [0.22, 1, 0.36, 1] as const,
            repeat: Infinity,
            repeatDelay: 2,
            delay: 2.2
          }}
        />

        {/* Línea 5 - Horizontal ondulada superior */}
        <motion.path
          d="M 0 200 Q 480 150 960 180 T 1920 220"
          fill="none"
          stroke="url(#lineGradient1)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 1, 0],
            opacity: [0, 1, 1, 0]
          }}
          transition={{ 
            duration: 4.5,
            ease: [0.22, 1, 0.36, 1] as const,
            repeat: Infinity,
            repeatDelay: 2,
            delay: 0.5
          }}
        />

        {/* Línea 6 - Horizontal ondulada inferior */}
        <motion.path
          d="M 1920 880 Q 1440 850 960 870 T 0 900"
          fill="none"
          stroke="url(#lineGradient1)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 1, 0],
            opacity: [0, 1, 1, 0]
          }}
          transition={{ 
            duration: 5,
            ease: [0.22, 1, 0.36, 1] as const,
            repeat: Infinity,
            repeatDelay: 2,
            delay: 1.8
          }}
        />

        {/* Línea 7 - Vertical ondulada izquierda */}
        <motion.path
          d="M 300 0 Q 250 270 280 540 T 320 1080"
          fill="none"
          stroke="url(#lineGradient1)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 1, 0],
            opacity: [0, 1, 1, 0]
          }}
          transition={{ 
            duration: 5.5,
            ease: [0.22, 1, 0.36, 1] as const,
            repeat: Infinity,
            repeatDelay: 2,
            delay: 1.2
          }}
        />

        {/* Línea 8 - Vertical ondulada derecha */}
        <motion.path
          d="M 1620 0 Q 1650 270 1600 540 T 1580 1080"
          fill="none"
          stroke="url(#lineGradient1)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 1, 0],
            opacity: [0, 1, 1, 0]
          }}
          transition={{ 
            duration: 6,
            ease: [0.22, 1, 0.36, 1] as const,
            repeat: Infinity,
            repeatDelay: 2,
            delay: 2.5
          }}
        />
      </svg>

      {/* Degradado sutil de fondo para dar profundidad */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.01] via-transparent to-foreground/[0.015]" />
    </div>
  );
}
