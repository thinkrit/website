import { notFound } from 'next/navigation'

import { Container, FooterCta, HeroFrame, SectionLabel } from '@/components/site/chrome'
import { ApproachSplit, CaseStudies, FeatureRows, FocusStatement } from '@/components/site/content'
import { PixelBlastHeroBackground } from '@/components/site/PixelBlastHeroBackground'
import { fieldArray, fieldRecord, fieldText, getCollectionDoc, getGlobalDoc } from '@/lib/payload-local'
import { getCopy, isLocale, type CaseStudy, type Feature, type Step } from '@/lib/site-data'

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!isLocale(locale) || !slug) notFound()

  const [shared, service] = await Promise.all([
    getGlobalDoc('shared', locale),
    getCollectionDoc('services', slug, locale),
  ])
  const fallback = getCopy(locale).service
  const hero = fieldRecord(service?.heroSection)
  const features = fieldRecord(service?.featuresSection)
  const approach = fieldRecord(service?.approachSection)
  const focus = fieldRecord(service?.focusSection)
  const implementations = fieldRecord(service?.implementationsSection)

  return (
    <>
      <HeroFrame background={<PixelBlastHeroBackground />} compact locale={locale} shared={shared}>
        <div>
          <h1 className="text-balance text-3xl font-medium leading-tight text-zinc-950 sm:text-4xl md:text-6xl">
            {fieldText(hero?.title, fallback.hero.title)}
          </h1>
        </div>
        <div className="self-end border-l border-zinc-200 pl-8">
          <SectionLabel label={fieldText(hero?.header, fallback.hero.label)} />
          <p className="mt-8 max-w-3xl text-base leading-loose text-zinc-700">
            {fieldText(hero?.description, fallback.hero.description)}
          </p>
        </div>
      </HeroFrame>

      <section className="pb-24 pt-24">
        <Container>
          <SectionLabel label={fieldText(features?.header, fallback.features.label)} />
        </Container>
      </section>
      <div className="pb-24">
        <FeatureRows features={readFeatures(features?.features, fallback.features.items)} />
      </div>

      <ApproachSplit
        label={fieldText(approach?.header, fallback.approach.label)}
        steps={readSteps(approach?.steps, fallback.approach.steps)}
        title={fieldText(approach?.tagline, fallback.approach.title)}
      />

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

function readCaseStudies(value: unknown, fallback: CaseStudy[]): CaseStudy[] {
  const studies = fieldArray(value)
  if (studies.length === 0) return fallback

  return studies.map((study, index) => ({
    title: fieldText(study.title, fallback[index]?.title || ''),
    description: fieldText(study.description, fallback[index]?.description || ''),
  }))
}
