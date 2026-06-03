import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'
import type { Metadata } from 'next'
import React from 'react'

import { fieldText, getGlobalDoc, mediaUrl } from '@/lib/payload-local'

import './styles.css'

export async function generateMetadata(): Promise<Metadata> {
  const shared = await getGlobalDoc('shared', 'en')
  const siteTitle = fieldText(shared?.siteTitle, 'ThinkRIT')
  const favicon = shared?.favicon ? mediaUrl(shared.favicon) : undefined

  return {
    description:
      'ThinkRIT delivers smart IT, cloud, development, and operational intelligence solutions.',
    title: {
      default: siteTitle,
      template: `%s | ${siteTitle}`,
    },
    ...(favicon ? { icons: { icon: favicon } } : {}),
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html id="top" lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
