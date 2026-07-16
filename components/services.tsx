'use client';

import { useTranslations } from 'next-intl';
import {
  motion,
  useInView,
  useReducedMotion,
  type MotionValue,
} from 'motion/react';
import { useRef, useState, useEffect, useCallback } from 'react';
import {
  useSectionScrollProgress,
  useSegmentProgress,
  useRevealMotion,
  scrollItemRange,
} from '@/hooks/use-scroll-reveal';
import { useScrollToSection } from '@/hooks/use-scroll-to-section';
import { useIsDesktop } from '@/hooks/use-is-desktop';

const AUTOPLAY_MS = 6500;
const EASE = [0.22, 1, 0.36, 1] as const;

const CARD_SHELL_CLASS =
  'group relative h-full border border-foreground/10 hover:border-foreground/40 transition-colors duration-500 snap-start flex-shrink-0 w-[calc(100vw-3rem)] max-w-[300px] lg:w-full lg:max-w-none lg:flex-shrink bg-background hover:bg-foreground/[0.02]';

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

function ServiceCardContent({
  service,
  index,
  serviceNumberLabel,
  includesLabel,
}: {
  service: ServiceItem;
  index: number;
  serviceNumberLabel: string;
  includesLabel: string;
}) {
  return (
    <>
      <div className="p-5 lg:p-6">
        <div className="flex items-start justify-between mb-4 lg:mb-5">
          <p className="text-[10px] lg:text-xs uppercase tracking-[0.15em] text-foreground/40">
            {serviceNumberLabel}{(index + 1).toString().padStart(2, '0')}
          </p>
          <div className="text-right">
            <p className="text-3xl lg:text-4xl font-bold text-foreground/10 leading-none">
              0{index + 1}
            </p>
          </div>
        </div>

        <h3 className="text-base lg:text-lg font-bold leading-[1.05] tracking-tight uppercase mb-3 lg:mb-4">
          {service.title.split(' ').map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block mr-1.5">
              {word}
            </span>
          ))}
        </h3>

        <div className="h-[2px] w-12 bg-foreground mb-4 lg:mb-5 group-hover:w-full transition-all duration-400" />

        <p className="text-xs lg:text-sm leading-relaxed text-foreground/70 mb-5 lg:mb-6">
          {service.description}
        </p>

        <div>
          <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/40 mb-3">
            {includesLabel}
          </p>
          <ul className="space-y-2">
            {service.items.map((item, itemIndex) => (
              <li
                key={itemIndex}
                className="flex items-start gap-2 text-xs lg:text-sm text-foreground/80"
              >
                <span className="text-foreground/40 mt-0.5 shrink-0">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-foreground group-hover:w-full transition-all duration-500" />
    </>
  );
}

function ServiceCard({
  service,
  index,
  total,
  sectionScroll,
  serviceNumberLabel,
  includesLabel,
  scrollDriven,
  viewDriven,
}: {
  service: ServiceItem;
  index: number;
  total: number;
  sectionScroll: MotionValue<number>;
  serviceNumberLabel: string;
  includesLabel: string;
  scrollDriven: boolean;
  viewDriven: boolean;
}) {
  const itemRange = scrollItemRange(index, total, [0.1, 0.42]);
  const progress = useSegmentProgress(sectionScroll, itemRange);
  const scrollMotion = useRevealMotion(progress, {
    y: 32,
    scale: 0.93,
    blur: 0,
    rotate: index % 2 === 0 ? -1.5 : 1.5,
  });

  if (scrollDriven) {
    return (
      <motion.article
        style={{ ...scrollMotion, transformPerspective: 1200 }}
        className={CARD_SHELL_CLASS}
        whileHover={{ y: -4, transition: { duration: 0.25 } }}
      >
        <ServiceCardContent
          service={service}
          index={index}
          serviceNumberLabel={serviceNumberLabel}
          includesLabel={includesLabel}
        />
      </motion.article>
    );
  }

  if (viewDriven) {
    return (
      <motion.article
        className={CARD_SHELL_CLASS}
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ amount: 0.35, margin: '-48px' }}
        transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
        whileHover={{ y: -4, transition: { duration: 0.25 } }}
      >
        <ServiceCardContent
          service={service}
          index={index}
          serviceNumberLabel={serviceNumberLabel}
          includesLabel={includesLabel}
        />
      </motion.article>
    );
  }

  return (
    <motion.article className={CARD_SHELL_CLASS} whileHover={{ y: -4, transition: { duration: 0.25 } }}>
      <ServiceCardContent
        service={service}
        index={index}
        serviceNumberLabel={serviceNumberLabel}
        includesLabel={includesLabel}
      />
    </motion.article>
  );
}

