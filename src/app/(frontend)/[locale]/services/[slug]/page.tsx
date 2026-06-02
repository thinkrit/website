import { notFound } from 'next/navigation'

import { isLocale } from '@/lib/site-data'

import { ServicePage } from '../../../_pages/ServicePage'

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!isLocale(locale) || !slug) notFound()

  return <ServicePage locale={locale} slug={slug} />
}
