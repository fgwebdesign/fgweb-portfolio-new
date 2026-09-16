'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface TypewriterProps {
  words: string[];
  delay?: number;
}

const EASE = [0.22, 1, 0.36, 1] as const;
const SWAP_DURATION = 350;

/**
 * Rota frases con un fade + deslizamiento sutil — sin tipeo letra por letra.
 * Usa un solo <motion.span> persistente (nunca se desmonta) en vez de
 * AnimatePresence: montar/desmontar en cada cambio de palabra choca con
 * React Strict Mode en desarrollo y deja la animación trabada en el estado
 * inicial.
 */
export function Typewriter({ words, delay = 2200 }: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (words.length <= 1) return;

    const interval = setInterval(() => {
      setVisible(false);
      const swap = setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setVisible(true);
      }, SWAP_DURATION);
      return () => clearTimeout(swap);
    }, delay);

    return () => clearInterval(interval);
  }, [words.length, delay]);

  return (
    <span className="relative inline-grid">
      {/* Reserva el ancho del renglón con la frase más larga, invisible */}
      <span className="invisible col-start-1 row-start-1" aria-hidden>
        {words.reduce((a, b) => (a.length > b.length ? a : b), '')}
      </span>
      <motion.span
        className="col-start-1 row-start-1"
        animate={
          shouldReduceMotion
            ? { opacity: visible ? 1 : 0 }
            : { opacity: visible ? 1 : 0, y: visible ? 0 : -10 }
        }
        transition={{ duration: SWAP_DURATION / 1000, ease: EASE }}
      >
        {words[index]}
      </motion.span>
    </span>
  );
}
