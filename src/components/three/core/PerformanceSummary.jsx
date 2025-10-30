'use client'

import { memo, useEffect, useState } from 'react'

/**
 * Performance Summary Component
 * Displays optimization results and performance metrics
 */
const PerformanceSummary = memo(function PerformanceSummary() {
  const [metrics, setMetrics] = useState({
    renderTime: 0,
    frameRate: 0,
    memoryUsage: 0
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        if (entry.entryType === 'measure') {
          setMetrics(prev => ({
            ...prev,
            renderTime: entry.duration
          }))
        }
      })
    })

    observer.observe({ entryTypes: ['measure'] })

    // Frame rate monitoring
    let frameCount = 0
    let lastTime = performance.now()
    
    const measureFrameRate = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime - lastTime >= 1000) {
        setMetrics(prev => ({
          ...prev,
          frameRate: Math.round(frameCount * 1000 / (currentTime - lastTime))
        }))
        frameCount = 0
        lastTime = currentTime
      }
      
      requestAnimationFrame(measureFrameRate)
    }
    
    requestAnimationFrame(measureFrameRate)

    // Memory usage (if available)
    if (performance.memory) {
      const updateMemory = () => {
        setMetrics(prev => ({
          ...prev,
          memoryUsage: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024)
        }))
      }
      
      const memoryInterval = setInterval(updateMemory, 5000)
      return () => {
        clearInterval(memoryInterval)
        observer.disconnect()
      }
    }

    return () => observer.disconnect()
  }, [])

  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono z-50">
      <div className="space-y-1">
        <div>FPS: {metrics.frameRate}</div>
        <div>Render: {metrics.renderTime.toFixed(1)}ms</div>
        {metrics.memoryUsage > 0 && (
          <div>Memory: {metrics.memoryUsage}MB</div>
        )}
      </div>
    </div>
  )
})

export default PerformanceSummary