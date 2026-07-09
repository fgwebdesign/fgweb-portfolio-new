'use client';

import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';
import { useIsDesktop } from '@/hooks/use-is-desktop';

interface HeroCursorSpotlightProps {
  /** id del contenedor sobre el que se rastrea el cursor. */
  targetId: string;
}

// Textura de grano sutil (feTurbulence) para que el halo no se vea como un blob plano.
const GRAIN_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * Retícula tipo "viewfinder" que sigue al cursor sobre el Hero, con:
 * - Halo de profundidad en capas (blur + grayscale + grano) que oscurece el fondo blanco.
 * - Anillo punteado rotando lentamente + marcas tipo mira de cámara.
 * - Lectura de coordenadas en vivo, estilo herramienta de diseño/dev.
 * Todo con pointer-events-none y z-index bajo, para no interferir con el contenido.
 */
export function HeroCursorSpotlight({ targetId }: HeroCursorSpotlightProps) {
  const isDesktop = useIsDesktop();
  const [isActive, setIsActive] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring rápido para la retícula (se siente "pegada" al cursor).
  const reticleX = useSpring(mouseX, { damping: 30, stiffness: 320, mass: 0.4 });
  const reticleY = useSpring(mouseY, { damping: 30, stiffness: 320, mass: 0.4 });

  // Spring más lento para el halo: da sensación de profundidad/parallax.
  const haloX = useSpring(mouseX, { damping: 26, stiffness: 80, mass: 0.9 });
  const haloY = useSpring(mouseY, { damping: 26, stiffness: 80, mass: 0.9 });

  useEffect(() => {
    if (!isDesktop) return;

    const target = document.getElementById(targetId);
    if (!target) return;

    const handleMove = (event: MouseEvent) => {
      const rect = target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
      setCoords({ x: Math.round(x), y: Math.round(y) });
      setIsActive(true);
    };

    const handleLeave = () => setIsActive(false);

    target.addEventListener('mousemove', handleMove);
    target.addEventListener('mouseleave', handleLeave);

    return () => {
      target.removeEventListener('mousemove', handleMove);
      target.removeEventListener('mouseleave', handleLeave);
    };
  }, [isDesktop, targetId, mouseX, mouseY]);

  if (!isDesktop) return null;

  return (
    <motion.div
      aria-hidden
      className="absolute inset-0 z-[5] overflow-hidden pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Halo exterior amplio: desatura/oscurece con blur, con parallax leve */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 820,
          height: 820,
          left: haloX,
          top: haloY,
          translateX: '-50%',
          translateY: '-50%',
          backdropFilter: 'blur(60px) grayscale(60%) brightness(0.96) contrast(1.03)',
          WebkitBackdropFilter: 'blur(60px) grayscale(60%) brightness(0.96) contrast(1.03)',
          maskImage:
            'radial-gradient(circle, black 0%, black 18%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.15) 75%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(circle, black 0%, black 18%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.15) 75%, transparent 100%)',
        }}
      />

      {/* Núcleo medio: tinte gris más denso cerca del cursor */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 420,
          height: 420,
          left: haloX,
          top: haloY,
          translateX: '-50%',
          translateY: '-50%',
          background:
            'radial-gradient(circle, rgba(15,15,15,0.09) 0%, rgba(15,15,15,0.04) 50%, transparent 80%)',
          backdropFilter: 'blur(24px) grayscale(80%) brightness(0.92)',
          WebkitBackdropFilter: 'blur(24px) grayscale(80%) brightness(0.92)',
          maskImage: 'radial-gradient(circle, black 0%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle, black 0%, black 40%, transparent 100%)',
        }}
      />

      {/* Grano sutil dentro del halo, para que no se vea como un blob liso */}
      <motion.div
        className="absolute rounded-full mix-blend-overlay"
        style={{
          width: 620,
          height: 620,
          left: haloX,
          top: haloY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundImage: GRAIN_BG,
          opacity: 0.12,
          maskImage: 'radial-gradient(circle, black 0%, black 30%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(circle, black 0%, black 30%, transparent 90%)',
        }}
      />

      {/* Retícula tipo mira de cámara / herramienta de diseño */}
      <motion.div
        className="absolute"
        style={{
          left: reticleX,
          top: reticleY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {/* Anillo punteado exterior, rotación lenta continua */}
        <motion.svg
          width="96"
          height="96"
          viewBox="0 0 96 96"
          className="absolute -translate-x-1/2 -translate-y-1/2 text-foreground/25"
          style={{ left: '50%', top: '50%' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        >
          <circle
            cx="48"
            cy="48"
            r="42"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2 6"
          />
        </motion.svg>

        {/* Anillo interior fino + marcas tipo viewfinder */}
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          className="absolute -translate-x-1/2 -translate-y-1/2 text-foreground/40"
          style={{ left: '50%', top: '50%' }}
        >
          <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
          {/* Marcas N/S/E/O */}
          <line x1="32" y1="2" x2="32" y2="10" stroke="currentColor" strokeWidth="1.5" />
          <line x1="32" y1="54" x2="32" y2="62" stroke="currentColor" strokeWidth="1.5" />
          <line x1="2" y1="32" x2="10" y2="32" stroke="currentColor" strokeWidth="1.5" />
          <line x1="54" y1="32" x2="62" y2="32" stroke="currentColor" strokeWidth="1.5" />
        </svg>

        {/* Punto central */}
        <motion.div
          className="absolute w-1 h-1 rounded-full bg-foreground/70 -translate-x-1/2 -translate-y-1/2"
          style={{ left: '50%', top: '50%' }}
          animate={{ scale: [1, 1.6, 1], opacity: [0.7, 0.3, 0.7] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Lectura de coordenadas, estilo herramienta de dev/diseño */}
        <motion.div
          className="absolute left-8 top-8 whitespace-nowrap font-mono text-[10px] tracking-[0.1em] text-foreground/35"
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: isActive ? 1 : 0, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          X:{String(coords.x).padStart(4, '0')} Y:{String(coords.y).padStart(4, '0')}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
