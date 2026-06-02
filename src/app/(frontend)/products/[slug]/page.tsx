import { notFound } from 'next/navigation'

import { ProductPage } from '../../_pages/ProductPage'

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!slug) notFound()

  return <ProductPage locale="en" slug={slug} />
}
