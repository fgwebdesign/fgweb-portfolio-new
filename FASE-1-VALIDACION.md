# Fase 1: Contenido e i18n — Validación

## ✅ Contenido completo en ambos idiomas

### Estructura de secciones
Todas las secciones del plan están implementadas en `messages/en.json` y `messages/es.json`:

1. ✅ **Hero** — título, rol, descripción, 2 CTAs
2. ✅ **Servicios** — 6 servicios con 3 bullets cada uno
3. ✅ **Proceso** — 3 pasos (01/02/03) con descripción
4. ✅ **Portafolio** — 6 proyectos con año, categoría, stack, descripción
5. ✅ **About + Stats** — descripción + 4 estadísticas con contador
6. ✅ **Habilidades** — 5 categorías con múltiples items
7. ✅ **Experiencia** — 3 trabajos con periodo, ubicación, descripción
8. ✅ **Educación** — 3 certificaciones/cursos
9. ✅ **Info técnica** — 3 FAQs sobre dominio/hosting/SSL
10. ✅ **Contacto** — título, CTA, email, campos de formulario
11. ✅ **Footer** — copyright + tech stack
12. ✅ **Nav** — 7 links de navegación + switcher de idioma

### Decisiones de contenido

#### Portafolio — Proyectos reales del sitio actual
- **Cebala E-Commerce** (2023) — ecommerce
- **DracoStore** (2023) — ecommerce
- **Estudio Casa Brava** (2022) — landing
- **Casa Brava E-Commerce** (2022) — ecommerce
- **Schweizer Psychology** (2021) — landing
- **SUEN Uruguay** (2021) — catalog

Cada proyecto tiene:
- ID único (para anchor links y filtrado)
- Categoría (ecommerce/landing/catalog) para el filtro
- Stack tecnológico específico
- Descripción concisa

#### Stats — Números reales
- **5+ años** de experiencia
- **38+ proyectos** entregados
- **24+ clientes** satisfechos
- **3+ países** donde trabajó

Estos números van a tener animación de count-up en Fase 8.

#### Habilidades — Agrupadas por categoría
No es una lista larga sin estructura. Está organizado en **5 bloques visuales**:
1. Frontend (React, Next.js, TypeScript, Motion, GSAP...)
2. CMS (WordPress, Shopify...)
3. QA/Testing (Jest, Cypress, Playwright...)
4. Lenguajes (JavaScript, TypeScript, Python...)
5. Herramientas (Git, Figma, Jira...)

Esto permite implementarlo como **marquee/scroll infinito** de logos en Fase 4, no como tabla de texto.

#### Experiencia — Timeline vertical
3 trabajos en orden cronológico inverso:
1. FG Web Designs (2019-Presente) — Fundador
2. Practia Uruguay (2018-2019) — Frontend Dev
3. Ucontact (2017-2018) — QA Engineer

La progresión "QA → Frontend → Fundador" cuenta una historia clara.

#### FAQs técnicos — Educativo pero compacto
3 preguntas frecuentes sobre dominio/hosting/SSL. En vez de ser una sección completa que corta el ritmo visual, va como **acordeón cerca del footer** (lo implementaremos en Fase 4).

## ✅ Switcher de idioma

### Implementación
- Componente `<LanguageSwitcher />` en `components/language-switcher.tsx`
- Usa `useRouter` y `usePathname` de `@/i18n/routing` (next-intl)
- Transición suave con `useTransition` (no reload completo)
- Formato: `EN / ES` (uppercase, tracking amplio, activo en bold)

### Comportamiento
- **Inglés por defecto**: `/` redirige a inglés (no muestra `/en` en la URL)
- **Español**: `/es` explícito en la URL
- Al cambiar idioma, mantiene la posición en la página (mismo pathname)
- Estado visual claro: idioma activo en `font-medium`, inactivo en `text-secondary`

### Ubicación
- Desktop: extremo derecho del nav, después de todos los links
- Mobile: solo el switcher (sin links de nav), para no saturar

## ✅ Nav implementado

### Componente `<Nav />`
- Fixed en top con `backdrop-blur` y border sutil
- Logo "FG" a la izquierda (clickeable a #hero)
- 7 links de navegación en desktop (ocultos en mobile)
- Switcher de idioma siempre visible
- Tipografía: `13px uppercase tracking-[0.12em]` como en el plan

### Links
Todos apuntan a anchors (`#services`, `#portfolio`, etc.) que implementaremos cuando construyamos las secciones en Fase 4. Por ahora no hacen nada, pero la estructura está lista.

## ✅ Home actualizado

### Hero temporal
- Usa tamaños de tipografía del sistema: `clamp()` para H1 que escala fluido
- Muestra título, rol, descripción (nueva), 2 CTAs
- Layout centrado con spacing consistente
- Ya usa las traducciones de `messages/[locale].json`

Esto es temporal — en **Fase 2** vamos a construir el Hero real con animación de entrada y el placeholder para el shader de agua.

## Decisiones de diseño aplicadas

### Estructura del contenido en JSON
```json
{
  "section": {
    "title": "...",
    "subtitle": "...",  // opcional, para overline/subtítulo
    "list": [...]       // items repetibles
  }
}
```

Esta estructura permite:
1. **Consistencia**: todas las secciones tienen title + subtitle
2. **Escalabilidad**: agregar/quitar items sin romper el layout
3. **Reutilización**: un solo componente `<Section>` puede renderizar cualquier sección

### Copy en español — consideraciones de layout
Los textos en español son ~15-20% más largos que en inglés (ej: "Download CV" vs "Descargar CV"). La escala tipográfica con `clamp()` ya contempla esto — los tamaños máximos permiten que el texto "respire" sin romper.

En Fase 4, vamos a verificar que ningún botón, card o título se quiebre en español. Si pasa, ajustamos el `clamp()` o el `line-height`, nunca cambiamos el contenido.

### Orden de prioridad del contenido
El orden de las secciones en el JSON coincide con el flujo visual del sitio:
1. Hero (impacto inmediato)
2. Servicios (qué hago)
3. Proceso (cómo trabajo)
4. Portafolio (prueba visual)
5. About + Stats (credibilidad con números)
6. Skills (expertise técnico)
7. Experience/Education (trayectoria)
8. Technical FAQs (educativo, no "vendedor")
9. Contact (CTA final)

Este orden construye confianza progresivamente: impacto → valor → prueba → credenciales → contacto.

## Siguiente paso

**Fase 2: Hero** — Construir la sección Hero real con:
- Animación de entrada del texto (stagger por palabra con Motion)
- Placeholder para el shader de agua de fondo (condicionado a desktop)
- Layout definitivo con espaciado del sistema
- CTAs funcionales (download link + scroll a #contact)

¿Arranco con Fase 2 o hay algo de Fase 1 que querés ajustar primero?
