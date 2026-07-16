/** Configuración global del sitio (SEO, URLs canónicas, redes) */
export const siteConfig = {
  name: 'felipegutierrez.dev',
  legalName: 'Felipe Gutiérrez',
  url: 'https://felipegutierrez.dev',
  ogImage: '/og.jpg',
  favicon: '/favicon.svg',
  author: 'Felipe Gutiérrez',
  telephone: '+59892033831',
  email: 'hello@felipegutierrez.dev',
  address: {
    locality: 'Montevideo',
    country: 'Uruguay',
  },
  social: {
    linkedin: 'https://www.linkedin.com/in/felipegut/',
    instagram: 'https://www.instagram.com/fgwebdesign_/',
  },
} as const;
