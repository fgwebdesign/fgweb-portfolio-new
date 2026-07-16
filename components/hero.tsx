'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'motion/react';
import { useState, useEffect, useCallback } from 'react';
import { Typewriter } from './typewriter';
import { DomainTypewriter } from './domain-typewriter';
import { HeroMinimalBackground } from './hero-minimal-background';
import { HeroCursorSpotlight } from './hero-cursor-spotlight';
import { HeroSkillsWindow } from './hero-skills-window';
import { HeroProfileWindow } from './hero-profile-window';
import { HERO_SEQUENCE } from '@/data/hero-sequence';

const EASE = HERO_SEQUENCE.ease;

export function Hero() {
  const t = useTranslations('hero');
  const tCommon = useTranslations('common');
  const shouldReduceMotion = useReducedMotion();

  const [mounted, setMounted] = useState(false);
  const [titleTyped, setTitleTyped] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  const title = t('title');
  const services = t.raw('services') as string[];

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTitleComplete = useCallback(() => {
    setTitleTyped(true);
  }, []);

  // Fases posteriores al título — orden fijo y escalonado
  useEffect(() => {
    if (!titleTyped) return;

    if (shouldReduceMotion) {
      setShowProfile(true);
      setShowServices(true);
      setShowButtons(true);
      setShowScroll(true);
      return;
    }

    const ms = (s: number) => s * 1000;
    const timers = [
      setTimeout(() => setShowProfile(true), ms(HERO_SEQUENCE.profileWindow.afterTitle)),
      setTimeout(() => setShowServices(true), ms(HERO_SEQUENCE.services.afterTitle)),
      setTimeout(() => setShowButtons(true), ms(HERO_SEQUENCE.buttons.afterTitle)),
      setTimeout(() => setShowScroll(true), ms(HERO_SEQUENCE.scroll.afterTitle)),
    ];

    return () => timers.forEach(clearTimeout);
  }, [titleTyped, shouldReduceMotion]);

  const handleContactClick = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] lg:min-h-screen flex items-center justify-center bg-background overflow-hidden"
    >
      <div className="absolute inset-0">
        <HeroMinimalBackground />
      </div>

      <HeroCursorSpotlight targetId="hero" />

      {/* 2. skills.ts — entra primero entre las ventanas */}
      <HeroSkillsWindow
        position="top-left"
        delay={HERO_SEQUENCE.skillsWindow.enter}
      />

      {/* 4. profile.ts — después del título */}
      {showProfile && (
        <HeroProfileWindow position="bottom-right" delay={0.12} />
      )}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-28 lg:py-32">
        <div className="text-center">
          {/* 3. Título */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={mounted ? { opacity: 1 } : {}}
            transition={{
              duration: 0.45,
              delay: HERO_SEQUENCE.title.enter,
              ease: EASE,
            }}
            className="mb-8 lg:mb-12 min-h-[1.1em] flex justify-center select-none"
          >
            <span className="relative inline-flex justify-center px-8 py-5 sm:px-10 sm:py-6 lg:px-14 lg:py-9">
              <span
                className="absolute -inset-x-4 -inset-y-2 lg:-inset-x-6 lg:-inset-y-3 rounded-[2rem] bg-foreground/[0.04] blur-2xl pointer-events-none"
                aria-hidden
              />
              <span
                className="absolute inset-0 rounded-3xl border border-foreground/[0.05] bg-background/25 backdrop-blur-[2px] pointer-events-none"
                aria-hidden
              />

              <span className="relative text-[clamp(1.75rem,6.5vw,3rem)] lg:text-[clamp(2.75rem,5.5vw,4.75rem)] font-black leading-[0.95] tracking-[-0.03em] lowercase text-foreground px-2 [text-shadow:0_1px_0_rgba(0,0,0,0.06),0_8px_28px_rgba(0,0,0,0.07),0_0_1px_rgba(0,0,0,0.9)]">
                {mounted ? (
                  <DomainTypewriter
                    text={title}
                    speed={HERO_SEQUENCE.title.charSpeed}
                    startDelay={HERO_SEQUENCE.title.enter * 1000}
                    onComplete={handleTitleComplete}
                  />
                ) : (
                  <span className="invisible" aria-hidden>
                    {title}
                  </span>
                )}
              </span>
            </span>
          </motion.h1>

          {/* 5. Subtítulo servicios */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={showServices ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="text-xl lg:text-2xl xl:text-3xl text-foreground/90 mb-12 lg:mb-16 font-medium tracking-tight min-h-[2.5em] flex items-center justify-center"
          >
            {showServices && (
              <Typewriter
                words={services}
                delay={HERO_SEQUENCE.servicesWordPause}
              />
            )}
          </motion.div>

          {/* 6. CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={showButtons ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center"
          >
            <motion.a
              href="/Felipe_Gutierrez_CV_QA_Engineer.pdf"
              download="Felipe_Gutierrez_CV_QA_Engineer.pdf"
              className="group relative px-10 py-4 lg:px-12 lg:py-5 bg-foreground text-background text-sm lg:text-base uppercase tracking-[0.15em] font-medium overflow-hidden inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">{t('ctaDownload')}</span>
              <motion.div
                className="absolute inset-0 bg-background"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
                style={{ originX: 0 }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-foreground text-sm lg:text-base uppercase tracking-[0.15em] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {t('ctaDownload')}
              </span>
            </motion.a>

            <motion.button
              onClick={handleContactClick}
              className="group relative px-10 py-4 lg:px-12 lg:py-5 border-2 border-foreground bg-background text-foreground text-sm lg:text-base uppercase tracking-[0.15em] font-medium overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">{t('ctaContact')}</span>
              <motion.div
                className="absolute inset-0 bg-foreground"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
                style={{ originX: 0 }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-background text-sm lg:text-base uppercase tracking-[0.15em] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {t('ctaContact')}
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* 7. Scroll */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={showScroll ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="absolute bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 cursor-pointer z-20"
        onClick={() => {
          const servicesSection = document.querySelector('#services');
          servicesSection?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <motion.div
          className="flex flex-col items-center gap-3"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.p
            className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/50"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {tCommon('scroll')}
          </motion.p>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="text-foreground/50"
            aria-hidden
          >
            <path
              d="M10 4V16M10 16L16 10M10 16L4 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
