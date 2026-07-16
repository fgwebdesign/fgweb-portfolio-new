'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView, useReducedMotion, type MotionValue } from 'motion/react';
import { useRef, useState, useEffect, useCallback } from 'react';
import {
  useSectionScrollProgress,
  useSegmentProgress,
  useRevealMotion,
  scrollItemRange,
} from '@/hooks/use-scroll-reveal';

const AUTOPLAY_MS = 6500;

function getCardScrollAmount(container: HTMLDivElement) {
  const firstCard = container.querySelector('article');
  if (!firstCard) return 340;

  const flexRow = firstCard.parentElement;
  const gap = flexRow
    ? parseFloat(getComputedStyle(flexRow).columnGap || getComputedStyle(flexRow).gap) || 16
    : 16;
  return firstCard.getBoundingClientRect().width + gap;
}

type ServiceItem = {
  title: string;
  description: string;
  items: string[];
};

function ServiceCard({
  service,
  index,
  total,
  sectionScroll,
  serviceNumberLabel,
  includesLabel,
}: {
  service: ServiceItem;
  index: number;
  total: number;
  sectionScroll: MotionValue<number>;
  serviceNumberLabel: string;
  includesLabel: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const itemRange = scrollItemRange(index, total, [0.1, 0.72]);
  const progress = useSegmentProgress(sectionScroll, itemRange);
  const motionStyle = useRevealMotion(progress, {
    y: 36,
    scale: 0.92,
    blur: 10,
    rotate: index % 2 === 0 ? -1.5 : 1.5,
  });

  const card = (
    <article className="group relative border border-foreground/10 hover:border-foreground/40 transition-all duration-500 snap-start flex-shrink-0 w-[calc(100vw-3rem)] max-w-[360px] lg:w-[400px] lg:max-w-none bg-background hover:bg-foreground/[0.02]">
      <div className="p-6 lg:p-10">
        <div className="flex items-start justify-between mb-6 lg:mb-8">
          <p className="text-xs uppercase tracking-[0.15em] text-foreground/40">
            {serviceNumberLabel}{(index + 1).toString().padStart(2, '0')}
          </p>
          <div className="text-right">
            <p className="text-4xl lg:text-5xl font-bold text-foreground/10 leading-none">
              0{index + 1}
            </p>
          </div>
        </div>

        <h3 className="text-lg lg:text-2xl font-bold leading-[1] tracking-tight uppercase mb-4 lg:mb-6">
          {service.title.split(' ').map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block mr-2">
              {word}
            </span>
          ))}
        </h3>

        <div className="h-[2px] w-16 bg-foreground mb-6 lg:mb-8 group-hover:w-full transition-all duration-400" />

        <p className="text-sm leading-relaxed text-foreground/70 mb-8 lg:mb-10">
          {service.description}
        </p>

        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-foreground/40 mb-4">
            {includesLabel}
          </p>
          <ul className="space-y-3">
            {service.items.map((item, itemIndex) => (
              <li key={itemIndex} className="flex items-start gap-2 text-sm text-foreground/80">
                <span className="text-foreground/40 mt-0.5">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-foreground group-hover:w-full transition-all duration-500" />
    </article>
  );

  if (shouldReduceMotion) {
    return card;
  }

  return (
    <motion.article
      style={{ ...motionStyle, transformPerspective: 1200 }}
      className="group relative border border-foreground/10 hover:border-foreground/40 transition-colors duration-500 snap-start flex-shrink-0 w-[calc(100vw-3rem)] max-w-[360px] lg:w-[400px] lg:max-w-none bg-background hover:bg-foreground/[0.02]"
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
    >
      <div className="p-6 lg:p-10">
        <div className="flex items-start justify-between mb-6 lg:mb-8">
          <motion.p
            className="text-xs uppercase tracking-[0.15em] text-foreground/40"
            whileHover={{ color: 'rgb(0, 0, 0)', scale: 1.05, transition: { duration: 0.2 } }}
          >
            {serviceNumberLabel}{(index + 1).toString().padStart(2, '0')}
          </motion.p>
          <div className="text-right">
            <motion.p
              className="text-4xl lg:text-5xl font-bold text-foreground/10 leading-none"
              whileHover={{ scale: 1.1, color: 'rgba(0, 0, 0, 0.2)', transition: { duration: 0.3 } }}
            >
              0{index + 1}
            </motion.p>
          </div>
        </div>

        <motion.h3
          className="text-lg lg:text-2xl font-bold leading-[1] tracking-tight uppercase mb-4 lg:mb-6 cursor-pointer"
          whileHover={{ x: 8, scale: 1.02, transition: { duration: 0.3 } }}
        >
          {service.title.split(' ').map((word, wordIndex) => (
            <motion.span
              key={wordIndex}
              className="inline-block mr-2"
              whileHover={{ y: -4, color: 'rgba(0, 0, 0, 1)', transition: { duration: 0.2 } }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h3>

        <motion.div
          className="h-[2px] bg-foreground mb-6 lg:mb-8 origin-left"
          initial={{ width: 64 }}
          whileHover={{ width: '100%', transition: { duration: 0.4 } }}
        />

        <motion.p
          className="text-sm leading-relaxed text-foreground/70 mb-8 lg:mb-10"
          whileHover={{ color: 'rgba(0, 0, 0, 0.9)', transition: { duration: 0.3 } }}
        >
          {service.description}
        </motion.p>

        <div>
          <motion.p
            className="text-xs uppercase tracking-[0.15em] text-foreground/40 mb-4"
            whileHover={{ letterSpacing: '0.2em', color: 'rgb(0, 0, 0)', transition: { duration: 0.3 } }}
          >
            {includesLabel}
          </motion.p>
          <ul className="space-y-3">
            {service.items.map((item, itemIndex) => (
              <motion.li
                key={itemIndex}
                className="flex items-start gap-2 text-sm text-foreground/80"
                whileHover={{ x: 8, color: 'rgb(0, 0, 0)', transition: { duration: 0.2 } }}
              >
                <motion.span
                  className="text-foreground/40 mt-0.5"
                  whileHover={{ scale: 1.5, rotate: 90, color: 'rgb(0, 0, 0)', transition: { duration: 0.3 } }}
                >
                  →
                </motion.span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 h-[3px] bg-foreground"
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.5 }}
      />
    </motion.article>
  );
}

export function Services() {
  const t = useTranslations('services');
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionInView = useInView(sectionRef, { amount: 0.35 });
  const sectionScroll = useSectionScrollProgress(sectionRef);

  const subtitleProgress = useSegmentProgress(sectionScroll, [0.02, 0.1]);
  const titleProgress = useSegmentProgress(sectionScroll, [0.04, 0.12]);
  const countProgress = useSegmentProgress(sectionScroll, [0.05, 0.12]);
  const carouselProgress = useSegmentProgress(sectionScroll, [0.08, 0.16]);
  const controlsProgress = useSegmentProgress(sectionScroll, [0.76, 0.88]);
  const ctaProgress = useSegmentProgress(sectionScroll, [0.82, 0.96]);

  const subtitleMotion = useRevealMotion(subtitleProgress, { x: -32, blur: 8 });
  const titleMotion = useRevealMotion(titleProgress, { x: -48, y: 16, blur: 12 });
  const countMotion = useRevealMotion(countProgress, { scale: 0.92, blur: 8 });
  const carouselMotion = useRevealMotion(carouselProgress, { y: 24, blur: 8 });
  const controlsMotion = useRevealMotion(controlsProgress, { y: 16, blur: 6 });
  const ctaMotion = useRevealMotion(ctaProgress, { y: 24, blur: 8 });
  const lineMotion = useRevealMotion(useSegmentProgress(sectionScroll, [0, 0.06]), { y: -24 });
  const arrowLeftMotion = useRevealMotion(useSegmentProgress(sectionScroll, [0.1, 0.15]), { x: -24, blur: 6 });
  const arrowRightMotion = useRevealMotion(useSegmentProgress(sectionScroll, [0.11, 0.16]), { x: 24, blur: 6 });
  
  const services = t.raw('list') as Array<{
    title: string;
    description: string;
    items: string[];
  }>;

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = getCardScrollAmount(container);
      
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
      className="relative min-h-[130svh] lg:min-h-[200svh] flex flex-col justify-center py-32 lg:py-48 bg-background overflow-hidden"
    >
      <div className="hidden lg:block h-24 shrink-0" aria-hidden />

      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-foreground/20 to-transparent"
        style={{ opacity: lineMotion.opacity, y: lineMotion.y }}
      />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 w-full">
        {/* Header editorial */}
        {shouldReduceMotion ? (
          <div className="mb-12 lg:mb-24">
            <div className="flex items-start justify-between mb-8">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.2em] text-foreground/40 mb-4">{t('subtitle')}</p>
                <h2 className="text-[clamp(2rem,8vw,4.5rem)] font-bold leading-[0.9] tracking-tighter uppercase">
                  {t('title')}
                </h2>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs uppercase tracking-[0.15em] text-foreground/60 mb-1 lg:mb-2">
                  {t('servicesLabel')}
                </p>
                <p className="text-2xl lg:text-4xl font-bold leading-none">
                  {services.length.toString().padStart(2, '0')}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-12 lg:mb-24">
            <div className="flex items-start justify-between mb-8">
              <div className="flex-1">
                <motion.p
                  className="text-xs uppercase tracking-[0.2em] text-foreground/40 mb-4"
                  style={subtitleMotion}
                >
                  {t('subtitle')}
                </motion.p>
                <motion.h2
                  className="text-[clamp(2rem,8vw,4.5rem)] font-bold leading-[0.9] tracking-tighter uppercase"
                  style={titleMotion}
                >
                  {t('title')}
                </motion.h2>
              </div>
              <motion.div className="text-right shrink-0" style={countMotion}>
                <p className="text-xs uppercase tracking-[0.15em] text-foreground/60 mb-1 lg:mb-2">
                  {t('servicesLabel')}
                </p>
                <p className="text-2xl lg:text-4xl font-bold leading-none">
                  {services.length.toString().padStart(2, '0')}
                </p>
              </motion.div>
            </div>
          </div>
        )}

        {/* Scroll container — full-bleed en mobile para snap limpio */}
        <div className="relative -mx-6 lg:mx-0 lg:px-24 py-4 lg:py-8">
          <motion.button
            className="hidden lg:flex absolute -left-24 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center bg-foreground text-background transition-all duration-300"
            onClick={() => {
              setIsAutoPlaying(false);
              scroll('left');
            }}
            style={arrowLeftMotion}
            whileHover={{ scale: 1.1, x: -4 }}
            whileTap={{ scale: 0.9 }}
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
            style={arrowRightMotion}
            whileHover={{ scale: 1.1, x: 4 }}
            whileTap={{ scale: 0.9 }}
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
            className="overflow-x-auto overflow-y-hidden pb-4 lg:pb-8 scrollbar-hide snap-x snap-mandatory scroll-smooth px-6 lg:px-1"
            onScroll={handleManualScroll}
            style={{
              ...carouselMotion,
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <div className="flex gap-4 lg:gap-8 min-w-max">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  service={service}
                  index={index}
                  total={services.length}
                  sectionScroll={sectionScroll}
                  serviceNumberLabel={t('serviceNumberLabel')}
                  includesLabel={t('includesLabel')}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 lg:mt-10 px-6 lg:px-0"
            style={controlsMotion}
          >
            <motion.p
              className="text-xs uppercase tracking-[0.15em] text-foreground/40 lg:hidden"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              {t('swipeHint')}
            </motion.p>
            <motion.p
              className="text-xs uppercase tracking-[0.15em] text-foreground/40 hidden lg:block"
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

        <motion.div className="mt-12 lg:mt-24 text-center" style={ctaMotion}>
          <motion.p
            className="text-xs uppercase tracking-[0.2em] text-foreground/40 mb-6"
            whileHover={{
              letterSpacing: '0.25em',
              color: 'rgb(0, 0, 0)',
              transition: { duration: 0.3 },
            }}
          >
            {t('readyToStart')}
          </motion.p>
          <motion.a
            href="#contact"
            className="group inline-block w-full sm:w-auto px-8 lg:px-12 py-4 lg:py-5 bg-foreground text-background text-sm uppercase tracking-[0.15em] font-medium relative overflow-hidden"
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

      <div className="hidden lg:block h-32 shrink-0" aria-hidden />

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
