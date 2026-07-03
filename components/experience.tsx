'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';

export function Experience() {
  const t = useTranslations('experience');
  const [showAll, setShowAll] = useState(false);
  
  const jobs = t.raw('jobs') as Array<{
    company: string;
    role: string;
    period: string;
    location: string;
    description: string;
  }>;

  // Mostrar solo los primeros 2 trabajos por defecto
  const displayedJobs = showAll ? jobs : jobs.slice(0, 2);
  const hasMore = jobs.length > 2;

  return (
    <section id="experience" className="py-32 lg:py-48 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute top-1/3 right-0 w-1/2 h-px bg-foreground" />
        <div className="absolute bottom-1/3 left-0 w-1/2 h-px bg-foreground" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-24 lg:mb-32"
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
            className="font-[family-name:var(--font-manrope)] text-[clamp(2.5rem,10vw,4rem)] lg:text-[clamp(4rem,8vw,7rem)] font-black tracking-tighter leading-[0.9]"
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
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-foreground/10 hidden lg:block" />

          <div className="space-y-16 lg:space-y-24">
            {displayedJobs.map((job, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  x: 8,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-8 w-3 h-3 bg-foreground rounded-full hidden lg:block -translate-x-1/2 group-hover:scale-150 transition-transform" />

                <div className="lg:pl-16">
                  {/* Background number */}
                  <motion.div
                    className="absolute -top-8 lg:-top-12 right-0 text-[120px] lg:text-[180px] font-black text-foreground/[0.02] select-none -z-10"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 2, 0],
                    }}
                    transition={{
                      duration: 6 + index,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.5,
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </motion.div>

                  {/* Content */}
                  <div className="border border-foreground/10 p-8 lg:p-12 group-hover:border-foreground/30 transition-colors bg-background">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
                      <div className="flex-1">
                        <motion.h3
                          className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 group-hover:text-foreground/80 transition-colors"
                          whileHover={{ x: 4 }}
                        >
                          {job.role}
                        </motion.h3>
                        <p className="text-xl lg:text-2xl text-foreground/60 font-medium">
                          {job.company}
                        </p>
                      </div>

                      <div className="text-sm lg:text-base text-foreground/50 lg:text-right space-y-1">
                        <p className="font-medium">{job.period}</p>
                        <p>{job.location}</p>
                      </div>
                    </div>

                    {/* Line separator */}
                    <motion.div
                      className="w-24 h-0.5 bg-foreground/20 mb-8 group-hover:w-32 group-hover:bg-foreground/40 transition-all duration-300"
                      initial={{ width: 0 }}
                      whileInView={{ width: '6rem' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    />

                    {/* Description */}
                    <p className="text-base lg:text-lg text-foreground/60 leading-relaxed">
                      {job.description}
                    </p>

                    {/* Mini barcode */}
                    <motion.div
                      className="flex gap-0.5 mt-8"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.8 }}
                    >
                      {[16, 22, 18, 24, 20, 26, 17, 23].map((height, i) => (
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
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Botón Cargar más */}
        {hasMore && !showAll && (
          <motion.div
            className="mt-24 lg:mt-32 flex justify-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.button
              onClick={() => setShowAll(true)}
              className="group relative px-12 py-5 border-2 border-foreground text-foreground text-sm uppercase tracking-[0.2em] font-medium overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Cargar más</span>
              
              <motion.div
                className="absolute inset-0 bg-foreground"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
                style={{ originX: 0 }}
              />
              
              <motion.span
                className="absolute inset-0 flex items-center justify-center text-background text-sm uppercase tracking-[0.2em] font-medium"
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                Cargar más
              </motion.span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
