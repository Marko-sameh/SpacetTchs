'use client'

import { Suspense, lazy, memo, useMemo, useEffect, useState } from 'react'
import { FeatureGrid } from '@/components/FeatureGrid'
import { Scene3D, FloatingGeometry } from '@/components/ClientComponents'
import { PageLoader } from '@/components/ui/PageLoader'
import Loading from './loading'

// Optimized lazy loading with preload hints
const AboutUs = lazy(() => {
  // Preload hint for better performance
  const componentImport = import('@/components/ui/AboutUs')
  return componentImport
})

const GalaxyPortfolio = lazy(() => {
  const componentImport = import('@/components/ClientComponents').then(mod => ({ default: mod.GalaxyPortfolio }))
  return componentImport
})

const SplitRevealSection = lazy(() => {
  const componentImport = import('@/components/ui/SplitRevealSection')
  return componentImport
})

// Memoized sections with performance optimizations
const HeroSection = memo(() => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Delay 3D scene rendering until after initial paint
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='relative min-h-[60vh] h-[60vh] lg:min-h-screen lg:h-screen flex items-center justify-center overflow-hidden critical-content prevent-reflow'>
      {isVisible ? (
        <Suspense fallback={<Loading />}>
          <Scene3D className="w-full h-full optimize-rendering">
            <FloatingGeometry ctaText="View Our Work" />
          </Scene3D>
        </Suspense>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-purple-900/10 to-cyan-900/10 flex items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  )
})

const FeaturesSection = memo(() => {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    // Delay features rendering for better initial load
    const timer = setTimeout(() => setShouldRender(true), 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="py-12 sm:py-16 lg:py-20 optimize-rendering">
      {shouldRender ? <FeatureGrid /> : <div className="h-96 animate-pulse bg-surface/10 rounded-lg" />}
    </div>
  )
})

const LOADING_FALLBACK = <div className="h-96 animate-pulse bg-surface/10 rounded-lg optimize-rendering" />

const AboutSection = memo(() => {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    )

    const element = document.querySelector('[data-section="about"]')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <div data-section="about" className="py-12 sm:py-16 lg:py-20 optimize-rendering">
      {isInView ? (
        <Suspense fallback={LOADING_FALLBACK}>
          <AboutUs />
        </Suspense>
      ) : (
        LOADING_FALLBACK
      )}
    </div>
  )
})

const PortfolioSection = memo(() => {
  const [isInView, setIsInView] = useState(false)

  const splitRevealProps = useMemo(() => ({
    title: "Building Digital Excellence",
    text: "At SpaceTechs, we craft custom websites, mobile apps, AI-powered systems, and digital marketing strategies that don't just look great — they perform brilliantly. Every pixel, every line of code is engineered for your success.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    cta: { label: 'View Our Work', href: '/projects' }
  }), [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    )

    const element = document.querySelector('[data-section="portfolio"]')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <div data-section="portfolio">
      {isInView ? (
        <Suspense fallback={LOADING_FALLBACK}>
          <GalaxyPortfolio />
          <SplitRevealSection {...splitRevealProps} />
        </Suspense>
      ) : (
        <div className="h-screen">{LOADING_FALLBACK}</div>
      )}
    </div>
  )
})

HeroSection.displayName = 'HeroSection'
FeaturesSection.displayName = 'FeaturesSection'
AboutSection.displayName = 'AboutSection'
PortfolioSection.displayName = 'PortfolioSection'



export default memo(function HomeClient() {
  // Preload critical resources
  useEffect(() => {
    // Preload critical images
    const preloadImages = [
      '/images/jupitermap.jpg',
      '/images/moon.jpg'
    ]

    preloadImages.forEach(src => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    })
  }, [])

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