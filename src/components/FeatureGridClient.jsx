'use client'

import { useEffect, useRef, useCallback, useMemo } from 'react'
import { FeatureCard } from './ui/cards/FeatureCard'

export function FeatureGridClient({ title, features }) {
  const sectionRef = useRef()
  const titleRef = useRef()
  const cardsRef = useRef([])

  // Optimized intersection observer with better performance
  const handleIntersection = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target
        const delay = parseInt(element.dataset.delay) || 0
        
        // Use requestAnimationFrame for better performance
        setTimeout(() => {
          requestAnimationFrame(() => {
            element.style.opacity = '1'
            element.style.transform = 'translateY(0) scale(1) rotateX(0)'
            element.classList.add('animate-in')
            if (element.dataset.type === 'title') {
              element.classList.add('title')
            }
          })
        }, delay)
      }
    })
  }, [])

  // Memoize observer options
  const observerOptions = useMemo(() => ({
    threshold: 0.1, // Reduced threshold for earlier triggering
    rootMargin: '50px' // Increased margin for smoother experience
  }), [])

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, observerOptions)

    if (titleRef.current) observer.observe(titleRef.current)
    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [features, handleIntersection, observerOptions])

  // Memoize title styles
  const titleStyle = useMemo(() => ({
    transform: 'translateY(30px) scale(0.95)', // Reduced initial transform
    transformStyle: 'preserve-3d',
    willChange: 'transform, opacity'
  }), [])

  // Memoize card wrapper styles
  const getCardStyle = useCallback((index) => ({
    transform: 'translateY(40px) scale(0.9)', // Reduced initial transform
    transformStyle: 'preserve-3d',
    transitionProperty: 'opacity, transform',
    willChange: 'transform, opacity'
  }), [])

  return (
    <section ref={sectionRef} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div 
          ref={titleRef} 
          data-type="title"
          className="text-center mb-16 opacity-0 transition-all duration-600 ease-out" // Reduced duration
          style={titleStyle}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
          {features?.map((feature, index) => {
            if (!feature) return null;
            return (
              <div
                key={feature.id || feature.title || index}
                ref={(el) => (cardsRef.current[index] = el)}
                data-delay={index * 100} // Reduced delay
                className="w-full opacity-0 transition-all duration-500 ease-out" // Reduced duration, removed hover transforms
                style={getCardStyle(index)}
              >
                <FeatureCard
                  {...feature}
                  index={index}
                />
              </div>
            );
          }) || null}
        </div>
      </div>
    </section>
  )
}