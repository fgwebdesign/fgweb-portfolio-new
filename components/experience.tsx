'use client';

import { useMemo, useRef, useState, type RefObject } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, MotionValue, useScroll, useTransform, useMotionValue, useMotionValueEvent, useSpring } from 'motion/react';
import Image from 'next/image';
import { useIsDesktop } from '@/hooks/use-is-desktop';
import { experienceData, localize, type ExperienceJob, type Locale } from '@/data/experience-data';

// Fondo llamativo detrás del roadmap: manchas de gradiente muy blureadas que
// derivan suavemente en loop, más un viñetado radial para dar profundidad.
function ExperienceBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-[10%] -left-[15%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-foreground/[0.07] blur-[110px]"
        animate={{ x: [0, 60, -30, 0], y: [0, 50, -20, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full bg-foreground/[0.06] blur-[100px]"
        animate={{ x: [0, -50, 30, 0], y: [0, -40, 20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      <motion.div
        className="absolute top-[30%] left-[45%] w-[30vw] h-[30vw] max-w-[420px] max-h-[420px] rounded-full bg-foreground/[0.05] blur-[90px]"
        animate={{ x: [0, 40, -30, 0], y: [0, -30, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />
      {/* Viñeta radial sutil para concentrar la atención en el centro */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_15%,rgba(10,10,10,0.05),transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </div>
  );
}

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
      <div className="relative w-16 h-16 lg:w-20 lg:h-20 flex-shrink-0 rounded-2xl border border-foreground/15 bg-foreground/[0.03] flex items-center justify-center overflow-hidden">
        <span className="text-lg lg:text-xl font-black tracking-tight text-foreground/40">
          {initials}
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-16 h-16 lg:w-20 lg:h-20 flex-shrink-0 rounded-2xl border border-foreground/15 bg-background overflow-hidden">
      <Image
        src={job.logo}
        alt={tCommon('logoOf', { name: job.company })}
        fill
        loading="lazy"
        quality={75}
        className="object-cover"
        onError={() => setImageError(true)}
        sizes="80px"
      />
    </div>
  );
}

function SkillTags({ skills }: { skills: string[] }) {
  const t = useTranslations('experience');

  return (
    <div className="mt-6">
      <p className="text-[10px] lg:text-[11px] uppercase tracking-[0.15em] font-medium text-foreground/35 mb-3">
        {t('skillsLabel')}
      </p>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="px-2.5 py-1 text-[10px] lg:text-[11px] uppercase tracking-[0.08em] font-medium border border-foreground/15 text-foreground/60 hover:border-foreground/40 hover:text-foreground/90 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function RoadmapCard({ job, index, locale }: { job: ExperienceJob; index: number; locale: Locale }) {
  return (
    <div className="group border border-foreground/10 p-6 lg:p-8 bg-background/90 backdrop-blur-xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] hover:border-foreground/30 hover:shadow-[0_12px_50px_-12px_rgba(0,0,0,0.14)] transition-all duration-300 relative overflow-hidden">
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
  return (
    <g>
      {/* Halo pulsante detrás del nodo */}
      <motion.circle
        cx={x}
        cy={y}
        r="16"
        className="fill-foreground/10"
        style={{ scale }}
        animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0.15, 0.5] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.circle cx={x} cy={y} r="9" className="fill-background stroke-foreground" strokeWidth="2" style={{ scale }} />
      <motion.circle cx={x} cy={y} r="3.5" className="fill-foreground" style={{ scale }} />
    </g>
  );
}

// Punto luminoso que recorre el trazado real (getPointAtLength) a medida que se
// scrollea, dando sensación de "cometa" viajando por el camino.
function RoadmapComet({
  pathRef,
  scrollYProgress,
}: {
  pathRef: RefObject<SVGPathElement | null>;
  scrollYProgress: MotionValue<number>;
}) {
  const cometX = useMotionValue(0);
  const cometY = useMotionValue(0);
  const opacity = useTransform(scrollYProgress, [0.02, 0.07, 0.92, 0.97], [0, 1, 1, 0]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const path = pathRef.current;
    if (!path) return;
    const total = path.getTotalLength();
    const progress = Math.min(Math.max((latest - 0.03) / 0.92, 0), 1);
    const point = path.getPointAtLength(progress * total);
    cometX.set(point.x);
    cometY.set(point.y);
  });

  return (
    <motion.g style={{ opacity }}>
      <motion.circle cx={cometX} cy={cometY} r="14" className="fill-foreground/15" filter="url(#comet-blur)" />
      <motion.circle cx={cometX} cy={cometY} r="5" className="fill-foreground" />
      <motion.circle cx={cometX} cy={cometY} r="2" className="fill-background" />
    </motion.g>
  );
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
  // Progreso crudo del scroll suavizado con un spring: le da a la revelación
  // una inercia elástica en vez de moverse 1:1 y de forma mecánica con el scroll.
  const rawProgress = useTransform(scrollYProgress, range, [0, 1]);
  const progress = useSpring(rawProgress, { stiffness: 260, damping: 32, mass: 0.7 });

  const opacity = useTransform(progress, [0, 1], [0, 1]);
  const x = useTransform(progress, [0, 1], [side === 'right' ? 140 : -140, 0]);
  const y = useTransform(progress, [0, 1], [50, 0]);
  const scale = useTransform(progress, [0, 1], [0.82, 1]);
  const rotate = useTransform(progress, [0, 1], [side === 'right' ? 5 : -5, 0]);
  const rotateY = useTransform(progress, [0, 1], [side === 'right' ? -18 : 18, 0]);
  const blurValue = useTransform(progress, [0, 1], [16, 0]);
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);

  return (
    <motion.div
      className={`absolute w-[45%] max-w-[560px] ${side === 'right' ? 'left-[53%]' : 'left-[2%]'}`}
      style={{
        top,
        opacity,
        x,
        y,
        scale,
        rotate,
        rotateY,
        filter,
        transformPerspective: 1200,
      }}
    >
      <RoadmapCard job={job} index={index} locale={locale} />
    </motion.div>
  );
}

function DesktopRoadmap({ jobs, locale }: { jobs: ExperienceJob[]; locale: Locale }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const { path, nodes, totalHeight } = useMemo(() => buildRoadmap(jobs.length), [jobs.length]);

  const pathLength = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);
  const pathOpacity = useTransform(scrollYProgress, [0.03, 0.1], [0, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0.03, 0.1], [0, 0.6]);

  // Altura del contenedor: proporcional a la cantidad de trabajos
  const containerHeight = jobs.length * 480 + 200;

  return (
    <div ref={sectionRef} className="relative" style={{ height: `${containerHeight}px` }}>
      {/* Camino SVG que se va dibujando: trazo grueso, con gradiente y glow */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 800 ${totalHeight}`}
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="roadmap-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
            <stop offset="15%" stopColor="currentColor" stopOpacity="0.55" />
            <stop offset="85%" stopColor="currentColor" stopOpacity="0.55" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
          </linearGradient>
          <filter id="comet-blur" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* Halo de glow debajo del trazo principal */}
        <motion.path
          d={path}
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          className="text-foreground/10"
          filter="url(#comet-blur)"
          style={{ pathLength, opacity: glowOpacity }}
        />

        {/* Trazo principal con gradiente */}
        <motion.path
          ref={pathRef}
          d={path}
          stroke="url(#roadmap-gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="text-foreground"
          style={{ pathLength, opacity: pathOpacity }}
        />

        {/* Punto de inicio */}
        <motion.circle cx="400" cy="30" r="6" className="fill-foreground" style={{ opacity: pathOpacity }} />

        {/* Cometa que recorre el trazado con el scroll */}
        <RoadmapComet pathRef={pathRef} scrollYProgress={scrollYProgress} />

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

      {/* Cards de cada trabajo, posicionadas junto a su nodo (con offset para que el nodo quede un poco por encima) */}
      {jobs.map((job, index) => {
        const node = nodes[index];
        const top = `calc(${(node.y / totalHeight) * 100}% + 22px)`;

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
            initial={{ opacity: 0, y: 60, scale: 0.85, rotate: -3, filter: 'blur(14px)' }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: 'spring', stiffness: 220, damping: 26, mass: 0.7, delay: Math.min(index * 0.05, 0.3) }}
          >
            {/* Dot del nodo, ligeramente por encima de la card */}
            <motion.div
              className="absolute left-0 -top-2 w-2 h-2 rounded-full bg-foreground -translate-x-1/2 ring-4 ring-background"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, damping: 18, delay: Math.min(index * 0.05, 0.3) + 0.25 }}
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
      {/* Background llamativo: gradientes blureados en movimiento */}
      <ExperienceBackground />

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
