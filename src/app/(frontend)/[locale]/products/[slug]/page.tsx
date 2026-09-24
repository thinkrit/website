import { Code2 } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from 'lexical'

import { AbstractImageBackground, Container, FooterCta, HeroFrame, SectionLabel } from '@/components/site/chrome'
import {
  CaseStudies,
  FeatureColumns,
  FocusStatement,
  HighlightedTitle,
  ProductSteps,
} from '@/components/site/content'
import { PixelBlastHeroBackground } from '@/components/site/PixelBlastHeroBackground'
import {
  fieldArray,
  fieldNumber,
  fieldRecord,
  fieldText,
  getCollectionDoc,
  getGlobalDoc,
  mediaUrl,
  type CaseStudy,
  type Feature,
  type Step,
} from '@/lib/payload-local'
import { richTextConverters } from '@/lib/rich-text-converters'
import { isLocale } from '@/lib/routing'

// Cache the rendered page indefinitely. It is rebuilt only when a Payload
// create/update/delete invalidates a matching cache tag (see hooks/revalidate.ts).
export const dynamic = 'force-static'

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!isLocale(locale) || !slug) notFound()

  const [shared, product] = await Promise.all([
    getGlobalDoc('shared', locale),
    getCollectionDoc('products', slug, locale),
  ])
  if (!shared || !product) notFound()

  const hero = fieldRecord(product?.heroSection)
  const features = fieldRecord(product?.featuresSection)
  const how = fieldRecord(product?.howItWorksSection)
  const technologies = fieldRecord(product?.technologiesSection)
  const focus = fieldRecord(product?.focusSection)
  const implementations = fieldRecord(product?.implementationsSection)

  const productSteps = readSteps(how?.steps)
  const banner = readBanner(hero?.banner)
  const subheader = fieldText(hero?.subheader)
  const description = fieldRecord(hero?.description) as unknown as SerializedEditorState | null

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
        <div className="self-end">
          {banner ? (
            <Image
              alt={banner.alt}
              className="mb-20 h-auto max-h-24 w-auto max-w-full object-contain object-left"
              height={banner.height}
              priority
              src={banner.src}
              width={banner.width}
            />
          ) : null}
          <h1 className="text-balance text-3xl font-medium leading-tight text-zinc-950 sm:text-4xl md:text-6xl">
            {fieldText(hero?.header)}
          </h1>
          {subheader ? (
            <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-zinc-600 sm:text-xl">
              {subheader}
            </p>
          ) : null}
        </div>
        <div className="self-end border-l border-zinc-200 pl-8">
          <SectionLabel label={fieldText(hero?.title)} />
          {description ? (
            <RichText
              className="mt-8 max-w-3xl text-base leading-relaxed text-zinc-700 [&_a]:text-zinc-500 [&_a]:underline [&_li]:mt-2 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p+p]:mt-4 [&_strong]:font-semibold [&_strong]:text-zinc-950 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:marker:text-zinc-400"
              converters={richTextConverters}
              data={description}
            />
          ) : null}
        </div>
      </HeroFrame>

      <FeatureColumns features={readFeatures(features?.features)} />

      <ProductSteps
        steps={productSteps}
        title={
          <>
            <SectionLabel label={fieldText(how?.header)} />
            <HighlightedTitle
              className="mt-12 text-balance text-2xl font-medium leading-tight text-zinc-950 sm:text-3xl md:text-4xl"
              highlights={['future-ready']}
              text={fieldText(how?.tagline)}
            />
          </>
        }
      />

      <section className="bg-zinc-950 py-20 text-white lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-[360px_1fr]">
          <SectionLabel label={fieldText(technologies?.header)} light />
          <div>
            <h2 className="max-w-3xl text-balance text-2xl font-medium leading-tight text-white sm:text-3xl md:text-5xl">
              {fieldText(technologies?.tagline)}
            </h2>
            <p className="mt-8 max-w-3xl text-base leading-loose text-white/65">
              {fieldText(technologies?.description)}
            </p>
          </div>
        </Container>
        <Container className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {readTechnologies(technologies?.technologies).map((technology, index) => (
            <article className="min-h-[190px] rounded-3xl border border-white/15 p-8" key={`${technology.title}-${index}`}>
              <Code2 className="h-7 w-7 text-white/25" />
              <h3 className="mt-14 text-lg font-medium text-white">{technology.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{technology.description}</p>
            </article>
          ))}
        </Container>
      </section>

      <FocusStatement
        label={fieldText(focus?.header)}
        title={fieldText(focus?.tagline)}
      />

      <CaseStudies
        label={fieldText(implementations?.header)}
        studies={readCaseStudies(implementations?.caseStudies)}
        title={fieldText(implementations?.tagline)}
      />

      <FooterCta locale={locale} shared={shared} />
    </>
  )
}

function readBanner(value: unknown) {
  const src = mediaUrl(value, '')
  if (!src) return null

  const media = fieldRecord(value)

  return {
    src,
    alt: fieldText(media?.alt),
    width: fieldNumber(media?.width) ?? 800,
    height: fieldNumber(media?.height) ?? 200,
  }
}

function readFeatures(value: unknown): Feature[] {
  const features = fieldArray(value)

  return features.map((feature) => ({
    title: fieldText(feature.title),
    description: fieldText(feature.description),
    icon: fieldText(feature.icon),
  }))
}

function readSteps(value: unknown): Step[] {
  const steps = fieldArray(value)

  return steps.map((step) => ({
    title: fieldText(step.title),
    description: fieldText(step.description),
    image: mediaUrl(step.image, ''),
  }))
}

function readTechnologies(value: unknown) {
  const technologies = fieldArray(value)

  return technologies.map((technology) => ({
    title: fieldText(technology.name),
    description: fieldText(technology.description),
  }))
}

function readCaseStudies(value: unknown): CaseStudy[] {
  const studies = fieldArray(value)

  return studies.map((study) => ({
    title: fieldText(study.title),
    description: fieldText(study.description),
  }))
}
