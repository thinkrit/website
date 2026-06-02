import Image from 'next/image'
import { notFound } from 'next/navigation'

import { Container, FooterCta, HeroFrame, SectionLabel } from '@/components/site/chrome'
import { PixelBlastHeroBackground } from '@/components/site/PixelBlastHeroBackground'
import { fieldRecord, fieldText, getGlobalDoc } from '@/lib/payload-local'
import { getCopy, isLocale } from '@/lib/site-data'

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const [shared, contact] = await Promise.all([getGlobalDoc('shared', locale), getGlobalDoc('contact', locale)])
  const fallback = getCopy(locale).contact
  const hero = fieldRecord(contact?.heroSection)
  const info = fieldRecord(contact?.contactSection)
  const message = fieldRecord(contact?.sendMessageSection)
  const labels = fieldRecord(message?.formLabels)

  return (
    <>
      <HeroFrame background={<PixelBlastHeroBackground />} compact locale={locale} shared={shared}>
        <h1 className="text-balance text-3xl font-medium leading-tight text-zinc-950 sm:text-4xl md:text-6xl">
          {fieldText(hero?.title, fallback.hero.title)}
        </h1>
        <div className="self-end border-l border-zinc-200 pl-8 md:max-w-md">
          <SectionLabel label="Contact" />
          <p className="mt-8 text-base leading-relaxed text-zinc-700">
            {fieldText(hero?.description, fallback.hero.description)}
          </p>
        </div>
      </HeroFrame>

      <section className="py-24 lg:py-28">
        <Container className="grid gap-10 md:grid-cols-[260px_1fr]">
          <SectionLabel label={fieldText(info?.header, fallback.info.label)} />
          <div className="grid gap-12 lg:grid-cols-[1fr_440px]">
            <div className="text-xl font-medium leading-snug text-zinc-950 sm:text-2xl">
              <p>{fallback.info.company}</p>
              <p className="whitespace-pre-line">{fieldText(info?.address, fallback.info.address)}</p>

              <div className="mt-10">
                <p className="text-lg font-semibold uppercase text-zinc-400">{fallback.info.phoneLabel}</p>
                <p>{fieldText(info?.phone, fallback.info.phone)}</p>
              </div>
              <div className="mt-8">
                <p className="text-lg font-semibold uppercase text-zinc-400">{fallback.info.emailLabel}</p>
                <p>{fieldText(info?.email, fallback.info.email)}</p>
              </div>
              <div className="mt-8">
                <p className="text-lg font-semibold uppercase text-zinc-400">{fallback.info.socialLabel}</p>
                <p>{fallback.info.social}</p>
              </div>
            </div>
            <div className="relative aspect-[1.18] overflow-hidden rounded-lg bg-zinc-100">
              <Image
                alt="Map of ThinkRIT office in Metamorfosi"
                className="object-cover"
                fill
                priority
                src="/map-metamorfosi.svg"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-24 lg:pb-32">
        <Container className="grid gap-10 md:grid-cols-[260px_1fr]">
          <SectionLabel label={fieldText(message?.header, fallback.form.label)} />
          <form className="max-w-5xl">
            <h2 className="max-w-3xl text-balance text-2xl font-medium leading-tight text-zinc-950 sm:text-3xl md:text-5xl">
              {fieldText(message?.tagline, fallback.form.title)}
            </h2>
            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              <input aria-label={fieldText(labels?.firstnameLabel, fallback.form.firstName)} placeholder={fieldText(labels?.firstnameLabel, fallback.form.firstName)} />
              <input aria-label={fieldText(labels?.lastnameLabel, fallback.form.lastName)} placeholder={fieldText(labels?.lastnameLabel, fallback.form.lastName)} />
              <input aria-label={fieldText(labels?.emailLabel, fallback.form.email)} placeholder={fieldText(labels?.emailLabel, fallback.form.email)} type="email" />
              <input aria-label={fieldText(labels?.phoneLabel, fallback.form.phone)} placeholder={fieldText(labels?.phoneLabel, fallback.form.phone)} type="tel" />
              <textarea
                aria-label={fieldText(labels?.messageLabel, fallback.form.message)}
                className="min-h-56 sm:col-span-2"
                placeholder={fieldText(labels?.messageLabel, fallback.form.message)}
              />
            </div>
            <button
              className="mt-12 rounded-lg bg-zinc-950 px-7 py-5 text-[13px] font-semibold uppercase leading-none !text-white transition hover:bg-zinc-800"
              type="submit"
            >
              {fieldText(labels?.submitLabel, fallback.form.submit)}
            </button>
          </form>
        </Container>
      </section>

      <FooterCta locale={locale} shared={shared} showButton={false} />
    </>
  )
}
