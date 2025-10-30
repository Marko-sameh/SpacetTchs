'use client'

import { useEffect, useState, memo } from 'react'
import { throttle } from '@/lib/memoization'

/**
 * Performance Monitor - Development tool to track animation performance
 * Only renders in development mode
 */
export const PerformanceMonitor = memo(function PerformanceMonitor() {
  const [fps, setFps] = useState(0)
  const [memoryUsage, setMemoryUsage] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return

    let frameCount = 0
    let lastTime = performance.now()
    let animationId

    const measureFPS = throttle(() => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)))
        frameCount = 0
        lastTime = currentTime
      }
      
      animationId = requestAnimationFrame(measureFPS)
    }, 100)

    // Memory monitoring
    if (performance.memory) {
      const updateMemory = throttle(() => {
        setMemoryUsage(Math.round(performance.memory.usedJSHeapSize / 1024 / 1024))
      }, 2000)
      
      setInterval(updateMemory, 2000)
    }

    // Show monitor after 2 seconds
    const timer = setTimeout(() => setIsVisible(true), 2000)
    measureFPS()

    return () => {
      cancelAnimationFrame(animationId)
      clearTimeout(timer)
    }
  }, [])

  if (process.env.NODE_ENV !== 'development' || !isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/80 text-white px-3 py-2 rounded-lg text-sm font-mono">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${fps >= 55 ? 'bg-green-400' : fps >= 30 ? 'bg-yellow-400' : 'bg-red-400'}`} />
        <span>{fps} FPS</span>
        {memoryUsage > 0 && (
          <span className={`ml-2 text-xs ${memoryUsage > 100 ? 'text-red-400' : 'text-green-400'}`}>
            {memoryUsage}MB
          </span>
        )}
      </div>
    </div>
  )
})