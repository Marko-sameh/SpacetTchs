'use client'

import { Suspense, lazy, memo, useMemo } from 'react'
// import { motion } from 'framer-motion'
import { FeatureGrid } from '@/components/FeatureGrid'
import { Scene3D, FloatingGeometry } from '@/components/ClientComponents'
// import { ScrollSection } from '@/components/ui/common/ScrollSection'
// import { ctaVariants } from '@/lib/animations'
import { PageLoader } from '@/components/ui/PageLoader'
import Loading from './loading'

// Optimized lazy loading
const AboutUs = lazy(() => import('@/components/ui/AboutUs'))
const GalaxyPortfolio = lazy(() =>
  import('@/components/ClientComponents').then(mod => ({ default: mod.GalaxyPortfolio }))
)
const SplitRevealSection = lazy(() => import('@/components/ui/SplitRevealSection'))

// Memoized sections with scroll animations
const HeroSection = memo(() => (

  <div className='relative min-h-[60vh] h-[60vh] lg:min-h-screen lg:h-screen flex items-center justify-center overflow-hidden critical-content prevent-reflow'>

    <Suspense fallback={<Loading />}>
      <Scene3D className="w-full h-full optimize-rendering">
        <FloatingGeometry ctaText="View Our Work" />
      </Scene3D>
    </Suspense>
  </div>
))

const FeaturesSection = memo(() => (
  <div className="py-12 sm:py-16 lg:py-20 optimize-rendering">
    <FeatureGrid />
  </div>
))

const LOADING_FALLBACK = <div className="h-96 animate-pulse bg-surface rounded-lg optimize-rendering" />

const AboutSection = memo(() => (
  <div className="py-12 sm:py-16 lg:py-20 optimize-rendering">
    <Suspense fallback={LOADING_FALLBACK}>
      <AboutUs />
    </Suspense>
  </div>
))

const PortfolioSection = memo(() => {
  const splitRevealProps = {
    title: "Building Digital Excellence",
    text: "At SpaceTechs, we craft custom websites, mobile apps, AI-powered systems, and digital marketing strategies that don't just look great — they perform brilliantly. Every pixel, every line of code is engineered for your success.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    cta: { label: 'View Our Work', href: '/projects' }
  }

  return (
    <Suspense fallback={LOADING_FALLBACK}>
      <GalaxyPortfolio />
      {/* Split reveal with depth animation */}
      <SplitRevealSection {...splitRevealProps} />
    </Suspense>
  )
})

HeroSection.displayName = 'HeroSection'
FeaturesSection.displayName = 'FeaturesSection'
AboutSection.displayName = 'AboutSection'
PortfolioSection.displayName = 'PortfolioSection'



export default memo(function HomeClient() {
  return (
    <>
      <PageLoader />
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <PortfolioSection />
    </>
  )
})