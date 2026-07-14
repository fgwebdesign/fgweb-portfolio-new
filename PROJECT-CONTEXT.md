# Contexto del Proyecto — FG Web Designs Portfolio

> **Para agentes de IA:** Lee este archivo antes de modificar código. Es la fuente de verdad sobre arquitectura, diseño, convenciones y decisiones del proyecto.

---

## 1. Qué es este proyecto

Portfolio personal y profesional de **Felipe Gutiérrez** (FG Web Designs), posicionado como **Frontend Developer & QA Engineer**. El sitio es una landing page de una sola página (single-page) con secciones ancladas, bilingüe (EN/ES), con animaciones sutiles y estética **minimalista blanco y negro**.

- **Dominio:** `felipegutierrez.dev` / `fgwebdesigns.dev`
- **Email de contacto:** `contact@fgwebdesign.dev`
- **Enfoque:** Mostrar servicios, proceso, portfolio de proyectos, clientes, experiencia y contacto con un diseño editorial y animaciones con propósito — nunca decorativas por decorar.

---

## 2. Stack tecnológico

| Categoría | Tecnología | Versión / Notas |
|-----------|-----------|-----------------|
| Framework | **Next.js** (App Router) | 16.2.10 — **tiene breaking changes vs versiones anteriores**. Consultar `node_modules/next/dist/docs/` antes de escribir código |
| UI | **React** | 19.2.4 |
| Lenguaje | **TypeScript** | strict mode |
| Estilos | **Tailwind CSS v4** | Tokens en `app/globals.css` con `@theme inline` |
| Animaciones | **Motion** (`motion/react`) | Librería principal de animación (antes Framer Motion) |
| Scroll suave | **Lenis** | Solo desktop (≥1024px), desactivado con `prefers-reduced-motion` |
| i18n | **next-intl** | EN default, ES disponible |
| 3D / WebGL | **Three.js + React Three Fiber + Drei** | Instalados, **aún no implementados** (Fase 6 pendiente) |
| GSAP | **gsap** | Instalado, **aún no usado** (Fase 7 pendiente) |
| Linting | ESLint + eslint-config-next | |
| Deploy previsto | Vercel | Aún no deployado |

### Importaciones importantes

```tsx
// Animaciones — SIEMPRE desde motion/react, NO framer-motion
import { motion, AnimatePresence, useInView, useReducedMotion } from 'motion/react';

// Traducciones en client components
import { useTranslations } from 'next-intl';

// Traducciones en server components
import { getTranslations } from 'next-intl/server';

// Alias de paths
import { Component } from '@/components/component';
```

---

## 3. Estructura del proyecto

```
fgweb-new-portfolio/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx      # Layout raíz: fuentes, i18n, SmoothScrollProvider
│   │   └── page.tsx          # Página única con todas las secciones
│   └── globals.css           # Tokens de diseño, colores, tipografía, spacing
├── components/               # Componentes React (mayoría 'use client')
│   ├── providers/
│   │   └── smooth-scroll-provider.tsx
│   ├── nav.tsx
│   ├── hero.tsx              # Hero principal con ventanas flotantes
│   ├── hero-*.tsx            # Sub-componentes del hero
│   ├── mac-window.tsx        # Ventana estilo macOS reutilizable
│   ├── reveal.tsx            # Sistema scroll-reveal
│   ├── stagger-container.tsx # Stagger para listas
│   ├── count-up.tsx          # Contador animado
│   ├── typewriter.tsx        # Efecto máquina de escribir
│   ├── services.tsx, process.tsx, portfolio.tsx, clients.tsx
│   ├── about.tsx, skills.tsx, experience.tsx, education.tsx
│   ├── contact.tsx, footer.tsx
│   └── language-switcher.tsx
├── data/                     # Datos estáticos (algunos legacy, ver i18n)
│   ├── portfolio-data.json
│   ├── experience-data.ts
│   ├── clients-data.ts
│   └── certifications-data.ts
├── hooks/
│   └── use-is-desktop.ts     # Breakpoint desktop: min-width 1024px
├── i18n/
│   ├── routing.ts            # Locales, defaultLocale, navegación
│   └── request.ts            # Config de next-intl
├── messages/
│   ├── en.json               # Contenido EN (fuente principal de copy)
│   └── es.json               # Contenido ES
├── public/
│   ├── projects/             # Imágenes de portfolio ({id}.png o .jpg)
│   ├── clients/              # Logos de clientes
│   ├── companies/            # Logos de empresas (experiencia)
│   └── signaturefg2.mp4      # Video de firma en hero
└── middleware.ts             # Middleware next-intl
```

### Secciones de la página (en orden)

