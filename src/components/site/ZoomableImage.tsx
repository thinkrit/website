'use client'

import { X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export function ZoomableImage({
  src = '/placeholder-panel.svg',
  alt = '',
  aspect = 'aspect-[5/3]',
  className = '',
}: {
  src?: string
  alt?: string
  aspect?: string
  className?: string
}) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  return (
    <>
      <button
        aria-label="Open image"
        className={`relative block cursor-zoom-in overflow-hidden rounded-lg bg-[#dfdfe2] ${aspect} ${className}`}
        onClick={() => setOpen(true)}
        type="button"
      >
        <Image alt={alt} className="object-cover" fill sizes="(max-width: 768px) 100vw, 45vw" src={src} />
      </button>

      {open ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm motion-safe:animate-[fadeIn_150ms_ease-out]"
          onClick={() => setOpen(false)}
          role="dialog"
        >
          <button
            aria-label="Close image"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white"
            onClick={() => setOpen(false)}
            type="button"
          >
            <X aria-hidden="true" className="h-6 w-6" />
          </button>
          <div
            className="relative max-h-270 max-w-480 motion-safe:animate-[zoomIn_180ms_ease-out]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              alt={alt}
              className="h-auto max-h-[85vh] w-auto max-w-[90vw] rounded-lg object-contain"
              height={1080}
              sizes="100vw"
              src={src}
              width={1920}
            />
          </div>
        </div>
      ) : null}
    </>
  )
}
