import { notFound } from 'next/navigation'

import { isLocale } from '@/lib/site-data'

import { CompanyPage } from '../../_pages/CompanyPage'

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return <CompanyPage locale={locale} />
}
