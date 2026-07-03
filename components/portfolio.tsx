'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'motion/react';

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

export function Portfolio() {
  const t = useTranslations('portfolio');
  const [activeFilter, setActiveFilter] = useState('all');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  const projects = t.raw('projects') as Array<{
    id: string;
    title: string;
    year: string;
    category: string;
    stack: string;
    description: string;
  }>;

  const filters = [
    { key: 'all', label: t('filterAll') },
    { key: 'landing', label: t('filterLanding') },
    { key: 'ecommerce', label: t('filterEcommerce') },
    { key: 'catalog', label: t('filterCatalog') },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

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
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-start justify-between mb-8">
            <div>
              <motion.p
                className="text-xs uppercase tracking-[0.2em] text-foreground/40 mb-3"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 }}
              >
                Volume — 025
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
              className="hidden lg:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              <p className="text-xs uppercase tracking-[0.15em] text-foreground/60 mb-2">
                Selected Works
              </p>
              <p className="text-2xl font-bold">2023—2026</p>
            </motion.div>
          </div>

          <motion.p
            className="text-sm uppercase tracking-[0.15em] text-foreground/50 max-w-md"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>

        {/* Filters estilo magazine */}
        <motion.div
          className="flex flex-wrap gap-2 mb-20 lg:mb-28 border-t border-b border-foreground/10 py-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
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
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 + index * 0.05 }}
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
            const delay = 0.8 + index * 0.15;

            return (
              <motion.article
                key={project.id}
                className="group cursor-pointer relative"
                initial={{ opacity: 0, y: 80 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay,
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
              >
                {layout === 'large-title' && (
                  <div className="relative">
                    {/* Header con código de barras y metadata */}
                    <div className="flex items-start justify-between mb-8 pb-6 border-b border-foreground/10">
                      <div className="space-y-2">
                        <Barcode id={project.id} />
                        <p className="text-xs tracking-[0.15em] text-foreground/40">
                          ID: {project.id.toUpperCase()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm uppercase tracking-[0.15em] text-foreground/60 mb-1">
                          {project.category}
                        </p>
                        <p className="text-4xl font-bold">{project.year}</p>
                      </div>
                    </div>

                    {/* Título gigante */}
                    <motion.h3
                      className="text-[clamp(2.5rem,12vw,10rem)] font-bold leading-[0.9] tracking-tighter uppercase mb-8"
                      whileHover={{ x: 20, transition: { duration: 0.4 } }}
                    >
                      {project.title}
                    </motion.h3>

                    {/* Content grid */}
                    <div className="grid lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-1 space-y-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.15em] text-foreground/40 mb-2">
                            Stack
                          </p>
                          <p className="text-sm font-medium">{project.stack}</p>
                        </div>
                      </div>
                      <div className="lg:col-span-2">
                        <p className="text-base leading-relaxed text-foreground/70">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {/* Placeholder visual */}
                    <div className="mt-8 aspect-[21/9] bg-foreground/5 relative overflow-hidden group-hover:bg-foreground/10 transition-colors duration-700">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[12rem] font-bold text-foreground/5 group-hover:scale-110 transition-transform duration-700">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {layout === 'split-vertical' && (
                  <div className={`grid lg:grid-cols-2 gap-12 ${isEven ? '' : 'lg:grid-flow-dense'}`}>
                    <div className={isEven ? 'lg:col-start-1' : 'lg:col-start-2'}>
                      {/* Visual */}
                      <div className="aspect-[4/5] bg-foreground/5 relative overflow-hidden group-hover:bg-foreground/10 transition-colors duration-700">
                        <div className="absolute top-6 left-6">
                          <Barcode id={project.id} />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[10rem] font-bold text-foreground/5">
                            {project.year.slice(-2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={`flex flex-col justify-center ${isEven ? 'lg:col-start-2' : 'lg:col-start-1'}`}>
                      <div className="space-y-6">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-foreground/40 mb-2">
                            {project.year} / {project.category}
                          </p>
                          <h3 className="text-[clamp(2rem,8vw,5rem)] font-bold leading-[0.95] tracking-tighter uppercase">
                            {project.title}
                          </h3>
                        </div>

                        <div className="w-24 h-[2px] bg-foreground" />

                        <div>
                          <p className="text-xs uppercase tracking-[0.15em] text-foreground/40 mb-3">
                            Technology Stack
                          </p>
                          <p className="text-sm font-medium mb-6">{project.stack}</p>
                        </div>

                        <p className="text-base leading-relaxed text-foreground/70">
                          {project.description}
                        </p>

                        <div className="pt-4">
                          <p className="text-xs tracking-[0.15em] text-foreground/40">
                            ID: {project.id.toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {(layout === 'compact' || layout === 'magazine-spread') && (
                  <div className="border border-foreground/10 p-8 lg:p-12 group-hover:border-foreground/30 transition-colors">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                      {/* Left: Metadata */}
                      <div className="lg:w-64 flex-shrink-0 space-y-6">
                        <Barcode id={project.id} />
                        
                        <div className="space-y-4">
                          <div>
                            <p className="text-xs uppercase tracking-[0.15em] text-foreground/40 mb-1">
                              Project
                            </p>
                            <p className="text-sm font-medium">
                              {project.id.toUpperCase()}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs uppercase tracking-[0.15em] text-foreground/40 mb-1">
                              Year
                            </p>
                            <p className="text-3xl font-bold">{project.year}</p>
                          </div>

                          <div>
                            <p className="text-xs uppercase tracking-[0.15em] text-foreground/40 mb-1">
                              Category
                            </p>
                            <p className="text-sm font-medium">{project.category}</p>
                          </div>

                          <div>
                            <p className="text-xs uppercase tracking-[0.15em] text-foreground/40 mb-1">
                              Stack
                            </p>
                            <p className="text-sm font-medium">{project.stack}</p>
                          </div>
                        </div>
                      </div>

                      {/* Right: Content */}
                      <div className="flex-1">
                        <h3 className="text-[clamp(2rem,8vw,4.5rem)] font-bold leading-[0.95] tracking-tighter uppercase mb-6">
                          {project.title}
                        </h3>

                        <p className="text-base leading-relaxed text-foreground/70 mb-8">
                          {project.description}
                        </p>

                        {/* Visual placeholder */}
                        <div className="aspect-[16/9] bg-foreground/5 relative overflow-hidden group-hover:bg-foreground/10 transition-colors duration-700">
                          <div className="absolute bottom-6 right-6 text-8xl font-bold text-foreground/5">
                            {index + 1}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Hover effect: línea que crece */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-foreground"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