export function Services() {
  const t = useTranslations('services');
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const scrollDriven = isDesktop && !shouldReduceMotion;
  const viewDriven = !isDesktop && !shouldReduceMotion;
  const { handleSectionClick } = useScrollToSection();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionInView = useInView(sectionRef, { amount: 0.35 });
  const sectionScroll = useSectionScrollProgress(sectionRef);

  const subtitleProgress = useSegmentProgress(sectionScroll, [0.02, 0.1]);
  const titleProgress = useSegmentProgress(sectionScroll, [0.04, 0.12]);
  const countProgress = useSegmentProgress(sectionScroll, [0.05, 0.12]);
  const controlsProgress = useSegmentProgress(sectionScroll, [0.72, 0.86]);
  const ctaProgress = useSegmentProgress(sectionScroll, [0.78, 0.94]);

  const subtitleMotion = useRevealMotion(subtitleProgress, { x: -32, blur: 6 });
  const titleMotion = useRevealMotion(titleProgress, { x: -48, y: 20, blur: 8 });
  const countMotion = useRevealMotion(countProgress, { x: 24, scale: 0.92, blur: 6 });
  const controlsMotion = useRevealMotion(controlsProgress, { y: 16, blur: 0 });
  const ctaMotion = useRevealMotion(ctaProgress, { y: 28, blur: 0 });
  const lineMotion = useRevealMotion(useSegmentProgress(sectionScroll, [0, 0.06]), { y: -24, blur: 0 });

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
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 50) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollTo({
            left: container.scrollLeft + scrollAmount,
            behavior: 'smooth',
          });
        }
      } else if (container.scrollLeft <= 50) {
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
  }, []);

  useEffect(() => {
    if (isDesktop || !isAutoPlaying || !scrollContainerRef.current || !sectionInView) return;

    const interval = setInterval(() => {
      scroll('right');
    }, AUTOPLAY_MS);

    return () => clearInterval(interval);
  }, [isDesktop, isAutoPlaying, sectionInView, scroll]);

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

  const headerContent = (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-8">
      <div className="flex-1 min-w-0">
        <p className="text-xs uppercase tracking-[0.2em] text-foreground/40 mb-4">{t('subtitle')}</p>
        <h2
          id="services-heading"
          className="text-[clamp(2rem,8vw,4.5rem)] font-bold leading-[0.9] tracking-tighter uppercase break-words"
        >
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
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-heading"
      className="relative lg:min-h-[175svh] flex flex-col justify-center py-24 lg:py-48 bg-background overflow-hidden"
    >
      <div className="hidden lg:block h-24 shrink-0" aria-hidden />

      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-foreground/20 to-transparent hidden lg:block"
        style={scrollDriven ? { opacity: lineMotion.opacity, y: lineMotion.y } : undefined}
      />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 w-full">
        <div className="mb-12 lg:mb-16">
          {scrollDriven ? (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-8">
              <div className="flex-1 min-w-0">
                <motion.p
                  className="text-xs uppercase tracking-[0.2em] text-foreground/40 mb-4"
                  style={subtitleMotion}
                >
                  {t('subtitle')}
                </motion.p>
                <motion.h2
                  id="services-heading"
                  className="text-[clamp(2rem,8vw,4.5rem)] font-bold leading-[0.9] tracking-tighter uppercase break-words"
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
          ) : viewDriven ? (
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3, margin: '-64px' }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              {headerContent}
            </motion.div>
          ) : (
            headerContent
          )}
        </div>

        <div className="relative -mx-6 lg:mx-0 py-4 lg:py-6">
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto overflow-y-hidden pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth px-6 lg:overflow-visible lg:pb-0 lg:px-0"
            onScroll={handleManualScroll}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-4 min-w-max lg:grid lg:grid-cols-4 lg:gap-5 xl:gap-6 lg:min-w-0 lg:w-full items-stretch">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  service={service}
                  index={index}
                  total={services.length}
                  sectionScroll={sectionScroll}
                  serviceNumberLabel={t('serviceNumberLabel')}
                  includesLabel={t('includesLabel')}
                  scrollDriven={scrollDriven}
                  viewDriven={viewDriven}
                />
              ))}
            </div>
          </div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 px-6 lg:hidden"
            style={scrollDriven ? controlsMotion : undefined}
            {...(viewDriven
              ? {
                  initial: { opacity: 0, y: 16 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { amount: 0.5 },
                  transition: { duration: 0.5, ease: EASE },
                }
              : {})}
          >
            <motion.p
              className="text-xs uppercase tracking-[0.15em] text-foreground/40"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              {t('swipeHint')}
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

        {scrollDriven ? (
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
              onClick={(e) => handleSectionClick(e, 'contact')}
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
        ) : viewDriven ? (
          <motion.div
            className="mt-12 lg:mt-24 text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/40 mb-6">
              {t('readyToStart')}
            </p>
            <motion.a
              href="#contact"
              onClick={(e) => handleSectionClick(e, 'contact')}
              className="group inline-block w-full sm:w-auto px-8 lg:px-12 py-4 lg:py-5 bg-foreground text-background text-sm uppercase tracking-[0.15em] font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('getInTouch')}
            </motion.a>
          </motion.div>
        ) : (
          <div className="mt-12 lg:mt-24 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/40 mb-6">
              {t('readyToStart')}
            </p>
            <a
              href="#contact"
              onClick={(e) => handleSectionClick(e, 'contact')}
              className="inline-block w-full sm:w-auto px-8 lg:px-12 py-4 lg:py-5 bg-foreground text-background text-sm uppercase tracking-[0.15em] font-medium"
            >
              {t('getInTouch')}
            </a>
          </div>
        )}
      </div>

      <div className="hidden lg:block h-24 shrink-0" aria-hidden />

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
