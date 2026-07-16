'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'motion/react';
import Image from 'next/image';
import { getProductMeta, type ProductMeta } from '@/data/products-data';
import { SECTION_EASE, SECTION_VIEWPORT } from '@/lib/motion-viewport';

const EASE = SECTION_EASE;

function Barcode({ id }: { id: string }) {
  const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const bars = Array.from({ length: 28 }, (_, i) => {
    const height = ((seed * (i + 1)) % 3) + 1;
    const width = ((seed * (i + 2)) % 2) + 1;
    return { height: height * 25, width: width === 1 ? 2 : 3 };
  });

  return (
    <div className="flex items-end gap-[1px] h-8">
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

function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/40 mb-1">
        {label}
      </p>
      <p className="text-sm font-medium leading-snug">{value}</p>
    </div>
  );
}

function ProductImageFrame({
  meta,
  title,
  viewSiteLabel,
  className = '',
}: {
  meta: ProductMeta;
  title: string;
  viewSiteLabel: string;
  className?: string;
}) {
  return (
    <motion.a
      href={meta.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/img block relative overflow-hidden border border-foreground/10 bg-foreground/[0.02] hover:border-foreground/25 transition-colors ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={SECTION_VIEWPORT}
      transition={{ duration: 0.65, ease: EASE }}
      whileHover={{ y: -4 }}
    >
      <div className="relative aspect-[4/3] w-full p-4 sm:p-6">
        <Image
          src={meta.image}
          alt={title}
          fill
          loading="lazy"
          quality={90}
          className="object-contain object-center transition-transform duration-700 group-hover/img:scale-[1.02]"
          sizes="(max-width: 768px) 92vw, (max-width: 1024px) 45vw, 520px"
        />
      </div>
      <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-background/95 backdrop-blur-sm px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] font-medium border border-foreground/10 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
        <ExternalLinkIcon />
        {viewSiteLabel}
      </div>
    </motion.a>
  );
}

type Product = {
  id: string;
  title: string;
  tagline: string;
  year: string;
  category: string;
  stack: string;
  role: string;
  description: string;
  features: string[];
};

