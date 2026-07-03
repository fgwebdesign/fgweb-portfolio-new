'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from './reveal';

export function Experience() {
  const t = useTranslations('experience');
  
  const jobs = t.raw('jobs') as Array<{
    company: string;
    role: string;
    period: string;
    location: string;
    description: string;
  }>;

  return (
    <section id="experience" className="py-24 lg:py-32 bg-background">
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

        <div className="max-w-4xl mx-auto space-y-12 lg:space-y-16">
          {jobs.map((job, index) => (
            <Reveal
              key={index}
              direction={index % 2 === 0 ? 'left' : 'right'}
              delay={index * 0.1}
            >
              <div className="border-l-2 border-foreground/10 pl-8 lg:pl-12">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div>
                    <h3 className="text-xl lg:text-2xl font-medium mb-2">
                      {job.role}
                    </h3>
                    <p className="text-foreground/70 font-medium">
                      {job.company}
                    </p>
                  </div>
                  <div className="text-sm text-secondary mt-2 lg:mt-0 lg:text-right">
                    <p>{job.period}</p>
                    <p>{job.location}</p>
                  </div>
                </div>
                <p className="text-foreground/70 leading-relaxed">
                  {job.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
