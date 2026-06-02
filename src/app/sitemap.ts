import type { MetadataRoute } from 'next'

import { getSiteUrl } from '@/lib/site-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl()
  const routes = ['/', '/company', '/contact', '/services/development', '/products/contactnow']
  const localizedRoutes = routes.map((route) => `/el${route === '/' ? '' : route}`)
  const now = new Date()

  return [...routes, ...localizedRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '/' || route === '/el' ? 'weekly' : 'monthly',
    priority: route === '/' || route === '/el' ? 1 : 0.8,
    alternates: {
      languages: {
        en: `${siteUrl}${route.startsWith('/el') ? route.replace('/el', '') || '/' : route}`,
        el: `${siteUrl}${route.startsWith('/el') ? route : `/el${route === '/' ? '' : route}`}`,
      },
    },
  }))
}
