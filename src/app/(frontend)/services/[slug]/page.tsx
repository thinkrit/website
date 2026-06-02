import { notFound } from 'next/navigation'

import { ServicePage } from '../../_pages/ServicePage'

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!slug) notFound()

  return <ServicePage locale="en" slug={slug} />
}
