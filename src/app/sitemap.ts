import type { MetadataRoute } from 'next'

import { getSiteUrl, locales, localizedPath } from '@/lib/routing'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl()
  const routes = ['/', '/company', '/contact', '/services/development', '/products/contactnow', '/privacy-policy', '/terms-of-use']
  const now = new Date()

  const languages = (route: string) =>
    Object.fromEntries(
      locales.map((locale) => [locale, `${siteUrl}${localizedPath(locale, route)}`]),
    )

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteUrl}${localizedPath(locale, route)}`,
      lastModified: now,
      changeFrequency: route === '/' ? 'weekly' : 'monthly',
      priority: route === '/' ? 1 : 0.8,
      alternates: {
        languages: languages(route),
      },
    })),
  )
}
