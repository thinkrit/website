import Image from 'next/image'
import { notFound } from 'next/navigation'

import { Container, FooterCta, HeroFrame, SectionLabel } from '@/components/site/chrome'
import { ImagePanel } from '@/components/site/content'
import { PixelBlastHeroBackground } from '@/components/site/PixelBlastHeroBackground'
import { fieldArray, fieldRecord, fieldText, getGlobalDoc, mediaUrl } from '@/lib/payload-local'
import { getCopy, isLocale, type Person } from '@/lib/site-data'

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const [shared, company] = await Promise.all([getGlobalDoc('shared', locale), getGlobalDoc('company', locale)])
  const fallback = getCopy(locale).company
  const hero = fieldRecord(company?.heroSection)
  const about = fieldRecord(company?.aboutSection)
  const founders = fieldRecord(company?.foundersSection)
  const team = fieldRecord(company?.teamSection)
  const manifesto = fieldRecord(company?.manifestoSection)

  const founderPeople = readPeople(founders?.founders, fallback.founders.people)
  const teamMembers = readPeople(team?.teamMembers, fallback.team.members)

  return (
    <>
      <HeroFrame background={<PixelBlastHeroBackground />} compact locale={locale} shared={shared}>
        <h1 className="text-balance text-3xl font-medium leading-tight text-zinc-950 sm:text-4xl md:text-6xl">
          {fieldText(hero?.title, fallback.hero.title)}
        </h1>
        <div className="self-end border-l border-zinc-200 pl-8 md:max-w-md">
          <SectionLabel label="Company" />
          <p className="mt-8 text-base leading-relaxed text-zinc-700">
            {fieldText(hero?.description, fallback.hero.description)}
          </p>
        </div>
      </HeroFrame>

      <section className="py-24 lg:py-28">
        <Container className="grid gap-10 md:grid-cols-[260px_1fr]">
          <SectionLabel label={fieldText(about?.header, fallback.about.label)} />
          <div className="max-w-4xl">
            <h2 className="text-balance text-2xl font-medium leading-tight text-zinc-950 sm:text-3xl md:text-5xl">
              {fieldText(about?.tagline, fallback.about.title)}
            </h2>
            <p className="mt-10 max-w-4xl text-base leading-loose text-zinc-600">
              {fieldText(about?.description, fallback.about.description)}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-[var(--think-soft)] py-20 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-[360px_1fr]">
          <div>
            <SectionLabel label={fieldText(founders?.header, fallback.founders.label)} />
            <p className="mt-8 max-w-xs text-base leading-loose text-zinc-700">
              {fieldText(founders?.tagline, fallback.founders.intro)}
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {founderPeople.map((person, index) => (
              <article className="rounded-lg bg-white p-7" key={`${person.name}-${index}`}>
                <ImagePanel aspect="aspect-[1.35]" src={mediaUrl(fieldArray(founders?.founders)[index]?.image, '/placeholder-panel.svg')} />
                <h3 className="mt-7 text-2xl font-medium leading-tight text-zinc-950">{person.name}</h3>
                <p className="mt-3 text-sm font-medium tracking-[0.16em] text-zinc-500">{person.role}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[var(--think-soft)] py-20 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-[360px_1fr]">
          <SectionLabel label={fieldText(team?.header, fallback.team.label)} />
          <h2 className="max-w-4xl text-balance text-2xl font-medium leading-tight text-zinc-950 sm:text-3xl md:text-4xl">
            {fieldText(team?.tagline, fallback.team.title)}
          </h2>
        </Container>
        <Container className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((person, index) => (
            <article className="flex items-center gap-6 rounded-lg bg-white p-7" key={`${person.name}-${index}`}>
              <ImagePanel
                aspect="aspect-square"
                className="h-20 w-20 shrink-0"
                src={mediaUrl(fieldArray(team?.teamMembers)[index]?.image, '/avatar-placeholder.svg')}
              />
              <div>
                <h3 className="text-lg font-medium leading-tight text-zinc-950">{person.name}</h3>
                {person.role && <p className="mt-1 text-sm text-zinc-600">{person.role}</p>}
                {person.department && (
                  <p className="mt-2 text-xs font-medium tracking-[0.12em] text-zinc-500">{person.department}</p>
                )}
              </div>
            </article>
          ))}
        </Container>
      </section>

      <section className="bg-zinc-950 py-24 text-white lg:py-32">
        <Container className="grid gap-12 lg:grid-cols-[360px_1fr]">
          <SectionLabel label={fieldText(manifesto?.header, fallback.manifesto.label)} light />
          <h2 className="max-w-4xl border-l border-white/50 pl-6 text-balance text-2xl font-medium leading-tight sm:pl-10 sm:text-3xl md:text-4xl">
            {fieldText(manifesto?.tagline, fallback.manifesto.title)}
          </h2>
        </Container>
      </section>

      <FooterCta locale={locale} shared={shared} />
    </>
  )
}

function readPeople(value: unknown, fallback: Person[]): Person[] {
  const people = fieldArray(value)
  if (people.length === 0) return fallback

  return people.map((person, index) => ({
    name: fieldText(person.name, fallback[index]?.name || ''),
    role: fieldText(person.role, fallback[index]?.role || ''),
    department: fieldText(person.department, fallback[index]?.department || ''),
  }))
}
