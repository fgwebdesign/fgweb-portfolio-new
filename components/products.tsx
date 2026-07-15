'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'motion/react';
import Image from 'next/image';
import { getProductMeta } from '@/data/products-data';

const EASE = [0.22, 1, 0.36, 1] as const;

function Barcode({ id }: { id: string }) {
  const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const bars = Array.from({ length: 35 }, (_, i) => {
    const height = ((seed * (i + 1)) % 3) + 1;
    const width = ((seed * (i + 2)) % 2) + 1;
    return { height: height * 25, width: width === 1 ? 2 : 3 };
  });

  return (
    <div className="flex items-end gap-[1px] h-12">
      {bars.map((bar, i) => (
        <div
          key={i}
          className="bg-foreground"
          style={{ height: `${bar.height}%`, width: `${bar.width}px` }}
        />
      ))}
    </div>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5M10.5 13.5L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  );
}

export function Products() {
  const t = useTranslations('products');
  const tCommon = useTranslations('common');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const products = t.raw('list') as Array<{
    id: string;
    title: string;
    tagline: string;
    year: string;
    category: string;
    stack: string;
    role: string;
    description: string;
    features: string[];
  }>;

  const getLayout = (index: number) => {
    const layouts = ['showcase', 'split'] as const;
    return layouts[index % layouts.length];
  };

  return (
    <section id="products" className="py-24 lg:py-32 bg-background overflow-hidden">
      <div ref={sectionRef} className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="mb-20 lg:mb-32"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: EASE }}
        >
          <div className="flex items-start justify-between mb-8">
            <div>
              <motion.p
                className="text-xs uppercase tracking-[0.2em] text-foreground/40 mb-3"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 }}
              >
                {t('volumeLabel')}
              </motion.p>
              <motion.h2
                className="text-[clamp(3rem,15vw,12rem)] font-bold leading-[0.85] tracking-tighter uppercase"
                initial={{ opacity: 0, x: -100 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3, type: 'spring', stiffness: 50 }}
              >
                {t('title')}
              </motion.h2>
            </div>

            <motion.div
              className="hidden lg:block text-right"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              <p className="text-xs uppercase tracking-[0.15em] text-foreground/60 mb-2">
                {t('builtLabel')}
              </p>
              <p className="text-2xl font-bold">{t('yearsRange')}</p>
            </motion.div>
          </div>

          <motion.p
            className="text-sm uppercase tracking-[0.15em] text-foreground/50 max-w-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>

        {/* Products */}
        <div className="space-y-24 lg:space-y-40">
          {products.map((product, index) => {
            const meta = getProductMeta(product.id);
            if (!meta) return null;

            const layout = getLayout(index);
            const isEven = index % 2 === 0;

            return (
              <motion.article
                key={product.id}
                className="group relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.15, margin: '-80px' }}
                transition={{ duration: 0.6 }}
              >
                {layout === 'showcase' && (
                  <div className="relative">
                    {/* Metadata bar */}
                    <motion.div
                      className="flex items-start justify-between mb-8 pb-6 border-b border-foreground/10 group-hover:border-foreground/30 transition-colors"
                      initial={{ opacity: 0, y: -60, filter: 'blur(10px)' }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
                    >
                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, x: -80, rotateY: -90 }}
                        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                      >
                        <Barcode id={product.id} />
                        <p className="text-xs tracking-[0.15em] text-foreground/40">
                          {t('productIdLabel')}: {product.id.toUpperCase()}
                        </p>
                      </motion.div>

                      <motion.div
                        className="text-right"
                        initial={{ opacity: 0, x: 80, rotateY: 90 }}
                        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                      >
                        <p className="text-xs uppercase tracking-[0.15em] text-foreground/40 mb-1">
                          {t('statusLabel')}
                        </p>
                        <p className="text-sm font-semibold uppercase tracking-[0.1em]">
                          {t('statusLive')}
                        </p>
                        <p className="text-4xl font-bold mt-2">{product.year}</p>
                      </motion.div>
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      className="text-[clamp(2.5rem,10vw,7rem)] font-bold leading-[0.9] tracking-tighter uppercase mb-4"
                      initial={{ opacity: 0, y: 100, filter: 'blur(20px)', scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 1, delay: 0.2, ease: EASE }}
                    >
                      {product.title}
                    </motion.h3>

                    <motion.p
                      className="text-lg lg:text-xl text-foreground/60 font-medium mb-10 max-w-2xl"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
                    >
                      {product.tagline}
                    </motion.p>

                    {/* Featured image */}
                    <motion.a
                      href={meta.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative aspect-[21/9] mb-10 overflow-hidden border border-foreground/10 group-hover:border-foreground/25 transition-colors"
                      initial={{ opacity: 0, scale: 0.92, rotateX: -12 }}
                      whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 1, delay: 0.4, ease: EASE }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <Image
                        src={meta.image}
                        alt={product.title}
                        fill
                        loading="lazy"
                        quality={75}
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 1200px"
                      />
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
                      <motion.div
                        className="absolute bottom-6 right-6 flex items-center gap-2 bg-background/90 backdrop-blur-sm px-4 py-2 text-xs uppercase tracking-[0.15em] font-medium"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                      >
                        <ExternalLinkIcon />
                        {tCommon('viewSite')}
                      </motion.div>
                    </motion.a>

                    {/* Content grid */}
                    <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
                      <motion.div
                        className="lg:col-span-4 space-y-6"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
                      >
                        <div>
                          <p className="text-xs uppercase tracking-[0.15em] text-foreground/40 mb-2">
                            {t('stackLabel')}
                          </p>
                          <p className="text-sm font-medium">{product.stack}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.15em] text-foreground/40 mb-2">
                            {t('roleLabel')}
                          </p>
                          <p className="text-sm font-medium">{product.role}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.15em] text-foreground/40 mb-2">
                            {t('categoryLabel')}
                          </p>
                          <p className="text-sm font-medium">{product.category}</p>
                        </div>
                      </motion.div>

                      <motion.div
                        className="lg:col-span-8 space-y-8"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
                      >
                        <p className="text-base lg:text-lg leading-relaxed text-foreground/70">
                          {product.description}
                        </p>

                        <div>
                          <p className="text-xs uppercase tracking-[0.15em] text-foreground/40 mb-4">
                            {t('featuresLabel')}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {product.features.map((feature, fi) => (
                              <motion.span
                                key={feature}
                                className="px-4 py-2 text-xs uppercase tracking-[0.1em] border border-foreground/15 hover:border-foreground/40 hover:bg-foreground/[0.03] transition-colors"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6 + fi * 0.05, duration: 0.5, ease: EASE }}
                              >
                                {feature}
                              </motion.span>
                            ))}
                          </div>
                        </div>

                        <motion.a
                          href={meta.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 group/btn relative px-8 py-4 border-2 border-foreground text-sm uppercase tracking-[0.2em] font-medium overflow-hidden"
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.7, duration: 0.6, ease: EASE }}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="relative z-10 group-hover/btn:opacity-0 transition-opacity duration-300">
                            {t('visitWebsite')}
                          </span>
                          <span className="relative z-10 group-hover/btn:opacity-0 transition-opacity duration-300">
                            <ExternalLinkIcon />
                          </span>
                          <motion.div
                            className="absolute inset-0 bg-foreground"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.35 }}
                            style={{ originX: 0 }}
                          />
                          <span className="absolute inset-0 flex items-center justify-center gap-3 text-background text-sm uppercase tracking-[0.2em] font-medium opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                            {t('visitWebsite')}
                            <ExternalLinkIcon />
                          </span>
                        </motion.a>
                      </motion.div>
                    </div>
                  </div>
                )}

                {layout === 'split' && (
                  <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 ${isEven ? '' : 'lg:grid-flow-dense'}`}>
                    <motion.div
                      className={isEven ? 'lg:col-start-1' : 'lg:col-start-2'}
                      initial={{
                        opacity: 0,
                        x: isEven ? -100 : 100,
                        scale: 0.9,
                      }}
                      whileInView={{ opacity: 1, x: 0, scale: 1 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ duration: 1, delay: 0.2, ease: EASE }}
                    >
                      <a
                        href={meta.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block aspect-[4/5] relative overflow-hidden border border-foreground/10 hover:border-foreground/25 transition-colors group/img"
                      >
                        <Image
                          src={meta.image}
                          alt={product.title}
                          fill
                          loading="lazy"
                          quality={75}
                          className="object-cover object-top transition-transform duration-700 group-hover/img:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute top-6 left-6 z-10 bg-background/90 backdrop-blur-sm p-2 rounded">
                          <Barcode id={product.id} />
                        </div>
                      </a>
                    </motion.div>

                    <motion.div
                      className={`flex flex-col justify-center ${isEven ? 'lg:col-start-2' : 'lg:col-start-1'}`}
                      initial={{
                        opacity: 0,
                        x: isEven ? 100 : -100,
                        filter: 'blur(10px)',
                      }}
                      whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ duration: 1, delay: 0.3, ease: EASE }}
                    >
                      <div className="space-y-6">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-foreground/40 mb-2">
                            {product.year} / {product.category}
                          </p>
                          <h3 className="text-[clamp(2rem,6vw,4rem)] font-bold leading-[0.95] tracking-tighter uppercase">
                            {product.title}
                          </h3>
                        </div>

                        <motion.div
                          className="w-24 h-[2px] bg-foreground"
                          initial={{ width: 0, opacity: 0 }}
                          whileInView={{ width: '6rem', opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
                        />

                        <p className="text-lg text-foreground/60 font-medium">{product.tagline}</p>

                        <p className="text-base leading-relaxed text-foreground/70">{product.description}</p>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {product.features.slice(0, 4).map((feature) => (
                            <span
                              key={feature}
                              className="px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] border border-foreground/15"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>

                        <p className="text-sm font-medium text-foreground/50">{product.stack}</p>

                        <motion.a
                          href={meta.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 w-fit mt-4 px-8 py-4 border-2 border-foreground text-sm uppercase tracking-[0.2em] font-medium hover:bg-foreground hover:text-background transition-colors duration-300"
                          whileHover={{ x: 4 }}
                        >
                          {t('visitWebsite')}
                          <ExternalLinkIcon />
                        </motion.a>
                      </div>
                    </motion.div>
                  </div>
                )}

                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-foreground"
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: '100%', opacity: 0.25 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 1, delay: 0.6, ease: EASE }}
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
