'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from './reveal';

export function Skills() {
  const t = useTranslations('skills');
  
  const categories = t.raw('categories') as Array<{
    name: string;
    items: string[];
  }>;

  return (
    <section id="skills" className="py-24 lg:py-32 bg-background">
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

        <div className="space-y-12 lg:space-y-16 max-w-5xl mx-auto">
          {categories.map((category, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <div>
                <h3 className="text-sm uppercase tracking-[0.12em] text-secondary mb-6">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.items.map((item, itemIndex) => (
                    <span
                      key={itemIndex}
                      className="px-4 py-2 border border-foreground/10 text-foreground/80 hover:border-foreground/30 hover:text-foreground transition-colors text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
