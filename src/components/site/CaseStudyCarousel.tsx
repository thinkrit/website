'use client'

import { ArrowLeft, ArrowRight, Circle } from 'lucide-react'
import { useCallback, useState } from 'react'

import type { CaseStudy } from '@/lib/payload-local'

const PAGE_SIZE = 3

export function CaseStudyCarousel({ studies }: { studies: CaseStudy[] }) {
  const totalPages = Math.max(1, Math.ceil(studies.length / PAGE_SIZE))
  const [page, setPage] = useState(0)

  const prev = useCallback(() => setPage((p) => Math.max(0, p - 1)), [])
  const next = useCallback(() => setPage((p) => Math.min(totalPages - 1, p + 1)), [totalPages])

  const visible = studies.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)
  const progress = totalPages > 1 ? (page + 1) / totalPages : 1

  return (
    <div aria-label="Case studies" aria-live="polite" role="region">
      <div className="grid gap-8 lg:grid-cols-3">
        {visible.map((study, index) => (
          <article className="min-h-[280px] rounded-[20px] bg-white p-8" key={`${study.title}-${index}`}>
            <Circle aria-hidden="true" className="h-10 w-10 fill-zinc-950 text-zinc-950" />
            <div className="mt-28">
              <h3 className="text-2xl font-medium leading-tight text-zinc-950">{study.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500">{study.description}</p>
            </div>
          </article>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between">
          <div className="h-1 w-72 bg-zinc-200">
            <div
              className="h-full bg-zinc-950 transition-all duration-300"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <div className="flex gap-5">
            <button
              aria-disabled={page === 0}
              aria-label="Previous case study"
              className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--think-red)] text-white transition-opacity disabled:opacity-40"
              disabled={page === 0}
              onClick={prev}
              type="button"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              aria-disabled={page === totalPages - 1}
              aria-label="Next case study"
              className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--think-red)] text-white transition-opacity disabled:opacity-40"
              disabled={page === totalPages - 1}
              onClick={next}
              type="button"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
