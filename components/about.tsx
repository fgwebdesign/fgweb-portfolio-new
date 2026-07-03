'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from './reveal';
import { CountUp } from './count-up';

export function About() {
  const t = useTranslations('about');
  
  const stats = t.raw('stats') as Array<{
    value: string;
    suffix: string;
    label: string;
  }>;

  return (
    <section id="about" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-[0.12em] text-secondary mb-4">
                {t('subtitle')}
              </p>
              <h2 className="text-[clamp(1.75rem,8vw,2.25rem)] lg:text-[clamp(2.5rem,5vw,4.5rem)] font-medium mb-8">
                {t('title')}
              </h2>
              <p className="text-lg lg:text-xl text-foreground/70 leading-relaxed max-w-2xl mx-auto">
                {t('description')}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pt-12 lg:pt-16 border-t border-foreground/10">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <CountUp 
                    end={parseInt(stat.value)} 
                    suffix={stat.suffix}
                    duration={2}
                  />
                  <p className="text-sm lg:text-base text-secondary uppercase tracking-[0.12em] mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
