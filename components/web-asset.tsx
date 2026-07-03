'use client';

import { motion, useMotionValue, useSpring } from 'motion/react';
import { useIsDesktop } from '@/hooks/use-is-desktop';
import { useEffect, useState } from 'react';

interface WebAssetProps {
  type: 'https' | 'html' | 'terminal' | 'browser' | 'responsive' | 'speed';
  index: number;
}

export function WebAsset({ type, index }: WebAssetProps) {
  const isDesktop = useIsDesktop();
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    if (isDesktop) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isDesktop, mouseX, mouseY]);

  if (!isDesktop) return null;

  const assets = {
    https: (
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
        <rect x="35" y="45" width="30" height="35" rx="2" stroke="currentColor" strokeWidth="2.5" />
        <path d="M40 45V35C40 27.268 46.268 21 54 21H46C38.268 21 32 27.268 32 35V45" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="50" cy="62" r="3" fill="currentColor" />
        <path d="M50 65V72" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <text x="28" y="92" fontSize="12" fill="currentColor" fontFamily="monospace">HTTPS</text>
      </svg>
    ),
    html: (
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
        <path d="M30 20L25 50L30 80M70 20L75 50L70 80M55 30L45 70" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="32" y="92" fontSize="11" fill="currentColor" fontFamily="monospace">&lt;/&gt;</text>
      </svg>
    ),
    terminal: (
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
        <rect x="20" y="25" width="60" height="50" rx="3" stroke="currentColor" strokeWidth="2.5" />
        <path d="M28 40L35 47L28 54M40 54H55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="26" cy="32" r="1.5" fill="currentColor" />
        <circle cx="32" cy="32" r="1.5" fill="currentColor" />
        <circle cx="38" cy="32" r="1.5" fill="currentColor" />
      </svg>
    ),
    browser: (
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
        <rect x="20" y="25" width="60" height="50" rx="3" stroke="currentColor" strokeWidth="2.5" />
        <line x1="20" y1="35" x2="80" y2="35" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="28" cy="30" r="2" fill="currentColor" />
        <circle cx="36" cy="30" r="2" fill="currentColor" />
        <circle cx="44" cy="30" r="2" fill="currentColor" />
        <rect x="30" y="45" width="40" height="3" rx="1.5" fill="currentColor" opacity="0.3" />
        <rect x="30" y="52" width="30" height="3" rx="1.5" fill="currentColor" opacity="0.3" />
        <rect x="30" y="59" width="35" height="3" rx="1.5" fill="currentColor" opacity="0.3" />
      </svg>
    ),
    responsive: (
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
        <rect x="25" y="20" width="30" height="45" rx="3" stroke="currentColor" strokeWidth="2.5" />
        <rect x="60" y="35" width="20" height="35" rx="2" stroke="currentColor" strokeWidth="2.5" />
        <line x1="30" y1="60" x2="50" y2="60" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="40" cy="62" r="1.5" fill="currentColor" />
      </svg>
    ),
    speed: (
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
        <path d="M30 60C30 43.431 43.431 30 60 30C76.569 30 90 43.431 90 60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M60 60L75 45" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="60" cy="60" r="3" fill="currentColor" />
        <text x="46" y="80" fontSize="10" fill="currentColor" fontFamily="monospace">99/100</text>
      </svg>
    ),
  };

  // Posiciones distribuidas por todo el hero (no solo los costados)
  const positions = [
    { left: '12%', top: '18%' },   // Superior izquierda
    { right: '15%', top: '15%' },  // Superior derecha
    { left: '8%', top: '45%' },    // Centro izquierda
    { right: '10%', top: '50%' },  // Centro derecha
    { left: '18%', top: '72%' },   // Inferior izquierda
    { right: '20%', top: '75%' },  // Inferior derecha
  ];

  const position = positions[index % positions.length];

  // Movimiento más dinámico: vertical + horizontal
  const moveX = index % 2 === 0 ? [0, 30, 0] : [0, -30, 0];
  const moveY = [0, -40, 0];
  const rotate = index % 2 === 0 ? [0, 8, 0, -8, 0] : [0, -8, 0, 8, 0];

  return (
    <motion.div
      className="absolute text-foreground/8 cursor-pointer z-20 select-none"
      style={position}
      initial={{ opacity: 0, scale: 0.3, rotate: -180 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: 0,
        x: moveX,
        y: moveY,
      }}
      transition={{
        opacity: { duration: 1.2, delay: 1.8 + index * 0.2 },
        scale: { duration: 1.2, delay: 1.8 + index * 0.2 },
        rotate: { duration: 1.2, delay: 1.8 + index * 0.2 },
        x: {
          duration: 5 + index * 0.8,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        },
        y: {
          duration: 6 + index * 0.6,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        },
      }}
      whileHover={{
        scale: 1.25,
        rotate: index % 2 === 0 ? 15 : -15,
        transition: { duration: 0.3 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Efecto de sombreado/glow en hover */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl bg-foreground/0"
        animate={isHovered ? {
          scale: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.15)',
        } : {
          scale: 1,
          backgroundColor: 'rgba(0, 0, 0, 0)',
        }}
        transition={{ duration: 0.4 }}
      />
      
      {/* Asset SVG */}
      <motion.div
        animate={isHovered ? {
          filter: 'drop-shadow(0 0 20px rgba(0, 0, 0, 0.3))',
        } : {
          filter: 'drop-shadow(0 0 0px rgba(0, 0, 0, 0))',
        }}
        transition={{ duration: 0.3 }}
      >
        {assets[type]}
      </motion.div>
    </motion.div>
  );
}
