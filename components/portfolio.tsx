'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import {
  orderPortfolioProjects,
  getPortfolioProjectImage,
  getPortfolioProjectAspect,
  type PortfolioProject,
} from '@/data/portfolio-projects';
import {
  useSectionScrollProgress,
  useSegmentProgress,
  useRevealMotion,
  scrollItemRange,
  scrollItemPartRange,
} from '@/hooks/use-scroll-reveal';
import type { MotionValue } from 'motion/react';

type PortfolioVisualSize = 'featured' | 'standard' | 'column';

const VISUAL_SIZE_CLASS: Record<PortfolioVisualSize, string> = {
  featured: 'w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto',
  standard: 'w-full max-w-sm sm:max-w-lg lg:max-w-2xl mx-auto',
  column: 'w-full max-w-sm sm:max-w-md mx-auto lg:max-w-none lg:mx-0',
};

const IMAGE_SIZES: Record<PortfolioVisualSize, string> = {
  featured: '(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 960px',
  standard: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px',
  column: '(max-width: 1024px) 100vw, 45vw, 520px',
};

function parseStack(stack: string): string[] {
  return stack.split(',').map((item) => item.trim()).filter(Boolean);
}

function getCategoryLabel(
  category: string,
  labels: Record<string, string>,
): string {
  return labels[category] ?? category;
}

