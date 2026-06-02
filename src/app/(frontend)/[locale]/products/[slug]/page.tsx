import { notFound } from 'next/navigation'

import { isLocale } from '@/lib/site-data'

import { ProductPage } from '../../../_pages/ProductPage'

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!isLocale(locale) || !slug) notFound()

  return <ProductPage locale={locale} slug={slug} />
}
