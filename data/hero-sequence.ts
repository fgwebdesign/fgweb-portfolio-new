/** Secuencia de entrada del Hero — tiempos en segundos desde el mount (salvo *afterTitle) */
export const HERO_SEQUENCE = {
  ease: [0.22, 1, 0.36, 1] as const,

  /** 1. Fondo + trazos + formas 3D */
  background: { enter: 0, duration: 0.9 },
  cornerShapes: { enter: 0.2, duration: 1 },

  /** 2. Ventana skills.ts (arriba izquierda) */
  skillsWindow: { enter: 0.4 },

  /** 3. Título felipegutierrez.dev */
  title: { enter: 0.55, charSpeed: 95 },

  /** Tras terminar el título — orden: profile → services → botones → scroll */
  profileWindow: { afterTitle: 0.3 },
  services: { afterTitle: 0.55 },
  buttons: { afterTitle: 1.05 },
  scroll: { afterTitle: 1.7 },

  /** Pausa entre palabras del subtítulo de servicios */
  servicesWordPause: 2200,

  macWindow: {
    shellDuration: 0.75,
    contentStagger: 0.22,
  },
} as const;
