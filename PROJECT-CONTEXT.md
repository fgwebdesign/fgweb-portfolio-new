# Contexto del Proyecto — felipegutierrez.dev Portfolio

> **Para agentes de IA:** Lee este archivo antes de modificar código. Es la fuente de verdad sobre arquitectura, diseño, convenciones y decisiones del proyecto.

---

## 1. Qué es este proyecto

Portfolio personal y profesional de **Felipe Gutiérrez** (`felipegutierrez.dev`), posicionado como **Full Stack Developer & QA Engineer** con foco en **SaaS**, plataformas web y apps mobile. El sitio es una landing page de una sola página (single-page) con secciones ancladas, bilingüe (ES/EN), con animaciones sutiles y estética **minimalista blanco y negro**.

- **Dominio / marca:** `felipegutierrez.dev` (rebrand desde FG Web Designs)
- **Email de contacto:** `hello@felipegutierrez.dev`
- **Ubicación SEO:** Montevideo, Uruguay — audiencia Uruguay, Latinoamérica e internacional
- **Enfoque:** Mostrar servicios, portfolio, productos propios (SaaS), experiencia y contacto con un diseño editorial y animaciones con propósito — nunca decorativas por decorar.

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
| i18n | **next-intl** | **ES default**, EN disponible |
| 3D / WebGL | **Three.js + React Three Fiber + Drei** | Instalados, **aún no implementados** (Fase 6 pendiente) |
| GSAP | **gsap** | Instalado, **aún no usado** (Fase 7 pendiente) |
| Linting | ESLint + eslint-config-next | |
| Deploy previsto | Vercel / Render | SEO preparado; ver `docs/SEO-DEPLOY.md` |

### Importaciones importantes

```tsx
// Animaciones — SIEMPRE desde motion/react, NO framer-motion
import { motion, AnimatePresence, useInView, useReducedMotion } from 'motion/react';

// Traducciones en client components
import { useTranslations } from 'next-intl';

// Traducciones en server components
import { getTranslations } from 'next-intl/server';

// Config global del sitio (SEO, URLs, redes)
import { siteConfig } from '@/lib/site';

// Alias de paths
import { Component } from '@/components/component';
```

---

## 3. Estructura del proyecto

```
fgweb-new-portfolio/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # Fuentes, i18n, SEO (JsonLd, Analytics), SmoothScrollProvider
│   │   └── page.tsx            # Página única con todas las secciones (dynamic imports)
│   ├── globals.css             # Tokens de diseño, colores, tipografía, spacing
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── providers/
│   │   └── smooth-scroll-provider.tsx   # Lenis + contexto useLenis()
│   ├── seo/
│   │   ├── json-ld.tsx         # Schema.org Person + WebSite + ProfessionalService
│   │   └── analytics.tsx       # GA4 + GSC verification (env vars)
│   ├── nav.tsx                 # Nav fijo, menú fullscreen, scroll programático
│   ├── hero.tsx                # Hero orquestado (ver § Hero)
│   ├── hero-*.tsx              # Background, ventanas, spotlight, corner shapes
│   ├── domain-typewriter.tsx   # Typewriter del dominio en H1
│   ├── mac-window.tsx          # Ventana estilo macOS reutilizable (prop `active`)
│   ├── typewriter.tsx          # Rotación de palabras (subtítulo servicios hero)
│   ├── services.tsx            # Scroll-driven reveal bidireccional
│   ├── portfolio.tsx           # Scroll-driven reveal bidireccional
│   ├── products.tsx            # Sección productos SaaS propios (Matchly)
│   ├── process.tsx, about.tsx, skills.tsx, experience.tsx
│   ├── contact.tsx, footer.tsx
│   ├── reveal.tsx              # Legacy scroll-reveal (whileInView); ya no es el patrón principal
│   ├── stagger-container.tsx
│   ├── count-up.tsx
│   ├── language-switcher.tsx
│   ├── clients.tsx             # Existe pero NO está en page.tsx actual
│   └── education.tsx           # Existe pero NO está en page.tsx actual
├── data/
│   ├── hero-sequence.ts        # Fuente de verdad de timings del hero
│   ├── portfolio-projects.ts   # Orden, imágenes y metadatos del portfolio
│   ├── products-data.ts        # Metadatos de productos (imágenes, URLs)
│   ├── portfolio-data.json     # Legacy parcial
│   ├── experience-data.ts
│   ├── clients-data.ts
│   └── certifications-data.ts
├── docs/
│   └── SEO-DEPLOY.md           # Checklist post-deploy (GSC, GA4, queries UY/LATAM)
├── hooks/
│   ├── use-is-desktop.ts       # Breakpoint desktop: min-width 1024px
│   ├── use-scroll-reveal.ts    # Scroll-driven reveal bidireccional (Portfolio, Services)
│   └── use-scroll-to-section.ts # Scroll programático compatible con Lenis
├── i18n/
│   ├── routing.ts              # Locales, defaultLocale: 'es', navegación
│   └── request.ts
├── lib/
│   ├── site.ts                 # siteConfig central (nombre, URL, OG, redes, teléfono)
│   └── motion-viewport.ts      # SECTION_VIEWPORT, SECTION_EASE (secciones con whileInView)
├── messages/
│   ├── en.json                 # Contenido EN (~470 líneas)
│   └── es.json                 # Contenido ES (~470 líneas) — copy principal / SEO LATAM
├── public/
│   ├── og.jpg                  # Open Graph image
│   ├── favicon.svg
│   ├── projects/               # Capturas de portfolio (fallback por id)
│   ├── clients/                # Mockups de clientes usados también en portfolio
│   ├── products/               # Imágenes de productos SaaS
│   └── companies/              # Logos de empresas (experiencia)
└── middleware.ts               # Middleware next-intl
```

