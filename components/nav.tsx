'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './language-switcher';

// Ícono social con círculo de fondo que se expande al hover, invirtiendo el color del ícono.
function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group flex items-center justify-center w-9 h-9 lg:w-10 lg:h-10 -m-2"
      aria-label={label}
      whileTap={{ scale: 0.9 }}
    >
      {/* Círculo de fondo que se expande desde el centro */}
      <motion.span
        className="absolute inset-0 rounded-full bg-foreground"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: 0.5, originY: 0.5 }}
      />
      <motion.span
        className="relative z-10 text-foreground group-hover:text-background transition-colors duration-300"
        whileHover={{ rotate: 12, scale: 1.1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </motion.a>
  );
}

export function Nav() {
  const t = useTranslations('nav');
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const activeHoverKey = isOpen ? hoveredKey : null;
  const isMenuInverted = activeHoverKey !== null;

  const navItems = [
    { key: 'services', href: '#services' },
    { key: 'process', href: '#process' },
    { key: 'portfolio', href: '#portfolio' },
    { key: 'products', href: '#products' },
    { key: 'about', href: '#about' },
    { key: 'skills', href: '#skills' },
    { key: 'experience', href: '#experience' },
    { key: 'contact', href: '#contact' },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
    setHoveredKey(null);
  };

  const handleMenuClick = () => {
    if (isOpen) {
      setIsOpen(false);
      setHoveredKey(null);
    } else {
      setHoveredKey(null);
      setIsOpen(true);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-foreground/[0.06] overflow-visible">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 overflow-visible">
          <div className="flex items-center justify-between h-[60px] lg:h-[68px] overflow-visible">
            {/* Logo - Ultra minimal */}
            <motion.a
              href="#hero"
              className="text-base lg:text-lg font-bold tracking-tight lowercase select-none"
              whileHover={{ opacity: 0.6 }}
              whileTap={{ scale: 0.98 }}
            >
              felipegutierrez.dev
            </motion.a>

            {/* Language + Menu (social solo desktop) */}
            <div className="flex items-center gap-4 lg:gap-8">
              <div className="hidden lg:flex items-center gap-4">
                <SocialIcon href="https://www.instagram.com/fgwebdesign_/" label="Instagram">
                  <svg
                    className="w-5 h-5 lg:w-[22px] lg:h-[22px]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                  </svg>
                </SocialIcon>

                <SocialIcon href="https://www.linkedin.com/in/felipegut/" label="LinkedIn">
                  <svg
                    className="w-5 h-5 lg:w-[22px] lg:h-[22px]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M8 11v5M8 8v.01M12 16v-5M12 11c0-1.5.8-2 2-2s2 .5 2 2v5" />
                  </svg>
                </SocialIcon>
              </div>

              <div className="hidden lg:block w-px h-5 bg-foreground/10" />

              <LanguageSwitcher />
              
              {/* Menu button - Ultra minimal */}
              <motion.button
                onClick={handleMenuClick}
                className="relative flex items-center gap-3 group"
                aria-label="Menu"
                whileHover={{ opacity: 0.6 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Tooltip animado - inline después del menú */}
                <AnimatePresence>
                  {!isOpen && (
                    <motion.div
                      className="absolute left-1/2 top-[calc(100%+10px)] -translate-x-1/2 z-10 bg-foreground text-background px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap pointer-events-none lg:left-[calc(100%+12px)] lg:top-1/2 lg:translate-x-0 lg:-translate-y-1/2"
                      initial={{ opacity: 0, y: -6, scale: 0.9 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{ opacity: 0, scale: 0.9, y: -4 }}
                      transition={{
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1] as const,
                      }}
                    >
                      <motion.span
                        className="inline-block"
                        animate={{
                          y: [0, 2, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        {t('tapHere')}
                      </motion.span>
                      <div
                        className="absolute left-1/2 -top-1 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45 lg:left-[-4px] lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0"
                        aria-hidden
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Label MENU */}
                <span className="text-sm lg:text-[15px] font-normal uppercase tracking-[0.1em]">
                  {isOpen ? t('close') : t('menu')}
                </span>

                {/* Hamburger icon - minimal */}
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <motion.span
                    className="absolute w-5 h-[1.5px] bg-foreground"
                    animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -3.5 }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  />
                  <motion.span
                    className="absolute w-5 h-[1.5px] bg-foreground"
                    animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.15 }}
                  />
                  <motion.span
                    className="absolute w-5 h-[1.5px] bg-foreground"
                    animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 3.5 }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              backgroundColor: isMenuInverted ? '#000000' : '#ffffff',
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onMouseLeave={() => setHoveredKey(null)}
          >
            <motion.div
              className="flex flex-col items-center justify-center gap-1 lg:gap-2 py-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {navItems.map((item, index) => {
                const isHovered = activeHoverKey === item.key;

                return (
                  <motion.div
                    key={item.key}
                    className="overflow-hidden"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.12 + index * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <motion.a
                      href={item.href}
                      onClick={handleLinkClick}
                      onMouseEnter={() => setHoveredKey(item.key)}
                      className="relative flex items-center justify-center text-xl lg:text-2xl font-semibold uppercase tracking-[0.08em] px-8 py-2.5 lg:py-3"
                      animate={{
                        color: isMenuInverted
                          ? isHovered
                            ? '#ffffff'
                            : 'rgba(255,255,255,0.35)'
                          : '#0a0a0a',
                        scale: isHovered ? 1.04 : 1,
                      }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {t(item.key)}
                    </motion.a>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
