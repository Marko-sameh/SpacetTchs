'use client'

import { useState, useEffect, useRef } from 'react'

/**
 * Throttled scroll hook to prevent excessive re-renders
 * @param {number} delay - Throttle delay in milliseconds (default: 16ms for 60fps)
 */
export function useThrottledScroll(delay = 16) {
  const [scrollY, setScrollY] = useState(0)
  const timeoutRef = useRef(null)
  const lastScrollRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      
      // Only update if scroll changed significantly (performance optimization)
      if (Math.abs(currentScroll - lastScrollRef.current) < 5) return
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      
      timeoutRef.current = setTimeout(() => {
        setScrollY(currentScroll)
        lastScrollRef.current = currentScroll
      }, delay)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [delay])

  return scrollY
}