'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

import { locales, localizedPath, stripLocale, type Locale } from '@/lib/routing'

const localeNames: Record<Locale, string> = {
  en: 'English',
  el: 'Ελληνικά',
}

// Matches the mobile menu button (h-11) below lg and the desktop nav pill (py-5) above it.
const itemClassName = 'flex h-11 items-center px-1.5 lg:h-auto lg:px-2 lg:py-5'

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  const basePath = stripLocale(pathname)

  return (
    <nav
      aria-label="Language"
      className="flex items-stretch rounded-lg bg-white px-1.5 text-[13px] font-semibold uppercase leading-none text-zinc-400 shadow-[0_1px_0_rgba(0,0,0,0.03)] lg:px-2"
    >
      {locales.map((target, index) => (
        <Fragment key={target}>
          {index > 0 && (
            <span aria-hidden="true" className="flex items-center text-zinc-300">
              /
            </span>
          )}
          {target === locale ? (
            <span aria-current="true" className={`text-black ${itemClassName}`} lang={target} title={localeNames[target]}>
              {target}
            </span>
          ) : (
            <Link
              aria-label={localeNames[target]}
              className={`transition hover:text-black ${itemClassName}`}
              href={localizedPath(target, basePath)}
              hrefLang={target}
              lang={target}
            >
              {target}
            </Link>
          )}
        </Fragment>
      ))}
    </nav>
  )
}
