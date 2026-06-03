import Image from 'next/image'
import { notFound } from 'next/navigation'

import { AbstractImageBackground, Container, FooterCta, HeroFrame, SectionLabel } from '@/components/site/chrome'
import { PixelBlastHeroBackground } from '@/components/site/PixelBlastHeroBackground'
import { fieldArray, fieldLink, fieldRecord, fieldText, getGlobalDoc, mediaUrl } from '@/lib/payload-local'
import { isLocale, type Locale } from '@/lib/routing'

// Cache the rendered page indefinitely. It is rebuilt only when a Payload
// create/update/delete invalidates a matching cache tag (see hooks/revalidate.ts).
export const dynamic = 'force-static'

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const [shared, contact] = await Promise.all([getGlobalDoc('shared', locale), getGlobalDoc('contact', locale)])
  if (!shared || !contact) notFound()

  const hero = fieldRecord(contact?.heroSection)
  const info = fieldRecord(contact?.contactSection)
  const message = fieldRecord(contact?.sendMessageSection)
  const labels = fieldRecord(message?.formLabels)
  const social = fieldArray(info?.social)[0]
  const uiLabels = contactUiLabels(locale)

  return (
    <>
      <HeroFrame
        background={
          <AbstractImageBackground
            fallback={<PixelBlastHeroBackground />}
            image={hero?.background}
          />
        }
        compact
        locale={locale}
        shared={shared}
      >
        <h1 className="text-balance text-3xl font-medium leading-tight text-zinc-950 sm:text-4xl md:text-6xl">
          {fieldText(hero?.title)}
        </h1>
        <div className="self-end border-l border-zinc-200 pl-8 md:max-w-md">
          <SectionLabel label="Contact" />
          <p className="mt-8 text-base leading-relaxed text-zinc-700">
            {fieldText(hero?.description)}
          </p>
        </div>
      </HeroFrame>

      <section className="py-24 lg:py-28">
        <Container className="grid gap-10 md:grid-cols-[260px_1fr]">
          <SectionLabel label={fieldText(info?.header)} />
          <div className="grid gap-12 lg:grid-cols-[1fr_440px]">
            <div className="text-lg font-medium leading-snug text-zinc-950 sm:text-xl">
              <p>ThinkRIT</p>
              <p className="whitespace-pre-line">{fieldText(info?.address)}</p>

              <div className="mt-10">
                <p className="text-base font-semibold uppercase text-zinc-400">{uiLabels.phone}</p>
                <p>{fieldText(info?.phone)}</p>
              </div>
              <div className="mt-8">
                <p className="text-base font-semibold uppercase text-zinc-400">{uiLabels.email}</p>
                <p>{fieldText(info?.email)}</p>
              </div>
              <div className="mt-8">
                <p className="text-base font-semibold uppercase text-zinc-400">{uiLabels.social}</p>
                <a className="transition hover:text-[var(--think-red)]" href={fieldLink(social) || '#'} rel="noreferrer" target="_blank">
                  {fieldText(social?.label)}
                </a>
              </div>
            </div>
            <div className="relative aspect-[1.18] overflow-hidden rounded-lg bg-zinc-100">
              <Image
                alt="Map of ThinkRIT office in Metamorfosi"
                className="object-cover"
                fill
                priority
                src={mediaUrl(fieldRecord(contact?.seo)?.image, '/map-metamorfosi.svg')}
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-24 lg:pb-32">
        <Container className="grid gap-10 md:grid-cols-[260px_1fr]">
          <SectionLabel label={fieldText(message?.header)} />
          <form className="max-w-5xl">
            <h2 className="max-w-3xl text-balance text-xl font-medium leading-tight text-zinc-950 sm:text-2xl md:text-4xl">
              {fieldText(message?.tagline)}
            </h2>
            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              <input aria-label={fieldText(labels?.firstnameLabel)} placeholder={fieldText(labels?.firstnameLabel)} />
              <input aria-label={fieldText(labels?.lastnameLabel)} placeholder={fieldText(labels?.lastnameLabel)} />
              <input aria-label={fieldText(labels?.emailLabel)} placeholder={fieldText(labels?.emailLabel)} type="email" />
              <input aria-label={fieldText(labels?.phoneLabel)} placeholder={fieldText(labels?.phoneLabel)} type="tel" />
              <textarea
                aria-label={fieldText(labels?.messageLabel)}
                className="min-h-56 sm:col-span-2"
                placeholder={fieldText(labels?.messageLabel)}
              />
            </div>
            <button
              className="mt-12 rounded-lg bg-zinc-950 px-7 py-5 text-[13px] font-semibold uppercase leading-none !text-white transition hover:bg-zinc-800"
              type="submit"
            >
              {fieldText(labels?.submitLabel)}
            </button>
          </form>
        </Container>
      </section>

      <FooterCta locale={locale} shared={shared} showButton={false} />
    </>
  )
}

function contactUiLabels(locale: Locale) {
  if (locale === 'el') {
    return {
      email: 'Email',
      phone: 'Τηλέφωνο',
      social: 'Social',
    }
  }

  return {
    email: 'Email',
    phone: 'Phone',
    social: 'Social',
  }
}
