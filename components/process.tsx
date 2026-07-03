'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';

export function Process() {
  const t = useTranslations('process');
  
  const steps = t.raw('steps') as Array<{
    number: string;
    title: string;
    description: string;
  }>;

  // Layouts asimétricos para cada step (editorial style)
  const layouts = [
    // Layout 1 - Número arriba izquierda, contenido abajo derecha
    {
      containerClass: 'lg:col-span-5 lg:row-span-1',
      numberClass: 'absolute -top-16 lg:-top-24 -left-4 lg:-left-8 text-[120px] lg:text-[180px] xl:text-[220px]',
      contentClass: 'pt-24 lg:pt-32 pl-8 lg:pl-16',
      titleClass: 'text-3xl lg:text-4xl xl:text-5xl mb-6',
    },
    // Layout 2 - Número derecha, contenido izquierda
    {
      containerClass: 'lg:col-span-4 lg:row-span-1 lg:col-start-7',
      numberClass: 'absolute -top-12 lg:-top-20 -right-8 lg:-right-12 text-[100px] lg:text-[160px] xl:text-[200px]',
      contentClass: 'pt-20 lg:pt-28 pr-12 lg:pr-20',
      titleClass: 'text-3xl lg:text-4xl xl:text-5xl mb-6',
    },
    // Layout 3 - Número centro, contenido debajo
    {
      containerClass: 'lg:col-span-6 lg:row-span-1 lg:col-start-3',
      numberClass: 'absolute -top-20 lg:-top-32 left-1/2 -translate-x-1/2 text-[140px] lg:text-[200px] xl:text-[260px]',
      contentClass: 'pt-28 lg:pt-40 px-4 lg:px-12 text-center',
      titleClass: 'text-3xl lg:text-4xl xl:text-5xl mb-6',
    },
  ];

  return (
    <section id="process" className="py-32 lg:py-48 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute top-1/4 left-0 w-full h-px bg-foreground" />
        <div className="absolute top-2/4 left-0 w-full h-px bg-foreground" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-foreground" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-8 relative z-10">
        {/* Header editorial style */}
        <motion.div
          className="mb-24 lg:mb-40"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
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
                className="text-[clamp(2.5rem,10vw,4rem)] lg:text-[clamp(4rem,8vw,7rem)] font-black tracking-tighter leading-[0.9]"
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
            </div>

            {/* Decorative element */}
            <motion.div
              className="hidden lg:flex items-center gap-3"
              animate={{
                x: [0, 8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="text-8xl font-black text-foreground/5">03</div>
              <div className="flex flex-col gap-1">
                <div className="w-1 h-12 bg-foreground/20" />
                <div className="w-1 h-6 bg-foreground/40" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Steps con layouts asimétricos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-32 lg:gap-y-48 relative">
          {steps.map((step, index) => {
            const layout = layouts[index % layouts.length];
            
            return (
              <motion.div
                key={index}
                className={`relative ${layout.containerClass}`}
                initial={{ opacity: 0, y: 80, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 1,
                  delay: index * 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -12,
                  transition: { duration: 0.4 },
                }}
              >
                {/* Background subtle on hover */}
                <motion.div
                  className="absolute inset-0 -z-10 rounded-2xl"
                  initial={{ opacity: 0 }}
                  whileHover={{
                    opacity: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.015)',
                    scale: 1.05,
                    transition: { duration: 0.4 },
                  }}
                />

                {/* Número gigante con efecto editorial */}
                <motion.div
                  className={`${layout.numberClass} font-black text-foreground/[0.03] select-none cursor-pointer z-0`}
                  whileHover={{
                    scale: 1.05,
                    color: 'rgba(0, 0, 0, 0.08)',
                    WebkitTextStroke: '3px rgba(0, 0, 0, 0.02)',
                    transition: { duration: 0.3 },
                  }}
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
                  {step.number}
                </motion.div>

                {/* Contenido */}
                <div className={`${layout.contentClass} relative z-10`}>
                  {/* Línea decorativa superior */}
                  <motion.div
                    className="w-16 lg:w-24 h-0.5 bg-foreground mb-8 lg:mb-12"
                    initial={{ width: 0 }}
                    whileInView={{ width: index % 2 === 0 ? '6rem' : '8rem' }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      delay: index * 0.2 + 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />

                  {/* Título grande editorial */}
                  <motion.h3
                    className={`${layout.titleClass} font-bold tracking-tight leading-[1.1] mb-6 lg:mb-8 cursor-pointer group`}
                    whileHover={{
                      x: index % 2 === 0 ? 12 : -12,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <span className="inline-block group-hover:text-foreground/80 transition-colors">
                      {step.title}
                    </span>
                  </motion.h3>

                  {/* Descripción */}
                  <motion.p
                    className="text-base lg:text-lg text-foreground/60 leading-relaxed max-w-xl"
                    animate={{
                      opacity: [0.6, 0.85, 0.6],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.8,
                    }}
                  >
                    {step.description}
                  </motion.p>

                  {/* Mini código de barras decorativo */}
                  <motion.div
                    className="flex gap-0.5 mt-8 lg:mt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.8 }}
                  >
                    {[18, 24, 16, 28, 20, 26, 14, 22].map((height, i) => (
                      <motion.div
                        key={i}
                        className="w-0.5 bg-foreground/20"
                        style={{
                          height: `${height}px`,
                        }}
                        animate={{
                          scaleY: [1, 1.2, 1],
                          opacity: [0.2, 0.4, 0.2],
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

                {/* Número pequeño en esquina (label) */}
                <motion.div
                  className="absolute top-0 right-0 text-xs font-mono text-foreground/20 tracking-wider"
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {`0${index + 1}`}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer decorativo */}
        <motion.div
          className="mt-32 lg:mt-48 flex items-center justify-center gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="w-24 h-px bg-foreground/20"
            animate={{
              scaleX: [1, 1.5, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <span className="text-xs uppercase tracking-[0.2em] text-foreground/30">
            From Concept to Launch
          </span>
          <motion.div
            className="w-24 h-px bg-foreground/20"
            animate={{
              scaleX: [1, 1.5, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.5,
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
