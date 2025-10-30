'use client'

import { useEffect, useRef } from 'react'
import { FeatureCard } from './ui/cards/FeatureCard'

export function FeatureGridClient({ title, features }) {
  const sectionRef = useRef()
  const titleRef = useRef()
  const cardsRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target
            const delay = element.dataset.delay || 0
            
            setTimeout(() => {
              element.style.opacity = '1'
              element.style.transform = 'translateY(0) scale(1) rotateX(0)'
              element.classList.add('animate-in')
              if (element.dataset.type === 'title') {
                element.classList.add('title')
              }
            }, delay)
          }
        })
      },
      { threshold: 0.15, rootMargin: '30px' }
    )

    if (titleRef.current) observer.observe(titleRef.current)
    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [features])

  return (
    <section ref={sectionRef} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div 
          ref={titleRef} 
          data-type="title"
          className="text-center mb-16 opacity-0 transition-all duration-1000 ease-out"
          style={{ 
            transform: 'translateY(50px) scale(0.9) rotateX(15deg)',
            transformStyle: 'preserve-3d'
          }}
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
                data-delay={index * 150}
                className="w-full opacity-0 transition-all duration-800 ease-out hover:scale-105 hover:-translate-y-2"
                style={{ 
                  transform: 'translateY(60px) scale(0.8) rotateX(20deg)',
                  transformStyle: 'preserve-3d',
                  transitionProperty: 'opacity, transform, box-shadow',
                  willChange: 'transform'
                }}
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