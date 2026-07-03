# Fase 2: Hero — Validación

## ✅ Hero con animación completo

### Componente `<Hero />`
Ubicación: `components/hero.tsx`

### Animaciones implementadas

#### 1. Stagger por palabra en el título
**Decisión**: stagger por palabra, no por letra.

**Por qué**: el stagger letra-por-letra es visualmente llamativo pero puede dificultar la lectura, especialmente en títulos largos. El stagger por palabra mantiene la legibilidad mientras aporta dinamismo.

**Implementación**:
- Split del título en array de palabras
- `staggerChildren: 0.12` (120ms entre palabras)
- `delayChildren: 0.3` (espera inicial antes de arrancar)
- Cada palabra entra con `opacity: 0→1` + `y: 30→0`
- Easing: `[0.22, 1, 0.36, 1]` (curva "ease-out-expo" para movimiento suave)

**Timing**: animación total ~0.8s para 3 palabras ("FG Web Designs"), se siente rápido pero no abrupto.

#### 2. Fade-in del contenido secundario
Rol, descripción y CTAs entran con el mismo easing pero `delay: 0.6` para no competir con el título.

**Por qué 0.6s**: permite que el título termine su entrada antes de que aparezca el resto. La jerarquía de lectura es clara: primero el nombre, después el rol/descripción.

#### 3. Indicador de scroll
Solo desktop, animación infinita (sube-baja) con `delay: 1.5` — aparece cuando toda la animación del hero ya terminó, invitando a hacer scroll.

**Por qué solo desktop**: en mobile el scroll es táctil y obvio, el indicador visual es redundante. En desktop con scroll de mouse, el hint es más útil.

### Layout y spacing

**Padding vertical**:
- Mobile: `py-32` (8rem)
- Desktop: `py-48` (12rem)

Generoso pero no excesivo. El hero tiene que "respirar" — el spacing vertical refuerza la jerarquía del contenido.

**Jerarquía tipográfica aplicada**:
```
H1: clamp(2.5rem, 12vw, 3.5rem) mobile → clamp(4rem, 9vw, 10rem) desktop
Role: xl (20px) mobile → 2xl (24px) desktop + text-secondary
Description: base (16px) mobile → lg (18px) desktop + opacity 70%
CTAs: sm (14px) uppercase con tracking amplio
```

Los saltos de tamaño son perceptibles (ratio ~1.5× entre cada nivel), cumpliendo el principio de contraste visual.

**Line-height**: `0.95` para el H1 — apretado pero legible, da impacto visual sin que las líneas se toquen. El resto del texto usa `leading-relaxed` (1.6) para confort de lectura.

### Placeholder para shader WebGL

```tsx
{isDesktop && (
  <div id="hero-canvas" className="absolute inset-0 -z-10">
    {/* El shader se montará aquí en Fase 6 */}
  </div>
)}
```

**Decisión**: solo desktop, condicionado con `useIsDesktop()`.

**Por qué**: el shader de agua es pesado (WebGL + animación de partículas/displacement). En mobile consume batería y el efecto no se aprecia tanto en pantallas chicas. Desktop es donde el portfolio "brilla".

**Posición**: `absolute inset-0` con `-z-10` para que quede detrás del texto. `aria-hidden="true"` porque es decorativo.

**Fase 6**: aquí montaremos `<Canvas>` de React Three Fiber con el shader custom de distorsión/ripple.

### CTAs funcionales

#### 1. Download CV
```tsx
<a href="/cv/felipe-gutierrez-cv.pdf" download>
```

Link directo a PDF en `public/cv/`. Por ahora es un placeholder (archivo vacío), pero la estructura está lista. Cuando tengas el CV real, solo reemplazás el PDF.

**Por qué download attribute**: fuerza la descarga en vez de abrir el PDF en el browser. UX más directa.

#### 2. Scroll a Contact
```tsx
<button onClick={handleContactClick}>
```

