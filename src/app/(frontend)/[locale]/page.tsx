import { ArrowUpRight } from 'lucide-react'
import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from 'lexical'

import { Container, SectionLabel, FooterCta, HeroFrame, ScrollCue } from '@/components/site/chrome'
import { richTextConverters } from '@/lib/rich-text-converters'
import { ServiceTile } from '@/components/site/content'
import { HyperspeedHeroBackground } from '@/components/site/HyperspeedHeroBackground'
import {
  fieldArray,
  fieldLink,
  fieldRecord,
  fieldText,
  getGlobalDoc,
  mediaUrl,
  type ServiceCard,
} from '@/lib/payload-local'
import { isLocale, localizedPath } from '@/lib/routing'

export const dynamic = 'force-static'

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const [shared, home] = await Promise.all([
    getGlobalDoc('shared', locale),
    getGlobalDoc('home', locale),
  ])
  if (!shared || !home) notFound()

  const hero = fieldRecord(home?.heroSection)
  const about = fieldRecord(home?.aboutSection)
  const services = fieldRecord(home?.servicesSection)
  const products = fieldRecord(home?.productsSection)
  const partners = fieldRecord(home?.partnersSection)
  const customers = fieldRecord(home?.customersSection)
  const aboutCta = fieldRecord(about?.cta)

  const heroTitle = fieldText(hero?.header)
  const heroDescription = fieldText(hero?.description)
  const heroCta = fieldText(hero?.discoverModeLabel)
  const aboutTagline = about?.tagline as unknown as SerializedEditorState | null
  const aboutDescription = fieldText(about?.description)
  const servicesTitle = fieldText(services?.tagline)
  const productsTitle = fieldText(products?.tagline)
  const serviceCards = readServiceCards(fieldArray(services?.services))
  const productItems = readProductItems(fieldArray(products?.products))

  return (
    <>
      <HeroFrame
        background={<HyperspeedHeroBackground />}
        locale={locale}
        shared={shared}
        variant="home"
      >
        <div className="flex h-full flex-col justify-between gap-16">
          <h1 className="text-balance text-3xl font-medium leading-tight text-white sm:text-4xl md:text-7xl">
            {heroTitle}
          </h1>
          <ScrollCue label={heroCta} />
        </div>
        <div className="self-end border-l border-white/35 pl-8 text-white/85 md:max-w-md">
          <p className="text-base leading-relaxed">{heroDescription}</p>
        </div>
      </HeroFrame>

      <section className="py-24 lg:py-28">
        <Container className="grid gap-10 lg:grid-cols-[260px_1fr]">
          <SectionLabel label={fieldText(about?.header)} />
          <div className="max-w-4xl">
            {aboutTagline && (
              <RichText
                className="[&_p]:text-balance [&_p]:text-2xl [&_p]:font-medium [&_p]:leading-tight [&_p]:text-zinc-950 [&_p]:sm:text-3xl [&_p]:md:text-5xl"
                converters={richTextConverters}
                data={aboutTagline}
              />
            )}
            <p className="mt-10 max-w-3xl text-base leading-loose text-zinc-600">
              {aboutDescription}
            </p>
            <Link
              className="mt-8 inline-flex rounded-lg bg-zinc-950 px-6 py-4 text-[12px] font-semibold uppercase leading-none !text-white transition hover:bg-zinc-800"
              href={localizedPath(locale, fieldLink(aboutCta) || '/company')}
            >
              {fieldText(aboutCta?.label)}
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-[var(--think-soft)] py-20 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-[360px_1fr]">
          <SectionLabel label={fieldText(services?.header)} />
          <h2 className="max-w-4xl text-balance text-2xl font-medium leading-tight text-zinc-950 sm:text-3xl md:text-5xl">
            {servicesTitle}
          </h2>
        </Container>
        <Container className="mt-16 grid gap-8 lg:grid-cols-3">
          {serviceCards.map((card) => (
            <ServiceTile card={card} key={card.title} locale={locale} />
          ))}
        </Container>
      </section>

      <section className="py-24 lg:py-32">
        <Container>
          <h2 className="max-w-5xl text-balance text-2xl font-medium leading-tight text-zinc-950 sm:text-3xl md:text-5xl">
            {productsTitle}
          </h2>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <SectionLabel label={fieldText(products?.header)} />
          <div className="mx-4 mt-10 h-px bg-zinc-200" />
          <div>
            {productItems.map((item, index) => (
              <Fragment key={item.title}>
                <Link
                  className="group grid gap-4 rounded-3xl px-4 py-8 transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-zinc-950 sm:grid-cols-[56px_1fr_44px]"
                  href={localizedPath(locale, `/products/${item.slug}`)}
                >
                  <span className="text-2xl font-medium text-[var(--think-red)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="block text-2xl font-medium leading-tight text-zinc-950 transition-colors duration-300 ease-out group-hover:text-white">
                      {item.title}
                    </span>
                    <span className="mt-2 block text-sm text-zinc-500 transition-colors duration-300 ease-out group-hover:text-zinc-300">
                      {item.description}
                    </span>
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[var(--think-red)] text-white transition-all duration-300 ease-out group-hover:bg-white group-hover:text-zinc-950 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </span>
                </Link>
                {index < productItems.length - 1 ? (
                  <div className="mx-4 h-px bg-zinc-200" />
                ) : null}
              </Fragment>
            ))}
          </div>
        </Container>
      </section>

      <section className="mx-2 mb-16 rounded-3xl bg-zinc-950 py-24 text-white lg:mb-20 lg:py-32">
        <LogoShowcase
          description={fieldText(partners?.description)}
          label={fieldText(partners?.header)}
          logos={readLogos(partners?.partners)}
          title={fieldText(partners?.tagline)}
        />
        <LogoShowcase
          className="mt-28 lg:mt-40"
          description={fieldText(customers?.description)}
          label={fieldText(customers?.header)}
          logos={readLogos(customers?.customers)}
          title={fieldText(customers?.tagline)}
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
  logos: Array<{ alt: string; src: string; website: string }>
  title: string
}) {
  return (
    <Container className={className}>
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <SectionLabel label={label} light />
        <div>
          <h2 className="text-balance text-2xl font-medium leading-tight text-white sm:text-3xl md:text-5xl">
            {title}
          </h2>
          <p className="mt-8 max-w-3xl text-lg leading-loose text-white/90 sm:text-xl md:text-2xl">
            {description}
          </p>
          <div className="mt-10 flex w-full flex-row flex-wrap items-start justify-start gap-x-10 gap-y-10 sm:gap-x-16 sm:gap-y-12 md:gap-x-28 md:gap-y-20 lg:mt-14 lg:gap-x-28 lg:gap-y-16">
            {logos.map((logo) => (
              <div
                className="flex h-8 items-center justify-center sm:h-7 lg:h-14"
                key={`${label}-${logo.alt}`}
              >
                {logo.website ? (
                  <Link
                    aria-label={`${logo.alt} (opens in new tab)`}
                    className="relative block h-8 w-24 sm:h-7 sm:w-24 md:w-28 lg:h-14 lg:w-36"
                    href={logo.website}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Image
                      alt={logo.alt}
                      className="object-contain object-left opacity-50 brightness-0 invert grayscale transition duration-300 hover:opacity-100 hover:brightness-100 hover:invert-0 hover:grayscale-0"
                      fill
                      sizes="180px"
                      src={logo.src}
                    />
                  </Link>
                ) : (
                  <Image
                    alt={logo.alt}
                    className="max-h-8 w-auto max-w-24 object-contain opacity-50 brightness-0 invert grayscale transition duration-300 hover:opacity-100 hover:brightness-100 hover:invert-0 hover:grayscale-0 sm:max-h-7 sm:max-w-24 md:max-w-28 lg:max-h-14 lg:max-w-36"
                    height={130}
                    src={logo.src}
                    width={360}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}

function readLogos(value: unknown) {
  const docs = fieldArray(value)

  return docs.map((doc) => ({
    alt: fieldText(doc.name),
    src: mediaUrl(doc.logo),
    website: fieldText(doc.website),
  }))
}

function readServiceCards(docs: Record<string, unknown>[]): ServiceCard[] {
  const tones: ServiceCard['tone'][] = ['red', 'dark', 'gray']

  return docs.map((doc, index) => ({
    title: fieldText(doc.title),
    description: fieldText(fieldRecord(doc.heroSection)?.description),
    slug: fieldText(doc.slug),
    tone: tones[index % tones.length],
  }))
}

function readProductItems(docs: Record<string, unknown>[]) {
  return docs.map((doc) => ({
    title: fieldText(doc.title),
    description: fieldText(fieldRecord(doc.heroSection)?.description),
    slug: fieldText(doc.slug),
  }))
}
