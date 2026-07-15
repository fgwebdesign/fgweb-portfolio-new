'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect, useCallback } from 'react';
import { SECTION_EASE, SECTION_VIEWPORT } from '@/lib/motion-viewport';

const AUTOPLAY_MS = 6500;
const CARD_SCROLL_PX = 420;

export function Services() {
  const t = useTranslations('services');
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionInView = useInView(sectionRef, { amount: 0.35 });
  
  const services = t.raw('list') as Array<{
    title: string;
    description: string;
    items: string[];
  }>;

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = CARD_SCROLL_PX;
      
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
  }, []);

  // Autoplay solo cuando la sección está visible
  useEffect(() => {
    if (!isAutoPlaying || !scrollContainerRef.current || !sectionInView) return;

    const interval = setInterval(() => {
      scroll('right');
    }, AUTOPLAY_MS);

    return () => clearInterval(interval);
  }, [isAutoPlaying, sectionInView, scroll]);

  // Pausar carrusel al scrollear verticalmente dentro de la sección
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onWheel = () => setIsAutoPlaying(false);
    el.addEventListener('wheel', onWheel, { passive: true });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const handleManualScroll = () => {
    setIsAutoPlaying(false);
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative min-h-[100svh] flex flex-col justify-center py-28 lg:py-36 bg-background overflow-hidden"
    >
      {/* Línea de transición desde Hero */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-foreground/20 to-transparent"
        initial={{ height: 0, opacity: 0 }}
        whileInView={{ height: 128, opacity: 1 }}
        viewport={SECTION_VIEWPORT}
        transition={{ duration: 0.8, ease: SECTION_EASE }}
      />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 w-full">
        {/* Header editorial */}
        <motion.div
          className="mb-16 lg:mb-24"
          initial={{ opacity: 0, y: -48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SECTION_VIEWPORT}
          transition={{ duration: 0.75, ease: SECTION_EASE }}
        >
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1">
              {/* Subtitle - desde izquierda */}
              <motion.p
                className="text-xs uppercase tracking-[0.2em] text-foreground/40 mb-4"
                initial={{ opacity: 0, x: -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={SECTION_VIEWPORT}
                transition={{ duration: 0.6, delay: 0.1, ease: SECTION_EASE }}
              >
                {t('subtitle')}
              </motion.p>

              <motion.h2
                className="text-[clamp(2rem,8vw,4.5rem)] font-bold leading-[0.9] tracking-tighter uppercase"
                initial={{ opacity: 0, x: -48 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={SECTION_VIEWPORT}
                transition={{ duration: 0.7, delay: 0.15, ease: SECTION_EASE }}
              >
                {t('title')}
              </motion.h2>
            </div>

            {/* Services count - desde derecha con escala */}
            <motion.div
              className="hidden lg:block text-right"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={SECTION_VIEWPORT}
              transition={{ duration: 0.6, delay: 0.2, ease: SECTION_EASE }}
            >
              <p className="text-xs uppercase tracking-[0.15em] text-foreground/60 mb-2">
                {t('servicesLabel')}
              </p>
              <p className="text-4xl font-bold leading-none">{services.length.toString().padStart(2, '0')}</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll container con flechas - Loop infinito */}
        <div className="relative lg:px-24 py-4 lg:py-8">
          <motion.button
            className="hidden lg:flex absolute -left-24 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center bg-foreground text-background transition-all duration-300"
            onClick={() => {
              setIsAutoPlaying(false);
              scroll('left');
            }}
            whileHover={{ scale: 1.1, x: -4 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={SECTION_VIEWPORT}
            transition={{ duration: 0.55, delay: 0.25, ease: SECTION_EASE }}
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

          <motion.button
            className="hidden lg:flex absolute -right-24 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center bg-foreground text-background transition-all duration-300"
            onClick={() => {
              setIsAutoPlaying(false);
              scroll('right');
            }}
            whileHover={{ scale: 1.1, x: 4 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={SECTION_VIEWPORT}
            transition={{ duration: 0.55, delay: 0.3, ease: SECTION_EASE }}
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

          <motion.div
            ref={scrollContainerRef}
            className="overflow-x-auto overflow-y-hidden pb-8 scrollbar-hide snap-x snap-mandatory scroll-smooth"
            onScroll={handleManualScroll}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={SECTION_VIEWPORT}
            transition={{ duration: 0.6, delay: 0.2, ease: SECTION_EASE }}
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
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ ...SECTION_VIEWPORT, amount: 0.35 }}
                  transition={{
                    duration: 0.55,
                    delay: Math.min(index * 0.08, 0.4),
                    ease: SECTION_EASE,
                  }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
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
                        {t('serviceNumberLabel')}{(index + 1).toString().padStart(2, '0')}
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
                        {t('includesLabel')}
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

          <motion.div
            className="flex items-center justify-center gap-4 mt-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={SECTION_VIEWPORT}
            transition={{ duration: 0.55, delay: 0.35, ease: SECTION_EASE }}
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
              {isAutoPlaying ? t('autoPlaying') : t('paused')} →
            </motion.p>
            <motion.button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-xs uppercase tracking-[0.15em] text-foreground/60 hover:text-foreground transition-colors px-3 py-1 border border-foreground/20 hover:border-foreground/60"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isAutoPlaying ? t('pause') : t('play')}
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 lg:mt-24 text-center"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SECTION_VIEWPORT}
          transition={{ duration: 0.65, delay: 0.2, ease: SECTION_EASE }}
        >
          <motion.p
            className="text-xs uppercase tracking-[0.2em] text-foreground/40 mb-6"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={SECTION_VIEWPORT}
            transition={{ duration: 0.5, delay: 0.25 }}
            whileHover={{
              letterSpacing: '0.25em',
              color: 'rgb(0, 0, 0)',
              transition: { duration: 0.3 }
            }}
          >
            {t('readyToStart')}
          </motion.p>
          <motion.a
            href="#contact"
            className="group inline-block px-12 py-5 bg-foreground text-background text-sm uppercase tracking-[0.15em] font-medium relative overflow-hidden"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={SECTION_VIEWPORT}
            transition={{ duration: 0.55, delay: 0.3, ease: SECTION_EASE }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 inline-block group-hover:tracking-[0.2em] transition-all duration-300">
              {t('getInTouch')}
            </span>
            <motion.div
              className="absolute inset-0 bg-background"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4 }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
              {t('getInTouch')}
            </span>
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