`Nav → Hero → Services → Process → Portfolio → Clients → About → Skills → Experience → Education → Contact → Footer`

Cada sección tiene un `id` para navegación por anclas: `#services`, `#process`, `#portfolio`, `#clients`, `#about`, `#skills`, `#experience`, `#contact`, `#hero`.

---

## 4. Sistema de diseño

### Filosofía

- **Minimal editorial:** blanco, negro y gris. Sin colores de acento.
- **Jerarquía por tamaño, peso y espacio** — nunca por color.
- **Animaciones sutiles pero perceptibles** — sin rebotes ni springs exagerados.
- **Mobile-first** con optimizaciones desktop (efectos más ricos solo en pantallas grandes).
- **Accesibilidad no negociable:** `prefers-reduced-motion` desactiva animaciones globalmente.

### Colores (estrictos — sin excepciones)

| Token | Valor | Uso |
|-------|-------|-----|
| `--background` | `#FFFFFF` | Fondo |
| `--foreground` | `#0A0A0A` | Texto principal |
| `--secondary` | `#8A8A8A` | Texto secundario, footer |

En Tailwind: `bg-background`, `text-foreground`, `text-secondary`.

### Tipografía

| Fuente | Variable CSS | Pesos | Uso |
|--------|-------------|-------|-----|
| **Inter** | `--font-inter` | 400, 500, 700 | Cuerpo, nav, UI general (`font-sans`) |
| **Manrope** | `--font-manrope` | 400–800 | Título del Hero (H1 impactante) |

Cargadas en `app/[locale]/layout.tsx` via `next/font/google` con `display: swap` y `preload: true`.

#### Escala tipográfica (definida en `globals.css`)

```
H1 mobile:  clamp(2.5rem, 12vw, 3.5rem)
H1 desktop: clamp(4rem, 9vw, 10rem)
H2 mobile:  clamp(1.75rem, 8vw, 2.25rem)
H2 desktop: clamp(2.5rem, 5vw, 4.5rem)
H3:         clamp(1.25rem, 2vw, 1.75rem)
Body:       1.0625rem (mobile: 1rem)
Stats:      2.5rem mobile → clamp(3rem, 6vw, 6rem) desktop
Nav:        0.8125rem, letter-spacing 0.12em, uppercase
```

- H1 Hero usa `leading-[0.9]`, `tracking-tighter`, `uppercase`, `font-black`.
- Cuerpo usa `line-height: 1.6` (`leading-relaxed`).
- CTAs y labels: `uppercase`, `tracking-[0.15em]`, `text-sm`.

### Espaciado (escala estricta)

Solo usar valores de la escala: **4 / 8 / 16 / 24 / 32 / 48 / 64 / 96 px**.

```
--spacing-4:  0.25rem   (4px)
--spacing-8:  0.5rem    (8px)
--spacing-16: 1rem      (16px)
--spacing-24: 1.5rem    (24px)
--spacing-32: 2rem      (32px)
--spacing-48: 3rem      (48px)
--spacing-64: 4rem      (64px)
--spacing-96: 6rem      (96px)
```

**No usar** valores sueltos como `mb-5`, `gap-3`, `py-7`. Usar `mb-8`, `gap-4`, `py-32`, etc.

Padding vertical de secciones: `py-32 lg:py-48`. Contenedor: `max-w-7xl mx-auto px-6 lg:px-12`.

### Breakpoint desktop

- **1024px** (`lg:`) — usado en `useIsDesktop()`, Lenis, y efectos condicionales.
- No hay breakpoint intermedio custom; mobile-first con `lg:` para desktop.

### Animaciones

| Parámetro | Valor |
|-----------|-------|
| Easing global | `[0.22, 1, 0.36, 1]` (ease-out-expo) |
| Translate desktop | 40px |
| Translate mobile | 20px |
| Duración mobile | 80% de la desktop |
| Stagger típico | 0.1–0.15s entre items |
| CountUp duración | 2s, `once: true` |

**Componentes de animación reutilizables:**
- `<Reveal>` — entrada individual al scroll (`whileInView`, `once: false`)
- `<StaggerContainer>` + `<StaggerItem>` — cascada de elementos
- `<CountUp>` — contador numérico con `useInView`
- `<Typewriter>` — rotación de palabras en hero

**Reglas:**
- Usar `useReducedMotion()` en componentes animados.
- Evitar `spring` con rebote.
- Scroll a secciones: `scrollIntoView({ behavior: 'smooth' })` (compatible con Lenis).
- NO usar `<a href="#section">` para scroll interno — Lenis no lo integra bien.

---

## 5. Internacionalización (i18n)

