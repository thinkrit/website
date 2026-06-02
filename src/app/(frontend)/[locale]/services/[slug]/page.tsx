import { notFound } from 'next/navigation'

import { Container, FooterCta, HeroFrame, SectionLabel } from '@/components/site/chrome'
import { ApproachSplit, CaseStudies, FeatureRows, FocusStatement } from '@/components/site/content'
import { PixelBlastHeroBackground } from '@/components/site/PixelBlastHeroBackground'
import { fieldArray, fieldRecord, fieldText, getCollectionDoc, getGlobalDoc, type CaseStudy, type Feature, type Step } from '@/lib/payload-local'
import { isLocale } from '@/lib/routing'

// Cache the rendered page indefinitely. It is rebuilt only when a Payload
// create/update/delete invalidates a matching cache tag (see hooks/revalidate.ts).
export const dynamic = 'force-static'

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!isLocale(locale) || !slug) notFound()

  const [shared, service] = await Promise.all([
    getGlobalDoc('shared', locale),
    getCollectionDoc('services', slug, locale),
  ])
  if (!shared || !service) notFound()

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
            {fieldText(hero?.title)}
          </h1>
        </div>
        <div className="self-end border-l border-zinc-200 pl-8">
          <SectionLabel label={fieldText(hero?.header)} />
          <p className="mt-8 max-w-3xl text-base leading-loose text-zinc-700">
            {fieldText(hero?.description)}
          </p>
        </div>
      </HeroFrame>

      <section className="pb-24 pt-24">
        <Container>
          <SectionLabel label={fieldText(features?.header)} />
        </Container>
      </section>
      <div className="pb-24">
        <FeatureRows features={readFeatures(features?.features)} />
      </div>

      <ApproachSplit
        label={fieldText(approach?.header)}
        steps={readSteps(approach?.steps)}
        title={fieldText(approach?.tagline)}
      />

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

function readFeatures(value: unknown): Feature[] {
  const features = fieldArray(value)

  return features.map((feature) => ({
    title: fieldText(feature.title),
    description: fieldText(feature.description),
  }))
}

function readSteps(value: unknown): Step[] {
  const steps = fieldArray(value)

  return steps.map((step) => ({
    title: fieldText(step.title),
    description: fieldText(step.description),
  }))
}

function readCaseStudies(value: unknown): CaseStudy[] {
  const studies = fieldArray(value)

  return studies.map((study) => ({
    title: fieldText(study.title),
    description: fieldText(study.description),
  }))
}
