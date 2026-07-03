'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { motion } from 'motion/react';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  
  const currentLocale = params.locale as 'en' | 'es';

  const switchLocale = (locale: 'en' | 'es') => {
    startTransition(() => {
      router.replace(pathname, { locale });
    });
  };

  return (
    <div className="flex items-center gap-2 text-sm lg:text-[15px] uppercase tracking-[0.08em] font-normal">
      {/* Botón EN */}
      <motion.button
        onClick={() => switchLocale('en')}
        className={`px-1.5 transition-opacity ${
          currentLocale === 'en'
            ? 'text-foreground opacity-100'
            : 'text-foreground opacity-40'
        }`}
        disabled={isPending}
        whileHover={{ opacity: currentLocale === 'en' ? 1 : 0.7 }}
        whileTap={{ scale: 0.98 }}
      >
        EN
      </motion.button>

      <span className="text-foreground opacity-20 select-none font-light">/</span>

      {/* Botón ES */}
      <motion.button
        onClick={() => switchLocale('es')}
        className={`px-1.5 transition-opacity ${
          currentLocale === 'es'
            ? 'text-foreground opacity-100'
            : 'text-foreground opacity-40'
        }`}
        disabled={isPending}
        whileHover={{ opacity: currentLocale === 'es' ? 1 : 0.7 }}
        whileTap={{ scale: 0.98 }}
      >
        ES
      </motion.button>
    </div>
  );
}
