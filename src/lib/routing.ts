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

/**
 * Strips a leading locale segment (e.g. `/el/services` -> `/services`) so paths
 * can be compared regardless of the active locale.
 */
export function stripLocale(pathname: string): string {
  const match = pathname.match(/^\/([a-z]{2})(?=\/|$)/)
  if (match && isLocale(match[1])) {
    const rest = pathname.slice(match[0].length)
    return rest === '' ? '/' : rest
  }
  return pathname
}

/**
 * Returns true when `pathname` matches the nav `href`, ignoring locale prefixes
 * and trailing slashes. The home path ("/") only matches exactly.
 */
export function isActivePath(pathname: string, href: string): boolean {
  if (href.startsWith('http')) return false
  const current = stripLocale(pathname).replace(/\/$/, '') || '/'
  const target = (href.startsWith('/') ? href : `/${href}`).replace(/\/$/, '') || '/'
  if (target === '/') return current === '/'
  return current === target || current.startsWith(`${target}/`)
}

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')
}
