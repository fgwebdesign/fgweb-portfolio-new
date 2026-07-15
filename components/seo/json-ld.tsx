import { siteConfig } from '@/lib/site';

type JsonLdProps = {
  locale: string;
  description: string;
};

export function JsonLd({ locale, description }: JsonLdProps) {
  const isEs = locale === 'es';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteConfig.name,
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
      ? ['Montevideo', 'Uruguay', 'Internacional']
      : ['Montevideo', 'Uruguay', 'Worldwide'],
    serviceType: isEs
      ? [
          'Diseño Web',
          'Desarrollo Web',
          'Desarrollo de Sistemas',
          'E-commerce',
          'Landing Pages',
          'QA Testing',
        ]
      : [
          'Web Design',
          'Web Development',
          'Custom Systems Development',
          'E-commerce',
          'Landing Pages',
          'QA Testing',
        ],
    sameAs: [siteConfig.social.linkedin, siteConfig.social.instagram],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
