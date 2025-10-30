'use client'

import { memo, useEffect, useRef } from 'react'
import { useIntersectionObserver } from '@/hooks/usePerformanceOptimization'

// Performance-optimized wrapper component
const PerformanceWrapper = memo(({ 
  children, 
  className = '', 
  lazy = false,
  threshold = 0.1,
  rootMargin = '50px',
  ...props 
}) => {
  const elementRef = useIntersectionObserver({
    threshold,
    rootMargin,
    onIntersect: lazy ? (entry) => {
      // Lazy load content when in view
      entry.target.classList.add('loaded')
    } : undefined
  })

  const wrapperClasses = [
    'optimize-rendering',
    lazy && 'opacity-0 transition-opacity duration-300',
    className
  ].filter(Boolean).join(' ')

  return (
    <div 
      ref={elementRef}
      className={wrapperClasses}
      {...props}
    >
      {children}
    </div>
  )
})

PerformanceWrapper.displayName = 'PerformanceWrapper'

export { PerformanceWrapper }