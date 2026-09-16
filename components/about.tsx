'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { CountUp } from './count-up';

export function About() {
  const t = useTranslations('about');
  
  const stats = t.raw('stats') as Array<{
    value: string;
    suffix: string;
    label: string;
  }>;

  return (
    <section id="about" aria-labelledby="about-heading" className="py-24 lg:py-48 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute top-1/4 left-0 w-1/2 h-px bg-foreground" />
        <div className="absolute bottom-1/4 right-0 w-1/2 h-px bg-foreground" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-16 lg:mb-32 grid lg:grid-cols-[1fr_auto] lg:gap-16 xl:gap-24 items-end">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 lg:w-16 h-px bg-foreground/30" />
              <p className="text-xs lg:text-sm uppercase tracking-[0.25em] text-foreground/40 font-medium">
                {t('subtitle')}
              </p>
            </div>

            <h2
              id="about-heading"
              className="font-[family-name:var(--font-manrope)] text-[clamp(2.5rem,10vw,4rem)] lg:text-[clamp(4rem,8vw,7rem)] font-black tracking-tighter leading-[0.9] mb-8 lg:mb-16"
            >
              {t('title')}
            </h2>

            <motion.p
              className="text-lg lg:text-2xl xl:text-3xl text-foreground/60 leading-relaxed max-w-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {t('description')}
            </motion.p>
          </motion.div>

          {/* Retrato halftone */}
          <motion.div
            className="w-[10rem] sm:w-[12rem] lg:w-[13rem] xl:w-[15rem] shrink-0 mx-auto lg:mx-0 mt-8 lg:mt-0"
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="relative aspect-square border border-foreground/10 overflow-hidden group/photo"
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              style={{ perspective: 900 }}
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{ rotateY: 360 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- imagen dithered: pixelated evita el suavizado/moiré del optimizador */}
                <img
                  src="/felipe-halftone-portrait.png"
                  alt="Felipe Gutiérrez"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ imageRendering: 'pixelated' }}
                />
              </motion.div>
            </motion.div>
            <p className="mt-4 text-xs uppercase tracking-[0.15em] text-foreground/40 text-center lg:text-left">
              Felipe Gutiérrez — Montevideo, UY
            </p>
          </motion.div>
        </div>

        {/* Stats grid editorial */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative group overflow-hidden"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
            >
              {/* Background number */}
              <div className="absolute -top-12 sm:-top-16 lg:-top-12 left-0 text-[56px] sm:text-[88px] lg:text-[160px] font-black text-foreground/[0.02] select-none -z-10">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Line */}
              <motion.div
                className="w-12 lg:w-16 h-0.5 bg-foreground/20 mb-6 lg:mb-8 group-hover:bg-foreground/40 group-hover:w-24 transition-all duration-300"
                initial={{ width: 0 }}
                whileInView={{ width: '4rem' }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: index * 0.1 + 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />

              {/* Counter */}
              <div className="mb-4">
                <CountUp 
                  end={parseInt(stat.value)} 
                  suffix={stat.suffix}
                  duration={2}
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold"
                />
              </div>

              {/* Label */}
              <p className="text-xs sm:text-sm lg:text-base text-foreground/50 uppercase tracking-[0.15em] group-hover:text-foreground/70 transition-colors">
                {stat.label}
              </p>

              {/* Mini barcode */}
              <motion.div
                className="flex gap-0.5 mt-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.8 }}
              >
                {[12, 18, 14, 20, 16, 22].map((height, i) => (
                  <div
                    key={i}
                    className="w-0.5 bg-foreground/20"
                    style={{ height: `${height}px` }}
                  />
                ))}
              </motion.div>

              {/* Corner accent */}
              <motion.div
                className="absolute top-0 right-0 w-12 h-12 border-t border-r border-foreground/0 group-hover:border-foreground/10 transition-colors"
                initial={{ scale: 0, rotate: 45 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1 + 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
