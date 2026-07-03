'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

export function Services() {
  const t = useTranslations('services');
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const services = t.raw('list') as Array<{
    title: string;
    description: string;
    items: string[];
  }>;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 420; // Ancho de card + gap
      
      if (direction === 'right') {
        // Si está al final, volver al inicio
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 50) {
          container.scrollTo({
            left: 0,
            behavior: 'smooth',
          });
        } else {
          container.scrollTo({
            left: container.scrollLeft + scrollAmount,
            behavior: 'smooth',
          });
        }
      } else {
        // Si está al inicio, ir al final
        if (container.scrollLeft <= 50) {
          container.scrollTo({
            left: container.scrollWidth - container.clientWidth,
            behavior: 'smooth',
          });
        } else {
          container.scrollTo({
            left: container.scrollLeft - scrollAmount,
            behavior: 'smooth',
          });
        }
      }
    }
  };

  // Autoplay con loop infinito
  useEffect(() => {
    if (!isAutoPlaying || !scrollContainerRef.current) return;

    const interval = setInterval(() => {
      scroll('right');
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleManualScroll = () => {
    setIsAutoPlaying(false);
  };

  return (
    <section id="services" className="relative py-32 lg:py-40 bg-background overflow-hidden">
      {/* Línea de transición desde Hero */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-foreground/20 to-transparent"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 128, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      <div ref={sectionRef} className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header editorial */}
        <motion.div
          className="mb-20 lg:mb-32"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1">
              <motion.p
                className="text-xs uppercase tracking-[0.2em] text-foreground/40 mb-4"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 }}
              >
                {t('subtitle')}
              </motion.p>
              <motion.h2
                className="text-[clamp(2rem,8vw,4.5rem)] font-bold leading-[0.9] tracking-tighter uppercase"
                initial={{ opacity: 0, x: -100 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3, type: 'spring', stiffness: 50 }}
              >
                {t('title')}
              </motion.h2>
            </div>

            <motion.div
              className="hidden lg:block text-right"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              <p className="text-xs uppercase tracking-[0.15em] text-foreground/60 mb-2">
                Services
              </p>
              <p className="text-4xl font-bold leading-none">{services.length.toString().padStart(2, '0')}</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll container con flechas - Loop infinito */}
        <div className="relative lg:px-24">
          {/* Flecha izquierda - Siempre activa, fuera del contenido */}
          <motion.button
            className="hidden lg:flex absolute -left-24 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center bg-foreground text-background transition-all duration-300"
            onClick={() => {
              setIsAutoPlaying(false);
              scroll('left');
            }}
            whileHover={{ scale: 1.15, x: -4 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            <motion.svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              whileHover={{ x: -2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </motion.svg>
          </motion.button>

          {/* Flecha derecha - Siempre activa, fuera del contenido */}
          <motion.button
            className="hidden lg:flex absolute -right-24 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center bg-foreground text-background transition-all duration-300"
            onClick={() => {
              setIsAutoPlaying(false);
              scroll('right');
            }}
            whileHover={{ scale: 1.15, x: 4 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            <motion.svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              whileHover={{ x: 2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </motion.svg>
          </motion.button>

          {/* Cards scrolleables */}
          <motion.div
            ref={scrollContainerRef}
            className="overflow-x-auto overflow-y-hidden pb-8 scrollbar-hide snap-x snap-mandatory"
            onScroll={handleManualScroll}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <div className="flex gap-6 lg:gap-8 min-w-max px-1">
              {services.map((service, index) => (
                <motion.article
                  key={index}
                  className="group relative border border-foreground/10 hover:border-foreground/40 transition-all duration-500 snap-start flex-shrink-0 w-[320px] lg:w-[400px] bg-background hover:bg-foreground/[0.02]"
                  initial={{ opacity: 0, y: 60 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: 0.7 + index * 0.1,
                    duration: 0.8,
                  }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  {/* Card content */}
                  <div className="p-8 lg:p-10">
                    {/* Top meta */}
                    <div className="flex items-start justify-between mb-8">
                      <motion.p
                        className="text-xs uppercase tracking-[0.15em] text-foreground/40"
                        whileHover={{ 
                          color: 'rgb(0, 0, 0)',
                          scale: 1.05,
                          transition: { duration: 0.2 }
                        }}
                      >
                        SERVICE #{(index + 1).toString().padStart(2, '0')}
                      </motion.p>
                      <div className="text-right">
                        <motion.p
                          className="text-5xl font-bold text-foreground/10 leading-none"
                          whileHover={{
                            scale: 1.1,
                            color: 'rgba(0, 0, 0, 0.2)',
                            transition: { duration: 0.3 }
                          }}
                        >
                          0{index + 1}
                        </motion.p>
                      </div>
                    </div>

                    {/* Título con animaciones dramáticas */}
                    <motion.h3
                      className="text-xl lg:text-2xl font-bold leading-[1] tracking-tight uppercase mb-6 cursor-pointer"
                      whileHover={{
                        x: 8,
                        scale: 1.02,
                        transition: { duration: 0.3 }
                      }}
                    >
                      {service.title.split(' ').map((word, wordIndex) => (
                        <motion.span
                          key={wordIndex}
                          className="inline-block mr-2"
                          whileHover={{
                            y: -4,
                            color: 'rgba(0, 0, 0, 1)',
                            transition: { duration: 0.2 }
                          }}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </motion.h3>

                    {/* Línea divisoria animada */}
                    <motion.div
                      className="h-[2px] bg-foreground mb-8 origin-left"
                      initial={{ width: 64 }}
                      whileHover={{ width: '100%', transition: { duration: 0.4 } }}
                    />

                    {/* Descripción con hover */}
                    <motion.p
                      className="text-sm leading-relaxed text-foreground/70 mb-10"
                      whileHover={{
                        color: 'rgba(0, 0, 0, 0.9)',
                        transition: { duration: 0.3 }
                      }}
                    >
                      {service.description}
                    </motion.p>

                    {/* Items */}
                    <div>
                      <motion.p
                        className="text-xs uppercase tracking-[0.15em] text-foreground/40 mb-4"
                        whileHover={{
                          letterSpacing: '0.2em',
                          color: 'rgb(0, 0, 0)',
                          transition: { duration: 0.3 }
                        }}
                      >
                        Includes
                      </motion.p>
                      <ul className="space-y-3">
                        {service.items.map((item, itemIndex) => (
                          <motion.li
                            key={itemIndex}
                            className="flex items-start gap-2 text-sm text-foreground/80"
                            whileHover={{
                              x: 8,
                              color: 'rgb(0, 0, 0)',
                              transition: { duration: 0.2 }
                            }}
                          >
                            <motion.span
                              className="text-foreground/40 mt-0.5"
                              whileHover={{
                                scale: 1.5,
                                rotate: 90,
                                color: 'rgb(0, 0, 0)',
                                transition: { duration: 0.3 }
                              }}
                            >
                              →
                            </motion.span>
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Línea inferior que crece en hover */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-[3px] bg-foreground"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Borde brillante en hover */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ boxShadow: 'inset 0 0 0 0px rgba(0,0,0,0)' }}
                    whileHover={{
                      boxShadow: 'inset 0 0 0 2px rgba(0,0,0,0.2)',
                      transition: { duration: 0.3 }
                    }}
                  />
                </motion.article>
              ))}
            </div>
          </motion.div>

          {/* Indicador de autoplay */}
          <motion.div
            className="flex items-center justify-center gap-4 mt-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
          >
            <motion.p
              className="text-xs uppercase tracking-[0.15em] text-foreground/40"
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {isAutoPlaying ? 'Auto-playing' : 'Paused'} →
            </motion.p>
            <motion.button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-xs uppercase tracking-[0.15em] text-foreground/60 hover:text-foreground transition-colors px-3 py-1 border border-foreground/20 hover:border-foreground/60"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isAutoPlaying ? 'Pause' : 'Play'}
            </motion.button>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-20 lg:mt-28 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
        >
          <motion.p
            className="text-xs uppercase tracking-[0.2em] text-foreground/40 mb-6"
            whileHover={{
              letterSpacing: '0.25em',
              color: 'rgb(0, 0, 0)',
              transition: { duration: 0.3 }
            }}
          >
            Ready to Start?
          </motion.p>
          <motion.a
            href="#contact"
            className="inline-block px-12 py-5 bg-foreground text-background text-sm uppercase tracking-[0.15em] font-medium relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              className="relative z-10"
              whileHover={{ letterSpacing: '0.2em' }}
            >
              Get in Touch
            </motion.span>
            <motion.div
              className="absolute inset-0 bg-background"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4 }}
            />
            <motion.span
              className="absolute inset-0 flex items-center justify-center text-foreground"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              Get in Touch
            </motion.span>
          </motion.a>
        </motion.div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
