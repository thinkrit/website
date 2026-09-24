'use client'

import Image from 'next/image'
import { useState } from 'react'

export function FallbackImage({
  src = '/placeholder-panel.svg',
  fallbackSrc = '/placeholder-panel.svg',
  alt = '',
  className = '',
  sizes,
}: {
  src?: string
  fallbackSrc?: string
  alt?: string
  className?: string
  sizes?: string
}) {
  const [errored, setErrored] = useState(false)
  const resolved = errored ? fallbackSrc : src

  return (
    <Image
      alt={alt}
      className={className}
      fill
      onError={() => setErrored(true)}
      sizes={sizes}
      src={resolved}
    />
  )
}
