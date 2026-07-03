'use client';

import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="border-t border-foreground/10 py-8 lg:py-12 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 text-sm text-secondary">
          <p>{t('copyright')}</p>
          <p>{t('built')}</p>
        </div>
      </div>
    </footer>
  );
}
