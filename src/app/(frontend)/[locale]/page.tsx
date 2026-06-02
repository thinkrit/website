import { notFound } from 'next/navigation'

import { isLocale } from '@/lib/site-data'

import { HomePage } from '../_pages/HomePage'

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return <HomePage locale={locale} />
}
