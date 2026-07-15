'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface DomainTypewriterProps {
  text: string;
  /** ms por carácter — más alto = más lento */
  speed?: number;
  startDelay?: number;
  onComplete?: () => void;
  className?: string;
}

export function DomainTypewriter({
  text,
  speed = 95,
  startDelay = 400,
  onComplete,
  className = '',
}: DomainTypewriterProps) {
  const reducedMotion = useReducedMotion();
  const [displayed, setDisplayed] = useState(reducedMotion ? text : '');
  const [isComplete, setIsComplete] = useState(!!reducedMotion);
  const [cursorVisible, setCursorVisible] = useState(true);

  const complete = useCallback(() => {
    setIsComplete(true);
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    if (reducedMotion) {
      onComplete?.();
      return;
    }

    let index = 0;
    let tickTimeout: ReturnType<typeof setTimeout> | undefined;

    const typingStart = setTimeout(() => {
      const typeNext = () => {
        if (index >= text.length) {
          complete();
          return;
        }

        const char = text[index];
        index += 1;
        setDisplayed(text.slice(0, index));

        const delay = char === '.' ? speed * 6 : speed;
        tickTimeout = setTimeout(typeNext, delay);
      };

      typeNext();
    }, startDelay);

    return () => {
      clearTimeout(typingStart);
      if (tickTimeout) clearTimeout(tickTimeout);
    };
  }, [text, speed, startDelay, reducedMotion, complete, onComplete]);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(
      () => setCursorVisible((v) => !v),
      isComplete ? 560 : 480,
    );
    return () => clearInterval(interval);
  }, [isComplete, reducedMotion]);

  return (
    <span className={`inline-flex items-baseline text-foreground ${className}`}>
      <span aria-live="polite">{displayed}</span>
      <motion.span
        className="inline-block w-[3px] lg:w-1 h-[0.85em] bg-foreground ml-0.5 align-middle rounded-[1px]"
        animate={{ opacity: cursorVisible ? 1 : 0 }}
        transition={{ duration: 0.08 }}
        aria-hidden
      />
    </span>
  );
}
