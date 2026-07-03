'use client';

import { useTranslations } from 'next-intl';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useState, useEffect } from 'react';
import { useIsDesktop } from '@/hooks/use-is-desktop';
import { Typewriter } from './typewriter';
import { HeroMinimalBackground } from './hero-minimal-background';
import { FloatingCode } from './floating-code';

export function Hero() {
  const t = useTranslations('hero');
  const isDesktop = useIsDesktop();

  const title = t('title');
  const words = title.split(' ');
  const services = t.raw('services') as string[];

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const typewriterVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 1.2,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const handleContactClick = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
      onMouseEnter={() => mouseX.set(window.innerWidth / 2)}
      onMouseLeave={() => {
        mouseX.set(-1000);
        mouseY.set(-1000);
      }}
    >
      {/* Background minimalista con formas geométricas */}
      <HeroMinimalBackground />

      {/* Cursor spotlight effect - solo desktop */}
      {isDesktop && (
        <motion.div
          className="absolute inset-0 z-[5] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div
            className="absolute inset-0 backdrop-blur-[1px]"
            style={spotlightStyle}
          />
        </motion.div>
      )}

      {/* Floating Code snippets - solo desktop */}
      {isDesktop && (
        <>
          <FloatingCode position="top-left" delay={0} type="personal" />
          <FloatingCode position="bottom-right" delay={0} type="deploy" />
          
          {/* Video de firma - debajo del code block personal */}
          <motion.div
            className="absolute top-[560px] xl:top-[580px] left-[60px] xl:left-[120px] 2xl:left-[180px] z-20"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: [0, -12, 0],
              scale: 1
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.8 },
              scale: { duration: 0.8, delay: 0.8 },
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.6,
              }
            }}
          >
            {/* Contenedor horizontal con borde sutil y redondeado */}
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
              
              {/* Label "Signature" */}
              <p className="absolute -bottom-4 lg:-bottom-4 xl:-bottom-5 left-1/2 -translate-x-1/2 text-[8px] lg:text-[8px] xl:text-[9px] uppercase tracking-[0.15em] text-foreground/40 whitespace-nowrap">
                Signature
              </p>
            </div>
          </motion.div>
        </>
      )}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-48">
        <div className="text-center">
          {/* Título animado MAYÚSCULAS + movimiento continuo + profundidad */}
          <motion.h1
            className="font-[family-name:var(--font-manrope)] text-[clamp(2rem,10vw,2.5rem)] lg:text-[clamp(2.5rem,6vw,4.5rem)] xl:text-[clamp(3rem,7vw,6rem)] 2xl:text-[clamp(3.5rem,8vw,7.5rem)] font-black mb-8 lg:mb-12 xl:mb-16 leading-[0.9] tracking-tighter uppercase"
            style={{
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.1), 0 4px 20px rgba(0, 0, 0, 0.05)',
              WebkitTextStroke: '1px rgba(0, 0, 0, 0.02)',
            }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {words.map((word, index) => (
              <motion.span
                key={index}
                variants={wordVariants}
                className="inline-block cursor-pointer"
                style={{ 
                  marginRight: index < words.length - 1 ? '0.35em' : '0',
                }}
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
                  WebkitTextStroke: '1.5px #000000',
                  textShadow: 'none',
                  transition: { duration: 0.2 },
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Servicios con efecto typewriter + floating */}
          <motion.div
            className="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-foreground mb-16 lg:mb-20 xl:mb-24 2xl:mb-32 font-medium tracking-tight min-h-[2.5em] flex items-center justify-center"
            variants={typewriterVariants}
            initial="hidden"
            animate="visible"
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

          {/* CTAs - animación de entrada */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 lg:gap-5 xl:gap-6 2xl:gap-8 justify-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const, delay: 1.5 }}
          >
            {/* Botón Download */}
            <motion.a
              href="/Felipe_Gutierrez_CV_QA_Engineer.pdf"
              download="Felipe_Gutierrez_CV_QA_Engineer.pdf"
              className="group relative px-8 py-4 lg:px-10 lg:py-4 xl:px-12 xl:py-5 2xl:px-14 2xl:py-6 bg-foreground text-background text-sm lg:text-base xl:text-lg uppercase tracking-[0.15em] font-medium overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.2,
                }
              }}
            >
              <motion.span className="relative z-10">
                {t('ctaDownload')}
              </motion.span>
              
              <motion.div
                className="absolute inset-0 bg-background"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
                style={{ originX: 0 }}
              />
              
              <motion.span
                className="absolute inset-0 flex items-center justify-center text-foreground text-sm lg:text-base xl:text-lg uppercase tracking-[0.15em] font-medium"
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {t('ctaDownload')}
              </motion.span>
            </motion.a>

            {/* Botón Contact */}
            <motion.button
              onClick={handleContactClick}
              className="group relative px-8 py-4 lg:px-10 lg:py-4 xl:px-12 xl:py-5 2xl:px-14 2xl:py-6 border-2 border-foreground bg-background text-foreground text-sm lg:text-base xl:text-lg uppercase tracking-[0.15em] font-medium overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.4,
                }
              }}
            >
              <motion.span className="relative z-10">
                {t('ctaContact')}
              </motion.span>
              
              <motion.div
                className="absolute inset-0 bg-foreground"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
                style={{ originX: 0 }}
              />
              
              <motion.span
                className="absolute inset-0 flex items-center justify-center text-background text-sm lg:text-base xl:text-lg uppercase tracking-[0.15em] font-medium"
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {t('ctaContact')}
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - posicionado a la derecha debajo del code block de deploy */}
      {isDesktop && (
        <motion.div
          className="absolute bottom-8 lg:bottom-12 right-[60px] lg:right-[80px] xl:right-[120px] 2xl:right-[180px] flex flex-col items-center gap-2 cursor-pointer group"
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: 1, 
            y: [0, -6, 0],
          }}
          transition={{
            opacity: { duration: 1.2, delay: 2.5 },
            y: {
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 3,
            },
          }}
          onClick={() => {
            const servicesSection = document.querySelector('#services');
            if (servicesSection) {
              servicesSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          {/* Texto "Scroll Down" */}
          <motion.p
            className="text-xs font-medium uppercase tracking-[0.15em] text-foreground/50 group-hover:text-foreground transition-colors"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            Scroll Down
          </motion.p>
          
          {/* Flecha hacia abajo */}
          <motion.div
            className="flex items-center justify-center"
            animate={{
              y: [0, 4, 0],
            }}
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
      )}
    </section>
  );
}
