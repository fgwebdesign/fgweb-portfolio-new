# Sistema de Scroll-Reveal — Guía de Uso

## Componentes

### `<Reveal>`
Anima un elemento individual al entrar/salir del viewport.

### `<StaggerContainer>` + `<StaggerItem>`
Para animar múltiples elementos con efecto cascada (stagger).

## Uso básico

### Reveal simple (dirección "up" por defecto)

```tsx
import { Reveal } from '@/components/reveal';

<Reveal>
  <h2>Este título se anima al hacer scroll</h2>
</Reveal>
```

### Reveal con dirección personalizada

```tsx
<Reveal direction="left" delay={0.2}>
  <p>Entra desde la izquierda con 0.2s de delay</p>
</Reveal>
```

### Stagger para listas

```tsx
import { StaggerContainer, StaggerItem } from '@/components/stagger-container';

<StaggerContainer staggerDelay={0.15}>
  {items.map((item) => (
    <StaggerItem key={item.id}>
      <Card {...item} />
    </StaggerItem>
  ))}
</StaggerContainer>
```

## Props

### `<Reveal>`

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `direction` | `'up' \| 'down' \| 'left' \| 'right'` | `'up'` | Dirección de entrada |
| `delay` | `number` | `0` | Delay en segundos |
| `duration` | `number` | `0.6` | Duración de la animación |
| `amount` | `number` | `0.3` | % del elemento visible para trigger (0-1) |
| `className` | `string` | `''` | Clases CSS adicionales |

### `<StaggerContainer>`

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `staggerDelay` | `number` | `0.1` | Delay entre items en segundos |
| `initialDelay` | `number` | `0` | Delay inicial antes del stagger |
| `className` | `string` | `''` | Clases CSS adicionales |

### `<StaggerItem>`

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `direction` | `'up' \| 'down' \| 'left' \| 'right'` | `'up'` | Dirección de entrada |
| `className` | `string` | `''` | Clases CSS adicionales |

## Adaptación automática

### Desktop vs Mobile
- **Desktop**: movimiento completo (40px translate)
- **Mobile**: movimiento sutil (20px translate)
- **Mobile**: duración 20% más corta para sensación de velocidad

### Reduced Motion
Si el usuario tiene `prefers-reduced-motion: reduce`, los componentes renderizan sin animación (solo un `<div>` estático).

## Ejemplos de casos de uso

### Sección con título + grid de cards

```tsx
<section className="py-24">
  <Reveal>
    <h2 className="text-5xl font-bold mb-16">Servicios</h2>
  </Reveal>

  <StaggerContainer staggerDelay={0.12}>
    {services.map((service) => (
      <StaggerItem key={service.id}>
        <ServiceCard {...service} />
      </StaggerItem>
    ))}
  </StaggerContainer>
</section>
```

### Timeline vertical (alternado left/right)

```tsx
{experience.map((job, index) => (
  <Reveal
    key={job.id}
    direction={index % 2 === 0 ? 'left' : 'right'}
    delay={index * 0.1}
  >
    <ExperienceCard {...job} />
  </Reveal>
))}
```

### Fade simple sin dirección

Para fade puro sin translateY/X, usá `amount={0}` con direction up pero duration corta:

```tsx
<Reveal amount={0} duration={0.4}>
  <Image src="..." alt="..." />
</Reveal>
```

## Decisiones de diseño

### ¿Por qué `once: false`?
Animar solo la primera vez (`once: true`) es común, pero en un portfolio donde el usuario puede volver a scrollear hacia arriba, ver las animaciones de nuevo refuerza la sensación de "vivo". Es más dinámico.

Si notás que es demasiado, cambiá `viewport={{ once: false }}` a `viewport={{ once: true }}` en `reveal.tsx` y `stagger-container.tsx`.

### ¿Por qué `amount: 0.3`?
30% del elemento visible para trigger. Si usás `0.5`, elementos muy altos pueden no animarse hasta que estén casi centrados en la pantalla. `0.3` balancea trigger temprano sin ser demasiado ansioso.

### ¿Por qué movimiento más corto en mobile?
40px de translateY en una pantalla de 375px de ancho se siente exagerado. 20px mantiene la sensación de entrada sin ser invasivo.

### Easing consistente
Todas las animaciones usan `[0.22, 1, 0.36, 1]` (ease-out-expo). Es el mismo easing del Hero — consistencia en todo el sitio.

## Siguiente paso

En **Fase 4** vamos a usar estos componentes para construir:
- Servicios (grid con stagger)
- Proceso (timeline con reveal alternado)
- Habilidades (marquee animado)
- Experiencia (timeline vertical)
- Educación (cards con stagger)

Todo reutilizando `<Reveal>` y `<StaggerContainer>`, sin duplicar lógica de animación.
