'use client'

import { Suspense, lazy, memo, useMemo } from 'react'
import { FeatureGrid } from '@/components/FeatureGrid'
import { Scene3D, FloatingGeometry } from '@/components/ClientComponents'
import Loading from './loading'

// Lazy load heavy components
const AboutUs = lazy(() => import('@/components/ui/AboutUs'))
const GalaxyPortfolio = lazy(() => import('@/components/ClientComponents').then(mod => ({ default: mod.GalaxyPortfolio })))
const SplitRevealSection = lazy(() => import('@/components/ui/SplitRevealSection'))

// Memoized sections
const HeroSection = memo(() => (
  <section className="relative min-h-[60vh] h-[60vh] lg:min-h-screen lg:h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0 h-[60vh] lg:h-screen">
      <Suspense fallback={<Loading />}>
        <Scene3D className="w-full h-full">
          <FloatingGeometry ctaText="View Our Work" />
        </Scene3D>
      </Suspense>

    </div>
  </section>

))

const FeaturesSection = memo(() => (
  <section className="py-12 sm:py-16 lg:py-20">
    <FeatureGrid />
  </section>
))

const LOADING_FALLBACK = <div className="h-96 animate-pulse bg-surface rounded-lg" />

const AboutSection = memo(() => (
  <section className="py-12 sm:py-16 lg:py-20">
    <Suspense fallback={LOADING_FALLBACK}>
      <AboutUs />
    </Suspense>
  </section>
))

const PortfolioSection = memo(() => {
  const splitRevealProps = useMemo(() => ({
    title: "Building Digital Excellence",
    text: "At SpaceTechs, we craft custom websites, mobile apps, AI-powered systems, and digital marketing strategies that don't just look great — they perform brilliantly. Every pixel, every line of code is engineered for your success.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    cta: { label: 'View Our Work', href: '/projects' }
  }), [])

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <Suspense fallback={LOADING_FALLBACK}>
        <GalaxyPortfolio />
        <SplitRevealSection {...splitRevealProps} />
      </Suspense>
    </section>
  )
})

HeroSection.displayName = 'HeroSection'
FeaturesSection.displayName = 'FeaturesSection'
AboutSection.displayName = 'AboutSection'
PortfolioSection.displayName = 'PortfolioSection'

export default memo(function HomeClient() {
  return (
    <>
      <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-purple-200/30 to-cyan-200/30 dark:from-purple-900/20 dark:to-cyan-900/20" />}>
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
        <PortfolioSection />
      </Suspense>
    </>
  )
})