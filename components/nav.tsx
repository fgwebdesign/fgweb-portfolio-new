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

  const navItems = [
    { key: 'services', href: '#services' },
    { key: 'process', href: '#process' },
    { key: 'portfolio', href: '#portfolio' },
    { key: 'clients', href: '#clients' },
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
              className="text-base lg:text-lg font-bold tracking-tight lowercase"
              whileHover={{ opacity: 0.6 }}
              whileTap={{ scale: 0.98 }}
            >
              felipegutierrez.dev
            </motion.a>

            {/* Desktop & Mobile: Social + Language + Menu */}
            <div className="flex items-center gap-6 lg:gap-8">
              {/* Social Icons - Ultra Minimal */}
              <div className="flex items-center gap-3 lg:gap-4">
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
                        {t('tapHere')}
                      </motion.span>
                      {/* Flecha hacia la izquierda */}
                      <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-foreground transform rotate-45" />
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
            className="fixed inset-0 z-40 bg-background flex items-center justify-center overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="flex flex-col items-center justify-center gap-1 lg:gap-2 py-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {navItems.map((item, index) => (
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
                    className="relative flex items-center justify-center text-xl lg:text-2xl font-semibold uppercase tracking-[0.08em] px-8 py-2.5 lg:py-3 rounded-full"
                    whileHover="hover"
                    initial="rest"
                    animate="rest"
                  >
                    <motion.span
                      className="absolute inset-0 rounded-full bg-foreground"
                      variants={{
                        rest: { scale: 0.4, opacity: 0 },
                        hover: { scale: 1, opacity: 1 },
                      }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <motion.span
                      className="relative z-10"
                      variants={{
                        rest: { color: 'var(--foreground)' },
                        hover: { color: 'var(--background)' },
                      }}
                      transition={{ duration: 0.25 }}
                    >
                      {t(item.key)}
                    </motion.span>
                  </motion.a>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
