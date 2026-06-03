import Image from 'next/image'
import { notFound } from 'next/navigation'

import { AbstractImageBackground, Container, FooterCta, HeroFrame, SectionLabel } from '@/components/site/chrome'
import { PixelBlastHeroBackground } from '@/components/site/PixelBlastHeroBackground'
import { ContactForm } from './ContactForm'
import { fieldArray, fieldLink, fieldNumber, fieldRecord, fieldText, getGlobalDoc, mediaUrl } from '@/lib/payload-local'
import { isLocale, type Locale } from '@/lib/routing'
import { ContactMap } from './ContactMap'

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
  const location = fieldRecord(info?.location)
  const mapLat = fieldNumber(location?.latitude)
  const mapLng = fieldNumber(location?.longitude)
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
            {mapLat !== null && mapLng !== null ? (
              <ContactMap
                label={fieldText(location?.label) || undefined}
                latitude={mapLat}
                link={fieldText(location?.link) || undefined}
                longitude={mapLng}
                zoom={fieldNumber(location?.zoom) ?? undefined}
              />
            ) : (
              <div className="relative aspect-[1.18] overflow-hidden rounded-lg bg-zinc-100">
                <Image
                  alt="Map of ThinkRIT office in Metamorfosi"
                  className="object-cover"
                  fill
                  priority
                  src={mediaUrl(fieldRecord(contact?.seo)?.image, '/map-metamorfosi.svg')}
                />
              </div>
            )}
          </div>
        </Container>
      </section>

      <section className="pb-24 lg:pb-32">
        <Container className="grid gap-10 md:grid-cols-[260px_1fr]">
          <SectionLabel label={fieldText(message?.header)} />
          <div className="max-w-5xl">
            <h2 className="max-w-3xl text-balance text-xl font-medium leading-tight text-zinc-950 sm:text-2xl md:text-4xl">
              {fieldText(message?.tagline)}
            </h2>
            <div className="mt-14">
              <ContactForm
                labels={{
                  firstname: fieldText(labels?.firstnameLabel),
                  lastname: fieldText(labels?.lastnameLabel),
                  email: fieldText(labels?.emailLabel),
                  phone: fieldText(labels?.phoneLabel),
                  message: fieldText(labels?.messageLabel),
                  submit: fieldText(labels?.submitLabel),
                  success: uiLabels.success,
                }}
              />
            </div>
          </div>
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
      success: 'Ευχαριστούμε! Το μήνυμά σας στάλθηκε.',
    }
  }

  return {
    email: 'Email',
    phone: 'Phone',
    social: 'Social',
    success: 'Thank you! Your message has been sent.',
  }
}
