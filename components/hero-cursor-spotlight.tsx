'use client';

import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';
import { useIsDesktop } from '@/hooks/use-is-desktop';

interface HeroCursorSpotlightProps {
  targetId: string;
}

/**
 * Cursor custom minimal sobre el Hero: punto negro sutil con anillo fino.
 * Oculta el cursor nativo en desktop y sigue el mouse con spring suave.
 */
export function HeroCursorSpotlight({ targetId }: HeroCursorSpotlightProps) {
  const isDesktop = useIsDesktop();
  const [isActive, setIsActive] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cursorX = useSpring(mouseX, { damping: 28, stiffness: 380, mass: 0.35 });
  const cursorY = useSpring(mouseY, { damping: 28, stiffness: 380, mass: 0.35 });

  useEffect(() => {
    if (!isDesktop) return;

    const target = document.getElementById(targetId);
    if (!target) return;

    target.style.cursor = 'none';

    const handleMove = (event: MouseEvent) => {
      const rect = target.getBoundingClientRect();
      mouseX.set(event.clientX - rect.left);
      mouseY.set(event.clientY - rect.top);
      setIsActive(true);
    };

    const handleLeave = () => setIsActive(false);

    target.addEventListener('mousemove', handleMove);
    target.addEventListener('mouseleave', handleLeave);

    return () => {
      target.style.cursor = '';
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
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute"
        style={{
          left: cursorX,
          top: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {/* Anillo exterior muy sutil */}
        <motion.div
          className="absolute rounded-full border border-foreground/15"
          style={{
            width: 28,
            height: 28,
            left: '50%',
            top: '50%',
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{ scale: isActive ? 1 : 0.6, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Punto negro central */}
        <div className="absolute w-1.5 h-1.5 rounded-full bg-foreground left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      </motion.div>
    </motion.div>
  );
}
