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

// Componente para generar código de barras único
function Barcode({ id }: { id: string }) {
  // Genera un patrón único basado en el ID
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
          style={{
            height: `${bar.height}%`,
            width: `${bar.width}px`,
          }}
        />
      ))}
    </div>
  );
}

// Marco adaptable para mockups (PNG con transparencia, perspectiva, 4:3)
function PortfolioProjectVisual({
  projectId,
  projectTitle,
  index,
  imageUnavailableLabel,
  className = '',
}: {
  projectId: string;
  projectTitle: string;
  index: number;
  imageUnavailableLabel: string;
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
        className={`relative w-full overflow-hidden rounded-sm border border-foreground/10 bg-foreground/[0.03] ${className}`}
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
    <div
      className={`relative w-full overflow-hidden rounded-sm border border-foreground/10 bg-[linear-gradient(145deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.045)_50%,rgba(0,0,0,0.02)_100%)] group-hover:border-foreground/20 transition-colors duration-500 ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {/* Área interior con padding para mockups en perspectiva */}
      <div className="absolute inset-3 sm:inset-5 lg:inset-8 xl:inset-10">
        <Image
          src={imagePath}
          alt={tCommon('projectOf', { name: projectTitle })}
          fill
          loading="lazy"
          quality={82}
          className="object-contain object-center drop-shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-transform duration-700 group-hover:scale-[1.015]"
          onError={handleImageError}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
      </div>
    </div>
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

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((project) => project.category === activeFilter);

  // Layouts alternados para cada proyecto (tipo editorial)
  const getProjectLayout = (index: number) => {
    const layouts = [
      'large-title',      // Título gigante dominante
      'split-vertical',   // Dividido verticalmente
      'compact',          // Compacto con énfasis en data
      'magazine-spread',  // Estilo revista spread
    ];
    return layouts[index % layouts.length];
  };

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

        {/* Projects grid editorial */}
        <div className="space-y-24 lg:space-y-40">
          {filteredProjects.map((project, index) => {
            const layout = getProjectLayout(index);
            const isEven = index % 2 === 0;

            return (
              <motion.article
                key={project.id}
                className="group cursor-pointer relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                {layout === 'large-title' && (
                  <div className="relative">
                    {/* Header con código de barras y metadata - entra desde arriba */}
                    <motion.div 
                      className="flex items-start justify-between mb-8 pb-6 border-b border-foreground/10 group-hover:border-foreground/30 transition-colors"
                      initial={{ opacity: 0, y: -60, filter: 'blur(10px)' }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
                      whileHover={{ y: -4, transition: { duration: 0.3 } }}
                    >
                      {/* Barcode - desde izquierda */}
                      <motion.div 
                        className="space-y-2"
                        initial={{ opacity: 0, x: -80, rotateY: -90 }}
                        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
                        whileHover={{ x: 4, transition: { duration: 0.2 } }}
                      >
                        <Barcode id={project.id} />
                        <p className="text-xs tracking-[0.15em] text-foreground/40 group-hover:text-foreground/70 transition-colors">
                          {t('projectIdLabel')}: {project.id.toUpperCase()}
                        </p>
                      </motion.div>

                      {/* Year/Category - desde derecha */}
                      <motion.div 
                        className="text-right"
                        initial={{ opacity: 0, x: 80, rotateY: 90 }}
                        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                        whileHover={{ x: -4, transition: { duration: 0.2 } }}
                      >
                        <p className="text-sm uppercase tracking-[0.15em] text-foreground/60 mb-1 group-hover:text-foreground transition-colors">
                          {project.category}
                        </p>
                        <motion.p 
                          className="text-4xl font-bold"
                          initial={{ opacity: 0, scale: 0.5 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.5, ease: 'backOut' }}
                          whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                        >
                          {project.year}
                        </motion.p>
                      </motion.div>
                    </motion.div>

                    {/* Título gigante - desde abajo con blur */}
                    <motion.h3
                      className="text-[clamp(2rem,8vw,6rem)] font-bold leading-[0.9] tracking-tighter uppercase mb-8 cursor-pointer"
                      initial={{ opacity: 0, y: 100, filter: 'blur(20px)', scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
                      whileHover={{ 
                        x: 20,
                        scale: 1.02,
                        color: 'rgba(0, 0, 0, 0.9)',
                        transition: { duration: 0.4 } 
                      }}
                    >
                      {project.title}
                    </motion.h3>

                    {/* Content grid */}
                    <div className="grid lg:grid-cols-3 gap-8">
                      {/* Stack - desde izquierda */}
                      <motion.div 
                        className="lg:col-span-1 space-y-4 cursor-pointer"
                        initial={{ opacity: 0, x: -60, rotateX: -45 }}
                        whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                        whileHover={{ x: 8, transition: { duration: 0.3 } }}
                      >
                        <div>
                          <motion.p 
                            className="text-xs uppercase tracking-[0.15em] text-foreground/40 mb-2"
                            whileHover={{ letterSpacing: '0.2em', transition: { duration: 0.2 } }}
                          >
                            {t('stackLabel')}
                          </motion.p>
                          <motion.p 
                            className="text-sm font-medium"
                            whileHover={{ x: 4, color: 'rgba(0, 0, 0, 1)', transition: { duration: 0.2 } }}
                          >
                            {project.stack}
                          </motion.p>
                        </div>
                      </motion.div>

                      {/* Description - desde derecha */}
                      <motion.div 
                        className="lg:col-span-2 cursor-pointer"
                        initial={{ opacity: 0, x: 60, rotateX: 45 }}
                        whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                        whileHover={{ x: 4, transition: { duration: 0.3 } }}
                      >
                        <motion.p 
                          className="text-base leading-relaxed text-foreground/70"
                          whileHover={{ 
                            color: 'rgba(0, 0, 0, 0.85)',
                            transition: { duration: 0.2 }
                          }}
                        >
                          {project.description}
                        </motion.p>
                      </motion.div>
                    </div>

                    {/* Imagen del proyecto - con escala y rotación */}
                    <motion.div
                      className="mt-8"
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                    >
                      <PortfolioProjectVisual
                        projectId={project.id}
                        projectTitle={project.title}
                        index={index}
                        imageUnavailableLabel={t('imageUnavailable')}
                      />
                    </motion.div>
                  </div>
                )}

                {layout === 'split-vertical' && (
                  <div className={`grid lg:grid-cols-2 gap-12 ${isEven ? '' : 'lg:grid-flow-dense'}`}>
                    {/* Visual - entra con escala desde el lado correspondiente */}
                    <motion.div 
                      className={isEven ? 'lg:col-start-1' : 'lg:col-start-2'}
                      initial={{ 
                        opacity: 0, 
                        x: isEven ? -100 : 100, 
                        scale: 0.8,
                        rotateY: isEven ? -45 : 45 
                      }}
                      whileInView={{ 
                        opacity: 1, 
                        x: 0, 
                        scale: 1,
                        rotateY: 0 
                      }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
                      whileHover={{ scale: 1.02, transition: { duration: 0.4 } }}
                    >
                      <div className="relative">
                        <PortfolioProjectVisual
                          projectId={project.id}
                          projectTitle={project.title}
                          index={index}
                          imageUnavailableLabel={t('imageUnavailable')}
                        />
                        <motion.div
                          className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10"
                          initial={{ opacity: 0, y: 30, scale: 0 }}
                          whileInView={{ opacity: 1, y: 0, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.4, ease: 'backOut' }}
                          whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                        >
                          <div className="bg-background/90 backdrop-blur-sm p-2 rounded">
                            <Barcode id={project.id} />
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Content - entra desde el lado opuesto */}
                    <motion.div 
                      className={`flex flex-col justify-center ${isEven ? 'lg:col-start-2' : 'lg:col-start-1'}`}
                      initial={{ 
                        opacity: 0, 
                        x: isEven ? 100 : -100,
                        filter: 'blur(10px)' 
                      }}
                      whileInView={{ 
                        opacity: 1, 
                        x: 0,
                        filter: 'blur(0px)' 
                      }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                      whileHover={{ x: isEven ? 8 : -8, transition: { duration: 0.3 } }}
                    >
                      <div className="space-y-6">
                        {/* Year/Category - desde arriba */}
                        <motion.div
                          initial={{ opacity: 0, y: -40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                          whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        >
                          <motion.p 
                            className="text-xs uppercase tracking-[0.2em] text-foreground/40 mb-2 cursor-pointer"
                            whileHover={{ letterSpacing: '0.25em', color: 'rgba(0, 0, 0, 0.7)', transition: { duration: 0.2 } }}
                          >
                            {project.year} / {project.category}
                          </motion.p>
                          
                          {/* Title - aparece con blur */}
                          <motion.h3 
                            className="text-[clamp(1.75rem,6vw,3.5rem)] font-bold leading-[0.95] tracking-tighter uppercase cursor-pointer"
                            initial={{ opacity: 0, filter: 'blur(20px)', x: -30 }}
                            whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                            whileHover={{ 
                              x: 8,
                              scale: 1.02,
                              color: 'rgba(0, 0, 0, 0.95)',
                              transition: { duration: 0.3 } 
                            }}
                          >
                            {project.title}
                          </motion.h3>
                        </motion.div>

                        {/* Divider - crece desde izquierda */}
                        <motion.div 
                          className="w-24 h-[2px] bg-foreground"
                          initial={{ opacity: 0, width: 0 }}
                          whileInView={{ opacity: 1, width: '6rem' }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
                          whileHover={{ width: '8rem', height: '3px', transition: { duration: 0.3 } }}
                        />

                        {/* Stack - desde izquierda */}
                        <motion.div
                          initial={{ opacity: 0, x: -40, rotateX: -30 }}
                          whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
                          whileHover={{ x: 4, transition: { duration: 0.2 } }}
                        >
                          <motion.p 
                            className="text-xs uppercase tracking-[0.15em] text-foreground/40 mb-3 cursor-pointer"
                            whileHover={{ letterSpacing: '0.2em', transition: { duration: 0.2 } }}
                          >
                            {t('technologyStackLabel')}
                          </motion.p>
                          <motion.p 
                            className="text-sm font-medium mb-6"
                            whileHover={{ x: 4, color: 'rgba(0, 0, 0, 1)', transition: { duration: 0.2 } }}
                          >
                            {project.stack}
                          </motion.p>
                        </motion.div>

                        {/* Description - desde abajo */}
                        <motion.p 
                          className="text-base leading-relaxed text-foreground/70 cursor-pointer"
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
                          whileHover={{ 
                            x: 4,
                            color: 'rgba(0, 0, 0, 0.85)',
                            transition: { duration: 0.2 }
                          }}
                        >
                          {project.description}
                        </motion.p>

                        {/* ID - aparece con fade */}
                        <motion.div 
                          className="pt-4"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 1, ease: [0.22, 1, 0.36, 1] as const }}
                          whileHover={{ x: 4, transition: { duration: 0.2 } }}
                        >
                          <motion.p 
                            className="text-xs tracking-[0.15em] text-foreground/40 cursor-pointer"
                            whileHover={{ letterSpacing: '0.2em', transition: { duration: 0.2 } }}
                          >
                            {t('projectIdLabel')}: {project.id.toUpperCase()}
                          </motion.p>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                )}

                {(layout === 'compact' || layout === 'magazine-spread') && (
                  <motion.div 
                    className="border border-foreground/10 p-8 lg:p-12 group-hover:border-foreground/30 transition-colors"
                    initial={{ opacity: 0, scale: 0.95, borderColor: 'rgba(0, 0, 0, 0)' }}
                    whileInView={{ opacity: 1, scale: 1, borderColor: 'rgba(0, 0, 0, 0.1)' }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
                  >
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                      {/* Left: Metadata - entra desde izquierda */}
                      <motion.div 
                        className="lg:w-64 flex-shrink-0 space-y-6"
                        initial={{ opacity: 0, x: -80, rotateY: -45 }}
                        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
                        whileHover={{ x: -8, transition: { duration: 0.3 } }}
                      >
                        {/* Barcode - aparece con escala */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0, rotate: -90 }}
                          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.4, ease: 'backOut' }}
                          whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                        >
                          <Barcode id={project.id} />
                        </motion.div>
                        
                        <div className="space-y-4">
                          {/* Project ID - desde abajo */}
                          <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                            whileHover={{ x: 4, transition: { duration: 0.2 } }}
                          >
                            <motion.p 
                              className="text-xs uppercase tracking-[0.15em] text-foreground/40 mb-1 cursor-pointer"
                              whileHover={{ letterSpacing: '0.2em', transition: { duration: 0.2 } }}
                            >
                              {t('projectLabel')}
                            </motion.p>
                            <motion.p 
                              className="text-sm font-medium cursor-pointer"
                              whileHover={{ x: 4, color: 'rgba(0, 0, 0, 1)', transition: { duration: 0.2 } }}
                            >
                              {project.id.toUpperCase()}
                            </motion.p>
                          </motion.div>

                          {/* Year - crece desde el centro */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.6, ease: 'backOut' }}
                            whileHover={{ x: 4, transition: { duration: 0.2 } }}
                          >
                            <motion.p 
                              className="text-xs uppercase tracking-[0.15em] text-foreground/40 mb-1 cursor-pointer"
                              whileHover={{ letterSpacing: '0.2em', transition: { duration: 0.2 } }}
                            >
                              {t('yearLabel')}
                            </motion.p>
                            <motion.p 
                              className="text-3xl font-bold cursor-pointer"
                              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                            >
                              {project.year}
                            </motion.p>
                          </motion.div>

                          {/* Category - desde abajo */}
                          <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
                            whileHover={{ x: 4, transition: { duration: 0.2 } }}
                          >
                            <motion.p 
                              className="text-xs uppercase tracking-[0.15em] text-foreground/40 mb-1 cursor-pointer"
                              whileHover={{ letterSpacing: '0.2em', transition: { duration: 0.2 } }}
                            >
                              {t('categoryLabel')}
                            </motion.p>
                            <motion.p 
                              className="text-sm font-medium cursor-pointer"
                              whileHover={{ x: 4, color: 'rgba(0, 0, 0, 1)', transition: { duration: 0.2 } }}
                            >
                              {project.category}
                            </motion.p>
                          </motion.div>

                          {/* Stack - desde abajo */}
                          <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
                            whileHover={{ x: 4, transition: { duration: 0.2 } }}
                          >
                            <motion.p 
                              className="text-xs uppercase tracking-[0.15em] text-foreground/40 mb-1 cursor-pointer"
                              whileHover={{ letterSpacing: '0.2em', transition: { duration: 0.2 } }}
                            >
                              {t('stackLabel')}
                            </motion.p>
                            <motion.p 
                              className="text-sm font-medium cursor-pointer"
                              whileHover={{ x: 4, color: 'rgba(0, 0, 0, 1)', transition: { duration: 0.2 } }}
                            >
                              {project.stack}
                            </motion.p>
                          </motion.div>
                        </div>
                      </motion.div>

                      {/* Right: Content - entra desde derecha */}
                      <motion.div 
                        className="flex-1"
                        initial={{ opacity: 0, x: 80, filter: 'blur(10px)' }}
                        whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                        whileHover={{ x: 8, transition: { duration: 0.3 } }}
                      >
                        {/* Title - aparece desde arriba con blur */}
                        <motion.h3 
                          className="text-[clamp(1.75rem,6vw,3.5rem)] font-bold leading-[0.95] tracking-tighter uppercase mb-6 cursor-pointer"
                          initial={{ opacity: 0, y: -40, filter: 'blur(15px)' }}
                          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                          whileHover={{ 
                            x: 8,
                            scale: 1.02,
                            color: 'rgba(0, 0, 0, 0.95)',
                            transition: { duration: 0.3 } 
                          }}
                        >
                          {project.title}
                        </motion.h3>

                        {/* Description - aparece desde abajo */}
                        <motion.p 
                          className="text-base leading-relaxed text-foreground/70 mb-8 cursor-pointer"
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                          whileHover={{ 
                            x: 4,
                            color: 'rgba(0, 0, 0, 0.85)',
                            transition: { duration: 0.2 }
                          }}
                        >
                          {project.description}
                        </motion.p>

                        {/* Imagen del proyecto - crece con rotación */}
                        <motion.div
                          className="relative cursor-pointer"
                          initial={{ opacity: 0, scale: 0.85, rotateX: -12 }}
                          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                          whileHover={{ scale: 1.01, transition: { duration: 0.4 } }}
                        >
                          <PortfolioProjectVisual
                            projectId={project.id}
                            projectTitle={project.title}
                            index={index}
                            imageUnavailableLabel={t('imageUnavailable')}
                          />
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* Hover effect: línea que crece al scrollear */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-foreground"
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: '100%', opacity: 0.3 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
                  whileHover={{ opacity: 1 }}
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
