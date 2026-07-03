'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';

export function Skills() {
  const t = useTranslations('skills');
  
  const categories = t.raw('categories') as Array<{
    name: string;
    items: string[];
  }>;

  // Layouts dinámicos para cada categoría
  const categoryLayouts = [
    {
      gridClass: 'lg:col-span-7',
      titleSize: 'text-5xl lg:text-7xl xl:text-8xl',
      itemSize: 'text-base lg:text-lg',
      numberPosition: 'top-0 left-0',
      numberSize: 'text-[200px] lg:text-[280px]',
    },
    {
      gridClass: 'lg:col-span-5 lg:col-start-8',
      titleSize: 'text-4xl lg:text-6xl xl:text-7xl',
      itemSize: 'text-sm lg:text-base',
      numberPosition: 'top-0 right-0',
      numberSize: 'text-[180px] lg:text-[240px]',
    },
    {
      gridClass: 'lg:col-span-6 lg:col-start-4',
      titleSize: 'text-4xl lg:text-6xl xl:text-7xl',
      itemSize: 'text-base lg:text-lg',
      numberPosition: 'top-0 left-1/2 -translate-x-1/2',
      numberSize: 'text-[160px] lg:text-[220px]',
    },
    {
      gridClass: 'lg:col-span-8 lg:col-start-3',
      titleSize: 'text-5xl lg:text-7xl xl:text-8xl',
      itemSize: 'text-base lg:text-lg',
      numberPosition: 'top-0 right-0',
      numberSize: 'text-[200px] lg:text-[260px]',
    },
  ];

  return (
    <section id="skills" className="py-32 lg:py-48 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute top-1/3 left-0 w-full h-px bg-foreground" />
        <div className="absolute top-2/3 left-0 w-full h-px bg-foreground" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-8 relative z-10">
        {/* Header editorial */}
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
            </div>

            {/* Decorative count */}
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
              <div className="text-8xl font-black text-foreground/5">
                {categories.reduce((acc, cat) => acc + cat.items.length, 0)}
              </div>
              <div className="flex flex-col gap-1">
                <div className="w-1 h-12 bg-foreground/20" />
                <div className="w-1 h-6 bg-foreground/40" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Categories con layouts asimétricos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-32 lg:gap-y-48 relative">
          {categories.map((category, categoryIndex) => {
            const layout = categoryLayouts[categoryIndex % categoryLayouts.length];
            
            return (
              <motion.div
                key={categoryIndex}
                className={`relative ${layout.gridClass}`}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 1,
                  delay: categoryIndex * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Número gigante de fondo */}
                <motion.div
                  className={`absolute ${layout.numberPosition} ${layout.numberSize} font-black text-foreground/[0.02] select-none z-0`}
                  animate={{
                    y: [0, -12, 0],
                    rotate: [0, 3, 0],
                  }}
                  transition={{
                    duration: 8 + categoryIndex,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: categoryIndex * 0.5,
                  }}
                >
                  {String(categoryIndex + 1).padStart(2, '0')}
                </motion.div>

                <div className="relative z-10 space-y-8 lg:space-y-12">
                  {/* Línea decorativa */}
                  <motion.div
                    className="w-24 lg:w-32 h-0.5 bg-foreground"
                    initial={{ width: 0 }}
                    whileInView={{ width: categoryIndex % 2 === 0 ? '6rem' : '8rem' }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      delay: categoryIndex * 0.15 + 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />

                  {/* Título de categoría */}
                  <motion.h3
                    className={`${layout.titleSize} font-bold tracking-tight leading-[0.95] cursor-pointer group`}
                    whileHover={{
                      x: categoryIndex % 2 === 0 ? 12 : -12,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <span className="inline-block group-hover:text-foreground/80 transition-colors">
                      {category.name}
                    </span>
                  </motion.h3>

                  {/* Skills grid */}
                  <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:gap-4"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: categoryIndex * 0.15 + 0.8,
                        },
                      },
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {category.items.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        className="group relative"
                        variants={{
                          hidden: { opacity: 0, y: 20, scale: 0.9 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: {
                              duration: 0.5,
                              ease: [0.22, 1, 0.36, 1],
                            },
                          },
                        }}
                        whileHover={{
                          scale: 1.05,
                          y: -4,
                          transition: { duration: 0.2 },
                        }}
                      >
                        {/* Skill card */}
                        <div className="relative px-4 py-3 lg:px-5 lg:py-4 border border-foreground/10 bg-background hover:border-foreground/30 transition-all duration-300 cursor-pointer overflow-hidden group">
                          {/* Background hover effect */}
                          <motion.div
                            className="absolute inset-0 bg-foreground/[0.02]"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.3 }}
                            style={{ originX: 0 }}
                          />
                          
                          <span className={`relative z-10 ${layout.itemSize} font-medium text-foreground/70 group-hover:text-foreground transition-colors`}>
                            {item}
                          </span>

                          {/* Corner accent */}
                          <motion.div
                            className="absolute top-0 right-0 w-2 h-2 bg-foreground/0 group-hover:bg-foreground/20 transition-colors"
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Mini código de barras */}
                  <motion.div
                    className="flex gap-0.5 mt-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.15 + 1 }}
                  >
                    {[14, 20, 16, 24, 18, 22, 15, 19].map((height, i) => (
                      <motion.div
                        key={i}
                        className="w-0.5 bg-foreground/20"
                        style={{ height: `${height}px` }}
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