function PortfolioProjectVisual({
  projectId,
  projectTitle,
  index,
  imageUnavailableLabel,
  size = 'standard',
  className = '',
}: {
  projectId: string;
  projectTitle: string;
  index: number;
  imageUnavailableLabel: string;
  size?: PortfolioVisualSize;
  className?: string;
}) {
  const tCommon = useTranslations('common');
  const [imageError, setImageError] = useState(false);
  const [imagePath, setImagePath] = useState(() => getPortfolioProjectImage(projectId));
  const aspect = getPortfolioProjectAspect(projectId);

  const handleImageError = () => {
    const projectFallback = `/projects/${projectId}.png`;
    const jpgFallback = `/projects/${projectId}.jpg`;

    if (imagePath !== projectFallback) {
      setImagePath(projectFallback);
    } else if (imagePath.endsWith('.png')) {
      setImagePath(jpgFallback);
    } else {
      setImageError(true);
    }
  };

  if (imageError) {
    return (
      <div
        className={`relative overflow-hidden rounded-sm border border-dashed border-foreground/15 bg-foreground/[0.02] ${VISUAL_SIZE_CLASS[size]} ${className}`}
        style={{ aspectRatio: aspect }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
          <span className="text-[6rem] lg:text-[8rem] font-bold text-foreground/5 mb-4">
            {index + 1}
          </span>
          <p className="text-xs uppercase tracking-[0.15em] text-foreground/40 text-center">
            {imageUnavailableLabel}
          </p>
          <p className="text-sm text-foreground/30 text-center mt-2">{projectTitle}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${VISUAL_SIZE_CLASS[size]} ${className}`}>
      <div className="relative w-full" style={{ aspectRatio: aspect }}>
        <Image
          src={imagePath}
          alt={tCommon('projectOf', { name: projectTitle })}
          fill
          loading="lazy"
          quality={82}
          className="object-contain object-center drop-shadow-[0_24px_48px_rgba(0,0,0,0.14)] transition-transform duration-700 group-hover:scale-[1.02]"
          onError={handleImageError}
          sizes={IMAGE_SIZES[size]}
        />
      </div>
    </div>
  );
}

function PortfolioProjectEntry({
  project,
  index,
  totalProjects,
  sectionScroll,
  categoryLabels,
  imageUnavailableLabel,
  t,
}: {
  project: PortfolioProject;
  index: number;
  totalProjects: number;
  sectionScroll: MotionValue<number>;
  categoryLabels: Record<string, string>;
  imageUnavailableLabel: string;
  t: ReturnType<typeof useTranslations<'portfolio'>>;
}) {
  const shouldReduceMotion = useReducedMotion();
  const isReversed = index % 2 === 1;
  const projectNumber = String(index + 1).padStart(2, '0');
  const textFromX = isReversed ? 48 : -48;
  const imageFromX = isReversed ? -56 : 56;

  const itemRange = scrollItemRange(index, totalProjects, [0.14, 0.97]);
  const metaProgress = useSegmentProgress(
    sectionScroll,
    scrollItemPartRange(itemRange, 0, 0.28),
  );
  const titleProgress = useSegmentProgress(
    sectionScroll,
    scrollItemPartRange(itemRange, 0.06, 0.4),
  );
  const descProgress = useSegmentProgress(
    sectionScroll,
    scrollItemPartRange(itemRange, 0.12, 0.48),
  );
  const stackProgress = useSegmentProgress(
    sectionScroll,
    scrollItemPartRange(itemRange, 0.18, 0.54),
  );
  const imageProgress = useSegmentProgress(
    sectionScroll,
    scrollItemPartRange(itemRange, 0.08, 0.52),
  );

  const metaMotion = useRevealMotion(metaProgress, { y: 20, blur: 8 });
  const titleMotion = useRevealMotion(titleProgress, { y: 32, x: textFromX, blur: 12 });
  const descMotion = useRevealMotion(descProgress, { y: 28, x: textFromX * 0.6, blur: 10 });
  const stackMotion = useRevealMotion(stackProgress, { y: 24, x: textFromX * 0.4, blur: 8 });
  const imageMotion = useRevealMotion(imageProgress, {
    y: 36,
    x: imageFromX,
    scale: 0.9,
    blur: 14,
  });

  const meta = (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-8 lg:mb-10">
      <span className="text-xs font-mono tabular-nums text-foreground/35">{projectNumber}</span>
      <span className="hidden sm:block w-px h-3 bg-foreground/15" aria-hidden />
      <span className="text-[11px] uppercase tracking-[0.14em] text-foreground/50">
        {getCategoryLabel(project.category, categoryLabels)}
      </span>
      <span className="hidden sm:block w-px h-3 bg-foreground/15" aria-hidden />
      <span className="text-[11px] uppercase tracking-[0.14em] text-foreground/50 tabular-nums">
        {project.year}
      </span>
    </div>
  );

  const textContent = (
    <div className={isReversed ? 'lg:order-2' : 'lg:order-1'}>
      <h3 className="text-[clamp(1.625rem,3.2vw,2.625rem)] font-semibold leading-[1.12] tracking-tight uppercase text-foreground mb-5 lg:mb-6">
        {project.title}
      </h3>
      <p className="text-[0.95rem] lg:text-base leading-[1.75] text-foreground/60 max-w-xl mb-8">
        {project.description}
      </p>
      <div>
        <p className="text-[10px] uppercase tracking-[0.18em] text-foreground/40 mb-3">
          {t('stackLabel')}
        </p>
        <ul className="flex flex-wrap gap-2">
          {parseStack(project.stack).map((tech) => (
            <li
              key={tech}
              className="px-3 py-1.5 rounded-full bg-foreground text-background text-[11px] tracking-wide"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const visual = (
    <PortfolioProjectVisual
      projectId={project.id}
      projectTitle={project.title}
      index={index}
      size="column"
      imageUnavailableLabel={imageUnavailableLabel}
    />
  );

  if (shouldReduceMotion) {
    return (
      <article className="relative border-b border-foreground/10 py-12 lg:py-24 last:border-b-0">
        {meta}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 xl:gap-20 items-center">
          {textContent}
          <div className={isReversed ? 'lg:order-1' : 'lg:order-2'}>{visual}</div>
        </div>
      </article>
    );
  }

  return (
    <article className="relative border-b border-foreground/10 py-12 lg:py-24 last:border-b-0">
      <motion.div style={metaMotion}>{meta}</motion.div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 xl:gap-20 items-center">
        <div className={isReversed ? 'lg:order-2' : 'lg:order-1'}>
          <motion.h3
            className="text-[clamp(1.625rem,3.2vw,2.625rem)] font-semibold leading-[1.12] tracking-tight uppercase text-foreground mb-5 lg:mb-6"
            style={titleMotion}
          >
            {project.title}
          </motion.h3>

          <motion.p
            className="text-[0.95rem] lg:text-base leading-[1.75] text-foreground/60 max-w-xl mb-8"
            style={descMotion}
          >
            {project.description}
          </motion.p>

          <motion.div style={stackMotion}>
            <p className="text-[10px] uppercase tracking-[0.18em] text-foreground/40 mb-3">
              {t('stackLabel')}
            </p>
            <ul className="flex flex-wrap gap-2">
              {parseStack(project.stack).map((tech) => (
                <li
                  key={tech}
                  className="px-3 py-1.5 rounded-full bg-foreground text-background text-[11px] tracking-wide"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          className={isReversed ? 'lg:order-1' : 'lg:order-2'}
          style={{
            ...imageMotion,
            transformPerspective: 1200,
          }}
        >
          {visual}
        </motion.div>
      </div>
    </article>
  );
}

function PortfolioFilterButton({
  label,
  isActive,
  onClick,
  sectionScroll,
  range,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
  sectionScroll: MotionValue<number>;
  range: [number, number];
}) {
  const shouldReduceMotion = useReducedMotion();
  const progress = useSegmentProgress(sectionScroll, range);
  const motionStyle = useRevealMotion(progress, { y: 16, scale: 0.92, blur: 6 });

  if (shouldReduceMotion) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`px-4 lg:px-5 py-2 text-[11px] lg:text-xs uppercase tracking-[0.15em] font-medium transition-all ${
          isActive
            ? 'bg-foreground text-background'
            : 'border border-foreground/20 hover:border-foreground/60'
        }`}
      >
        {label}
      </button>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      style={motionStyle}
      className={`px-4 lg:px-5 py-2 text-[11px] lg:text-xs uppercase tracking-[0.15em] font-medium transition-colors ${
        isActive
          ? 'bg-foreground text-background'
          : 'border border-foreground/20 hover:border-foreground/60'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {label}
    </motion.button>
  );
}

export function Portfolio() {
  const t = useTranslations('portfolio');
  const shouldReduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState('all');
  const sectionRef = useRef<HTMLElement>(null);
  const sectionScroll = useSectionScrollProgress(sectionRef);

  const volumeProgress = useSegmentProgress(sectionScroll, [0.02, 0.1]);
  const titleProgress = useSegmentProgress(sectionScroll, [0.04, 0.12]);
  const yearsProgress = useSegmentProgress(sectionScroll, [0.05, 0.12]);
  const subtitleProgress = useSegmentProgress(sectionScroll, [0.07, 0.13]);
  const filtersBarProgress = useSegmentProgress(sectionScroll, [0.08, 0.13]);

  const projects = orderPortfolioProjects(
    t.raw('projects') as PortfolioProject[],
  );

  const filters = [
    { key: 'all', label: t('filterAll') },
    { key: 'landing', label: t('filterLanding') },
    { key: 'ecommerce', label: t('filterEcommerce') },
    { key: 'catalog', label: t('filterCatalog') },
  ];

  const categoryLabels = Object.fromEntries(
    filters.filter((f) => f.key !== 'all').map((f) => [f.key, f.label]),
  ) as Record<string, string>;

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((project) => project.category === activeFilter);

  const volumeMotion = useRevealMotion(volumeProgress, { x: -32, blur: 8 });
  const titleMotion = useRevealMotion(titleProgress, { x: -48, y: 24, blur: 12 });
  const yearsMotion = useRevealMotion(yearsProgress, { x: 32, scale: 0.92, blur: 8 });
  const subtitleMotion = useRevealMotion(subtitleProgress, { y: 20, blur: 6 });
  const filtersBarMotion = useRevealMotion(filtersBarProgress, { y: 20, blur: 8 });

  return (
    <section ref={sectionRef} id="portfolio" className="py-24 lg:py-32 bg-background overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        {shouldReduceMotion ? (
          <div className="mb-12 lg:mb-32">
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-foreground/40 mb-3">
                  {t('volumeLabel')}
                </p>
                <h2 className="text-[clamp(3rem,15vw,12rem)] font-bold leading-[0.85] tracking-tighter uppercase">
                  {t('title')}
                </h2>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs uppercase tracking-[0.15em] text-foreground/60 mb-1 lg:mb-2">
                  {t('selectedWorks')}
                </p>
                <p className="text-lg lg:text-2xl font-bold">{t('yearsRange')}</p>
              </div>
            </div>
            <p className="text-sm uppercase tracking-[0.15em] text-foreground/50 max-w-md">
              {t('subtitle')}
            </p>
          </div>
        ) : (
          <div className="mb-12 lg:mb-32">
            <div className="flex items-start justify-between mb-8">
              <div>
                <motion.p
                  className="text-xs uppercase tracking-[0.2em] text-foreground/40 mb-3"
                  style={volumeMotion}
                >
                  {t('volumeLabel')}
                </motion.p>
                <motion.h2
                  className="text-[clamp(3rem,15vw,12rem)] font-bold leading-[0.85] tracking-tighter uppercase"
                  style={titleMotion}
                >
                  {t('title')}
                </motion.h2>
              </div>
              <motion.div className="text-right shrink-0" style={yearsMotion}>
                <p className="text-xs uppercase tracking-[0.15em] text-foreground/60 mb-1 lg:mb-2">
                  {t('selectedWorks')}
                </p>
                <p className="text-lg lg:text-2xl font-bold">{t('yearsRange')}</p>
              </motion.div>
            </div>
            <motion.p
              className="text-sm uppercase tracking-[0.15em] text-foreground/50 max-w-md"
              style={subtitleMotion}
            >
              {t('subtitle')}
            </motion.p>
          </div>
        )}

        {/* Filters */}
        {shouldReduceMotion ? (
          <div className="flex flex-wrap gap-2 mb-12 lg:mb-28 border-t border-b border-foreground/10 py-4 lg:py-6">
            {filters.map((filter, index) => (
              <PortfolioFilterButton
                key={filter.key}
                label={filter.label}
                isActive={activeFilter === filter.key}
                onClick={() => setActiveFilter(filter.key)}
                sectionScroll={sectionScroll}
                range={scrollItemRange(index, filters.length, [0.085, 0.14])}
              />
            ))}
          </div>
        ) : (
          <motion.div
            className="flex flex-wrap gap-2 mb-12 lg:mb-28 border-t border-b border-foreground/10 py-4 lg:py-6"
            style={filtersBarMotion}
          >
            {filters.map((filter, index) => (
              <PortfolioFilterButton
                key={filter.key}
                label={filter.label}
                isActive={activeFilter === filter.key}
                onClick={() => setActiveFilter(filter.key)}
                sectionScroll={sectionScroll}
                range={scrollItemRange(index, filters.length, [0.085, 0.14])}
              />
            ))}
          </motion.div>
        )}

        {/* Projects */}
        <div>
          {filteredProjects.map((project, index) => (
            <PortfolioProjectEntry
              key={project.id}
              project={project}
              index={index}
              totalProjects={filteredProjects.length}
              sectionScroll={sectionScroll}
              categoryLabels={categoryLabels}
              imageUnavailableLabel={t('imageUnavailable')}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
