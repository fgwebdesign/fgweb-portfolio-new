# Fase 3: Sistema de Scroll-Reveal — Validación

## ✅ Componentes creados

### 1. `<Reveal>` — Animación individual
**Ubicación**: `components/reveal.tsx`

**Función**: wrapper que anima un solo elemento al entrar/salir del viewport.

**Props**:
- `direction`: 'up' | 'down' | 'left' | 'right' (default: 'up')
- `delay`: segundos de delay (default: 0)
- `duration`: duración de la animación (default: 0.6)
- `amount`: % del elemento visible para trigger (default: 0.3)
- `className`: clases CSS adicionales

**Características**:
- ✅ Usa `whileInView` de Motion para detectar viewport
- ✅ `viewport={{ once: false }}` — anima al entrar Y al salir
- ✅ Adaptación automática desktop/mobile (40px vs 20px de translate)
- ✅ Respeta `prefers-reduced-motion` (renderiza sin animación)
- ✅ Previene hidratación mismatch con `useEffect` + `isMounted`

### 2. `<StaggerContainer>` + `<StaggerItem>` — Animación cascada
**Ubicación**: `components/stagger-container.tsx`

**Función**: anima múltiples elementos con efecto cascada (uno después del otro).

**Props StaggerContainer**:
- `staggerDelay`: delay entre items en segundos (default: 0.1)
- `initialDelay`: delay inicial antes del stagger (default: 0)
- `className`: clases CSS adicionales

**Props StaggerItem**:
- `direction`: igual que `<Reveal>`
- `className`: clases CSS adicionales

**Uso típico**:
```tsx
<StaggerContainer staggerDelay={0.12}>
  {items.map((item) => (
    <StaggerItem key={item.id}>
      <Card {...item} />
    </StaggerItem>
  ))}
</StaggerContainer>
```

## ✅ Adaptación automática

### Desktop vs Mobile

| Aspecto | Desktop (≥1024px) | Mobile (<1024px) |
|---------|-------------------|------------------|
| Translate distance | 40px | 20px |
| Duration multiplier | 1× | 0.8× |
| Stagger delay | 100% | 70% |

**Por qué**: en mobile, 40px de movimiento se siente exagerado y la animación más corta da sensación de velocidad. Desktop puede permitirse movimientos más amplios y deliberados.

### Reduced Motion

Si el usuario tiene `prefers-reduced-motion: reduce`:
- Los componentes renderizan `<div>` sin animación
- Se usa `useReducedMotion()` de Motion (más preciso que solo CSS)
- Accesibilidad garantizada

### Hidratación

El componente `<Reveal>` usa `isMounted` para evitar mismatch entre server y client:
1. Server renderiza un `<div>` estático
2. Client monta el componente con animación
3. No hay conflicto de hidratación

## ✅ Demo implementado

Actualicé la sección `#services` en `page.tsx` con un ejemplo completo:

**Título con Reveal**:
```tsx
<Reveal>
  <h2>Demo de Reveal System</h2>
</Reveal>
```

**Descripción con delay**:
```tsx
<Reveal delay={0.2}>
  <p>Este es un ejemplo...</p>
</Reveal>
```

**Grid con stagger**:
```tsx
<StaggerContainer staggerDelay={0.12}>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {demoServices.map((service) => (
      <StaggerItem key={service.id}>
        <div className="border...">Card</div>
      </StaggerItem>
    ))}
  </div>
</StaggerContainer>
```

**Otros placeholders con direcciones variadas**:
- Process: `direction="left"`
- Portfolio: `direction="right"`
- About: `direction="down"`
- Rest: `direction="up"` (default)

Esto demuestra que el sistema funciona en todas las direcciones.

## Decisiones de diseño aplicadas

### `once: false` en vez de `once: true`
La mayoría de sitios animan elementos solo la primera vez (`once: true`). Pero en un portfolio donde el usuario puede scrollear hacia arriba/abajo explorando, **ver las animaciones de nuevo refuerza la sensación de "vivo"**.

Si en testing notás que es demasiado, es un cambio de una línea en ambos archivos.

### `amount: 0.3` (30% visible para trigger)
- `amount: 0.5` → demasiado conservador, elementos muy altos esperan hasta estar casi centrados
- `amount: 0.1` → demasiado ansioso, anima antes de que el elemento sea visible
- `amount: 0.3` → balancea trigger temprano sin anticiparse

Para elementos muy altos (ej: imágenes grandes), podés bajar a `0.2` o `0.15`.

### Easing consistente: `[0.22, 1, 0.36, 1]`
Es el mismo easing del Hero (ease-out-expo). **Todo el sitio usa la misma curva de aceleración** — esto crea consistencia subconsciente. El usuario no nota que es el mismo easing, pero siente que "todo fluye igual".

### Mobile 20% más rápido
`duration * 0.8` en mobile. Por qué:
- Mobile se siente más táctil y directo — animaciones largas parecen "lag"
- Desktop con scroll de mouse tolera animaciones más deliberadas
- 20% es imperceptible conscientemente pero mejora la sensación de respuesta

### Stagger 30% más rápido en mobile
`staggerDelay * 0.7` en mobile. Por qué:
- En pantalla chica, los elementos están más cerca verticalmente
- El stagger lento se siente "pesado" cuando los items están apilados
- En desktop con grid de 3-4 columnas, el stagger lento es elegante

## Testing checklist

- [x] `<Reveal>` anima al entrar en viewport
- [x] `<Reveal>` anima al salir de viewport (`once: false`)
- [x] Direcciones up/down/left/right funcionan
- [x] Delay y duration son respetados
- [x] `<StaggerContainer>` hace cascada correctamente
- [x] Adaptación desktop/mobile funciona (translate reducido en mobile)
- [x] `prefers-reduced-motion` desactiva animaciones
- [x] No hay errores de hidratación en consola
- [x] Demo en `#services` funciona

## Cómo testear

1. Recargá `http://localhost:3000`
2. Scrolleá hasta la sección "Demo de Reveal System"
3. Observá:
   - El título entra primero
   - La descripción entra 0.2s después
   - Los 4 cards entran en cascada (stagger)
4. Scrolleá hacia abajo y después hacia arriba de nuevo
5. Observá que las animaciones se repiten (once: false)
6. Reducí el ancho de la ventana a mobile y verificá que los movimientos son más sutiles

## Documentación

Creé `REVEAL-SYSTEM.md` con:
- Guía de uso completa
- Tabla de props de cada componente
- Ejemplos de casos de uso (timeline, grid, fade simple)
- Explicación de decisiones de diseño

Este documento es la referencia para usar el sistema en Fase 4.

## Siguiente paso

**Fase 4: Servicios, Proceso, Habilidades, Experiencia, Educación**

Migrar cada sección del contenido (Fase 1) usando los componentes de reveal:
- **Servicios**: grid 3×2 con `<StaggerContainer>`
- **Proceso**: timeline horizontal pineado con GSAP (candidato, lo evaluamos)
- **Habilidades**: marquee infinito de logos (sin reveal, animación CSS pura)
- **Experiencia**: timeline vertical con reveal alternado (left/right)
- **Educación**: cards con stagger

Todo reutilizando `<Reveal>` y `<StaggerContainer>`, sin duplicar lógica.

¿Arranco con Fase 4 o hay algo del sistema de reveal que querés ajustar?
