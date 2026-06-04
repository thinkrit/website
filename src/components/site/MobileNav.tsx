'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const HOVER_CLOSE_DELAY = 120

import type { NavData } from '@/components/site/chrome'
import type { LinkItem } from '@/lib/payload-local'
import { isActivePath, localizedPath, type Locale } from '@/lib/routing'

export function MobileNav({ nav, locale }: { nav: NavData; locale: Locale }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const rootRef = useRef<HTMLDivElement>(null)
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
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  useEffect(() => clearCloseTimer, [])

  const hoverOpen = () => {
    clearCloseTimer()
    setOpen(true)
  }
  const hoverClose = () => {
    clearCloseTimer()
    closeTimer.current = setTimeout(() => setOpen(false), HOVER_CLOSE_DELAY)
  }

  return (
    <div
      className="relative lg:hidden"
      onMouseEnter={hoverOpen}
      onMouseLeave={hoverClose}
      ref={rootRef}
    >
      <button
        aria-expanded={open}
        aria-label="Open menu"
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg bg-white text-zinc-900 shadow-sm"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <Menu aria-hidden="true" className="h-5 w-5" />
      </button>
      <div
        aria-hidden={!open}
        className={`nav-menu-panel absolute right-0 top-13 w-56 rounded-lg bg-white p-2 text-sm font-semibold uppercase text-zinc-800 shadow-xl transition ${
          open ? 'is-open' : ''
        }`}
      >
        <MobileGroupLabel label={nav.services.label} />
        {nav.services.links.map((item) => (
          <MobileLink item={item} key={item.label} locale={locale} pathname={pathname} />
        ))}
        <MobileGroupLabel label={nav.products.label} />
        {nav.products.links.map((item) => (
          <MobileLink item={item} key={item.label} locale={locale} pathname={pathname} />
        ))}
        <hr className="my-2 border-zinc-100" />
        <MobileLink item={nav.company} locale={locale} pathname={pathname} />
        <MobileLink item={nav.contact} locale={locale} pathname={pathname} />
      </div>
    </div>
  )
}

function MobileGroupLabel({ label }: { label: string }) {
  return (
    <p className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wide text-zinc-400 first:pt-1">
      {label}
    </p>
  )
}

function MobileLink({
  item,
  locale,
  pathname,
}: {
  item: LinkItem
  locale: Locale
  pathname: string
}) {
  if (!item.absolute && isActivePath(pathname, item.url)) {
    return (
      <span
        aria-current="page"
        className="flex items-center justify-between gap-2 rounded-md px-3 py-3 text-zinc-400"
      >
        <span>{item.label}</span>
        <span aria-hidden="true" className="h-1 w-1 shrink-0 bg-(--think-red)" />
      </span>
    )
  }

  const href = item.absolute ? item.url : localizedPath(locale, item.url)
  return (
    <Link
      className="block rounded-md px-3 py-3 transition hover:bg-zinc-100"
      href={href}
      {...(item.absolute
        ? { target: '_blank', rel: 'noopener noreferrer', 'aria-label': `${item.label} (opens in new tab)` }
        : {})}
    >
      {item.label}
    </Link>
  )
}
