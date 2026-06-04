import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { LegalPage } from '@/components/site/LegalPage'
import { fieldRecord, fieldText, getGlobalDoc } from '@/lib/payload-local'
import { isLocale } from '@/lib/routing'

// Cache the rendered page indefinitely. It is rebuilt only when a Payload
// create/update/delete invalidates the `global:terms-of-use` cache tag
// (see globals/TermsOfUse.ts and hooks/revalidate.ts).
export const dynamic = 'force-static'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const doc = await getGlobalDoc('terms-of-use', locale)
  const seo = fieldRecord(doc?.seo)
  return {
    title: fieldText(seo?.title) || fieldText(doc?.title) || 'Terms of Use',
    description: fieldText(seo?.description) || undefined,
  }
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const [shared, doc] = await Promise.all([
    getGlobalDoc('shared', locale),
    getGlobalDoc('terms-of-use', locale),
  ])
  if (!shared || !doc) notFound()

  return <LegalPage doc={doc} locale={locale} shared={shared} />
}
