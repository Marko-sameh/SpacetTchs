'use client'

import { memo, useEffect, useRef, useState } from 'react'

/**
 * Advanced Performance Optimizer Component
 * Implements frame rate monitoring and adaptive performance adjustments
 */
const PerformanceOptimizer = memo(function PerformanceOptimizer({ children }) {
  const [performanceLevel, setPerformanceLevel] = useState('high')
  const frameTimeRef = useRef([])
  const lastFrameTime = useRef(performance.now())
  const rafId = useRef(null)

  useEffect(() => {
    const measurePerformance = () => {
      const now = performance.now()
      const frameTime = now - lastFrameTime.current
      lastFrameTime.current = now

      // Keep rolling average of last 30 frames
      frameTimeRef.current.push(frameTime)
      if (frameTimeRef.current.length > 30) {
        frameTimeRef.current.shift()
      }

      // Calculate average frame time every 30 frames
      if (frameTimeRef.current.length === 30) {
        const avgFrameTime = frameTimeRef.current.reduce((a, b) => a + b, 0) / 30
        const fps = 1000 / avgFrameTime

        // Adaptive performance levels
        if (fps < 30) {
          setPerformanceLevel('low')
        } else if (fps < 45) {
          setPerformanceLevel('medium')
        } else {
          setPerformanceLevel('high')
        }

        frameTimeRef.current = []
      }

      rafId.current = requestAnimationFrame(measurePerformance)
    }

    rafId.current = requestAnimationFrame(measurePerformance)

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [])

  // Provide performance context to children
  return (
    <div data-performance-level={performanceLevel}>
      {children}
    </div>
  )
})

export default PerformanceOptimizer