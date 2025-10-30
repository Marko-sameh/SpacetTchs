import { useEffect, useCallback, useRef } from 'react'
import { performanceManager } from '@/lib/utils/performance'

// Performance optimization hook
export const usePerformanceOptimization = () => {
  const rafRef = useRef()
  const isReducedMotion = useRef(false)

  useEffect(() => {
    // Check for reduced motion preference
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      isReducedMotion.current = mediaQuery.matches
      
      const handleChange = (e) => {
        isReducedMotion.current = e.matches
      }
      
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  // Optimized RAF throttling
  const throttledRAF = useCallback((callback) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }
    
    rafRef.current = requestAnimationFrame(() => {
      if (!isReducedMotion.current) {
        callback()
      }
    })
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return {
    throttledRAF,
    isReducedMotion: isReducedMotion.current,
    performanceConfig: performanceManager.getConfig()
  }
}

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (options = {}) => {
  const elementRef = useRef()
  const observerRef = useRef()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const element = elementRef.current
    if (!element) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && options.onIntersect) {
            options.onIntersect(entry)
          }
        })
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '50px',
        ...options
      }
    )

    observerRef.current.observe(element)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [options])

  return elementRef
}