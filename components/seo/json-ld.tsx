import { siteConfig } from '@/lib/site';

type JsonLdProps = {
  locale: string;
  description: string;
};

const KNOWS_ABOUT = {
  es: [
    'React',
    'Next.js',
    'TypeScript',
    'React Native',
    'SaaS',
    'Quality Assurance',
    'Cypress',
    'Test Automation',
    'Desarrollo Web',
  ],
  en: [
    'React',
    'Next.js',
    'TypeScript',
    'React Native',
    'SaaS',
    'Quality Assurance',
    'Cypress',
    'Test Automation',
    'Web Development',
  ],
} as const;

export function JsonLd({ locale, description }: JsonLdProps) {
  const isEs = locale === 'es';
  const personId = `${siteConfig.url}/#person`;
  const serviceId = `${siteConfig.url}/#professional-service`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: siteConfig.legalName,
        url: siteConfig.url,
        email: siteConfig.email,
        jobTitle: isEs
          ? 'Desarrollador Full Stack & QA Engineer'
          : 'Full Stack Developer & QA Engineer',
        knowsAbout: KNOWS_ABOUT[isEs ? 'es' : 'en'],
        address: {
          '@type': 'PostalAddress',
          addressLocality: siteConfig.address.locality,
          addressCountry: siteConfig.address.country,
        },
        sameAs: [siteConfig.social.linkedin, siteConfig.social.instagram],
      },
      {
        '@type': 'WebSite',
        name: siteConfig.name,
        url: siteConfig.url,
        description,
        inLanguage: [isEs ? 'es-UY' : 'en-US'],
        publisher: { '@id': personId },
      },
      {
        '@type': 'ProfessionalService',
        '@id': serviceId,
        name: siteConfig.name,
        founder: { '@id': personId },
        image: `${siteConfig.url}${siteConfig.favicon}`,
        description,
        address: {
          '@type': 'PostalAddress',
          addressCountry: siteConfig.address.country,
          addressLocality: siteConfig.address.locality,
        },
        url: siteConfig.url,
        telephone: siteConfig.telephone,
        priceRange: '$$',
        areaServed: isEs
          ? [
              { '@type': 'City', name: 'Montevideo' },
              { '@type': 'Country', name: 'Uruguay' },
              { '@type': 'Place', name: 'Latinoamérica' },
              { '@type': 'Place', name: 'Remoto internacional' },
            ]
          : [
              { '@type': 'City', name: 'Montevideo' },
              { '@type': 'Country', name: 'Uruguay' },
              { '@type': 'Place', name: 'Latin America' },
              { '@type': 'Place', name: 'Worldwide remote' },
            ],
        serviceType: isEs
          ? [
              'Desarrollo Full Stack',
              'Desarrollo SaaS',
              'Aplicaciones React Native',
              'Aseguramiento de Calidad',
              'Automatización de Pruebas',
            ]
          : [
              'Full Stack Development',
              'SaaS Development',
              'React Native Applications',
              'Quality Assurance',
              'Test Automation',
            ],
        sameAs: [siteConfig.social.linkedin, siteConfig.social.instagram],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
