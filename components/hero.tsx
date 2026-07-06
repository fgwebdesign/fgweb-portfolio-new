'use client';

import { useTranslations } from 'next-intl';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { useIsDesktop } from '@/hooks/use-is-desktop';
import { Typewriter } from './typewriter';
import { HeroMinimalBackground } from './hero-minimal-background';
import { FloatingCode } from './floating-code';

export function Hero() {
  const t = useTranslations('hero');
  const isDesktop = useIsDesktop();
  const heroRef = useRef<HTMLElement>(null);

  const title = t('title');
  const words = title.split(' ');
  const services = t.raw('services') as string[];

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Transform scroll progress to animation values for each element
  // Rangos más cortos y tempranos para animaciones más rápidas y precisas
  // Los elementos se mantienen visibles una vez que aparecen (no desaparecen al scrollear hacia arriba)
  
  // 0. Initial scroll indicator: visible at start, fades out 0% - 8%
  const initialScrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.08, 1], [1, 0, 0]);
  const initialScrollIndicatorY = useTransform(scrollYProgress, [0, 0.08, 1], [0, -20, -20]);
  
  // 1. Background lines: 8% - 18%, luego permanece visible
  const backgroundOpacity = useTransform(scrollYProgress, [0.08, 0.18, 1], [0, 1, 1]);
  
  // 2. Title: 18% - 32%, luego permanece visible
  const titleOpacity = useTransform(scrollYProgress, [0.18, 0.32, 1], [0, 1, 1]);
  const titleY = useTransform(scrollYProgress, [0.18, 0.32, 1], [80, 0, 0]);
  const titleBlur = useTransform(scrollYProgress, [0.18, 0.32, 1], [15, 0, 0]);
  
  // 3. Typewriter: 32% - 46%, luego permanece visible
  const typewriterOpacity = useTransform(scrollYProgress, [0.32, 0.46, 1], [0, 1, 1]);
  const typewriterY = useTransform(scrollYProgress, [0.32, 0.46, 1], [60, 0, 0]);
  
  // 4. Buttons: 46% - 60%, luego permanecen visibles
  const buttonsOpacity = useTransform(scrollYProgress, [0.46, 0.6, 1], [0, 1, 1]);
  const buttonsY = useTransform(scrollYProgress, [0.46, 0.6, 1], [50, 0, 0]);
  
  // 5. Code blocks: 60% - 74%, luego permanecen visibles
  const codeOpacity = useTransform(scrollYProgress, [0.6, 0.74, 1], [0, 1, 1]);
  const codeScale = useTransform(scrollYProgress, [0.6, 0.74, 1], [0.85, 1, 1]);
  
  // 6. Signature: 74% - 88%, luego permanece visible
  const signatureOpacity = useTransform(scrollYProgress, [0.74, 0.88, 1], [0, 1, 1]);
  const signatureScale = useTransform(scrollYProgress, [0.74, 0.88, 1], [0.8, 1, 1]);
  
  // 7. Final scroll indicator: 88% - 100%, luego permanece visible
  const finalScrollIndicatorOpacity = useTransform(scrollYProgress, [0.88, 1], [0, 1]);

  // Cursor spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const [spotlightStyle, setSpotlightStyle] = useState({
    background: 'transparent',
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const heroElement = document.getElementById('hero');
      if (!heroElement) return;
      
      const rect = heroElement.getBoundingClientRect();
      const isInside = e.clientX >= rect.left && 
                      e.clientX <= rect.right && 
                      e.clientY >= rect.top && 
                      e.clientY <= rect.bottom;
      
      if (isInside) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      } else {
        mouseX.set(-1000);
        mouseY.set(-1000);
      }
    };

    const unsubscribeX = smoothMouseX.on('change', (x) => {
      const y = smoothMouseY.get();
      if (x < 0 || y < 0) {
        setSpotlightStyle({ background: 'transparent' });
      } else {
        setSpotlightStyle({
          background: `radial-gradient(circle 600px at ${x}px ${y}px, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.04) 35%, transparent 70%)`,
        });
      }
    });

    const unsubscribeY = smoothMouseY.on('change', (y) => {
      const x = smoothMouseX.get();
      if (x < 0 || y < 0) {
        setSpotlightStyle({ background: 'transparent' });
      } else {
        setSpotlightStyle({
          background: `radial-gradient(circle 600px at ${x}px ${y}px, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.04) 35%, transparent 70%)`,
        });
      }
    });

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      unsubscribeX();
      unsubscribeY();
    };
  }, [mouseX, mouseY, smoothMouseX, smoothMouseY]);

  const handleContactClick = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="relative min-h-[130vh] lg:min-h-[150vh] bg-background"
      onMouseEnter={() => mouseX.set(window.innerWidth / 2)}
      onMouseLeave={() => {
        mouseX.set(-1000);
        mouseY.set(-1000);
      }}
    >
      {/* Todo el contenido en un contenedor sticky */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* 0. Initial scroll indicator - visible desde el inicio, desaparece al scrollear */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
          style={{
            opacity: initialScrollIndicatorOpacity,
            y: initialScrollIndicatorY,
          }}
        >
          <motion.div
            className="flex flex-col items-center gap-4 lg:gap-6"
            animate={{ 
              y: [0, 15, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <motion.p
              className="text-sm lg:text-base font-medium uppercase tracking-[0.2em] text-foreground/60"
              animate={{ 
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Scroll Down
            </motion.p>
            
            <motion.div
              className="flex flex-col items-center gap-1"
              animate={{ 
                y: [0, 8, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* Primera flecha */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-foreground/50"
              >
                <path
                  d="M12 5V19M12 19L5 12M12 19L19 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              
              {/* Segunda flecha con delay */}
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-foreground/30 -mt-3"
                animate={{ 
                  y: [0, 6, 0],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.3,
                }}
              >
                <path
                  d="M12 5V19M12 19L5 12M12 19L19 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* 1. Background - aparece después del scroll inicial */}
        <motion.div
          initial={{ opacity: 0 }}
          style={{ opacity: backgroundOpacity }}
          className="absolute inset-0"
        >
          <HeroMinimalBackground />
        </motion.div>

        {/* Cursor spotlight effect - solo desktop */}
        {isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            className="absolute inset-0 z-[5] pointer-events-none"
            style={{ opacity: backgroundOpacity }}
          >
            <div
              className="absolute inset-0 backdrop-blur-[1px]"
              style={spotlightStyle}
            />
          </motion.div>
        )}

        {/* Contenido principal centrado */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              {/* 2. Título - aparece con scroll */}
              <motion.h1
                initial={{ opacity: 0, y: 100 }}
                className="font-[family-name:var(--font-manrope)] text-[clamp(2rem,10vw,2.5rem)] lg:text-[clamp(2.5rem,6vw,4.5rem)] xl:text-[clamp(3rem,7vw,6rem)] 2xl:text-[clamp(3.5rem,8vw,7.5rem)] font-black mb-12 lg:mb-16 xl:mb-20 leading-[0.9] tracking-tighter uppercase"
                style={{
                  opacity: titleOpacity,
                  y: titleY,
                  filter: useTransform(titleBlur, (v) => `blur(${v}px)`),
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.1), 0 4px 20px rgba(0, 0, 0, 0.05)',
                  WebkitTextStroke: '1px rgba(0, 0, 0, 0.02)',
                }}
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
                      className="inline-block cursor-pointer"
                      animate={{
                        y: [0, -8, 0],
                      }}
                      transition={{
                        y: {
                          duration: 3 + index * 0.3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: index * 0.15,
                        },
                      }}
                      whileHover={{
                        scale: 1.03,
                        color: '#ffffff',
                        textShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
                        transition: { duration: 0.2 },
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </motion.h1>

              {/* 3. Typewriter - aparece con scroll */}
              <motion.div
                initial={{ opacity: 0, y: 80 }}
                className="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-foreground mb-16 lg:mb-20 xl:mb-24 2xl:mb-32 font-medium tracking-tight min-h-[2.5em] flex items-center justify-center"
                style={{
                  opacity: typewriterOpacity,
                  y: typewriterY,
                }}
              >
                <motion.div
                  animate={{
                    y: [0, -6, 0],
                    rotate: [0, 1, 0, -1, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Typewriter words={services} delay={2000} />
                </motion.div>
              </motion.div>

              {/* 4. Botones - aparecen con scroll */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                className="flex flex-col sm:flex-row gap-4 lg:gap-5 xl:gap-6 2xl:gap-8 justify-center"
                style={{
                  opacity: buttonsOpacity,
                  y: buttonsY,
                }}
              >
                {/* Botón Download */}
                <motion.a
                  href="/Felipe_Gutierrez_CV_QA_Engineer.pdf"
                  download="Felipe_Gutierrez_CV_QA_Engineer.pdf"
                  className="group relative px-8 py-4 lg:px-10 lg:py-4 xl:px-12 xl:py-5 2xl:px-14 2xl:py-6 bg-foreground text-background text-sm lg:text-base xl:text-lg uppercase tracking-[0.15em] font-medium overflow-hidden inline-block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span
                    className="relative z-10"
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.2,
                    }}
                  >
                    {t('ctaDownload')}
                  </motion.span>
                  
                  <motion.div
                    className="absolute inset-0 bg-background"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4 }}
                    style={{ originX: 0 }}
                  />
                  
                  <span className="absolute inset-0 flex items-center justify-center text-foreground text-sm lg:text-base xl:text-lg uppercase tracking-[0.15em] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {t('ctaDownload')}
                  </span>
                </motion.a>

                {/* Botón Contact */}
                <motion.button
                  onClick={handleContactClick}
                  className="group relative px-8 py-4 lg:px-10 lg:py-4 xl:px-12 xl:py-5 2xl:px-14 2xl:py-6 border-2 border-foreground bg-background text-foreground text-sm lg:text-base xl:text-lg uppercase tracking-[0.15em] font-medium overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span
                    className="relative z-10"
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.4,
                    }}
                  >
                    {t('ctaContact')}
                  </motion.span>
                  
                  <motion.div
                    className="absolute inset-0 bg-foreground"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4 }}
                    style={{ originX: 0 }}
                  />
                  
                  <span className="absolute inset-0 flex items-center justify-center text-background text-sm lg:text-base xl:text-lg uppercase tracking-[0.15em] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {t('ctaContact')}
                  </span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* 5. Code blocks - aparecen con scroll (solo desktop) */}
        {isDesktop && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              className="absolute top-32 lg:top-40 xl:top-44 left-8 lg:left-12 xl:left-16 2xl:left-20 z-20"
              style={{
                opacity: codeOpacity,
                scale: codeScale,
              }}
            >
              <FloatingCode position="top-left" delay={0} type="personal" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              className="absolute bottom-48 lg:bottom-56 xl:bottom-64 right-8 lg:right-12 xl:right-16 2xl:right-20 z-20"
              style={{
                opacity: codeOpacity,
                scale: codeScale,
              }}
            >
              <FloatingCode position="bottom-right" delay={0} type="deploy" />
            </motion.div>
            
            {/* 6. Signature - aparece con scroll */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              className="absolute top-[620px] lg:top-[640px] xl:top-[680px] left-[60px] xl:left-[120px] 2xl:left-[180px] z-20"
              style={{
                opacity: signatureOpacity,
                scale: signatureScale,
              }}
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
              >
                <div className="relative border border-foreground/10 bg-background px-3 lg:px-4 xl:px-5 2xl:px-6 py-2 lg:py-2 xl:py-3 2xl:py-3 shadow-lg rounded-lg">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-[90px] lg:w-[110px] xl:w-[130px] 2xl:w-[150px] h-auto opacity-90"
                  >
                    <source src="/signaturefg2.mp4" type="video/mp4" />
                  </video>
                  
                  <p className="absolute -bottom-4 lg:-bottom-4 xl:-bottom-5 left-1/2 -translate-x-1/2 text-[8px] lg:text-[8px] xl:text-[9px] uppercase tracking-[0.15em] text-foreground/40 whitespace-nowrap">
                    Signature
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* 7. Scroll indicator final - aparece al final */}
            <motion.div
              initial={{ opacity: 0 }}
              className="absolute bottom-8 lg:bottom-12 right-[60px] lg:right-[80px] xl:right-[120px] 2xl:right-[180px] cursor-pointer group z-20"
              style={{
                opacity: finalScrollIndicatorOpacity,
              }}
              onClick={() => {
                const servicesSection = document.querySelector('#services');
                if (servicesSection) {
                  servicesSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <motion.div
                className="flex flex-col items-center gap-2"
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 2,
                }}
              >
                <motion.p
                  className="text-xs font-medium uppercase tracking-[0.15em] text-foreground/50 group-hover:text-foreground transition-colors"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  Scroll Down
                </motion.p>
                
                <motion.div
                  className="flex items-center justify-center"
                  animate={{ y: [0, 4, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-foreground/50 group-hover:text-foreground transition-colors"
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
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
