import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routing.locales.map((locale) => ({
    url: locale === routing.defaultLocale ? siteConfig.url : `${siteConfig.url}/${locale}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: locale === routing.defaultLocale ? 1 : 0.9,
    alternates: {
      languages: {
        'x-default': siteConfig.url,
        ...Object.fromEntries(
          routing.locales.map((l) => [
            l,
            l === routing.defaultLocale ? siteConfig.url : `${siteConfig.url}/${l}`,
          ]),
        ),
      },
    },
  }));
}
