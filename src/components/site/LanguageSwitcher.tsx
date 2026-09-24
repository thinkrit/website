'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { locales, localizedPath, stripLocale, type Locale } from '@/lib/routing'

const localeNames: Record<Locale, string> = {
  en: 'English',
  el: 'Ελληνικά',
}

// Matches the mobile menu button (h-11) below lg and the desktop nav pill (py-5) above it.
const itemClassName = 'flex h-11 items-center px-3 lg:h-auto lg:px-4 lg:py-5'

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  const basePath = stripLocale(pathname)

  return (
    <nav
      aria-label="Language"
      className="flex items-stretch rounded-lg bg-white text-[13px] font-semibold uppercase leading-none text-zinc-400 shadow-[0_1px_0_rgba(0,0,0,0.03)]"
    >
      {locales.map((target) => {
        if (target === locale) {
          return (
            <span
              aria-current="true"
              className={`relative text-black after:absolute after:inset-x-3 after:bottom-0 after:h-px after:bg-(--think-red) lg:after:inset-x-4 ${itemClassName}`}
              key={target}
              lang={target}
              title={localeNames[target]}
            >
              {target}
            </span>
          )
        }

        return (
          <Link
            aria-label={localeNames[target]}
            className={`transition hover:text-black ${itemClassName}`}
            href={localizedPath(target, basePath)}
            hrefLang={target}
            key={target}
            lang={target}
          >
            {target}
          </Link>
        )
      })}
    </nav>
  )
}