Usa `scrollIntoView({ behavior: 'smooth' })` para hacer scroll suave al section `#contact`. Funciona con Lenis (el smooth scroll provider que configuramos en Fase 0).

**Alternativa que NO usé**: anchor link `<a href="#contact">`. Problema: anchor links no se integran bien con Lenis y pueden hacer un salto brusco. Con JS + `scrollIntoView`, Lenis intercepta el scroll y lo suaviza.

### Estructura de página actualizada

Agregué placeholders para todas las secciones en `page.tsx`:

```tsx
<section id="services">...</section>
<section id="process">...</section>
<section id="portfolio">...</section>
<section id="about">...</section>
<section id="skills">...</section>
<section id="experience">...</section>
<section id="contact">...</section>
```

Cada una es un `min-h-screen` con texto placeholder. Esto permite:
1. Testear el scroll suave de Lenis
2. Verificar que los links del nav funcionen (hacen scroll a los IDs)
3. Verificar que el botón "Contacto" del hero haga scroll correcto

En **Fase 4** vamos a reemplazar estos placeholders con el contenido real.

## Decisiones de diseño aplicadas

### Animación sutil, no "rebotes"
La entrada del título es suave (`y: 30`) con easing natural. Nada de `spring` con rebote o efectos exagerados. El principio minimal se aplica también al movimiento: **sutil pero perceptible**.

### Spacing consistente
Todos los `gap` y `mb-*` usan la escala del sistema:
- `mb-8` = 2rem (32px)
- `mb-12` = 3rem (48px)
- `mb-16` = 4rem (64px)
- `gap-4` = 1rem (16px)

Nada de valores sueltos tipo `mb-7` o `gap-5`. La grilla del sistema se respeta.

### Mobile-first pero desktop-optimizado
El layout funciona perfecto en mobile (columna, botones apilados). Pero las animaciones fuertes (stagger, indicador de scroll, placeholder para shader) están pensadas para desktop. Mobile prioriza velocidad de carga y claridad.

### `prefers-reduced-motion` ya cubierto
El CSS global (Fase 0) ya tiene:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Esto desactiva todas las animaciones de Motion automáticamente para usuarios que prefieren movimiento reducido. Accesibilidad no negociable.

## Cómo se ve

**Desktop**:
1. El título entra palabra por palabra con fade + translateY
2. 0.6s después aparece el rol + descripción
3. Después los CTAs
4. 1.5s después aparece el indicador de scroll (línea animada)
5. Fondo blanco limpio (el shader se agregará en Fase 6)

**Mobile**:
1. Misma secuencia de animación pero sin indicador de scroll
2. H1 más chico pero todavía impactante (2.5rem mínimo)
3. Botones apilados verticalmente
4. Sin placeholder de shader (no se monta)

## Testing checklist

- [x] Animación del título se ejecuta correctamente
- [x] Stagger de palabras tiene timing coherente (no muy lento ni muy rápido)
- [x] Rol y descripción entran después del título
- [x] CTAs aparecen al final de la secuencia
- [x] Botón "Download CV" tiene href correcto
- [x] Botón "Contacto" hace scroll suave a #contact
- [x] Indicador de scroll solo aparece en desktop
- [x] Placeholder de shader solo se monta en desktop
- [x] Funciona en ambos idiomas (EN/ES)
- [x] Espaciado consistente con la escala del sistema

## Siguiente paso

**Fase 3: Sistema de scroll-reveal reutilizable**

Crear un componente `<Reveal>` wrapper con Motion que:
- Use `whileInView` para animar elementos al scrollear
- Sea parametrizable (dirección: up/down/left/right, delay)
- Tenga variante simplificada automática para mobile
- Se reutilice en todas las secciones (Servicios, Proceso, Skills, etc.)

Esto evita duplicar lógica de scroll en cada sección. Una sola fuente de verdad para las animaciones de entrada/salida.

¿Arranco con Fase 3 o hay algo del Hero que querés ajustar?
