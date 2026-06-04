import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { AbstractImageBackground, Container, FooterCta, HeroFrame, SectionLabel } from '@/components/site/chrome'
import { ImagePanel } from '@/components/site/content'
import { PixelBlastHeroBackground } from '@/components/site/PixelBlastHeroBackground'
import { fieldArray, fieldRecord, fieldText, getGlobalDoc, mediaUrl, type Person } from '@/lib/payload-local'
import { isLocale } from '@/lib/routing'

// Cache the rendered page indefinitely. It is rebuilt only when a Payload
// create/update/delete invalidates a matching cache tag (see hooks/revalidate.ts).
export const dynamic = 'force-static'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const doc = await getGlobalDoc('company', locale)
  const seo = fieldRecord(doc?.seo)
  return {
    title: fieldText(seo?.title) || fieldText(doc?.title) || 'Company',
    description: fieldText(seo?.description) || undefined,
  }
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const [shared, company] = await Promise.all([getGlobalDoc('shared', locale), getGlobalDoc('company', locale)])
  if (!shared || !company) notFound()

  const hero = fieldRecord(company?.heroSection)
  const about = fieldRecord(company?.aboutSection)
  const founders = fieldRecord(company?.foundersSection)
  const team = fieldRecord(company?.teamSection)
  const manifesto = fieldRecord(company?.manifestoSection)

  const founderPeople = readPeople(founders?.founders)
  const teamMembers = readPeople(team?.teamMembers)

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
          <SectionLabel label="Company" />
          <p className="mt-8 text-base leading-relaxed text-zinc-700">
            {fieldText(hero?.description)}
          </p>
        </div>
      </HeroFrame>

      <section className="py-24 lg:py-28">
        <Container className="grid gap-10 lg:grid-cols-[260px_1fr]">
          <SectionLabel label={fieldText(about?.header)} />
          <div className="max-w-4xl">
            <h2 className="text-balance text-2xl font-medium leading-tight text-zinc-950 sm:text-3xl md:text-5xl">
              {fieldText(about?.tagline)}
            </h2>
            <p className="mt-10 max-w-4xl text-base leading-loose text-zinc-600">
              {fieldText(about?.description)}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-[var(--think-soft)] py-20 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-[360px_1fr]">
          <div>
            <SectionLabel label={fieldText(founders?.header)} />
            <p className="mt-8 max-w-xs text-base leading-loose text-zinc-700">
              {fieldText(founders?.tagline)}
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {founderPeople.map((person, index) => (
              <article className="rounded-lg bg-white p-7" key={`${person.name}-${index}`}>
                <ImagePanel aspect="aspect-[1.35]" src={person.image} />
                <h3 className="mt-7 text-2xl font-medium leading-tight text-zinc-950">{person.name}</h3>
                <p className="mt-3 text-xs font-medium tracking-[0.08em] text-zinc-500">{person.role}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[var(--think-soft)] py-20 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-[360px_1fr]">
          <SectionLabel label={fieldText(team?.header)} />
          <h2 className="max-w-4xl text-balance text-2xl font-medium leading-tight text-zinc-950 sm:text-3xl md:text-4xl">
            {fieldText(team?.tagline)}
          </h2>
        </Container>
        <Container className="mt-16 space-y-12">
          {groupByDepartment(teamMembers).map((group) => (
            <div key={group.department}>
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-wide text-zinc-400">{group.department}</h3>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {group.members.map((person, index) => (
                  <article className="flex items-center gap-6 rounded-lg bg-white p-7" key={`${person.name}-${index}`}>
                    <ImagePanel
                      aspect="aspect-square"
                      className="h-20 w-20 shrink-0"
                      src={person.image}
                    />
                    <div>
                      <h4 className="text-lg font-medium leading-tight text-zinc-950">{person.name}</h4>
                      {person.role && <p className="mt-1 text-xs font-medium tracking-[0.08em] text-zinc-500">{person.role}</p>}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </Container>
      </section>

      <section className="bg-zinc-950 py-24 text-white lg:py-32">
        <Container className="grid gap-12 lg:grid-cols-[360px_1fr]">
          <SectionLabel label={fieldText(manifesto?.header)} light />
          <h2 className="max-w-4xl border-l border-white/50 pl-6 text-balance text-2xl font-medium leading-tight sm:pl-10 sm:text-3xl md:text-4xl">
            {fieldText(manifesto?.tagline)}
          </h2>
        </Container>
      </section>

      <FooterCta locale={locale} shared={shared} />
    </>
  )
}

function readPeople(value: unknown): Person[] {
  const people = fieldArray(value)

  return people.map((person) => ({
    name: fieldText(person.name),
    role: fieldText(person.role),
    department: fieldText(person.department),
    image: mediaUrl(person.image, '/avatar-placeholder.svg'),
  }))
}

function groupByDepartment(people: Person[]) {
  const map = new Map<string, Person[]>()

  for (const person of people) {
    const dept = person.department || ''
    const list = map.get(dept)
    if (list) {
      list.push(person)
    } else {
      map.set(dept, [person])
    }
  }

  return Array.from(map, ([department, members]) => ({ department, members }))
}
