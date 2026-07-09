'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';

export function Skills() {
  const t = useTranslations('skills');
  
  const categories = t.raw('categories') as Array<{
    name: string;
    items: string[];
  }>;

  return (
    <section id="skills" className="py-24 lg:py-32 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="text-xs uppercase tracking-[0.2em] text-foreground/40 mb-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {t('eyebrow')}
          </motion.p>
          <motion.h2
            className="text-[clamp(3rem,10vw,6rem)] font-bold leading-[0.9] tracking-tighter uppercase"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 60 }}
          >
            {t('title')}
          </motion.h2>
        </motion.div>

        {/* Skills Grid - Diseño limpio y legible */}
        <div className="space-y-16 lg:space-y-24">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ 
                duration: 0.8, 
                delay: categoryIndex * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-6 mb-8 pb-4 border-b border-foreground/10">
                <motion.span
                  className="text-5xl lg:text-6xl font-bold text-foreground/5 tabular-nums"
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: categoryIndex * 0.1 + 0.2, type: 'spring' }}
                >
                  {String(categoryIndex + 1).padStart(2, '0')}
                </motion.span>
                <div className="flex-1">
                  <motion.h3
                    className="text-2xl lg:text-3xl font-bold tracking-tight"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 + 0.3 }}
                  >
                    {category.name}
                  </motion.h3>
                  <motion.div
                    className="mt-2 text-sm text-foreground/40"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 + 0.4 }}
                  >
                    {category.items.length} {category.items.length === 1 ? t('skillSingular') : t('skillPlural')}
                  </motion.div>
                </div>
              </div>

              {/* Skills List */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.03,
                      delayChildren: categoryIndex * 0.1 + 0.5,
                    },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      },
                    }}
                    whileHover={{
                      y: -4,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <div className="group relative h-full px-4 py-3 lg:px-5 lg:py-4 border border-foreground/10 hover:border-foreground/30 bg-background hover:bg-foreground/[0.02] transition-all duration-300 cursor-pointer">
                      <span className="text-sm lg:text-base font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                        {item}
                      </span>
                      
                      {/* Accent dot */}
                      <motion.div
                        className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-foreground/0 group-hover:bg-foreground/30"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
