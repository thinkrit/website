import { Code2 } from 'lucide-react'
import { notFound } from 'next/navigation'

import { Container, FooterCta, HeroFrame, SectionLabel } from '@/components/site/chrome'
import {
  CaseStudies,
  FeatureColumns,
  FocusStatement,
  HighlightedTitle,
  ImagePanel,
  ProductSteps,
} from '@/components/site/content'
import { PixelBlastHeroBackground } from '@/components/site/PixelBlastHeroBackground'
import { fieldArray, fieldRecord, fieldText, getCollectionDoc, getGlobalDoc, mediaUrl } from '@/lib/payload-local'
import { getCopy, isLocale, type CaseStudy, type Feature, type Step } from '@/lib/site-data'

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!isLocale(locale) || !slug) notFound()

  const [shared, product] = await Promise.all([
    getGlobalDoc('shared', locale),
    getCollectionDoc('products', slug, locale),
  ])
  const fallback = getCopy(locale).product
  const hero = fieldRecord(product?.heroSection)
  const features = fieldRecord(product?.featuresSection)
  const how = fieldRecord(product?.howItWorksSection)
  const technologies = fieldRecord(product?.technologiesSection)
  const focus = fieldRecord(product?.focusSection)
  const implementations = fieldRecord(product?.implementationsSection)

  const productSteps = readSteps(how?.steps, fallback.how.steps)

  return (
    <>
      <HeroFrame background={<PixelBlastHeroBackground />} compact locale={locale} shared={shared}>
        <div className="self-end">
          <h1 className="text-balance text-3xl font-medium leading-tight text-zinc-950 sm:text-4xl md:text-6xl">
            {fieldText(hero?.header, fallback.hero.title)}
          </h1>
          <div className="mt-12 border-l border-zinc-200 pl-8">
            <SectionLabel label={fallback.hero.overviewLabel} />
            <p className="mt-8 max-w-3xl text-base leading-loose text-zinc-700">
              {fieldText(hero?.description, fallback.hero.description)}
            </p>
          </div>
        </div>
        <ImagePanel
          aspect="aspect-[1.65]"
          className="self-end"
          src={mediaUrl(hero?.image, '/placeholder-panel.svg')}
        />
      </HeroFrame>

      <FeatureColumns features={readFeatures(features?.features, fallback.features)} />

      <ProductSteps
        steps={productSteps}
        title={
          <>
            <SectionLabel label={fieldText(how?.header, fallback.how.label)} />
            <HighlightedTitle
              className="mt-12 text-balance text-2xl font-medium leading-tight text-zinc-950 sm:text-3xl md:text-4xl"
              highlight="future-ready"
              text={fieldText(how?.tagline, fallback.how.title)}
            />
          </>
        }
      />

      <section className="bg-zinc-950 py-20 text-white lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-[360px_1fr]">
          <SectionLabel label={fieldText(technologies?.header, fallback.technologies.label)} light />
          <div>
            <h2 className="max-w-3xl text-balance text-2xl font-medium leading-tight text-white sm:text-3xl md:text-5xl">
              {fieldText(technologies?.tagline, fallback.technologies.title)}
            </h2>
            <p className="mt-8 max-w-3xl text-base leading-loose text-white/65">
              {fieldText(technologies?.description, fallback.technologies.description)}
            </p>
          </div>
        </Container>
        <Container className="mt-16 grid gap-8 md:grid-cols-4">
          {readTechnologies(technologies?.technologies, fallback.technologies.items).map((technology, index) => (
            <article className="min-h-[190px] rounded-lg border border-white/15 p-8" key={`${technology.title}-${index}`}>
              <Code2 className="h-7 w-7 text-white/25" />
              <h3 className="mt-14 text-lg font-medium text-white">{technology.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{technology.description}</p>
            </article>
          ))}
        </Container>
      </section>

      <FocusStatement
        label={fieldText(focus?.header, fallback.focus.label)}
        title={fieldText(focus?.tagline, fallback.focus.title)}
      />

      <CaseStudies
        label={fieldText(implementations?.header, fallback.implementations.label)}
        studies={readCaseStudies(implementations?.caseStudies, fallback.implementations.caseStudies)}
        title={fieldText(implementations?.tagline, fallback.implementations.title)}
      />

      <FooterCta locale={locale} shared={shared} />
    </>
  )
}

function readFeatures(value: unknown, fallback: Feature[]): Feature[] {
  const features = fieldArray(value)
  if (features.length === 0) return fallback

  return features.map((feature, index) => ({
    title: fieldText(feature.title, fallback[index]?.title || ''),
    description: fieldText(feature.description, fallback[index]?.description || ''),
    icon: fieldText(feature.icon, fallback[index]?.icon || ''),
  }))
}

function readSteps(value: unknown, fallback: Step[]): Step[] {
  const steps = fieldArray(value)
  if (steps.length === 0) return fallback

  return steps.map((step, index) => ({
    title: fieldText(step.title, fallback[index]?.title || ''),
    description: fieldText(step.description, fallback[index]?.description || ''),
  }))
}

function readTechnologies(value: unknown, fallback: { title: string; description: string }[]) {
  const technologies = fieldArray(value)
  if (technologies.length === 0) return fallback

  return technologies.map((technology, index) => ({
    title: fieldText(technology.name, fallback[index]?.title || ''),
    description: fieldText(technology.description, fallback[index]?.description || ''),
  }))
}

function readCaseStudies(value: unknown, fallback: CaseStudy[]): CaseStudy[] {
  const studies = fieldArray(value)
  if (studies.length === 0) return fallback

  return studies.map((study, index) => ({
    title: fieldText(study.title, fallback[index]?.title || ''),
    description: fieldText(study.description, fallback[index]?.description || ''),
  }))
}
