'use client'

import PixelBlast from '@/components/site/PixelBlast'

export function PixelBlastHeroBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute h-full w-full"
      data-pixelblast-bg
      style={{ inset: 0, pointerEvents: 'none' }}
    >
      <PixelBlast
        color="#ffffff"
        edgeFade={0.05}
        enableRipples={false}
        patternDensity={1.9}
        patternScale={5}
        pixelSize={4}
        speed={0.9}
        variant="square"
      />
      <div
        className="pointer-events-none absolute bg-gradient-to-b from-[var(--think-soft)]/20 via-transparent to-[var(--think-soft)]/40"
        style={{ inset: 0 }}
      />
    </div>
  )
}
