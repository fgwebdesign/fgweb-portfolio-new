'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useIsDesktop } from '@/hooks/use-is-desktop';

export function HeroBackground() {
  const isDesktop = useIsDesktop();
  const [isMounted, setIsMounted] = useState(false);
  
  // Hooks siempre en el mismo orden
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPct = (clientX / innerWidth - 0.5) * 100;
      const yPct = (clientY / innerHeight - 0.5) * 100;
      
      mouseX.set(xPct);
      mouseY.set(yPct);
    };

    if (isDesktop && isMounted) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isDesktop, isMounted, mouseX, mouseY]);

  if (!isMounted) {
    return <div className="absolute inset-0 -z-10 bg-background" />;
  }

  if (!isDesktop) {
    return (
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-background to-foreground/5" />
    );
  }

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-background">
      {/* Grid 3D grande y visible */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(10, 10, 10, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(10, 10, 10, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          x: smoothX,
          y: smoothY,
        }}
      />

      {/* Cuadrado grande - top left */}
      <motion.div
        className="absolute w-64 h-64 border-2 border-foreground/20"
        style={{
          top: '15%',
          left: '10%',
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
        }}
        whileHover={{
          scale: 1.1,
          borderColor: 'rgba(10, 10, 10, 0.4)',
        }}
      />

      {/* Círculo grande - top right */}
      <motion.div
        className="absolute w-80 h-80 rounded-full border-2 border-foreground/20"
        style={{
          top: '20%',
          right: '8%',
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          scale: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
        }}
        whileHover={{
          scale: 1.3,
          borderColor: 'rgba(10, 10, 10, 0.4)',
        }}
      />

      {/* Triángulo - mid left */}
      <motion.div
        className="absolute w-56 h-56 border-2 border-foreground/20"
        style={{
          top: '50%',
          left: '5%',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        }}
        animate={{
          rotate: [0, -360],
          y: [0, -30, 0],
        }}
        transition={{
          rotate: { duration: 30, repeat: Infinity, ease: 'linear' },
          y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
        }}
        whileHover={{
          scale: 1.2,
          rotate: 45,
        }}
      />

      {/* Diamante grande - mid right */}
      <motion.div
        className="absolute w-72 h-72 border-2 border-foreground/20"
        style={{
          top: '45%',
          right: '12%',
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
        }}
        animate={{
          rotate: [0, 360],
          x: [0, 30, 0],
        }}
        transition={{
          rotate: { duration: 28, repeat: Infinity, ease: 'linear' },
          x: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
        }}
        whileHover={{
          scale: 1.15,
          borderColor: 'rgba(10, 10, 10, 0.4)',
        }}
      />

      {/* Hexágono - bottom left */}
      <motion.div
        className="absolute w-60 h-60 border-2 border-foreground/20"
        style={{
          bottom: '15%',
          left: '15%',
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 22, repeat: Infinity, ease: 'linear' },
          scale: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' },
        }}
        whileHover={{
          scale: 1.25,
          rotate: 60,
        }}
      />

      {/* Rectángulo horizontal - bottom right */}
      <motion.div
        className="absolute w-96 h-48 border-2 border-foreground/20"
        style={{
          bottom: '10%',
          right: '10%',
        }}
        animate={{
          rotate: [0, 360],
          y: [0, -20, 0],
        }}
        transition={{
          rotate: { duration: 35, repeat: Infinity, ease: 'linear' },
          y: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
        }}
        whileHover={{
          scaleX: 1.1,
          borderColor: 'rgba(10, 10, 10, 0.4)',
        }}
      />

      {/* Líneas diagonales animadas */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, currentColor 0px, currentColor 2px, transparent 2px, transparent 60px)',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '60px 60px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Puntos de luz que siguen el mouse */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-foreground/5 blur-3xl pointer-events-none"
        style={{
          left: '50%',
          top: '50%',
          x: smoothX,
          y: smoothY,
        }}
      />
    </div>
  );
}
