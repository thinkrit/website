export const locales = ['en', 'el'] as const

export type Locale = (typeof locales)[number]

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale)
}

export function localizedPath(locale: Locale, path: string): string {
  if (path.startsWith('http')) return path
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  if (locale === 'en') return cleanPath
  return cleanPath === '/' ? `/${locale}` : `/${locale}${cleanPath}`
}

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')
}