function ProductShowcase({
  product,
  meta,
  t,
  tCommon,
}: {
  product: Product;
  meta: ProductMeta;
  t: ReturnType<typeof useTranslations<'products'>>;
  tCommon: ReturnType<typeof useTranslations<'common'>>;
}) {
  return (
    <div className="relative border border-foreground/10 bg-background">
      {/* Meta bar */}
      <motion.div
        className="flex flex-wrap items-center justify-between gap-4 px-5 sm:px-8 py-4 border-b border-foreground/10"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={SECTION_VIEWPORT}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <div className="flex items-center gap-4">
          <Barcode id={product.id} />
          <p className="text-[10px] tracking-[0.15em] text-foreground/40 uppercase">
            {t('productIdLabel')}: {product.id}
          </p>
        </div>
        <div className="flex items-center gap-6 sm:gap-8 text-right">
          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/40 mb-0.5">
              {t('statusLabel')}
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.1em]">
              {t('statusLive')}
            </p>
          </div>
          <p className="text-xl sm:text-2xl font-bold tabular-nums">{product.year}</p>
        </div>
      </motion.div>

      <div className="px-5 sm:px-8 pt-8 pb-8 lg:pt-10 lg:pb-10">
        {/* Title block */}
        <motion.div
          className="mb-8 lg:mb-10 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SECTION_VIEWPORT}
          transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
        >
          <h3 className="text-[clamp(1.75rem,4.5vw,3rem)] font-bold leading-[1.05] tracking-tight uppercase mb-3">
            {product.title}
          </h3>
          <p className="text-base lg:text-lg text-foreground/60 leading-relaxed">
            {product.tagline}
          </p>
        </motion.div>

        {/* Image + content */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <motion.div
            className="lg:col-span-5 xl:col-span-5 max-w-xl lg:max-w-none mx-auto lg:mx-0 w-full"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={SECTION_VIEWPORT}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            <ProductImageFrame
              meta={meta}
              title={product.title}
              viewSiteLabel={tCommon('viewSite')}
            />
          </motion.div>

          <motion.div
            className="lg:col-span-7 xl:col-span-7 space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={SECTION_VIEWPORT}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-6 border-b border-foreground/10">
              <MetaField label={t('stackLabel')} value={product.stack} />
              <MetaField label={t('roleLabel')} value={product.role} />
              <MetaField label={t('categoryLabel')} value={product.category} />
            </div>

            <p className="text-sm lg:text-base leading-relaxed text-foreground/70 max-w-2xl">
              {product.description}
            </p>

            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/40 mb-3">
                {t('featuresLabel')}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.features.map((feature, fi) => (
                  <motion.span
                    key={feature}
                    className="px-3 py-1.5 text-[10px] uppercase tracking-[0.1em] border border-foreground/15 bg-foreground/[0.02]"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={SECTION_VIEWPORT}
                    transition={{ delay: 0.2 + fi * 0.04, duration: 0.45, ease: EASE }}
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
              className="inline-flex items-center justify-center gap-3 group/btn relative w-full sm:w-auto px-8 py-3.5 border border-foreground text-xs uppercase tracking-[0.15em] font-medium overflow-hidden"
              whileHover={{ scale: 1.02 }}
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
              <span className="absolute inset-0 flex items-center justify-center gap-3 text-background text-xs uppercase tracking-[0.15em] font-medium opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                {t('visitWebsite')}
                <ExternalLinkIcon />
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ProductSplit({
  product,
  meta,
  t,
  isEven,
}: {
  product: Product;
  meta: ProductMeta;
  t: ReturnType<typeof useTranslations<'products'>>;
  isEven: boolean;
}) {
  return (
    <div
      className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center border border-foreground/10 p-5 sm:p-8 ${isEven ? '' : 'lg:grid-flow-dense'}`}
    >
      <motion.div
        className={`max-w-md mx-auto lg:max-w-none w-full ${isEven ? 'lg:col-start-1' : 'lg:col-start-2'}`}
        initial={{ opacity: 0, x: isEven ? -24 : 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={SECTION_VIEWPORT}
        transition={{ duration: 0.65, ease: EASE }}
      >
        <ProductImageFrame
          meta={meta}
          title={product.title}
          viewSiteLabel={t('visitWebsite')}
          className="max-w-sm mx-auto lg:max-w-none"
        />
      </motion.div>

      <motion.div
        className={`space-y-6 ${isEven ? 'lg:col-start-2' : 'lg:col-start-1'}`}
        initial={{ opacity: 0, x: isEven ? 24 : -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={SECTION_VIEWPORT}
        transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
      >
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2">
            {product.year} / {product.category}
          </p>
          <h3 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold leading-[1.05] tracking-tight uppercase">
            {product.title}
          </h3>
        </div>

        <div className="w-16 h-px bg-foreground/30" />

        <p className="text-base text-foreground/60">{product.tagline}</p>
        <p className="text-sm leading-relaxed text-foreground/70">{product.description}</p>

        <div className="flex flex-wrap gap-2">
          {product.features.slice(0, 4).map((feature) => (
            <span
              key={feature}
              className="px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] border border-foreground/15"
            >
              {feature}
            </span>
          ))}
        </div>

        <p className="text-sm text-foreground/50">{product.stack}</p>

        <motion.a
          href={meta.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 w-full sm:w-fit px-8 py-3.5 border border-foreground text-xs uppercase tracking-[0.15em] font-medium hover:bg-foreground hover:text-background transition-colors duration-300"
          whileHover={{ x: 4 }}
        >
          {t('visitWebsite')}
          <ExternalLinkIcon />
        </motion.a>
      </motion.div>
    </div>
  );
}

export function Products() {
  const t = useTranslations('products');
  const tCommon = useTranslations('common');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const products = t.raw('list') as Product[];

  const getLayout = (index: number) => {
    const layouts = ['showcase', 'split'] as const;
    return layouts[index % layouts.length];
  };

  return (
    <section id="products" className="py-24 lg:py-32 bg-background overflow-hidden">
      <div ref={sectionRef} className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="mb-12 lg:mb-20"
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: EASE }}
        >
          <div className="flex items-start justify-between gap-6 mb-6">
            <div>
              <motion.p
                className="text-xs uppercase tracking-[0.2em] text-foreground/40 mb-3"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1, ease: EASE }}
              >
                {t('volumeLabel')}
              </motion.p>
              <motion.h2
                className="text-[clamp(2.25rem,8vw,5.5rem)] font-bold leading-[0.9] tracking-tighter uppercase"
                initial={{ opacity: 0, x: -32 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15, duration: 0.7, ease: EASE }}
              >
                {t('title')}
              </motion.h2>
            </div>

            <motion.div
              className="text-right shrink-0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, ease: EASE }}
            >
              <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/60 mb-1">
                {t('builtLabel')}
              </p>
              <p className="text-base lg:text-xl font-bold tabular-nums">{t('yearsRange')}</p>
            </motion.div>
          </div>

          <motion.p
            className="text-xs sm:text-sm uppercase tracking-[0.15em] text-foreground/50 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, ease: EASE }}
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>

        {/* Products */}
        <div className="space-y-12 lg:space-y-16">
          {products.map((product, index) => {
            const meta = getProductMeta(product.id);
            if (!meta) return null;

            const layout = getLayout(index);
            const isEven = index % 2 === 0;

            return (
              <motion.article
                key={product.id}
                className="group relative"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={SECTION_VIEWPORT}
                transition={{ duration: 0.6, ease: EASE }}
              >
                {layout === 'showcase' ? (
                  <ProductShowcase
                    product={product}
                    meta={meta}
                    t={t}
                    tCommon={tCommon}
                  />
                ) : (
                  <ProductSplit product={product} meta={meta} t={t} isEven={isEven} />
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