### Secciones de la página (orden actual en `page.tsx`)

`Nav → Hero → Services → Portfolio → Products → About → Skills → Experience → Process → Contact → Footer`

Cada sección activa tiene `id` para navegación por anclas: `#hero`, `#services`, `#portfolio`, `#products`, `#about`, `#skills`, `#experience`, `#process`, `#contact`.

**Secciones con componente pero fuera de la página:** `Clients`, `Education` (mensajes i18n siguen existiendo por si se reincorporan).

---

## 4. Sistema de diseño

### Filosofía

- **Minimal editorial:** blanco, negro y gris. Sin colores de acento.
- **Jerarquía por tamaño, peso y espacio** — nunca por color.
- **Animaciones sutiles pero perceptibles** — sin rebotes ni springs exagerados (excepto spring suave en scroll-reveal de Portfolio/Services).
- **Mobile-first** con optimizaciones desktop (efectos más ricos solo en pantallas grandes).
- **Accesibilidad no negociable:** `prefers-reduced-motion` desactiva animaciones globalmente; secciones con `aria-labelledby` + `id` en H2.

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

- H1 Hero usa `lowercase`, `font-black`, `tracking-[-0.03em]` (dominio `felipegutierrez.dev`).
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

Padding vertical de secciones: `py-24 lg:py-48` (Products usa `py-24 lg:py-32`). Contenedor: `max-w-7xl mx-auto px-6 lg:px-12`.

### Breakpoint desktop

- **1024px** (`lg:`) — usado en `useIsDesktop()`, Lenis, ventanas Mac del hero (`hidden lg:block`), y efectos condicionales.
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
| Scroll-reveal spring | `stiffness: 260, damping: 32, mass: 0.7` |

#### Patrones de animación

| Patrón | Dónde | Comportamiento |
|--------|-------|----------------|
| **Hero orquestado** | `hero.tsx` + `data/hero-sequence.ts` | Secuencia por fases desde mount; fases post-título disparadas al completar `DomainTypewriter` |
| **Scroll-driven bidireccional** | `portfolio.tsx`, `services.tsx` | `useSectionScrollProgress` + `useRevealMotion` — reversible al subir scroll |
| **whileInView (once)** | Otras secciones | `SECTION_VIEWPORT` en `lib/motion-viewport.ts` |
| **Lenis smooth scroll** | Desktop | Contexto `useLenis()` en `SmoothScrollProvider` |

**Componentes de animación reutilizables:**
- `<Reveal>` — entrada individual al scroll (legacy, `whileInView`)
- `<StaggerContainer>` + `<StaggerItem>` — cascada de elementos
- `<CountUp>` — contador numérico con `useInView`
- `<Typewriter>` — rotación de palabras en hero (servicios)
- `<DomainTypewriter>` — tipeo del dominio en H1 con pausa en `.`
- `<MacWindow>` — ventana flotante con prop `active` (evita remount)

**Reglas:**
- Usar `useReducedMotion()` en componentes animados.
- Evitar `spring` con rebote (excepto el spring controlado de scroll-reveal).
- Scroll a secciones: usar `useScrollToSection()` — **no** `<a href="#section">` directo (bug doble-click con Lenis).
- Timings del hero: modificar solo `data/hero-sequence.ts`, no hardcodear delays en `hero.tsx`.

---

## 5. Hero — orquestación de entrada

Fuente de verdad: **`data/hero-sequence.ts`**.

### Secuencia (orden)

1. **Fondo** (`HeroMinimalBackground`) — trazos SVG + formas 3D en esquinas
2. **Ventana `skills.ts`** — arriba izquierda, `enter: 0.35s`
3. **Título** — `DomainTypewriter` de `felipegutierrez.dev`, `enter: 0.45s`, `charSpeed: 72`
4. **Tras completar título** (offsets `afterTitle`):
   - Ventana `profile.ts` — `afterTitle: 0.1s`, `shellDelay: 0.06s`
   - Typewriter de servicios — `afterTitle: 0.22s`
   - Párrafo descripción — `afterTitle: 0.38s`
   - CTAs — `afterTitle: 0.55s`
   - Indicador scroll — `afterTitle: 0.85s`

