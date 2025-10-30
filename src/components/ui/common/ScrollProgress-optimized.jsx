'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

/**
 * Ultra-optimized ScrollProgress with RAF-based throttling
 */
export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const rafRef = useRef(null)
  const lastProgressRef = useRef(0)
  const isUpdatingRef = useRef(false)

  const updateProgress = useCallback(() => {
    if (isUpdatingRef.current) return
    
    isUpdatingRef.current = true
    rafRef.current = requestAnimationFrame(() => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollTop / docHeight, 1)
      
      // Only update if progress changed by at least 2%
      if (Math.abs(progress - lastProgressRef.current) >= 0.02) {
        setScrollProgress(progress)
        lastProgressRef.current = progress
      }
      
      isUpdatingRef.current = false
    })
  }, [])

  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        updateProgress()
        ticking = true
        setTimeout(() => { ticking = false }, 100) // 10fps max
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateProgress() // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [updateProgress])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 z-50 origin-left"
      style={{ scaleX: scrollProgress }}
      initial={{ scaleX: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    />
  )
}