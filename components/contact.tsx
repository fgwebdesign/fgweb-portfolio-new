'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from './reveal';

export function Contact() {
  const t = useTranslations('contact');

  return (
    <section id="contact" className="py-24 lg:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-sm uppercase tracking-[0.12em] text-secondary mb-4">
              {t('subtitle')}
            </p>
            <h2 className="text-[clamp(1.75rem,8vw,2.25rem)] lg:text-[clamp(2.5rem,5vw,4.5rem)] font-medium mb-8">
              {t('title')}
            </h2>
            <p className="text-lg lg:text-xl text-foreground/70 leading-relaxed max-w-2xl mx-auto mb-12">
              {t('description')}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="text-center">
            <a
              href={`mailto:${t('email')}`}
              className="inline-flex items-center gap-3 text-xl lg:text-2xl font-medium hover:text-secondary transition-colors mb-8"
            >
              {t('email')}
              <span className="text-base">↗</span>
            </a>
            
            <div className="flex justify-center mt-8">
              <a
                href={`mailto:${t('email')}`}
                className="px-8 py-4 bg-foreground text-background text-sm uppercase tracking-[0.12em] font-medium hover:opacity-90 transition-opacity"
              >
                {t('ctaEmail')}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
