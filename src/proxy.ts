import { NextResponse, type NextRequest } from 'next/server'

import { locales } from '@/lib/site-data'

const DEFAULT_LOCALE = 'en'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // If the path already starts with a known locale, serve it as-is.
  const firstSegment = pathname.split('/')[1]
  if (locales.includes(firstSegment as (typeof locales)[number])) {
    return NextResponse.next()
  }

  // No locale prefix: rewrite to the default locale internally so the URL the
  // user sees stays unprefixed (e.g. /contact) while the [locale] route renders it.
  const url = request.nextUrl.clone()
  url.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Run on frontend routes only; skip Payload admin/api, Next internals,
  // metadata files, and anything with a file extension (static assets).
  matcher: ['/((?!api|admin|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)'],
}
