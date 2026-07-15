/**
 * Orden y metadatos del portafolio — fuente de verdad.
 * Los textos (título, descripción) viven en messages/*.json por idioma.
 */
export interface PortfolioProjectMeta {
  id: string;
  website?: string;
  /** Mockup o captura — prioridad sobre /projects/{id} */
  image: string;
  /** Relación ancho/alto nativa del asset (ej. 4/3 para mockups 1920×1440) */
  imageAspect?: number;
}

export const PORTFOLIO_PROJECTS: PortfolioProjectMeta[] = [
  {
    id: 'rs-investments',
    website: 'https://rsinvestmentsuy.com/es',
    image: '/clients/rsclient.png',
  },
  {
    id: 'schweizer',
    website: 'https://www.schweizerpsychology.com/en',
    image: '/clients/scheizclient.png',
  },
  {
    id: 'suen',
    website: 'https://suen.uy/',
    image: '/clients/suenclient.png',
  },
  {
    id: 'castelier',
    website: 'https://castelier.com.uy/',
    image: '/clients/castelierclient.png',
  },
  {
    id: 'luzuy',
    website: 'https://luzuyimportaciones.com/',
    image: '/clients/luzuyclient.png',
  },
  {
    id: 'byk',
    website: 'https://bykarquitectos.com/',
    image: '/clients/bykclient.png',
  },
  {
    id: 'jeydi',
    website: 'https://jeydi.com.uy/',
    image: '/clients/jeydiclient.png',
  },
  {
    id: 'drones-orientales',
    website: 'https://www.dronesorientales.com/',
    image: '/clients/dronesclient.png',
  },
  {
    id: 'casa-brava-studio',
    website: 'https://estudiocasabrava.com',
    image: '/clients/estudiocasbrava.png',
  },
  {
    id: 'casa-brava-ecommerce',
    website: 'https://casabrava.com.uy/',
    image: '/clients/casabravaproduct.png',
  },
  {
    id: 'cebala',
    website: 'https://cebalaecommerce.com',
    image: '/projects/cebala.png',
  },
];

export const PORTFOLIO_PROJECT_IDS = PORTFOLIO_PROJECTS.map((p) => p.id);

export type PortfolioProject = {
  id: string;
  title: string;
  year: string;
  category: string;
  stack: string;
  description: string;
};

/** Aplica el orden definido en PORTFOLIO_PROJECTS y excluye IDs no listados */
export function orderPortfolioProjects(projects: PortfolioProject[]): PortfolioProject[] {
  const byId = new Map(projects.map((p) => [p.id, p]));

  return PORTFOLIO_PROJECT_IDS.map((id) => byId.get(id)).filter(
    (p): p is PortfolioProject => p !== undefined,
  );
}

export function getPortfolioProjectMeta(id: string): PortfolioProjectMeta | undefined {
  return PORTFOLIO_PROJECTS.find((p) => p.id === id);
}

export function getPortfolioProjectImage(id: string): string {
  return getPortfolioProjectMeta(id)?.image ?? `/projects/${id}.png`;
}

export function getPortfolioProjectAspect(id: string): number {
  return getPortfolioProjectMeta(id)?.imageAspect ?? 4 / 3;
}
