'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import Image from 'next/image';
import {
  orderPortfolioProjects,
  getPortfolioProjectImage,
  getPortfolioProjectAspect,
  type PortfolioProject,
} from '@/data/portfolio-projects';
import { SECTION_EASE, SECTION_VIEWPORT } from '@/lib/motion-viewport';

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

// Marco adaptable para mockups (PNG con transparencia, perspectiva, 4:3)
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
          <motion.span
            className="text-[6rem] lg:text-[8rem] font-bold text-foreground/5 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'backOut' }}
          >
            {index + 1}
          </motion.span>
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

const PROJECT_VIEWPORT = {
  once: true,
  amount: 0.15,
  margin: '0px 0px -60px 0px',
} as const;

function PortfolioProjectEntry({
  project,
  index,
  categoryLabels,
  imageUnavailableLabel,
  t,
}: {
  project: PortfolioProject;
  index: number;
  categoryLabels: Record<string, string>;
  imageUnavailableLabel: string;
  t: ReturnType<typeof useTranslations<'portfolio'>>;
}) {
  const isReversed = index % 2 === 1;
  const projectNumber = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      className="relative border-b border-foreground/10 py-16 lg:py-24 last:border-b-0"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={PROJECT_VIEWPORT}
      transition={{ duration: 0.65, ease: SECTION_EASE }}
    >
      {/* Meta */}
      <motion.div
        className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-8 lg:mb-10"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={PROJECT_VIEWPORT}
        transition={{ duration: 0.5, delay: 0.04, ease: SECTION_EASE }}
      >
        <span className="text-xs font-mono tabular-nums text-foreground/35">{projectNumber}</span>
        <span className="hidden sm:block w-px h-3 bg-foreground/15" aria-hidden />
        <span className="text-[11px] uppercase tracking-[0.14em] text-foreground/50">
          {getCategoryLabel(project.category, categoryLabels)}
        </span>
        <span className="hidden sm:block w-px h-3 bg-foreground/15" aria-hidden />
        <span className="text-[11px] uppercase tracking-[0.14em] text-foreground/50 tabular-nums">
          {project.year}
        </span>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-20 items-center">
        {/* Texto */}
        <div className={isReversed ? 'lg:order-2' : 'lg:order-1'}>
          <motion.h3
            className="text-[clamp(1.625rem,3.2vw,2.625rem)] font-semibold leading-[1.12] tracking-tight uppercase text-foreground mb-5 lg:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={PROJECT_VIEWPORT}
            transition={{ duration: 0.55, delay: 0.08, ease: SECTION_EASE }}
          >
            {project.title}
          </motion.h3>

          <motion.p
            className="text-[0.95rem] lg:text-base leading-[1.75] text-foreground/60 max-w-xl mb-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={PROJECT_VIEWPORT}
            transition={{ duration: 0.55, delay: 0.14, ease: SECTION_EASE }}
          >
            {project.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={PROJECT_VIEWPORT}
            transition={{ duration: 0.5, delay: 0.2, ease: SECTION_EASE }}
          >
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

        {/* Mockup */}
        <motion.div
          className={isReversed ? 'lg:order-1' : 'lg:order-2'}
          initial={{ opacity: 0, y: 28, x: isReversed ? -20 : 20 }}
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          viewport={PROJECT_VIEWPORT}
          transition={{ duration: 0.65, delay: 0.12, ease: SECTION_EASE }}
        >
          <PortfolioProjectVisual
            projectId={project.id}
            projectTitle={project.title}
            index={index}
            size="column"
            imageUnavailableLabel={imageUnavailableLabel}
          />
        </motion.div>
      </div>
    </motion.article>
  );
}

export function Portfolio() {
  const t = useTranslations('portfolio');
  const [activeFilter, setActiveFilter] = useState('all');
  const sectionRef = useRef(null);

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

  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-background overflow-hidden">
      <div ref={sectionRef} className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header estilo editorial */}
        <motion.div
          className="mb-20 lg:mb-32"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ ...SECTION_VIEWPORT, amount: 0 }}
          transition={{ duration: 0.85, ease: SECTION_EASE }}
        >
          <div className="flex items-start justify-between mb-8">
            <div>
              <motion.p
                className="text-xs uppercase tracking-[0.2em] text-foreground/40 mb-3"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ ...SECTION_VIEWPORT, amount: 0 }}
                transition={{ duration: 0.6, delay: 0.05, ease: SECTION_EASE }}
              >
                {t('volumeLabel')}
              </motion.p>
              <motion.h2
                className="text-[clamp(3rem,15vw,12rem)] font-bold leading-[0.85] tracking-tighter uppercase"
                initial={{ opacity: 0, x: -48 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ ...SECTION_VIEWPORT, amount: 0 }}
                transition={{ duration: 0.75, delay: 0.1, ease: SECTION_EASE }}
              >
                {t('title')}
              </motion.h2>
            </div>

            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ ...SECTION_VIEWPORT, amount: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: SECTION_EASE }}
            >
              <p className="text-xs uppercase tracking-[0.15em] text-foreground/60 mb-2">
                {t('selectedWorks')}
              </p>
              <p className="text-2xl font-bold">{t('yearsRange')}</p>
            </motion.div>
          </div>

          <motion.p
            className="text-sm uppercase tracking-[0.15em] text-foreground/50 max-w-md"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ ...SECTION_VIEWPORT, amount: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: SECTION_EASE }}
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>

        {/* Filters estilo magazine */}
        <motion.div
          className="flex flex-wrap gap-2 mb-20 lg:mb-28 border-t border-b border-foreground/10 py-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ ...SECTION_VIEWPORT, amount: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: SECTION_EASE }}
        >
          {filters.map((filter, index) => (
            <motion.button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-5 py-2 text-xs uppercase tracking-[0.15em] font-medium transition-all ${
                activeFilter === filter.key
                  ? 'bg-foreground text-background'
                  : 'border border-foreground/20 hover:border-foreground/60'
              }`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ ...SECTION_VIEWPORT, amount: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + index * 0.04, ease: SECTION_EASE }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects */}
        <div>
          {filteredProjects.map((project, index) => (
            <PortfolioProjectEntry
              key={project.id}
              project={project}
              index={index}
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
