/** Secuencia de entrada del Hero — tiempos en segundos desde el mount (salvo *afterTitle) */
export const HERO_SEQUENCE = {
  ease: [0.22, 1, 0.36, 1] as const,

  /** 1. Fondo + trazos + formas 3D */
  background: { enter: 0, duration: 0.9 },
  cornerShapes: { enter: 0.2, duration: 1 },

  /** 2. Ventana skills.ts (arriba izquierda) */
  skillsWindow: { enter: 0.35 },

  /** 3. Título felipegutierrez.dev */
  title: { enter: 0.45, charSpeed: 72 },

  /**
   * Tras terminar el título — offsets compactos para que nada quede colgado
   * con el dominio largo (~2.1s de tipeo).
   */
  profileWindow: { afterTitle: 0.1, shellDelay: 0.06 },
  services: { afterTitle: 0.22 },
  description: { afterTitle: 0.38 },
  buttons: { afterTitle: 0.55 },
  scroll: { afterTitle: 0.85 },

  /** Pausa entre palabras del subtítulo de servicios */
  servicesWordPause: 2200,

  macWindow: {
    shellDuration: 0.65,
    /** Contenido entra cerca del final del shell, no al inicio */
    contentDelayAfterShell: 0.42,
  },
} as const;

/** Estima cuánto tarda el typewriter del dominio (segundos). */
export function estimateTitleTypeDuration(
  text: string,
  charSpeedMs: number,
  startDelaySec: number,
): number {
  let ms = startDelaySec * 1000;
  for (const char of text) {
    ms += char === '.' ? charSpeedMs * 6 : charSpeedMs;
  }
  return ms / 1000;
}
