import { ArrowDown, ArrowUp, Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { DesktopNav } from '@/components/site/DesktopNav'
import { fieldArray, fieldLink, fieldRecord, fieldText, mediaUrl, type LinkGroup, type LinkItem } from '@/lib/payload-local'
import { localizedPath, type Locale } from '@/lib/routing'

type SharedDoc = Record<string, unknown> | null

type LogoVariant = 'red' | 'white' | 'gray'

const logoByVariant: Record<LogoVariant, string> = {
  red: '/thinkrit-logo-red.svg',
  white: '/thinkrit-logo-white.svg',
  gray: '/thinkrit-logo-gray.svg',
}

export function Container({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>
}

export function SectionLabel({ label, light = false }: { label: string; light?: boolean }) {
  return (
    <div
      className={`mt-1.5 flex items-center self-start justify-self-start gap-2 text-[11px] font-semibold uppercase leading-none tracking-normal ${
        light ? 'text-white/55' : 'text-zinc-400'
      }`}
    >
      <span className="h-2.5 w-2.5 shrink-0 bg-[var(--think-red)]" />
      <span>{label}</span>
    </div>
  )
}

export function Logo({
  shared,
  variant = 'red',
  className = '',
}: {
  shared?: SharedDoc
  variant?: LogoVariant
  className?: string
}) {
  const src = variant === 'red' ? mediaUrl(shared?.logo, logoByVariant.red) : logoByVariant[variant]
  const width = className.includes('w-') ? '' : 'w-[74px]'

  return (
    <Image
      alt="ThinkRIT"
      className={`h-auto ${width} ${className}`.trim()}
      height={72}
      priority
      src={src}
      width={142}
    />
  )
}

export function Header({
  locale,
  shared,
  forceServicesOpen = false,
}: {
  locale: Locale
  shared: SharedDoc
  forceServicesOpen?: boolean
}) {
  const nav = readNav(shared)
  const contactHref = localizedPath(locale, nav.contact.url)

  return (
    <header className="relative z-20 mx-auto flex w-full max-w-[1320px] items-start justify-between gap-4 px-5 pt-7 sm:px-8 lg:px-12">
      <Link aria-label="ThinkRIT home" href={localizedPath(locale, '/')}>
        <Logo className="w-[110px]" shared={shared} variant="red" />
      </Link>

      <DesktopNav
        contactHref={contactHref}
        forceServicesOpen={forceServicesOpen}
        locale={locale}
        nav={nav}
      />

      <details className="group relative lg:hidden">
        <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-lg bg-white text-zinc-900 shadow-sm [&::-webkit-details-marker]:hidden">
          <Menu aria-hidden className="h-5 w-5" />
        </summary>
        <div className="absolute right-0 top-13 w-56 rounded-lg bg-white p-2 text-sm font-semibold uppercase text-zinc-800 shadow-xl">
          <MobileGroupLabel label={nav.services.label} />
          {nav.services.links.map((item) => (
            <MobileLink item={item} key={item.label} locale={locale} />
          ))}
          <MobileGroupLabel label={nav.products.label} />
          {nav.products.links.map((item) => (
            <MobileLink item={item} key={item.label} locale={locale} />
          ))}
          <hr className="my-2 border-zinc-100" />
          <MobileLink item={nav.company} locale={locale} />
          <MobileLink item={nav.contact} locale={locale} />
        </div>
      </details>
    </header>
  )
}

function MobileGroupLabel({ label }: { label: string }) {
  return (
    <p className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wide text-zinc-400 first:pt-1">
      {label}
    </p>
  )
}

function MobileLink({ item, locale }: { item: LinkItem; locale: Locale }) {
  const href = item.absolute ? item.url : localizedPath(locale, item.url)
  return (
    <Link className="block rounded-md px-3 py-3 transition hover:bg-zinc-100" href={href}>
      {item.label}
    </Link>
  )
}

export function HeroFrame({
  children,
  locale,
  shared,
  variant = 'light',
  forceServicesOpen,
  compact = false,
  background,
}: {
  children: ReactNode
  locale: Locale
  shared: SharedDoc
  variant?: 'light' | 'home'
  forceServicesOpen?: boolean
  compact?: boolean
  background?: ReactNode
}) {
  const isHome = variant === 'home'
  const hasBackground = Boolean(background)

  return (
    <section
      className={`relative mx-2 mt-2 overflow-visible rounded-3xl ${
        isHome
          ? hasBackground
            ? 'bg-zinc-950 text-white'
            : 'bg-[#8f8f8d] text-white'
          : 'bg-[var(--think-soft)] text-zinc-950'
      }`}
    >
      {background ? (
        <div
          className="pointer-events-none absolute z-0 overflow-hidden rounded-3xl"
          style={{ inset: 0, pointerEvents: 'none' }}
        >
          {background}
        </div>
      ) : null}
      <Header forceServicesOpen={forceServicesOpen} locale={locale} shared={shared} />
      <div
        className={`relative z-10 mx-auto grid w-full max-w-[1320px] px-5 pb-10 pt-24 sm:px-8 lg:px-12 ${
          compact
            ? 'min-h-[min(540px,calc(100svh-64px))] content-end gap-12 md:grid-cols-[1fr_1.35fr]'
            : 'min-h-[min(620px,calc(100svh-64px))] content-end gap-10 md:grid-cols-[1.2fr_1fr]'
        }`}
      >
        {children}
      </div>
    </section>
  )
}

export function FooterCta({
  locale,
  shared,
  showButton = true,
}: {
  locale: Locale
  shared: SharedDoc
  showButton?: boolean
}) {
  const footer = fieldRecord(shared?.footer)
  const top = fieldRecord(footer?.top)
  const tagline = fieldText(top?.tagline)
  const cta = fieldRecord(top?.cta)
  const ctaLabel = fieldText(cta?.label)
  const ctaHref = fieldLink(cta) || '/contact'

  return (
    <section className="bg-[var(--think-footer-gray)] pb-4 pt-20 lg:pt-24">
      <Container className="grid gap-10 md:grid-cols-[260px_1fr]">
        <SectionLabel label={fieldText(top?.header)} />
        <div className="max-w-2xl">
          <h2 className="text-balance text-2xl font-medium leading-tight text-zinc-950 sm:text-3xl md:text-5xl">{tagline}</h2>
          {showButton ? (
            <Link
              className="mt-8 inline-flex rounded-lg bg-zinc-950 px-6 py-4 text-[12px] font-semibold uppercase leading-none !text-white transition hover:bg-zinc-800"
              href={localizedPath(locale, ctaHref)}
            >
              {ctaLabel}
            </Link>
          ) : null}
        </div>
      </Container>
      <SiteFooter locale={locale} shared={shared} />
    </section>
  )
}

export function SiteFooter({ locale, shared }: { locale: Locale; shared: SharedDoc }) {
  const footer = fieldRecord(shared?.footer)
  const middle = fieldRecord(footer?.middle)
  const bottom = fieldRecord(footer?.bottom)
  const groups = readFooterGroups(middle)
  const bottomLinks = readLinks(bottom?.links)
  const copyright = fieldText(bottom?.copyright)

  return (
    <footer className="mx-auto mt-24 w-[calc(100%-32px)] max-w-[1450px] rounded-[24px] bg-white px-8 py-10 text-zinc-950 sm:w-[calc(100%-48px)] sm:px-12 lg:px-16">
      <div className="grid gap-10 lg:grid-cols-[260px_1fr_48px]">
        <Logo shared={shared} variant="red" />
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {groups.map((group) => (
            <div key={group.label}>
              <h3 className="mb-4 text-sm font-semibold uppercase text-zinc-400">{group.label}</h3>
              <div className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <Link
                    className="text-sm font-medium uppercase leading-tight transition hover:text-[var(--think-red)]"
                    href={link.absolute ? link.url : localizedPath(locale, link.url)}
                    key={link.label}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Link
          aria-label="Back to top"
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 transition hover:bg-zinc-200"
          href="#top"
        >
          <ArrowUp aria-hidden className="h-5 w-5" />
        </Link>
      </div>
      <div className="mt-16 flex flex-col gap-5 text-[13px] font-semibold uppercase tracking-normal text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
        <p>{copyright}</p>
        <div className="flex gap-8">
          {bottomLinks.map((link) => (
            <Link href={localizedPath(locale, link.url)} key={link.label}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}

export function ScrollCue({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 text-[12px] font-semibold text-white/80">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-zinc-700">
        <ArrowDown aria-hidden className="h-4 w-4" />
      </span>
      <span>{label}</span>
    </div>
  )
}

export type NavData = ReturnType<typeof readNav>

function readNav(shared: SharedDoc) {
  const header = fieldRecord(shared?.header)
  const links = fieldArray(header?.links)
  const services = links[0]
  const products = links[1]
  const company = links[2]
  const contact = links[3]

  return {
    services: {
      label: fieldText(services?.label),
      links: readLinks(services?.subLinks),
    },
    products: {
      label: fieldText(products?.label),
      links: readLinks(products?.subLinks),
    },
    company: {
      label: fieldText(company?.label),
      url: fieldLink(company) || '/company',
    },
    contact: {
      label: fieldText(contact?.label),
      url: fieldLink(contact) || '/contact',
    },
  }
}

function readFooterGroups(middle: Record<string, unknown> | null): LinkGroup[] {
  const groups = fieldArray(middle?.linkGroups)

  return groups.map((group) => ({
    label: fieldText(group.label),
    links: readLinks(group.links),
  }))
}

function readLinks(value: unknown): LinkItem[] {
  const links = fieldArray(value)

  return links.map((link) => ({
    label: fieldText(link.label),
    url: fieldLink(link) || '/',
    absolute: Boolean(link.absolute),
  }))
}
