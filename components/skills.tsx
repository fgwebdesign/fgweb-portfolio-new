'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { SkillTile } from './skill-tile';

export function Skills() {
  const t = useTranslations('skills');

  const categories = t.raw('categories') as Array<{
    name: string;
    items: string[];
  }>;

  return (
    <section id="skills" className="py-32 lg:py-48 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="mb-16 lg:mb-24 text-center lg:text-left"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="text-xs uppercase tracking-[0.2em] text-secondary mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t('eyebrow')}
          </motion.p>
          <motion.h2
            className="text-[clamp(2.5rem,8vw,5rem)] font-bold leading-[0.95] tracking-tight uppercase"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {t('title')}
          </motion.h2>
          <motion.p
            className="mt-6 text-base lg:text-lg text-foreground/60 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>

        {/* Categorías con subtítulos */}
        <div className="space-y-16 lg:space-y-24">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.8,
                delay: catIndex * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Subtítulo de categoría */}
              <div className="flex items-center gap-6 mb-8 lg:mb-10">
                <span className="text-4xl lg:text-5xl font-bold text-foreground/[0.06] tabular-nums leading-none">
                  {String(catIndex + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 border-b border-foreground/10 pb-4">
                  <h3 className="text-lg lg:text-xl font-bold uppercase tracking-tight">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-xs text-secondary uppercase tracking-[0.15em]">
                    {category.items.length}{' '}
                    {category.items.length === 1 ? t('skillSingular') : t('skillPlural')}
                  </p>
                </div>
              </div>

              {/* Grid de la categoría */}
              <div
                className="relative rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-6 lg:p-8 shadow-[0_16px_48px_rgba(10,10,10,0.05)]"
                style={{ perspective: 1200 }}
              >
                <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-foreground/[0.04] pointer-events-none" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-5">
                  {category.items.map((skill, index) => (
                    <SkillTile
                      key={`${category.name}-${skill}`}
                      name={skill}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
