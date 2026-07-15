/** Configuración global del sitio (SEO, URLs canónicas, redes) */
export const siteConfig = {
  name: 'FG WEB DESIGNS',
  url: 'https://www.fgwebdesign.dev',
  ogImage: '/HeroImage.jpg',
  favicon: '/logofg.png',
  author: 'Felipe Gutiérrez - FG WEB DESIGNS',
  telephone: '+59892033831',
  email: 'hello@fgwebdesigns.dev',
  address: {
    locality: 'Montevideo',
    country: 'Uruguay',
  },
  social: {
    linkedin: 'https://www.linkedin.com/in/felipegut/',
    instagram: 'https://www.instagram.com/fgwebdesign_/',
  },
} as const;
