import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Container, SectionLabel, FooterCta, HeroFrame, ScrollCue } from '@/components/site/chrome'
import { HighlightedTitle, ServiceTile } from '@/components/site/content'
import { HyperspeedHeroBackground } from '@/components/site/HyperspeedHeroBackground'
import { fieldArray, fieldRecord, fieldText, getGlobalDoc, mediaUrl } from '@/lib/payload-local'
import { getCopy, localizedPath, type Locale } from '@/lib/site-data'

export async function HomePage({ locale }: { locale: Locale }) {
  const [shared, home] = await Promise.all([getGlobalDoc('shared', locale), getGlobalDoc('home', locale)])
  const fallback = getCopy(locale).home
  const hero = fieldRecord(home?.heroSection)
  const about = fieldRecord(home?.aboutSection)
  const services = fieldRecord(home?.servicesSection)
  const products = fieldRecord(home?.productsSection)
  const partners = fieldRecord(home?.partnersSection)
  const customers = fieldRecord(home?.customersSection)

  const heroTitle = fieldText(hero?.header, fallback.hero.title)
  const heroDescription = fieldText(hero?.description, fallback.hero.description)
  const heroCta = fieldText(hero?.discoverModeLabel, fallback.hero.cta)
  const aboutTitle = fieldText(about?.tagline, fallback.about.title)
  const aboutDescription = fieldText(about?.description, fallback.about.description)
  const servicesTitle = fieldText(services?.tagline, fallback.services.title)
  const productsTitle = fieldText(products?.tagline, fallback.products.title)

  return (
    <>
      <HeroFrame background={<HyperspeedHeroBackground />} locale={locale} shared={shared} variant="home">
        <div className="flex h-full flex-col justify-between gap-16">
          <h1 className="text-balance text-5xl font-medium leading-tight text-white md:text-7xl">{heroTitle}</h1>
          <ScrollCue label={heroCta} />
        </div>
        <div className="self-end border-l border-white/35 pl-8 text-white/85 md:max-w-md">
          <p className="text-base leading-relaxed">{heroDescription}</p>
        </div>
      </HeroFrame>

      <section className="py-24 lg:py-28">
        <Container className="grid gap-10 md:grid-cols-[260px_1fr]">
          <SectionLabel label={fieldText(about?.header, fallback.about.label)} />
          <div className="max-w-4xl">
            <HighlightedTitle
              className="text-balance text-5xl font-medium leading-tight text-zinc-950 lg:text-6xl"
              highlight="future of the market"
              text={aboutTitle}
            />
            <p className="mt-10 max-w-3xl text-base leading-loose text-zinc-600">{aboutDescription}</p>
            <Link
              className="mt-8 inline-flex rounded-lg bg-zinc-950 px-6 py-4 text-[12px] font-semibold uppercase leading-none !text-white transition hover:bg-zinc-800"
              href={localizedPath(locale, '/company')}
            >
              {fallback.about.cta}
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-[var(--think-soft)] py-20 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-[360px_1fr]">
          <SectionLabel label={fieldText(services?.header, fallback.services.label)} />
          <h2 className="max-w-4xl text-balance text-4xl font-medium leading-tight text-zinc-950 md:text-5xl">
            {servicesTitle}
          </h2>
        </Container>
        <Container className="mt-16 grid gap-8 md:grid-cols-3">
          {fallback.services.cards.map((card) => (
            <ServiceTile card={card} key={card.title} locale={locale} />
          ))}
        </Container>
      </section>

      <section className="py-24 lg:py-32">
        <Container>
          <h2 className="max-w-5xl text-balance text-5xl font-medium leading-tight text-zinc-950 lg:text-6xl">
            {productsTitle}
          </h2>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <SectionLabel label={fieldText(products?.header, fallback.products.label)} />
          <div className="mt-10 border-y border-zinc-200">
            {fallback.products.items.map((item, index) => (
              <Link
                className="grid gap-4 border-b border-zinc-200 py-8 transition last:border-b-0 hover:bg-zinc-50 sm:grid-cols-[56px_1fr_44px]"
                href={localizedPath(locale, `/products/${item.title.toLowerCase().replace('.', '').replace(/\s+/g, '-')}`)}
                key={item.title}
              >
                <span className="text-2xl font-medium text-[var(--think-red)]">{String(index + 1).padStart(2, '0')}</span>
                <span>
                  <span className="block text-2xl font-medium leading-tight text-zinc-950">{item.title}</span>
                  <span className="mt-2 block text-sm text-zinc-500">{item.description}</span>
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[var(--think-red)] text-white">
                  <ExternalLink className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="mx-2 rounded-lg bg-zinc-950 py-24 text-white lg:py-32">
        <LogoShowcase
          description={fieldText(partners?.description, fallback.partners.description)}
          label={fieldText(partners?.header, fallback.partners.label)}
          logos={readLogos(partners?.partners, fallback.partners.logos)}
          title={fieldText(partners?.tagline, fallback.partners.title)}
        />
        <LogoShowcase
          className="mt-28 lg:mt-40"
          description={fieldText(customers?.description, fallback.customers.description)}
          label={fieldText(customers?.header, fallback.customers.label)}
          logos={readLogos(customers?.customers, fallback.customers.logos)}
          title={fieldText(customers?.tagline, fallback.customers.title)}
        />
      </section>

      <FooterCta locale={locale} shared={shared} />
    </>
  )
}

function LogoShowcase({
  className = '',
  description,
  label,
  logos,
  title,
}: {
  className?: string
  description: string
  label: string
  logos: Array<{ alt: string; src: string }>
  title: string
}) {
  return (
    <Container className={className}>
      <div className="grid gap-12 lg:grid-cols-[360px_1fr]">
        <SectionLabel label={label} light />
        <div className="max-w-3xl">
          <h2 className="text-balance text-4xl font-medium leading-tight text-white md:text-5xl">{title}</h2>
          <p className="mt-8 max-w-3xl text-xl leading-loose text-white/90 md:text-2xl">{description}</p>
        </div>
      </div>
      <div className="mt-24 grid items-center gap-x-14 gap-y-14 sm:grid-cols-2 lg:mt-40 lg:grid-cols-4">
        {logos.map((logo) => (
          <div className="flex min-h-24 items-center justify-center lg:justify-start" key={`${label}-${logo.alt}`}>
            <Image
              alt={logo.alt}
              className="max-h-24 w-auto object-contain"
              height={130}
              src={logo.src}
              width={360}
            />
          </div>
        ))}
      </div>
    </Container>
  )
}

function readLogos(value: unknown, fallback: Array<{ alt: string; src: string }>) {
  const docs = fieldArray(value)
  if (docs.length === 0) return fallback

  return docs.map((doc, index) => ({
    alt: fieldText(doc.name, fallback[index]?.alt || ''),
    src: mediaUrl(doc.logo, fallback[index]?.src || '/placeholder-panel.svg'),
  }))
}
