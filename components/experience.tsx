'use client';

import { useMemo, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, MotionValue, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { useIsDesktop } from '@/hooks/use-is-desktop';
import { experienceData, localize, type ExperienceJob, type Locale } from '@/data/experience-data';

// Barcode decorativo reutilizado en cada job (mismo patrón que otras secciones)
function MiniBarcode({ delay = 0 }: { delay?: number }) {
  const bars = [16, 22, 18, 24, 20, 26, 17, 23];

  return (
    <motion.div
      className="flex gap-0.5 mt-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      {bars.map((height, i) => (
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
  );
}

// Logo de la empresa con fallback a monograma con las iniciales
function CompanyLogo({ job }: { job: ExperienceJob }) {
  const tCommon = useTranslations('common');
  const [imageError, setImageError] = useState(!job.logo);

  const initials = job.company
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  if (imageError || !job.logo) {
    return (
      <div className="relative w-16 h-16 lg:w-20 lg:h-20 flex-shrink-0 border border-foreground/15 bg-foreground/[0.03] flex items-center justify-center">
        <span className="text-lg lg:text-xl font-black tracking-tight text-foreground/40">
          {initials}
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-16 h-16 lg:w-20 lg:h-20 flex-shrink-0 border border-foreground/15 bg-background overflow-hidden">
      <Image
        src={job.logo}
        alt={tCommon('logoOf', { name: job.company })}
        fill
        className="object-contain p-2"
        onError={() => setImageError(true)}
        sizes="80px"
      />
    </div>
  );
}

function SkillTags({ skills }: { skills: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 mt-6">
      {skills.map((skill, i) => (
        <span
          key={i}
          className="px-2.5 py-1 text-[10px] lg:text-[11px] uppercase tracking-[0.08em] font-medium border border-foreground/15 text-foreground/60 hover:border-foreground/40 hover:text-foreground/90 transition-colors"
        >
          {skill}
        </span>
      ))}
    </div>
  );
}

function RoadmapCard({ job, index, locale }: { job: ExperienceJob; index: number; locale: Locale }) {
  return (
    <div className="group border border-foreground/10 p-6 lg:p-8 bg-background hover:border-foreground/30 transition-colors relative overflow-hidden">
      {/* Número gigante de fondo */}
      <div className="absolute -top-4 right-3 text-[70px] lg:text-[100px] font-black text-foreground/[0.03] select-none -z-10 leading-none pointer-events-none">
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Header con logo destacado */}
      <div className="flex items-start gap-4 lg:gap-5 mb-5">
        <CompanyLogo job={job} />

        <div className="flex-1 min-w-0">
          <h3 className="text-xl lg:text-2xl font-bold leading-tight mb-1 group-hover:text-foreground/80 transition-colors">
            {localize(job.role, locale)}
          </h3>
          <p className="text-base lg:text-lg text-foreground/60 font-medium truncate">
            {job.company}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs text-foreground/50 uppercase tracking-[0.1em] mb-5">
        <span className="font-medium">{localize(job.period, locale)}</span>
        {job.location && (
          <>
            <span className="w-1 h-1 rounded-full bg-foreground/30" />
            <span>{localize(job.location, locale)}</span>
          </>
        )}
      </div>

      <div className="w-14 h-0.5 bg-foreground/20 mb-5 group-hover:w-20 group-hover:bg-foreground/40 transition-all duration-300" />

      <p className="text-sm lg:text-base text-foreground/60 leading-relaxed">
        {localize(job.description, locale)}
      </p>

      <SkillTags skills={job.skills} />

      <MiniBarcode delay={0.2} />
    </div>
  );
}

// Genera un camino serpentino en un viewBox de ancho fijo (800),
// alternando nodos hacia la derecha/izquierda por cada trabajo.
function buildRoadmap(count: number) {
  const segmentHeight = 260;
  const startY = 30;
  const centerX = 400;
  const rightX = 600;
  const leftX = 200;

  const nodes: { x: number; y: number; side: 'left' | 'right' }[] = [];
  const pathParts = [`M ${centerX},${startY}`];
  let currentY = startY;

  for (let i = 0; i < count; i++) {
    const side: 'left' | 'right' = i % 2 === 0 ? 'right' : 'left';
    const nodeX = side === 'right' ? rightX : leftX;
    const nodeY = currentY + segmentHeight * 0.55;
    const midY = currentY + segmentHeight * 0.28;
    const endY = currentY + segmentHeight;

    pathParts.push(`C ${centerX},${midY} ${nodeX},${midY + 25} ${nodeX},${nodeY}`);
    pathParts.push(`S ${centerX},${endY - 55} ${centerX},${endY}`);

    nodes.push({ x: nodeX, y: nodeY, side });
    currentY = endY;
  }

  return { path: pathParts.join(' '), nodes, totalHeight: currentY + 30 };
}

function segmentRange(index: number, count: number): [number, number] {
  const start = 0.05 + (index / count) * 0.9;
  const end = 0.05 + ((index + 1) / count) * 0.9;
  return [start, end];
}

function nodeRange(index: number, count: number): [number, number] {
  const [start, end] = segmentRange(index, count);
  const span = end - start;
  return [start + span * 0.65, end];
}

function cardRange(index: number, count: number): [number, number] {
  const [start, end] = segmentRange(index, count);
  const span = end - start;
  return [start + span * 0.55, start + span * 0.95];
}

function RoadmapNodeDot({
  x,
  y,
  scrollYProgress,
  range,
}: {
  x: number;
  y: number;
  scrollYProgress: MotionValue<number>;
  range: [number, number];
}) {
  const scale = useTransform(scrollYProgress, range, [0, 1]);
  return <motion.circle cx={x} cy={y} r="8" className="fill-foreground" style={{ scale }} />;
}

function RoadmapCardAnimated({
  job,
  index,
  side,
  top,
  scrollYProgress,
  range,
  locale,
}: {
  job: ExperienceJob;
  index: number;
  side: 'left' | 'right';
  top: string;
  scrollYProgress: MotionValue<number>;
  range: [number, number];
  locale: Locale;
}) {
  const opacity = useTransform(scrollYProgress, range, [0, 1]);
  const x = useTransform(scrollYProgress, range, [side === 'right' ? 60 : -60, 0]);

  return (
    <motion.div
      className={`absolute w-[45%] max-w-[560px] ${side === 'right' ? 'left-[53%]' : 'left-[2%]'}`}
      style={{ top, opacity, x }}
    >
      <RoadmapCard job={job} index={index} locale={locale} />
    </motion.div>
  );
}

function DesktopRoadmap({ jobs, locale }: { jobs: ExperienceJob[]; locale: Locale }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const { path, nodes, totalHeight } = useMemo(() => buildRoadmap(jobs.length), [jobs.length]);

  const pathLength = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);
  const pathOpacity = useTransform(scrollYProgress, [0.03, 0.1], [0, 1]);

  // Altura del contenedor: proporcional a la cantidad de trabajos
  const containerHeight = jobs.length * 480 + 200;

  return (
    <div ref={sectionRef} className="relative" style={{ height: `${containerHeight}px` }}>
      {/* Camino SVG que se va dibujando */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 800 ${totalHeight}`}
        preserveAspectRatio="none"
        fill="none"
      >
        <motion.path
          d={path}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-foreground/25"
          style={{ pathLength, opacity: pathOpacity }}
        />

        {/* Punto de inicio */}
        <motion.circle cx="400" cy="30" r="6" className="fill-foreground" style={{ opacity: pathOpacity }} />

        {/* Nodos en cada trabajo */}
        {nodes.map((node, i) => (
          <RoadmapNodeDot
            key={i}
            x={node.x}
            y={node.y}
            scrollYProgress={scrollYProgress}
            range={nodeRange(i, jobs.length)}
          />
        ))}
      </svg>

      {/* Cards de cada trabajo, posicionadas junto a su nodo */}
      {jobs.map((job, index) => {
        const node = nodes[index];
        const top = `${(node.y / totalHeight) * 100}%`;

        return (
          <RoadmapCardAnimated
            key={job.id}
            job={job}
            index={index}
            side={node.side}
            top={top}
            scrollYProgress={scrollYProgress}
            range={cardRange(index, jobs.length)}
            locale={locale}
          />
        );
      })}
    </div>
  );
}

function MobileTimeline({ jobs, locale }: { jobs: ExperienceJob[]; locale: Locale }) {
  return (
    <div className="relative">
      {/* Línea vertical que se dibuja al hacer scroll */}
      <motion.div
        className="absolute left-3 top-0 bottom-0 w-px bg-foreground/20 origin-top"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="space-y-10">
        {jobs.map((job, index) => (
          <motion.div
            key={job.id}
            className="relative pl-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: Math.min(index * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Dot del nodo */}
            <motion.div
              className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-foreground -translate-x-1/2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) + 0.2 }}
            />

            <RoadmapCard job={job} index={index} locale={locale} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function Experience() {
  const t = useTranslations('experience');
  const locale = useLocale() as Locale;
  const isDesktop = useIsDesktop();

  const jobs = experienceData;

  return (
    <section id="experience" className="py-32 lg:py-48 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute top-1/3 right-0 w-1/2 h-px bg-foreground" />
        <div className="absolute bottom-1/3 left-0 w-1/2 h-px bg-foreground" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-24 lg:mb-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="flex items-center gap-4 mb-6"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-12 lg:w-16 h-px bg-foreground/30" />
            <p className="text-xs lg:text-sm uppercase tracking-[0.25em] text-foreground/40 font-medium">
              {t('subtitle')}
            </p>
          </motion.div>

          <motion.h2
            className="font-[family-name:var(--font-manrope)] text-[clamp(2.5rem,10vw,4rem)] lg:text-[clamp(4rem,8vw,7rem)] font-black tracking-tighter leading-[0.9]"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {t('title')}
          </motion.h2>
        </motion.div>

        {/* Roadmap: SVG scroll-driven en desktop, timeline simple en mobile */}
        {isDesktop ? <DesktopRoadmap jobs={jobs} locale={locale} /> : <MobileTimeline jobs={jobs} locale={locale} />}
      </div>
    </section>
  );
}
