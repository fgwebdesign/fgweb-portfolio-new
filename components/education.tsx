'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { certificationsData, certificationTypeLabels, localizeText } from '@/data/certifications-data';
import type { Locale } from '@/data/experience-data';

export function Education() {
  const t = useTranslations('education');
  const tCommon = useTranslations('common');
  const locale = useLocale() as Locale;
  const [showAll, setShowAll] = useState(false);

  const items = certificationsData;

  // Mostrar solo los primeros 3 items por defecto
  const displayedItems = showAll ? items : items.slice(0, 3);
  const hasMore = items.length > 3;

  return (
    <section id="education" className="py-32 lg:py-48 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute top-1/4 left-0 w-1/3 h-px bg-foreground" />
        <div className="absolute bottom-1/4 right-0 w-1/3 h-px bg-foreground" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-24 lg:mb-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="flex items-center gap-4 mb-6"
            animate={{
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="w-12 lg:w-16 h-px bg-foreground/30" />
            <p className="text-xs lg:text-sm uppercase tracking-[0.25em] text-foreground/40 font-medium">
              {t('subtitle')}
            </p>
          </motion.div>
          
          <motion.h2
            className="font-[family-name:var(--font-manrope)] text-[clamp(2.5rem,10vw,4rem)] lg:text-[clamp(4rem,8vw,7rem)] font-black tracking-tighter leading-[0.9]"
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {t('title')}
          </motion.h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {displayedItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative group"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
            >
              {/* Background number */}
              <motion.div
                className="absolute -top-6 -right-4 text-[100px] lg:text-[140px] font-black text-foreground/[0.02] select-none -z-10"
                animate={{
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 8 + index,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </motion.div>

              {/* Card */}
              <div className="border border-foreground/10 p-8 lg:p-10 group-hover:border-foreground/30 transition-colors bg-background h-full">
                {/* Header */}
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-foreground/40 font-medium mb-1">
                    {localizeText(certificationTypeLabels[item.type], locale)}
                  </p>
                  <p className="text-2xl lg:text-3xl font-bold text-foreground/80">
                    {item.year}
                  </p>
                </div>

                {/* Line separator */}
                <motion.div
                  className="w-16 h-0.5 bg-foreground/20 mb-6 group-hover:w-24 group-hover:bg-foreground/40 transition-all duration-300"
                  initial={{ width: 0 }}
                  whileInView={{ width: '4rem' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                />

                {/* Content */}
                <h3 className="text-xl lg:text-2xl font-bold mb-4 group-hover:text-foreground/80 transition-colors">
                  {localizeText(item.title, locale)}
                </h3>
                <p className="text-base lg:text-lg text-foreground/60 leading-relaxed">
                  {item.institution}
                </p>

                {/* Mini barcode */}
                <motion.div
                  className="flex gap-0.5 mt-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.8 }}
                >
                  {[14, 20, 16, 22, 18, 24, 15, 21].map((height, i) => (
                    <motion.div
                      key={i}
                      className="w-0.5 bg-foreground/15"
                      style={{ height: `${height}px` }}
                      animate={{
                        scaleY: [1, 1.3, 1],
                        opacity: [0.15, 0.3, 0.15],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </motion.div>
              </div>

              {/* Corner accent */}
              <motion.div
                className="absolute top-0 right-0 w-0 h-0 border-t-[3px] border-r-[3px] border-foreground"
                initial={{ width: 0, height: 0 }}
                whileHover={{
                  width: 32,
                  height: 32,
                  transition: { duration: 0.3 },
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Botón Cargar más */}
        {hasMore && !showAll && (
          <motion.div
            className="mt-24 lg:mt-32 flex justify-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.button
              onClick={() => setShowAll(true)}
              className="group relative px-12 py-5 border-2 border-foreground text-foreground text-sm uppercase tracking-[0.2em] font-medium overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">{tCommon('loadMore')}</span>
              
              <motion.div
                className="absolute inset-0 bg-foreground"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
                style={{ originX: 0 }}
              />
              
              <motion.span
                className="absolute inset-0 flex items-center justify-center text-background text-sm uppercase tracking-[0.2em] font-medium"
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {tCommon('loadMore')}
              </motion.span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
