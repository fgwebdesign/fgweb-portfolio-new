'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { getSkillIconConfig } from '@/data/skill-icons';

interface SkillTileProps {
  name: string;
}

export function SkillTile({ name }: SkillTileProps) {
  const config = getSkillIconConfig(name);
  const sources = config?.sources ?? [];
  const [sourceIndex, setSourceIndex] = useState(0);

  const currentSrc = sources[sourceIndex] ?? null;
  const failed = sourceIndex >= sources.length;
  const needsDarkBg = config?.dark;

  const handleError = () => {
    setSourceIndex((i) => i + 1);
  };

  return (
    <motion.div
      whileHover={{
        y: -8,
        rotateX: 8,
        rotateY: -6,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      }}
      className="group relative aspect-square h-full"
      style={{ transformStyle: 'preserve-3d', perspective: 800 }}
    >
      <div
        className="relative h-full flex flex-col items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl border border-foreground/10 bg-background transition-shadow duration-300 group-hover:border-foreground/25 group-hover:shadow-[0_16px_32px_rgba(10,10,10,0.1),0_4px_0_rgba(10,10,10,0.06)] shadow-[0_8px_24px_rgba(10,10,10,0.06),0_2px_0_rgba(10,10,10,0.04)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-x-0 top-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-foreground/[0.03] to-transparent pointer-events-none" />

        <div
          className={`relative w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-xl ${
            needsDarkBg ? 'bg-foreground/[0.06] p-2' : ''
          }`}
        >
          {currentSrc && !failed ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={currentSrc}
              src={currentSrc}
              alt=""
              className="w-full h-full object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
              onError={handleError}
            />
          ) : (
            <span className="text-lg lg:text-xl font-bold text-foreground/40 group-hover:text-foreground/70 transition-colors">
              {name.charAt(0)}
            </span>
          )}
        </div>

        <span className="text-[10px] lg:text-xs font-medium uppercase tracking-[0.08em] text-foreground/60 group-hover:text-foreground text-center leading-tight px-1">
          {name}
        </span>
      </div>
    </motion.div>
  );
}
