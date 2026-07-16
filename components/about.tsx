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
        <motion.div
          className="mb-16 lg:mb-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="flex items-center gap-4 mb-6"
            animate={{
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="w-12 lg:w-16 h-px bg-foreground/30" />
            <p className="text-xs lg:text-sm uppercase tracking-[0.25em] text-foreground/40 font-medium">
              {t('subtitle')}
            </p>
          </motion.div>
          
          <motion.h2
            id="about-heading"
            className="font-[family-name:var(--font-manrope)] text-[clamp(2.5rem,10vw,4rem)] lg:text-[clamp(4rem,8vw,7rem)] font-black tracking-tighter leading-[0.9] mb-8 lg:mb-16"
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {t('title')}
          </motion.h2>

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
              <motion.div
                className="absolute -top-4 lg:-top-12 left-0 text-[72px] sm:text-[96px] lg:text-[160px] font-black text-foreground/[0.02] select-none -z-10"
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 2, 0],
                }}
                transition={{
                  duration: 5 + index,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.3,
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </motion.div>

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
              <motion.p
                className="text-xs sm:text-sm lg:text-base text-foreground/50 uppercase tracking-[0.15em] group-hover:text-foreground/70 transition-colors"
                animate={{
                  x: [0, 4, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.5,
                }}
              >
                {stat.label}
              </motion.p>

              {/* Mini barcode */}
              <motion.div
                className="flex gap-0.5 mt-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.8 }}
              >
                {[12, 18, 14, 20, 16, 22].map((height, i) => (
                  <motion.div
                    key={i}
                    className="w-0.5 bg-foreground/15"
                    style={{ height: `${height}px` }}
                    animate={{
                      scaleY: [1, 1.3, 1],
                      opacity: [0.15, 0.3, 0.15],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.1,
                    }}
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
