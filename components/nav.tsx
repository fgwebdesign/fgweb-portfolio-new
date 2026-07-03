'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './language-switcher';

export function Nav() {
  const t = useTranslations('nav');
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { key: 'services', href: '#services' },
    { key: 'process', href: '#process' },
    { key: 'portfolio', href: '#portfolio' },
    { key: 'about', href: '#about' },
    { key: 'skills', href: '#skills' },
    { key: 'experience', href: '#experience' },
    { key: 'contact', href: '#contact' },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-foreground/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-[60px] lg:h-[68px]">
            {/* Logo - Ultra minimal */}
            <motion.a
              href="#hero"
              className="text-base lg:text-lg font-medium tracking-tight uppercase"
              whileHover={{ opacity: 0.6 }}
              whileTap={{ scale: 0.98 }}
            >
              FG Web Designs
            </motion.a>

            {/* Desktop & Mobile: Social + Language + Menu */}
            <div className="flex items-center gap-6 lg:gap-8">
              {/* Social Icons - Ultra Minimal */}
              <div className="flex items-center gap-5">
                {/* Instagram - Simple square with circle */}
                <motion.a
                  href="https://www.instagram.com/fgwebdesign_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Instagram"
                >
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
                </motion.a>

                {/* LinkedIn - Simple L shape */}
                <motion.a
                  href="https://www.linkedin.com/in/felipegut/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="LinkedIn"
                >
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
                </motion.a>
              </div>

              {/* Divider - más sutil */}
              <div className="w-px h-5 bg-foreground/10" />

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
                      className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 bg-foreground text-background px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap pointer-events-none"
                      initial={{ opacity: 0, x: -10, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0, 
                        scale: 1,
                      }}
                      exit={{ opacity: 0, scale: 0.8, x: -5 }}
                      transition={{
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1] as const,
                      }}
                    >
                      <motion.span
                        animate={{ 
                          x: [0, 3, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        TAP HERE!
                      </motion.span>
                      {/* Flecha hacia la izquierda */}
                      <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-foreground transform rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Label MENU */}
                <span className="text-sm lg:text-[15px] font-normal uppercase tracking-[0.1em]">
                  {isOpen ? 'Close' : 'Menu'}
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
            className="fixed inset-0 z-40 bg-background flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                >
                  <a
                    href={item.href}
                    onClick={handleLinkClick}
                    className="block text-4xl lg:text-6xl font-bold uppercase tracking-tight py-4 lg:py-6 hover:opacity-50 transition-opacity"
                  >
                    {t(item.key)}
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