- **Locales:** `en` (default), `es`
- **Prefix:** `as-needed` (EN sin prefijo, ES con `/es`)
- **Contenido:** `messages/en.json` y `messages/es.json` (~400 líneas cada uno)
- **Patrón en componentes:**

```tsx
const t = useTranslations('hero');
const items = t.raw('list') as Array<{ title: string }>;
```

- Al agregar contenido nuevo, **siempre actualizar ambos JSON**.
- Metadatos SEO dinámicos por locale en `layout.tsx` (`generateMetadata`).

---

## 6. Patrones de componentes

### Server vs Client

- La página (`page.tsx`) y layout son **Server Components**.
- Casi todos los componentes de sección son **`'use client'`** por animaciones e interactividad.
- Providers (`SmoothScrollProvider`) envuelven children en layout.

### Convenciones de código

- Path alias: `@/*` → raíz del proyecto.
- Componentes en PascalCase, un componente por archivo en `components/`.
- Datos de UI vienen de `messages/*.json` via `useTranslations`, no hardcodeados.
- `data/*.ts` y `portfolio-data.json` existen pero el copy activo está en los JSON de i18n.
- Imágenes de portfolio: `/projects/{project-id}.png` con fallback a `.jpg`.
- Imágenes de clientes: `/clients/`.
- Componente `<MacWindow>` para ventanas flotantes estilo editor/macOS en el hero.

### Navegación

- Nav fijo con backdrop blur, menú fullscreen animado.
- Links internos usan `href="#section-id"` con cierre de menú en click.
- Language switcher cambia locale sin reload completo.
- Redes sociales: Instagram (`fgwebdesign_`), LinkedIn (`felipegut`).

---

## 7. Contenido del portfolio

6 proyectos con categorías filtrables: **Todos / Landing / E-commerce / Catálogo**.

IDs de proyectos (para imágenes en `public/projects/`):
- `cebala`
- `dracostore`
- `casa-brava-studio`
- `casa-brava-ecommerce`
- `schweizer`
- `suen`

Stats en About: 5+ años, 38+ proyectos, 24+ clientes, 3+ países.

---

## 8. Qué NO hacer (anti-patrones)

1. **No agregar colores de acento** — el diseño es estrictamente B/N/gris.
2. **No usar `framer-motion`** — usar `motion/react`.
3. **No hardcodear textos** — usar `messages/en.json` + `messages/es.json`.
4. **No usar spacing fuera de la escala** (4/8/16/24/32/48/64/96).
5. **No montar efectos pesados en mobile** (WebGL, Lenis, ventanas flotantes complejas).
6. **No asumir APIs de Next.js de versiones anteriores** — es Next.js 16.
7. **No crear commits** a menos que el usuario lo pida explícitamente.
8. **No agregar archivos markdown** de documentación sin que el usuario lo solicite.
9. **No usar anchor links** para scroll interno — usar `scrollIntoView` con JS.
10. **Minimizar scope** — cambios pequeños y focalizados, sin over-engineering.

---

## 9. Fases del proyecto

### Completadas
- Fase 0: Setup (Next.js, Tailwind v4, i18n, Lenis, tokens)
- Fase 1: Contenido e i18n
- Fase 2: Hero con animaciones
- Fase 3: Sistema Reveal/Stagger
- Fase 4: Todas las secciones de contenido
- Fase 5: Portfolio con filtro por categoría
- Fase 8: CountUp animado
- Fase 9: SEO y metadatos

### Pendientes (opcionales)
- **Fase 6:** Shader WebGL de agua/ripple (React Three Fiber) — solo desktop
- **Fase 7:** GSAP ScrollTrigger avanzado (timeline horizontal, parallax)
- **Fase 10:** Deploy a Vercel

### Tareas pre-deploy
- CV real en `/public/Felipe_Gutierrez_CV_QA_Engineer.pdf`
- Imágenes reales de proyectos en `public/projects/`
- Revisar copy EN/ES
- Lighthouse audit

---

## 10. Comandos útiles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # ESLint
```

---

## 11. Documentación adicional en el repo

| Archivo | Contenido |
|---------|-----------|
| `RESUMEN-FINAL.md` | Resumen de fases completadas y pendientes |
| `REVEAL-SYSTEM.md` | Guía del sistema Reveal/Stagger |
| `FASE-*-VALIDACION.md` | Decisiones de diseño por fase |
| `IMAGENES-PORTFOLIO.md` | Specs de imágenes de proyectos |
| `CLIENTES.md` | Info de logos de clientes |
| `AGENTS.md` | Reglas para agentes de IA (apunta a este archivo) |

---

*Última actualización: Julio 2026*
