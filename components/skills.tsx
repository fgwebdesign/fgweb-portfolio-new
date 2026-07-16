'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'motion/react';
import { Reveal } from './reveal';
import { StaggerContainer, StaggerItem } from './stagger-container';
import { SkillTile } from './skill-tile';
import { useIsDesktop } from '@/hooks/use-is-desktop';

function CategoryHeader({
  index,
  name,
  skillLabel,
}: {
  index: number;
  name: string;
  skillLabel: string;
}) {
  const isDesktop = useIsDesktop();
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className="flex items-center gap-4 lg:gap-6 mb-6 lg:mb-10">
        <span className="text-4xl lg:text-5xl font-bold text-foreground/[0.06] tabular-nums leading-none">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="flex-1 border-b border-foreground/10 pb-4">
          <h3 className="text-lg lg:text-xl font-bold uppercase tracking-tight">{name}</h3>
          <p className="mt-1 text-xs text-secondary uppercase tracking-[0.15em]">{skillLabel}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="flex items-center gap-4 lg:gap-6 mb-6 lg:mb-10"
      initial={{
        opacity: 0,
        x: index % 2 === 0 ? (isDesktop ? -60 : -30) : isDesktop ? 60 : 30,
        filter: 'blur(10px)',
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        type: 'spring',
        stiffness: 220,
        damping: 28,
        mass: 0.7,
      }}
    >
      <motion.span
        className="text-4xl lg:text-5xl font-bold text-foreground/[0.06] tabular-nums leading-none"
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24, delay: 0.05 }}
      >
        {String(index + 1).padStart(2, '0')}
      </motion.span>
      <div className="flex-1 border-b border-foreground/10 pb-4">
        <h3 className="text-lg lg:text-xl font-bold uppercase tracking-tight">{name}</h3>
        <p className="mt-1 text-xs text-secondary uppercase tracking-[0.15em]">{skillLabel}</p>
      </div>
    </motion.div>
  );
}

function CategoryGrid({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className="relative rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-4 sm:p-6 lg:p-8">
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className="relative rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-4 sm:p-6 lg:p-8 shadow-[0_16px_48px_rgba(10,10,10,0.05)]"
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, y: 50, scale: 0.94, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 30,
        mass: 0.8,
      }}
    >
      <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-foreground/[0.04] pointer-events-none" />
      {children}
    </motion.div>
  );
}

export function Skills() {
  const t = useTranslations('skills');

  const categories = t.raw('categories') as Array<{
    name: string;
    items: string[];
  }>;

  return (
    <section id="skills" className="py-24 lg:py-48 bg-background overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <Reveal className="mb-12 lg:mb-24 text-center lg:text-left" amount={0.3}>
          <p className="text-xs uppercase tracking-[0.2em] text-secondary mb-4">
            {t('eyebrow')}
          </p>
          <h2 className="text-[clamp(2.5rem,8vw,5rem)] font-bold leading-[0.95] tracking-tight uppercase">
            {t('title')}
          </h2>
          <p className="mt-6 text-base lg:text-lg text-foreground/60 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            {t('subtitle')}
          </p>
        </Reveal>

        {/* Categorías con animación bidireccional al scroll */}
        <div className="space-y-12 lg:space-y-24">
          {categories.map((category, catIndex) => (
            <div key={category.name}>
              <CategoryHeader
                index={catIndex}
                name={category.name}
                skillLabel={`${category.items.length} ${
                  category.items.length === 1 ? t('skillSingular') : t('skillPlural')
                }`}
              />

              <CategoryGrid>
                <StaggerContainer
                  staggerDelay={0.05}
                  initialDelay={0.08}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-5"
                >
                  {category.items.map((skill) => (
                    <StaggerItem key={`${category.name}-${skill}`}>
                      <SkillTile name={skill} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </CategoryGrid>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