### Detalles técnicos

- **Profile window** siempre montada; visibilidad con `active={showProfile}` en `<MacWindow>` (evita remount y desincronización).
- **Contenido de MacWindow** entra con `contentDelayAfterShell` (~42% del shell), no al inicio del shell.
- **H1** aparece al montar; solo el typewriter tiene delay de entrada (no duplicar delay en `motion.h1`).
- **`seoTagline`** en `messages/*.json` → renderizado como `sr-only` dentro del H1.
- Ventanas Mac: solo desktop (`hidden lg:block`).

### Copy del hero (typewriter servicios)

5 líneas rotativas enfocadas en SaaS y QA profesional, ej. ES:
`Desarrollo de Software SaaS → Ingeniería Full Stack → Aplicaciones React Native → Aseguramiento de Calidad → Automatización de Pruebas`

---

## 6. Scroll reveal bidireccional

Hook: **`hooks/use-scroll-reveal.ts`**

Usado en **Portfolio** y **Services** para animaciones que:
- Avanzan al bajar scroll
- **Se revierten al subir** (no `once: true`)

API principal:
```tsx
const sectionScroll = useSectionScrollProgress(sectionRef);
const itemRange = scrollItemRange(index, total, [0.08, 0.92]);
const progress = useSegmentProgress(sectionScroll, itemRange);
const motionProps = useRevealMotion(progress, { y: 40 });
```

Services además usa sección alta (`min-h-[200svh]`) para dar espacio al scroll-driven de las cards.

---

## 7. Internacionalización (i18n)

- **Locales:** `es` (**default**), `en`
- **URLs:** `localePrefix: 'as-needed'` → ES en `/`, EN en `/en`
- **`html lang`:** `es-UY` para español, `en` para inglés
- **Contenido:** `messages/en.json` y `messages/es.json`
- **Patrón en componentes:**

```tsx
const t = useTranslations('hero');
const items = t.raw('list') as Array<{ title: string }>;
```

- Al agregar contenido nuevo, **siempre actualizar ambos JSON**.
- Metadatos SEO dinámicos por locale en `layout.tsx` (`generateMetadata`).
- Copy ES incluye keywords naturales: Montevideo, Uruguay, Latinoamérica, SaaS.

---

## 8. SEO y metadatos

Config central: **`lib/site.ts`** (`siteConfig`).

| Asset / feature | Ubicación |
|-----------------|-----------|
| OG image | `public/og.jpg` |
| Favicon | `public/favicon.svg` |
| JSON-LD | `components/seo/json-ld.tsx` — Person, WebSite, ProfessionalService, `areaServed` LATAM, `knowsAbout` |
| Analytics | `components/seo/analytics.tsx` — GA4 (`NEXT_PUBLIC_GA_MEASUREMENT_ID`) |
| GSC verification | `NEXT_PUBLIC_GSC_VERIFICATION` en metadata |
| Sitemap | `app/sitemap.ts` — `x-default` apunta a `/` (ES) |
| Post-deploy checklist | `docs/SEO-DEPLOY.md` |

**Semántica:** secciones con `aria-labelledby` + `id` en H2; alts descriptivos en imágenes de portfolio.

---

## 9. Patrones de componentes

### Server vs Client

- La página (`page.tsx`) y layout son **Server Components**.
- Casi todos los componentes de sección son **`'use client'`** por animaciones e interactividad.
- Secciones below-the-fold cargadas con **`dynamic()`** en `page.tsx`.
- Providers (`SmoothScrollProvider`) envuelven children en layout.

### Convenciones de código

- Path alias: `@/*` → raíz del proyecto.
- Componentes en PascalCase, un componente por archivo en `components/`.
- Datos de UI vienen de `messages/*.json` via `useTranslations`, no hardcodeados.
- Orden del portfolio: `data/portfolio-projects.ts` (fuente de verdad de IDs e imágenes).
- Productos SaaS: `data/products-data.ts` + copy en i18n.
- Imágenes de portfolio: mockups en `/clients/` o fallback `/projects/{id}.png`.
- Componente `<MacWindow>` para ventanas flotantes estilo editor/macOS en el hero.

### Navegación

- Nav fijo con backdrop blur, menú fullscreen animado.
- Links internos usan `useScrollToSection().handleSectionClick` — **no** anchor nativo.
- Logo click → scroll a `#hero` vía Lenis (fix doble-click).
- Redes sociales en nav: **ocultas en mobile** (`hidden lg:flex`).
- Tooltip "TAP HERE" debajo del menú hamburguesa en mobile.
- Language switcher cambia locale sin reload completo.
- Redes: Instagram (`fgwebdesign_`), LinkedIn (`felipegut`).

