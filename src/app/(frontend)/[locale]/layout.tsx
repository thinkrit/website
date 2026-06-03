import type React from 'react'

import { HtmlLang } from './HtmlLang'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <>
      <HtmlLang locale={locale} />
      {children}
    </>
  )
}
