'use client';

import { useTranslations } from 'next-intl';
import { StaggerContainer, StaggerItem } from './stagger-container';
import { Reveal } from './reveal';

export function Education() {
  const t = useTranslations('education');
  
  const items = t.raw('items') as Array<{
    title: string;
    institution: string;
    year: string;
    type: string;
  }>;

  return (
    <section id="education" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16 lg:mb-24">
            <p className="text-sm uppercase tracking-[0.12em] text-secondary mb-4">
              {t('subtitle')}
            </p>
            <h2 className="text-[clamp(1.75rem,8vw,2.25rem)] lg:text-[clamp(2.5rem,5vw,4.5rem)] font-medium">
              {t('title')}
            </h2>
          </div>
        </Reveal>

        <StaggerContainer staggerDelay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {items.map((item, index) => (
              <StaggerItem key={index}>
                <div className="border border-foreground/10 p-8 hover:border-foreground/30 transition-colors">
                  <p className="text-sm text-secondary uppercase tracking-[0.12em] mb-4">
                    {item.type} • {item.year}
                  </p>
                  <h3 className="text-lg font-medium mb-2">
                    {item.title}
                  </h3>
                  <p className="text-foreground/70">
                    {item.institution}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
