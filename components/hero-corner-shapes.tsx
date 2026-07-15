'use client';

import { motion } from 'motion/react';
import { HERO_SEQUENCE } from '@/data/hero-sequence';

type CornerShapesProps = {
  reduceMotion: boolean;
  enterDelay?: number;
  enterDuration?: number;
};

/** Cubo wireframe 3D — esquina superior derecha */
function WireCube({ reduceMotion }: { reduceMotion: boolean }) {
  const edge = 'absolute left-1/2 top-1/2 origin-center bg-gradient-to-r from-indigo-500/50 to-cyan-500/40 rounded-full';
  const s = 28; // half-edge px

  const edges: Array<{ w: number; h: number; transform: string }> = [
    // 4 vertical-ish
    { w: 2, h: s * 2, transform: `translate(-50%, -50%) translateZ(${s}px) rotateY(0deg)` },
    { w: 2, h: s * 2, transform: `translate(-50%, -50%) translateZ(-${s}px) rotateY(0deg)` },
    { w: 2, h: s * 2, transform: `translate(-50%, -50%) translateX(${s}px) rotateY(90deg)` },
    { w: 2, h: s * 2, transform: `translate(-50%, -50%) translateX(-${s}px) rotateY(90deg)` },
    // 4 horizontal top
    { w: s * 2, h: 2, transform: `translate(-50%, -50%) translateY(-${s}px) rotateX(90deg)` },
    { w: s * 2, h: 2, transform: `translate(-50%, -50%) translateY(${s}px) rotateX(90deg)` },
    // 4 depth connectors (simplified as shorter)
    { w: s * 2, h: 2, transform: `translate(-50%, -50%) translateZ(${s}px) translateY(-${s}px)` },
    { w: s * 2, h: 2, transform: `translate(-50%, -50%) translateZ(${s}px) translateY(${s}px)` },
    { w: s * 2, h: 2, transform: `translate(-50%, -50%) translateZ(-${s}px) translateY(-${s}px)` },
    { w: s * 2, h: 2, transform: `translate(-50%, -50%) translateZ(-${s}px) translateY(${s}px)` },
    { w: 2, h: s * 2, transform: `translate(-50%, -50%) translateZ(${s}px) translateX(-${s}px) rotateZ(90deg)` },
    { w: 2, h: s * 2, transform: `translate(-50%, -50%) translateZ(${s}px) translateX(${s}px) rotateZ(90deg)` },
  ];

  return (
    <div
      className="relative w-16 h-16 lg:w-[4.5rem] lg:h-[4.5rem]"
      style={{ perspective: '520px' }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: 'preserve-3d' }}
        animate={
          reduceMotion
            ? { rotateX: 18, rotateY: -28 }
            : {
                rotateX: [14, 22, 14],
                rotateY: [0, 360, 0],
                y: [0, -5, 0],
              }
        }
        transition={{
          rotateY: { duration: 28, repeat: Infinity, ease: 'linear' },
          rotateX: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
          y: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        {edges.map((e, i) => (
          <div
            key={i}
            className={edge}
            style={{
              width: e.w,
              height: e.h,
              transform: e.transform,
              opacity: 0.55,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

/** Anillo / toro 3D — esquina inferior izquierda */
function FloatingRing({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      className="relative w-20 h-20 lg:w-24 lg:h-24"
      style={{ perspective: '480px' }}
      animate={reduceMotion ? {} : { y: [0, 6, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: 'preserve-3d' }}
        animate={
          reduceMotion
            ? { rotateX: 62, rotateZ: -12 }
            : {
                rotateX: [58, 68, 58],
                rotateZ: [0, 360, 0],
              }
        }
        transition={{
          rotateZ: { duration: 32, repeat: Infinity, ease: 'linear' },
          rotateX: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        {[0, 1, 2].map((layer) => (
          <div
            key={layer}
            className="absolute inset-0 rounded-full border-2"
            style={{
              transform: `translateZ(${layer * 6 - 6}px)`,
              borderColor:
                layer === 0
                  ? 'rgba(219, 39, 119, 0.35)'
                  : layer === 1
                    ? 'rgba(13, 148, 136, 0.4)'
                    : 'rgba(124, 58, 237, 0.25)',
              boxShadow:
                layer === 1
                  ? '0 0 24px rgba(13, 148, 136, 0.15), inset 0 0 12px rgba(255,255,255,0.4)'
                  : undefined,
              background:
                layer === 1
                  ? 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.5), rgba(13,148,136,0.08) 45%, transparent 70%)'
                  : undefined,
            }}
          />
        ))}
        <div
          className="absolute inset-[30%] rounded-full blur-md"
          style={{
            background: 'radial-gradient(circle, rgba(219,39,119,0.25), transparent 70%)',
            transform: 'translateZ(4px)',
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export function HeroCornerShapes({
  reduceMotion,
  enterDelay = HERO_SEQUENCE.cornerShapes.enter,
  enterDuration = HERO_SEQUENCE.cornerShapes.duration,
}: CornerShapesProps) {
  return (
    <motion.div
      className="contents"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: enterDuration,
        delay: enterDelay,
        ease: HERO_SEQUENCE.ease,
      }}
    >
      {/* Top-right */}
      <div className="absolute top-[9%] right-[4%] lg:top-[11%] lg:right-[7%] pointer-events-none">
        <div
          className="absolute -inset-8 lg:-inset-12 rounded-full blur-3xl opacity-60"
          style={{
            background:
              'radial-gradient(circle, rgba(79,70,229,0.22), rgba(8,145,178,0.12) 50%, transparent 72%)',
          }}
          aria-hidden
        />
        <WireCube reduceMotion={reduceMotion} />
      </div>

      {/* Bottom-left */}
      <div className="absolute bottom-[11%] left-[3%] lg:bottom-[13%] lg:left-[6%] pointer-events-none">
        <div
          className="absolute -inset-10 lg:-inset-14 rounded-full blur-3xl opacity-55"
          style={{
            background:
              'radial-gradient(circle, rgba(219,39,119,0.18), rgba(13,148,136,0.14) 55%, transparent 75%)',
          }}
          aria-hidden
        />
        <FloatingRing reduceMotion={reduceMotion} />
      </div>
    </motion.div>
  );
}