### Footer

Rediseñado con: logo, contacto (email/tel), redes, navegación por secciones, copyright. Usa `useScrollToSection` para links internos.

### Products

Sección editorial para productos SaaS propios. Layout texto izquierda / imagen derecha con bleed. Actualmente: **Matchly** (`/products/matchlyproduct.png`).

---

## 10. Contenido del portfolio

**11 proyectos** ordenados en `data/portfolio-projects.ts`:

| ID | Notas |
|----|-------|
| `rs-investments` | Catálogo |
| `schweizer` | Landing |
| `suen` | Landing |
| `castelier` | Catálogo |
| `luzuy` | E-commerce |
| `byk` | Landing |
| `jeydi` | Landing |
| `drones-orientales` | Landing |
| `casa-brava-studio` | Landing |
| `casa-brava-ecommerce` | E-commerce |
| `cebala` | E-commerce |

Categorías filtrables en UI: **Todos / Landing / E-commerce / Catálogo**.

Stats en About: 5+ años, 38+ proyectos, 24+ clientes, 3+ países.

---

## 11. Qué NO hacer (anti-patrones)

1. **No agregar colores de acento** — el diseño es estrictamente B/N/gris.
2. **No usar `framer-motion`** — usar `motion/react`.
3. **No hardcodear textos** — usar `messages/en.json` + `messages/es.json`.
4. **No usar spacing fuera de la escala** (4/8/16/24/32/48/64/96).
5. **No montar efectos pesados en mobile** (WebGL, Lenis, ventanas Mac del hero).
6. **No asumir APIs de Next.js de versiones anteriores** — es Next.js 16.
7. **No crear commits** a menos que el usuario lo pida explícitamente.
8. **No agregar archivos markdown** de documentación sin que el usuario lo solicite.
9. **No usar anchor links** para scroll interno — usar `useScrollToSection`.
10. **No hardcodear delays del hero** — usar `HERO_SEQUENCE` en `data/hero-sequence.ts`.
11. **No remontar ventanas Mac** con `{condition && <MacWindow>}` — usar prop `active`.
12. **Minimizar scope** — cambios pequeños y focalizados, sin over-engineering.

---

## 12. Fases del proyecto

### Completadas
- Fase 0: Setup (Next.js, Tailwind v4, i18n, Lenis, tokens)
- Fase 1: Contenido e i18n
- Fase 2: Hero con animaciones orquestadas (`HERO_SEQUENCE`, ventanas Mac, typewriters)
- Fase 3: Sistema Reveal/Stagger + scroll-reveal bidireccional (Portfolio, Services)
- Fase 4: Todas las secciones de contenido activas
- Fase 5: Portfolio con filtro por categoría (11 proyectos)
- Fase 8: CountUp animado
- Fase 9: SEO y metadatos (JSON-LD, OG, favicon, ES default, LATAM keywords)
- **Extra:** Rebrand a `felipegutierrez.dev`, sección Products, footer rediseñado, mobile responsive, nav fixes (Lenis scroll), copy SaaS/QA profesional

### Pendientes (opcionales)
- **Fase 6:** Shader WebGL de agua/ripple (React Three Fiber) — solo desktop
- **Fase 7:** GSAP ScrollTrigger avanzado (timeline horizontal, parallax)
- **Fase 10:** Deploy a producción + ejecutar checklist `docs/SEO-DEPLOY.md`
- Reincorporar sección Clients y/o Education si se desea

### Tareas pre-deploy
- CV real en `/public/Felipe_Gutierrez_CV_QA_Engineer.pdf`
- Configurar `NEXT_PUBLIC_GA_MEASUREMENT_ID` y `NEXT_PUBLIC_GSC_VERIFICATION`
- Lighthouse audit (mobile + desktop)
- Search Console: enviar sitemap, verificar hreflang ES/EN

---

## 13. Comandos útiles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # ESLint
```

---

## 14. Documentación adicional en el repo

| Archivo | Contenido |
|---------|-----------|
| `docs/SEO-DEPLOY.md` | Checklist post-deploy: GSC, GA4, queries UY/LATAM |
| `AGENTS.md` | Reglas para agentes de IA (apunta a este archivo) |
| `RESUMEN-FINAL.md` | Resumen de fases completadas y pendientes |
| `REVEAL-SYSTEM.md` | Guía del sistema Reveal/Stagger (parcialmente legacy) |
| `FASE-*-VALIDACION.md` | Decisiones de diseño por fase |
| `IMAGENES-PORTFOLIO.md` | Specs de imágenes de proyectos |
| `CLIENTES.md` | Info de logos de clientes |

---

*Última actualización: Julio 2026*
