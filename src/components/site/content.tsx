import {
  ArrowUpRight,
  CheckCircle,
  Clock3,
  Cloud,
  Code2,
  Globe2,
  MessageSquare,
  Plus,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { CaseStudyCarousel } from '@/components/site/CaseStudyCarousel'
import { Container, SectionLabel } from '@/components/site/chrome'
import type { CaseStudy, Feature, ServiceCard, Step } from '@/lib/payload-local'
import { localizedPath, type Locale } from '@/lib/routing'

export function HighlightedTitle({
  text,
  highlight,
  className = '',
}: {
  text: string
  highlight: string
  className?: string
}) {
  const index = text.toLowerCase().indexOf(highlight.toLowerCase())

  if (index === -1) return <h2 className={className}>{text}</h2>

  return (
    <h2 className={className}>
      {text.slice(0, index)}
      <span className="text-[var(--think-red)]">{text.slice(index, index + highlight.length)}</span>
      {text.slice(index + highlight.length)}
    </h2>
  )
}

export function ImagePanel({
  src = '/placeholder-panel.svg',
  alt = '',
  className = '',
  aspect = 'aspect-[4/3]',
}: {
  src?: string
  alt?: string
  className?: string
  aspect?: string
}) {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-[#dfdfe2] ${aspect} ${className}`}>
      <Image alt={alt} className="object-cover" fill sizes="(max-width: 768px) 100vw, 45vw" src={src} />
    </div>
  )
}

export function ServiceTile({
  card,
  locale,
}: {
  card: ServiceCard
  locale: Locale
}) {
  const tones = {
    red: 'bg-[var(--think-red)] text-white',
    dark: 'bg-zinc-950 text-white',
    gray: 'bg-[#77777f] text-white',
  }

  return (
    <Link
      className={`group flex min-h-[260px] flex-col justify-between rounded-[20px] p-8 transition hover:-translate-y-1 ${tones[card.tone]}`}
      href={localizedPath(locale, `/services/${card.slug}`)}
    >
      <div className="flex items-start justify-between">
        {card.title === 'Cloud' ? <Cloud className="h-9 w-9 text-white" /> : card.title === 'Consulting' ? <MessageSquare className="h-9 w-9 text-white" /> : <Code2 className="h-9 w-9 text-white" />}
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-zinc-800">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <div>
        <h3 className="text-2xl font-medium leading-tight text-white">{card.title}</h3>
        <p className="mt-3 max-w-[260px] text-sm leading-relaxed text-white/80">{card.description}</p>
      </div>
    </Link>
  )
}

export function FeatureIcon({ name }: { name?: string }) {
  const className = 'h-10 w-10 text-[var(--think-red)]'
  if (name === 'clock') return <Clock3 className={className} strokeWidth={1.7} />
  if (name === 'globe') return <Globe2 className={className} strokeWidth={1.7} />
  return <CheckCircle className={className} strokeWidth={1.7} />
}

export function FeatureColumns({ features }: { features: Feature[] }) {
  return (
    <Container className="grid gap-10 py-24 md:grid-cols-3 lg:py-28">
      {features.map((feature, index) => (
        <div
          className="border-zinc-200 pr-10 md:border-l md:pl-14 md:first:border-l-0 md:first:pl-0"
          key={`${feature.title}-${index}`}
        >
          <FeatureIcon name={feature.icon} />
          <h2 className="mt-8 max-w-[260px] text-2xl font-medium leading-tight text-zinc-950 sm:text-3xl">{feature.title}</h2>
          <p className="mt-4 max-w-[280px] text-base leading-relaxed text-zinc-600">{feature.description}</p>
        </div>
      ))}
    </Container>
  )
}

export function FeatureRows({ features }: { features: Feature[] }) {
  return (
    <div className="border-y border-zinc-200">
      {features.map((feature) => (
        <details
          className="group border-b border-zinc-200 transition-all duration-300 ease-out last:border-b-0 hover:border-transparent hover:bg-zinc-100 open:border-transparent open:bg-zinc-100"
          key={feature.title}
        >
          <summary className="cursor-pointer list-none text-zinc-950 [&::-webkit-details-marker]:hidden">
            <Container className="flex items-center justify-between gap-6 py-8">
              <span className="text-xl font-medium leading-tight sm:text-3xl">{feature.title}</span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[var(--think-red)] text-white">
                <Plus className="h-6 w-6 transition group-open:rotate-45" />
              </span>
            </Container>
          </summary>
          <Container>
            <p className="max-w-3xl pb-8 text-zinc-500">{feature.description}</p>
          </Container>
        </details>
      ))}
    </div>
  )
}

export function ApproachSplit({
  label,
  title,
  steps,
}: {
  label: string
  title: string
  steps: Step[]
}) {
  return (
    <section className="bg-[var(--think-soft)] lg:bg-[linear-gradient(90deg,#09090b_0%,#09090b_50%,var(--think-soft)_50%,var(--think-soft)_100%)]">
      <Container className="grid px-0 sm:px-0 lg:grid-cols-2">
        <div className="bg-zinc-950 px-5 py-20 text-white sm:px-8 lg:bg-transparent lg:px-12 lg:py-24">
          <div className="max-w-xl">
            <SectionLabel label={label} light />
            <h2 className="mt-12 text-balance text-2xl font-medium leading-tight text-white sm:text-3xl md:text-4xl">{title}</h2>
          </div>
        </div>
        <div>
          {steps.map((step, index) => (
            <div className="border-b border-zinc-200 px-5 py-14 sm:px-8 lg:px-12" key={`${step.title}-${index}`}>
              <div className="grid max-w-3xl gap-5 sm:grid-cols-[44px_1fr]">
                <span className="text-2xl font-medium text-[var(--think-red)]">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-2xl font-medium leading-tight text-zinc-950">{step.title}</h3>
                  <p className="mt-5 text-base leading-relaxed text-zinc-500">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export function ProductSteps({ title, steps }: { title: ReactNode; steps: Step[] }) {
  return (
    <section className="bg-[var(--think-soft)] py-20 lg:py-28">
      <Container>
        <div className="max-w-3xl">{title}</div>
        <div className="mt-16 grid gap-10">
          {steps.map((step, index) => (
            <div className="grid gap-8 border-b border-zinc-200 pb-10 lg:grid-cols-[1fr_360px]" key={`${step.title}-${index}`}>
              <div className="grid gap-4 sm:grid-cols-[46px_1fr]">
                <span className="text-2xl font-medium text-[var(--think-red)]">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-2xl font-medium leading-tight text-zinc-950">{step.title}</h3>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-500">{step.description}</p>
                </div>
              </div>
              <ImagePanel aspect="aspect-[5/3]" src={step.image} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export function FocusStatement({ label, title }: { label: string; title: string }) {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <SectionLabel label={label} />
        <h2 className="mt-12 text-balance text-2xl font-medium leading-tight text-zinc-950 sm:text-3xl md:text-5xl">{title}</h2>
      </Container>
    </section>
  )
}

export function CaseStudies({
  label,
  title,
  studies,
}: {
  label: string
  title: string
  studies: CaseStudy[]
}) {
  return (
    <section className="bg-[var(--think-implementation-gray)] py-20 lg:py-24">
      <Container className="grid gap-12 lg:grid-cols-[360px_1fr]">
        <SectionLabel label={label} />
        <h2 className="max-w-4xl text-balance text-2xl font-medium leading-tight text-zinc-950 md:text-3xl">{title}</h2>
      </Container>
      <Container className="mt-16">
        <CaseStudyCarousel studies={studies} />
      </Container>
    </section>
  )
}
