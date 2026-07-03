# FG Web Designs Portfolio

Portfolio minimal blanco y negro construido con Next.js 15, TypeScript y animaciones de alto impacto.

## 🎯 Estado del Proyecto

✅ **Fases Completadas:**
- [x] Fase 0: Setup (Next.js + Tailwind v4 + fuentes + i18n)
- [x] Fase 1: Contenido e i18n completo (EN/ES)
- [x] Fase 2: Hero con animación
- [x] Fase 3: Sistema de scroll-reveal reutilizable
- [x] Fase 4: Todas las secciones de contenido
- [x] Fase 5: Portfolio con filtro por categoría
- [x] Fase 8: Stats con contador animado (count-up)
- [x] Fase 9: Performance y metadatos SEO

⏳ **Pendientes (opcionales):**
- [ ] Fase 6: Shader WebGL de agua/ripple en hero
- [ ] Fase 7: GSAP ScrollTrigger para animaciones complejas
- [ ] Fase 10: Deploy a Vercel

## Stack Técnico

- **Framework**: Next.js 16.2.10 (App Router) + TypeScript
- **Estilos**: Tailwind CSS v4
- **Animaciones UI**: Motion (ex-Framer Motion)
- **Animaciones complejas**: GSAP + ScrollTrigger (preparado, no usado aún)
- **Scroll suave**: Lenis (solo desktop ≥1024px)
- **WebGL/Shaders**: React Three Fiber + drei (preparado, no usado aún)
- **i18n**: next-intl (EN por defecto, ES disponible)
- **Fuente**: Inter (400/500/700)

## Sistema de Diseño

### Colores
- Blanco: `#FFFFFF`
- Negro: `#0A0A0A`
- Gris secundario: `#8A8A8A` (solo texto terciario)

### Tipografía
Una sola familia (Inter) con 3 pesos. Jerarquía por tamaño y espacio, nunca por color.

**Escala fluida con `clamp()`:**
- H1: 2.5rem (mobile) → 10rem (desktop)
- H2: 1.75rem (mobile) → 4.5rem (desktop)
- H3: 1.25rem → 1.75rem
- Body: 16-17px

### Espaciado
Escala consistente: 4/8/16/24/32/48/64/96px (en Tailwind: spacing-4 a spacing-96)

### Animaciones
- **Desktop**: animaciones completas (stagger, parallax, scroll-reveals)
- **Mobile**: simplificadas (fade simple, translate reducido, sin WebGL)
- **Easing consistente**: `[0.22, 1, 0.36, 1]` (ease-out-expo) en todo el sitio
- Siempre respeta `prefers-reduced-motion`

## Desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar producción
npm start
```

El servidor arranca en `http://localhost:3000`

## Estructura

```
app/
  [locale]/              # Rutas con i18n
    layout.tsx           # Layout con metadatos dinámicos
    page.tsx             # Home (todas las secciones)
  globals.css            # Tokens Tailwind v4 + sistema de diseño
components/
  hero.tsx               # Hero con animación stagger por palabra
  services.tsx           # Grid 3×2 con stagger
  process.tsx            # Timeline de 3 pasos
  portfolio.tsx          # Grid con filtro por categoría
  about.tsx              # Stats con contador animado
  skills.tsx             # Categorías de habilidades
  experience.tsx         # Timeline vertical
  education.tsx          # Cards de certificaciones
  contact.tsx            # CTA + email
  footer.tsx             # Footer con copyright
  nav.tsx                # Nav sticky con language switcher
  language-switcher.tsx  # Switcher EN/ES
  reveal.tsx             # Sistema de scroll-reveal
  stagger-container.tsx  # Animación cascada
  count-up.tsx           # Contador animado
  providers/
    smooth-scroll-provider.tsx  # Lenis (solo desktop)
hooks/
  use-is-desktop.ts      # Detecta ≥1024px para condicionar animaciones
i18n/
  routing.ts             # Config de locales
  request.ts             # Loader de mensajes
messages/
  en.json                # Traducciones inglés (294 líneas)
  es.json                # Traducciones español (294 líneas)
```

## Secciones Implementadas

1. ✅ **Hero** — Título animado + CTAs funcionales
2. ✅ **Servicios** — 6 servicios en grid 3×2
3. ✅ **Proceso** — 3 pasos del flujo de trabajo
4. ✅ **Portafolio** — 6 proyectos con filtro (Todos/Landing/E-commerce/Catálogo)
5. ✅ **About + Stats** — Descripción + 4 stats con contador animado
6. ✅ **Habilidades** — 5 categorías (Frontend, CMS, QA, Lenguajes, Herramientas)
7. ✅ **Experiencia** — 3 trabajos en timeline vertical
8. ✅ **Educación** — 3 certificaciones en cards
9. ✅ **Contacto** — Email + CTA
10. ✅ **Footer** — Copyright + tech stack

## Idiomas

- **Inglés** (default): `/` o `/en`
- **Español**: `/es`

El switcher de idioma está en el nav (extremo derecho en desktop, centrado en mobile).

## Decisiones de Diseño

### ¿Por qué Inter y no Neue Montreal?
Inter es más accesible (Google Fonts), tiene métricas excelentes y cumple perfectamente el brief minimal. Si querés cambiar a Neue Montreal, es solo modificar el import en `layout.tsx`.

### ¿Por qué Lenis solo en desktop?
El scroll suave consume batería en mobile y la diferencia de UX no justifica el costo. Mobile prioriza velocidad.

### ¿Por qué inglés por defecto?
Portfolio orientado a audiencia internacional. El español está disponible para clientes locales.

### ¿Por qué `once: false` en las animaciones?
Animar solo la primera vez es común, pero en un portfolio donde el usuario puede volver a scrollear hacia arriba, ver las animaciones de nuevo refuerza la sensación de "vivo".

### ¿Por qué stagger por palabra y no por letra?
El stagger letra-por-letra puede dificultar la lectura. El stagger por palabra mantiene legibilidad + dinamismo.

## Performance

- ✅ Fuentes con `display: swap` y `preload: true`
- ✅ Lenis y animaciones pesadas solo en desktop
- ✅ `prefers-reduced-motion` respetado globalmente
- ✅ Metadatos SEO dinámicos por idioma
- ✅ Lazy-loading automático de componentes (Next.js)

## Accesibilidad

- ✅ Contraste AA mínimo (blanco/negro)
- ✅ `prefers-reduced-motion` desactiva animaciones
- ✅ Navegación por teclado funcional
- ✅ Semántica HTML correcta (nav, section, article, footer)
- ✅ Alt text preparado (cuando se agreguen imágenes reales)

## Siguiente Paso: Deploy

Para deployar a Vercel:

```bash
# Si no tenés Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

O conectá el repo de GitHub a Vercel desde el dashboard.

## Mejoras Futuras (opcionales)

1. **Shader WebGL en hero** — Efecto de agua/distorsión con React Three Fiber
2. **GSAP ScrollTrigger** — Para Proceso como timeline horizontal pineado
3. **Imágenes reales de proyectos** — Reemplazar placeholders
4. **CV real** — Reemplazar `/public/cv/felipe-gutierrez-cv.pdf`
5. **Analytics** — Vercel Analytics o Google Analytics
6. **Formulario de contacto funcional** — API route + servicio de email

## Licencia

Privado. Todos los derechos reservados.
