'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/**
 * Optimized ScrollProgress component with throttled updates
 */
export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const timeoutRef = useRef(null)
  const lastProgressRef = useRef(0)

  useEffect(() => {
    const calculateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollTop / docHeight, 1)
      
      // Only update if progress changed significantly
      if (Math.abs(progress - lastProgressRef.current) < 0.01) return
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      
      timeoutRef.current = setTimeout(() => {
        setScrollProgress(progress)
        lastProgressRef.current = progress
      }, 16) // 60fps for smooth progress bar
    }

    window.addEventListener('scroll', calculateProgress, { passive: true })
    calculateProgress() // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', calculateProgress)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 z-50 origin-left"
      style={{ scaleX: scrollProgress }}
      initial={{ scaleX: 0 }}
      transition={{ duration: 0.1 }}
    />
  )
}