'use client'

import type { ComponentProps } from 'react'

import Hyperspeed from '@/components/site/Hyperspeed'

const heroHyperspeedOptions: ComponentProps<typeof Hyperspeed>['effectOptions'] = {
  distortion: 'turbulentDistortion',
  length: 420,
  roadWidth: 9,
  islandWidth: 2,
  lanesPerRoad: 3,
  fov: 88,
  fovSpeedUp: 132,
  speedUp: 1.6,
  carLightsFade: 0.45,
  totalSideLightSticks: 42,
  lightPairsPerRoadWay: 44,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.08,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.08, 0.32],
  lightStickHeight: [1, 1.7],
  movingAwaySpeed: [46, 70],
  movingCloserSpeed: [-118, -160],
  carLightsLength: [420 * 0.04, 420 * 0.18],
  carLightsRadius: [0.04, 0.13],
  carWidthPercentage: [0.22, 0.46],
  carShiftX: [-0.55, 0.55],
  carFloorSeparation: [0, 4],
  colors: {
    roadColor: 0x050505,
    islandColor: 0x090909,
    background: 0x000000,
    shoulderLines: 0x1c1c20,
    brokenLines: 0x252529,
    leftCars: [0xed1c24, 0xb9141b, 0xff4f56],
    rightCars: [0xffffff, 0xd9d9df, 0x8d929b],
    sticks: 0xed1c24,
  },
}

export function HyperspeedHeroBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute h-full w-full bg-black"
      data-hyperspeed-bg
      style={{ inset: 0, pointerEvents: 'none' }}
    >
      <Hyperspeed effectOptions={heroHyperspeedOptions} />
      <div
        className="pointer-events-none absolute bg-[radial-gradient(circle_at_50%_65%,transparent_0,rgba(0,0,0,0.22)_46%,rgba(0,0,0,0.72)_100%)]"
        style={{ inset: 0 }}
      />
      <div
        className="pointer-events-none absolute bg-gradient-to-b from-black/25 via-transparent to-black/30"
        style={{ inset: 0 }}
      />
    </div>
  )
}
