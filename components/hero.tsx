'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Typewriter } from './typewriter';
import { HeroMinimalBackground } from './hero-minimal-background';
import { HeroCursorSpotlight } from './hero-cursor-spotlight';
import { HeroSkillsWindow } from './hero-skills-window';
import { HeroProfileWindow } from './hero-profile-window';

export function Hero() {
  const t = useTranslations('hero');
  const tCommon = useTranslations('common');
  const [mounted, setMounted] = useState(false);

  const title = t('title');
  const words = title.split(' ');
  const services = t.raw('services') as string[];

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleContactClick = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <HeroMinimalBackground />
      </div>

      {/* Mancha que sigue al cursor: oscurece/desatura el fondo con blur para dar profundidad */}
      <HeroCursorSpotlight targetId="hero" />

      {/* Ventanas flotantes tipo editor - SIEMPRE visibles en desktop */}
      <HeroSkillsWindow position="top-left" delay={1} />
      <HeroProfileWindow position="bottom-right" delay={1.5} />

      {/* Firma en video */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={mounted ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 2, duration: 0.8 }}
        className="hidden lg:block absolute top-[580px] lg:top-[600px] xl:top-[620px] left-[60px] xl:left-[120px] 2xl:left-[180px] z-20"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="relative border border-foreground/10 bg-background px-4 py-2 shadow-lg rounded-lg">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-[100px] lg:w-[120px] xl:w-[140px] h-auto opacity-90"
            >
              <source src="/signaturefg2.mp4" type="video/mp4" />
            </video>
            
            <p className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-[0.15em] text-foreground/40 whitespace-nowrap">
              {tCommon('signature')}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Contenido principal */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-32">
        <div className="text-center">
          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 1, 
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1] 
            }}
            className="font-[family-name:var(--font-manrope)] text-[clamp(2.5rem,10vw,4rem)] lg:text-[clamp(4rem,8vw,7rem)] font-black mb-8 lg:mb-12 leading-[0.9] tracking-tighter uppercase"
          >
            {words.map((word, index) => (
              <span
                key={index}
                className="inline-block"
                style={{ 
                  marginRight: index < words.length - 1 ? '0.35em' : '0',
                }}
              >
                <motion.span
                  className="relative inline-block px-2 py-1 -mx-2 -my-1 rounded-2xl cursor-default"
                  initial={{ opacity: 0, y: 20 }}
                  animate={mounted ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: 0.3 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover="hover"
                >
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 -z-10 rounded-2xl pointer-events-none"
                    variants={{
                      rest: {
                        opacity: 0,
                        scale: 0.85,
                        backdropFilter: 'blur(0px)',
                      },
                      hover: {
                        opacity: 1,
                        scale: 1,
                        backdropFilter: 'blur(10px)',
                      },
                    }}
                    initial="rest"
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      background:
                        'radial-gradient(circle at 50% 50%, rgba(10,10,10,0.09), rgba(10,10,10,0.03) 60%, transparent 100%)',
                      boxShadow: '0 0 0 1px rgba(10,10,10,0.06) inset',
                    }}
                  />
                  <motion.span
                    className="relative inline-block"
                    variants={{
                      rest: { filter: 'grayscale(0%) contrast(100%)', color: 'var(--foreground)' },
                      hover: { filter: 'grayscale(100%) contrast(115%)', color: 'var(--foreground)' },
                    }}
                    initial="rest"
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {word}
                  </motion.span>
                </motion.span>
              </span>
            ))}
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.8, 
              delay: 0.8,
              ease: [0.22, 1, 0.36, 1] 
            }}
            className="text-xl lg:text-2xl xl:text-3xl text-foreground/90 mb-12 lg:mb-16 font-medium tracking-tight min-h-[2.5em] flex items-center justify-center"
          >
            {mounted && <Typewriter words={services} delay={2000} />}
          </motion.div>

          {/* Botones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.8, 
              delay: 1.2,
              ease: [0.22, 1, 0.36, 1] 
            }}
            className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center"
          >
            {/* Botón Download */}
            <motion.a
              href="/Felipe_Gutierrez_CV_QA_Engineer.pdf"
              download="Felipe_Gutierrez_CV_QA_Engineer.pdf"
              className="group relative px-10 py-4 lg:px-12 lg:py-5 bg-foreground text-background text-sm lg:text-base uppercase tracking-[0.15em] font-medium overflow-hidden inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">
                {t('ctaDownload')}
              </span>
              
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

            {/* Botón Contact */}
            <motion.button
              onClick={handleContactClick}
              className="group relative px-10 py-4 lg:px-12 lg:py-5 border-2 border-foreground bg-background text-foreground text-sm lg:text-base uppercase tracking-[0.15em] font-medium overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">
                {t('ctaContact')}
              </span>
              
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

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 cursor-pointer z-20"
        onClick={() => {
          const servicesSection = document.querySelector('#services');
          if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <motion.div
          className="flex flex-col items-center gap-3"
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.p
            className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/50"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {tCommon('scroll')}
          </motion.p>
          
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-foreground/50"
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
