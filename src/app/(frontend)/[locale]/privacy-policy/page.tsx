import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { LegalPage } from '@/components/site/LegalPage'
import { fieldText, getGlobalDoc } from '@/lib/payload-local'
import { isLocale } from '@/lib/routing'

// Cache the rendered page indefinitely. It is rebuilt only when a Payload
// create/update/delete invalidates the `global:privacy-policy` cache tag
// (see globals/PrivacyPolicy.ts and hooks/revalidate.ts).
export const dynamic = 'force-static'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const doc = await getGlobalDoc('privacy-policy', locale)
  const title = fieldText(doc?.title, 'Privacy Policy')
  return { title }
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const [shared, doc] = await Promise.all([
    getGlobalDoc('shared', locale),
    getGlobalDoc('privacy-policy', locale),
  ])
  if (!shared || !doc) notFound()

  return <LegalPage doc={doc} locale={locale} shared={shared} />
}
