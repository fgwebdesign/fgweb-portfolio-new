'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { motion } from 'motion/react';

const locales = ['en', 'es'] as const;
type LocaleOption = (typeof locales)[number];

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const currentLocale = params.locale as LocaleOption;
  const activeIndex = locales.indexOf(currentLocale);

  const switchLocale = (locale: LocaleOption) => {
    if (locale === currentLocale || isPending) return;
    startTransition(() => {
      router.replace(pathname, { locale });
    });
  };

  return (
    <div
      className="relative flex items-center p-0.5 border border-foreground/15 rounded-full text-xs lg:text-[13px] uppercase tracking-[0.08em] font-medium select-none"
      role="group"
      aria-label="Language switcher"
    >
      {/* Fondo deslizante detrás del idioma activo */}
      <motion.div
        className="absolute top-0.5 bottom-0.5 rounded-full bg-foreground"
        initial={false}
        animate={{
          left: `calc(${activeIndex * 50}% + 2px)`,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        style={{ width: 'calc(50% - 4px)' }}
      />

      {locales.map((locale) => {
        const isActive = currentLocale === locale;

        return (
          <motion.button
            key={locale}
            onClick={() => switchLocale(locale)}
            disabled={isPending}
            className={`relative z-10 w-9 lg:w-10 py-1.5 rounded-full transition-colors duration-300 ${
              isActive ? 'text-background' : 'text-foreground/45 hover:text-foreground/80'
            }`}
            whileTap={{ scale: 0.95 }}
            aria-pressed={isActive}
            aria-label={`${locale === 'en' ? 'English' : 'Español'}`}
          >
            {locale}
          </motion.button>
        );
      })}
    </div>
  );
}
