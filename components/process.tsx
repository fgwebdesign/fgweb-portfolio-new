'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';

export function Process() {
  const t = useTranslations('process');
  
  const steps = t.raw('steps') as Array<{
    number: string;
    title: string;
    description: string;
    details: string[];
  }>;

  // Layouts asimétricos para cada step (editorial style)
  // Números posicionados a la derecha del contenido
  const layouts = [
    // Layout 1 - Número a la derecha superior (01)
    {
      containerClass: 'lg:col-span-5 lg:row-span-1',
      numberClass: 'absolute -top-12 lg:-top-16 -right-8 lg:-right-20 xl:-right-32 text-[120px] lg:text-[180px] xl:text-[220px]',
      contentClass: 'pt-16 lg:pt-20 pr-24 lg:pr-32 xl:pr-48',
      titleClass: 'text-3xl lg:text-4xl xl:text-5xl mb-6',
    },
    // Layout 2 - Número centro-derecha (02)
    {
      containerClass: 'lg:col-span-4 lg:row-span-1 lg:col-start-7',
      numberClass: 'absolute top-8 lg:top-4 -right-4 lg:-right-12 xl:-right-20 text-[100px] lg:text-[160px] xl:text-[200px]',
      contentClass: 'pt-20 lg:pt-28 pr-16 lg:pr-24 xl:pr-32',
      titleClass: 'text-3xl lg:text-4xl xl:text-5xl mb-6',
    },
    // Layout 3 - Número derecha abajo (03)
    {
      containerClass: 'lg:col-span-6 lg:row-span-1 lg:col-start-4',
      numberClass: 'absolute top-20 lg:top-32 -right-4 lg:-right-16 xl:-right-24 text-[140px] lg:text-[200px] xl:text-[260px]',
      contentClass: 'pt-28 lg:pt-40 px-4 lg:px-12 pr-20 lg:pr-32 xl:pr-48',
      titleClass: 'text-3xl lg:text-4xl xl:text-5xl mb-6',
    },
  ];

  return (
    <section id="process" className="py-32 lg:py-48 bg-background relative overflow-hidden">
      {/* Background decorations - entran desde los lados */}
      <motion.div 
        className="absolute inset-0 opacity-[0.015]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.015 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute top-1/4 left-0 w-full h-px bg-foreground"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
        />
        <motion.div 
          className="absolute top-2/4 left-0 w-full h-px bg-foreground"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
        />
        <motion.div 
          className="absolute top-3/4 left-0 w-full h-px bg-foreground"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        />
      </motion.div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-8 relative z-10">
        {/* Header editorial style - entra desde arriba con blur */}
        <motion.div
          className="mb-24 lg:mb-40"
          initial={{ opacity: 0, y: -80, filter: 'blur(20px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              {/* Subtitle con línea - desde izquierda */}
              <motion.div
                className="flex items-center gap-4 mb-6"
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
              >
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: '4rem', opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <motion.div 
                    className="w-12 lg:w-16 h-px bg-foreground/30"
                    animate={{
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      opacity: {
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }
                    }}
                  />
                </motion.div>
                <p className="text-xs lg:text-sm uppercase tracking-[0.25em] text-foreground/40 font-medium">
                  {t('subtitle')}
                </p>
              </motion.div>
              
              {/* Title - desde izquierda con blur */}
              <motion.h2
                className="text-[clamp(2.5rem,10vw,4rem)] lg:text-[clamp(4rem,8vw,7rem)] font-black tracking-tighter leading-[0.9]"
                initial={{ opacity: 0, x: -100, filter: 'blur(15px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
              >
                <motion.span
                  className="inline-block"
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
                </motion.span>
              </motion.h2>
            </div>

            {/* Decorative element - desde derecha con rotación */}
            <motion.div
              className="hidden lg:flex items-center gap-3"
              initial={{ opacity: 0, x: 80, rotate: 90, scale: 0.5 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4, ease: 'backOut' }}
            >
              <motion.div 
                className="text-8xl font-black text-foreground/5"
                animate={{
                  x: [0, 8, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                03
              </motion.div>
              <div className="flex flex-col gap-1">
                <div className="w-1 h-12 bg-foreground/20" />
                <div className="w-1 h-6 bg-foreground/40" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Steps con layouts asimétricos - animaciones profesionales */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-32 lg:gap-y-48 relative">
          {steps.map((step, index) => {
            const layout = layouts[index % layouts.length];
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={index}
                className={`relative ${layout.containerClass}`}
                initial={{ opacity: 0, y: 100, scale: 0.9, rotateX: -20 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 1,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1] as const,
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

                {/* Número gigante - entra con rotación */}
                <motion.div
                  className={`${layout.numberClass} font-black text-foreground/[0.05] select-none cursor-pointer z-0`}
                  initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 1.2, 
                    delay: index * 0.15 + 0.2, 
                    ease: 'backOut' 
                  }}
                  whileHover={{
                    scale: 1.1,
                    color: 'rgba(0, 0, 0, 0.12)',
                    rotate: 3,
                    transition: { duration: 0.3 },
                  }}
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 2, 0],
                    }}
                    transition={{
                      y: {
                        duration: 6 + index,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.5,
                      }
                    }}
                  >
                    {step.number}
                  </motion.div>
                </motion.div>

                {/* Contenido */}
                <div className={`${layout.contentClass} relative z-10`}>
                  {/* Línea decorativa superior - crece desde el lado */}
                  <motion.div
                    className="w-16 lg:w-24 h-0.5 bg-foreground mb-8 lg:mb-12 cursor-pointer"
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ 
                      width: isEven ? '6rem' : '8rem',
                      opacity: 1
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.15 + 0.3,
                      ease: [0.22, 1, 0.36, 1] as const,
                    }}
                    whileHover={{
                      width: '12rem',
                      height: '3px',
                      backgroundColor: 'rgba(0, 0, 0, 1)',
                      transition: { duration: 0.3 },
                    }}
                  />

                  {/* Título - desde el lado con blur */}
                  <motion.h3
                    className={`${layout.titleClass} font-bold tracking-tight leading-[1.1] mb-6 lg:mb-8 cursor-pointer group`}
                    initial={{ 
                      opacity: 0, 
                      x: isEven ? -80 : 80, 
                      filter: 'blur(10px)' 
                    }}
                    whileInView={{ 
                      opacity: 1, 
                      x: 0, 
                      filter: 'blur(0px)' 
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.15 + 0.4,
                      ease: [0.22, 1, 0.36, 1] as const,
                    }}
                    whileHover={{
                      x: isEven ? 16 : -16,
                      scale: 1.02,
                      color: 'rgba(0, 0, 0, 0.95)',
                      transition: { duration: 0.3 },
                    }}
                  >
                    <span className="inline-block group-hover:text-foreground transition-colors">
                      {step.title}
                    </span>
                  </motion.h3>

                  {/* Descripción - desde abajo */}
                  <motion.p
                    className="text-base lg:text-lg text-foreground/60 leading-relaxed max-w-xl mb-8 cursor-pointer"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 0.6, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.15 + 0.5,
                      ease: [0.22, 1, 0.36, 1] as const,
                    }}
                    whileHover={{
                      opacity: 1,
                      x: 4,
                      color: 'rgba(0, 0, 0, 0.75)',
                      transition: { duration: 0.2 },
                    }}
                  >
                    <motion.span
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
                    </motion.span>
                  </motion.p>

                  {/* Lista de detalles - entran escalonados */}
                  <motion.ul
                    className="space-y-3 lg:space-y-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6,
                      delay: index * 0.15 + 0.6 
                    }}
                  >
                    {step.details.map((detail, detailIndex) => (
                      <motion.li
                        key={detailIndex}
                        className="flex items-start gap-3 group/item cursor-pointer"
                        initial={{ opacity: 0, x: -40, scale: 0.9 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.6,
                          delay: index * 0.15 + 0.7 + detailIndex * 0.1,
                          ease: [0.22, 1, 0.36, 1] as const,
                        }}
                        whileHover={{
                          x: 8,
                          transition: { duration: 0.2 },
                        }}
                      >
                        {/* Bullet decorativo - crece en hover */}
                        <motion.div
                          className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-foreground/30 rounded-full mt-2 shrink-0 group-hover/item:bg-foreground transition-colors"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 0.4, 
                            delay: index * 0.15 + 0.8 + detailIndex * 0.1,
                            ease: 'backOut' 
                          }}
                          whileHover={{
                            scale: 2,
                            backgroundColor: 'rgba(0, 0, 0, 1)',
                          }}
                        />
                        <span className="text-sm lg:text-base text-foreground/70 leading-relaxed group-hover/item:text-foreground transition-colors">
                          {detail}
                        </span>
                      </motion.li>
                    ))}
                  </motion.ul>

                  {/* Mini código de barras decorativo - entra con stagger */}
                  <motion.div
                    className="flex gap-0.5 mt-8 lg:mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6,
                      delay: index * 0.15 + 0.9,
                      ease: [0.22, 1, 0.36, 1] as const 
                    }}
                  >
                    {[18, 24, 16, 28, 20, 26, 14, 22].map((height, i) => (
                      <motion.div
                        key={i}
                        initial={{ scaleY: 0, opacity: 0 }}
                        whileInView={{ scaleY: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.15 + 1 + i * 0.05,
                          ease: 'backOut'
                        }}
                      >
                        <motion.div
                          className="w-0.5 bg-foreground/20"
                          style={{
                            height: `${height}px`,
                          }}
                          animate={{
                            scaleY: [1, 1.2, 1],
                            opacity: [0.2, 0.4, 0.2],
                          }}
                          transition={{
                            scaleY: {
                              duration: 2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                              delay: i * 0.1,
                            },
                            opacity: {
                              duration: 2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                              delay: i * 0.1,
                            }
                          }}
                        />
                      </motion.div>
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
            {t('footerTagline')}
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
