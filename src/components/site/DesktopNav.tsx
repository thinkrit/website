'use client'

import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const HOVER_CLOSE_DELAY = 120

import type { NavData } from '@/components/site/chrome'
import type { LinkItem } from '@/lib/payload-local'
import { isActivePath, localizedPath, type Locale } from '@/lib/routing'

type OpenMenu = 'services' | 'products' | null

export function DesktopNav({
  nav,
  locale,
  contactHref,
  forceServicesOpen = false,
}: {
  nav: NavData
  locale: Locale
  contactHref: string
  forceServicesOpen?: boolean
}) {
  const [open, setOpen] = useState<OpenMenu>(forceServicesOpen ? 'services' : null)
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  useEffect(() => {
    if (!open) return

    function handlePointerDown(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpen(null)
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(null)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  useEffect(() => clearCloseTimer, [])

  const toggle = (menu: OpenMenu) => setOpen((current) => (current === menu ? null : menu))

  // Hover open: setting a specific menu replaces any other, keeping only one open.
  const hoverOpen = (menu: OpenMenu) => {
    clearCloseTimer()
    setOpen(menu)
  }
  const hoverClose = () => {
    clearCloseTimer()
    closeTimer.current = setTimeout(() => setOpen(null), HOVER_CLOSE_DELAY)
  }

  return (
    <div className="hidden items-start gap-3 lg:flex" ref={navRef}>
      <nav aria-label="Main navigation" className="flex items-stretch rounded-lg bg-white text-[13px] font-semibold uppercase leading-none text-zinc-700 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
        <NavDropdown
          isOpen={open === 'services'}
          items={nav.services.links}
          label={nav.services.label}
          locale={locale}
          onHoverClose={hoverClose}
          onHoverOpen={() => hoverOpen('services')}
          onToggle={() => toggle('services')}
          pathname={pathname}
        />
        <NavDropdown
          isOpen={open === 'products'}
          items={nav.products.links}
          label={nav.products.label}
          locale={locale}
          onHoverClose={hoverClose}
          onHoverOpen={() => hoverOpen('products')}
          onToggle={() => toggle('products')}
          pathname={pathname}
        />
        {isActivePath(pathname, nav.company.url) ? (
          <span
            aria-current="page"
            className="relative px-8 py-5 text-black after:absolute after:inset-x-8 after:bottom-0 after:h-px after:bg-(--think-red)"
          >
            {nav.company.label}
          </span>
        ) : (
          <Link className="px-8 py-5 transition hover:text-black" href={localizedPath(locale, nav.company.url)}>
            {nav.company.label}
          </Link>
        )}
      </nav>
      <Link
        aria-current={isActivePath(pathname, nav.contact.url) ? 'page' : undefined}
        className={`relative rounded-lg bg-zinc-950 px-7 py-5 text-[13px] font-semibold uppercase leading-none !text-white transition hover:bg-zinc-800 ${
          isActivePath(pathname, nav.contact.url)
            ? 'after:absolute after:bottom-0 after:inset-x-7 after:h-px after:bg-(--think-red)'
            : ''
        }`}
        href={contactHref}
      >
        {nav.contact.label}
      </Link>
    </div>
  )
}

function NavDropdown({
  label,
  items,
  locale,
  isOpen,
  onToggle,
  onHoverOpen,
  onHoverClose,
  pathname,
}: {
  label: string
  items: LinkItem[]
  locale: Locale
  isOpen: boolean
  onToggle: () => void
  onHoverOpen: () => void
  onHoverClose: () => void
  pathname: string
}) {
  const hasActiveChild = items.some((item) => isActivePath(pathname, item.url))

  return (
    <div className="relative" onMouseEnter={onHoverOpen} onMouseLeave={onHoverClose}>
      <button
        aria-expanded={isOpen}
        className={`relative flex items-center gap-2 px-8 py-5 uppercase transition hover:text-black ${
          hasActiveChild
            ? 'text-black after:absolute after:bottom-0 after:left-8 after:right-14 after:h-px after:bg-(--think-red)'
            : ''
        }`}
        onClick={onToggle}
        type="button"
      >
        <span>{label}</span>
        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        aria-hidden={!isOpen}
        className={`nav-menu-panel absolute left-0 top-full min-w-44 pt-2 text-[12px] transition ${
          isOpen ? 'is-open' : ''
        }`}
      >
        <div className="rounded-lg bg-white p-3 shadow-xl">
          {items.map((item) => {
            const isActive = isActivePath(pathname, item.url)

            if (isActive) {
              return (
                <span
                  aria-current="page"
                  className="flex items-center gap-2 rounded-md px-3 py-3 uppercase text-zinc-800"
                  key={item.label}
                >
                  <span aria-hidden="true" className="h-1 w-1 shrink-0 bg-(--think-red)" />
                  <span>{item.label}</span>
                </span>
              )
            }

            return (
              <Link
                className="block rounded-md px-3 py-3 uppercase text-zinc-800 transition hover:bg-zinc-100"
                href={localizedPath(locale, item.url)}
                key={item.label}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
