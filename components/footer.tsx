'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useScrollToSection } from '@/hooks/use-scroll-to-section';

const EASE = [0.22, 1, 0.36, 1] as const;

const SOCIAL_LINKS = [
  {
    key: 'instagram',
    href: 'https://www.instagram.com/fgwebdesign_/',
    labelKey: 'instagram' as const,
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: 'linkedin',
    href: 'https://www.linkedin.com/in/felipegut/',
    labelKey: 'linkedin' as const,
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M8 11v5M8 8v.01M12 16v-5M12 11c0-1.5.8-2 2-2s2 .5 2 2v5" />
      </svg>
    ),
  },
] as const;

const FOOTER_NAV = [
  { key: 'services', sectionId: 'services' },
  { key: 'portfolio', sectionId: 'portfolio' },
  { key: 'contact', sectionId: 'contact' },
] as const;

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tHero = useTranslations('hero');
  const { handleSectionClick } = useScrollToSection();

  return (
    <footer className="border-t border-foreground/10 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          {/* Brand */}
          <div className="lg:col-span-5 space-y-4">
            <motion.a
              href="#hero"
              onClick={(e) => handleSectionClick(e, 'hero')}
              className="inline-block text-lg lg:text-xl font-bold tracking-tight lowercase text-foreground hover:opacity-60 transition-opacity duration-300"
            >
              {tHero('title')}
            </motion.a>
            <p className="text-sm text-foreground/60 leading-relaxed max-w-sm">{t('tagline')}</p>
            <p className="text-xs uppercase tracking-[0.15em] text-foreground/40">{t('location')}</p>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40">{t('contactLabel')}</p>
            <a
              href={`mailto:${t('email')}`}
              className="block text-sm lg:text-base font-medium text-foreground hover:opacity-60 transition-opacity duration-300"
            >
              {t('email')}
            </a>
            <p className="text-sm text-foreground/50 leading-relaxed max-w-xs">{t('availability')}</p>
          </div>

          {/* Navigate + social */}
          <div className="lg:col-span-4 flex flex-col gap-8 lg:items-end lg:text-right">
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40">{t('navigateLabel')}</p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 lg:justify-end">
                {FOOTER_NAV.map((item) => (
                  <li key={item.key}>
                    <a
                      href={`#${item.sectionId}`}
                      onClick={(e) => handleSectionClick(e, item.sectionId)}
                      className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-300"
                    >
                      {tNav(item.key)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40">{t('socialLabel')}</p>
              <div className="flex items-center gap-4 lg:justify-end">
                {SOCIAL_LINKS.map((social) => (
                  <motion.a
                    key={social.key}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t(social.labelKey)}
                    className="flex items-center justify-center w-10 h-10 border border-foreground/15 text-foreground/70 hover:text-foreground hover:border-foreground/40 transition-colors duration-300"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-16 pt-8 border-t border-foreground/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        >
          <p className="text-xs text-foreground/40">{t('copyright')}</p>
          <a
            href={`mailto:${t('email')}`}
            className="text-xs uppercase tracking-[0.12em] text-foreground/50 hover:text-foreground transition-colors duration-300 sm:text-right"
          >
            {t('cta')}
          </a>
        </motion.div>
      </div>
    </footer>
  );
}
