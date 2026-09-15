/** Configuración global del sitio (SEO, URLs canónicas, redes) */
export const siteConfig = {
  name: 'fgwebdesign.dev',
  legalName: 'Felipe Gutiérrez',
  url: 'https://www.fgwebdesign.dev',
  ogImage: '/og.jpg',
  favicon: '/favicon.svg',
  author: 'Felipe Gutiérrez',
  telephone: '+59892033831',
  email: 'hello@fgwebdesign.dev',
  address: {
    locality: 'Montevideo',
    country: 'Uruguay',
  },
  social: {
    linkedin: 'https://www.linkedin.com/in/felipegut/',
    instagram: 'https://www.instagram.com/fgwebdesign_/',
  },
} as const;

/** Abre WhatsApp con mensaje precargado (teléfono sin + ni espacios). */
export function getWhatsAppUrl(message: string): string {
  const phone = siteConfig.telephone.replace(/\D/g, '');
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
