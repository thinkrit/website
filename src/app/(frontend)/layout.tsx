import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'
import type { Metadata } from 'next'
import React from 'react'

import './styles.css'

export const metadata: Metadata = {
  description: 'ThinkRIT delivers smart IT, cloud, development, and operational intelligence solutions.',
  title: {
    default: 'ThinkRIT',
    template: '%s | ThinkRIT',
  },
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
