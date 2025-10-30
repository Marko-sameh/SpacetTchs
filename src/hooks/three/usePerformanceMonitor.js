import { useEffect, useRef, useCallback } from 'react'

/**
 * Performance monitoring hook for React components
 * Tracks render times and provides optimization insights
 */
export function usePerformanceMonitor(componentName, options = {}) {
  const {
    threshold = 16.67, // 60fps budget
    logToConsole = process.env.NODE_ENV === 'development',
    trackMemory = false
  } = options

  const renderStartTime = useRef(0)
  const renderCount = useRef(0)
  const totalRenderTime = useRef(0)
  const slowRenders = useRef(0)

  const startRender = useCallback(() => {
    renderStartTime.current = performance.now()
  }, [])

  const endRender = useCallback(() => {
    const renderTime = performance.now() - renderStartTime.current
    renderCount.current++
    totalRenderTime.current += renderTime

    if (renderTime > threshold) {
      slowRenders.current++
      
      if (logToConsole) {
        console.warn(
          `🐌 Slow render detected in ${componentName}:`,
          `${renderTime.toFixed(2)}ms (${((renderTime / threshold) * 100).toFixed(0)}% over budget)`
        )
      }
    }

    // Log performance summary every 100 renders
    if (renderCount.current % 100 === 0 && logToConsole) {
      const avgRenderTime = totalRenderTime.current / renderCount.current
      const slowRenderPercentage = (slowRenders.current / renderCount.current) * 100

      console.log(`📊 Performance Summary for ${componentName}:`, {
        totalRenders: renderCount.current,
        avgRenderTime: `${avgRenderTime.toFixed(2)}ms`,
        slowRenders: `${slowRenders.current} (${slowRenderPercentage.toFixed(1)}%)`,
        ...(trackMemory && {
          memoryUsage: `${(performance.memory?.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`
        })
      })
    }
  }, [componentName, threshold, logToConsole, trackMemory])

  const getStats = useCallback(() => ({
    renderCount: renderCount.current,
    avgRenderTime: totalRenderTime.current / renderCount.current,
    slowRenders: slowRenders.current,
    slowRenderPercentage: (slowRenders.current / renderCount.current) * 100
  }), [])

  // Auto-start render timing
  useEffect(() => {
    startRender()
    return endRender
  })

  return {
    startRender,
    endRender,
    getStats
  }
}

/**
 * Hook for monitoring frame rate in 3D scenes
 */
export function useFrameRateMonitor(targetFPS = 60) {
  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())
  const fps = useRef(60)

  const updateFPS = useCallback(() => {
    frameCount.current++
    const currentTime = performance.now()
    
    if (currentTime - lastTime.current >= 1000) {
      fps.current = Math.round((frameCount.current * 1000) / (currentTime - lastTime.current))
      
      if (fps.current < targetFPS * 0.8) {
        console.warn(`🎮 Low FPS detected: ${fps.current}fps (target: ${targetFPS}fps)`)
      }
      
      frameCount.current = 0
      lastTime.current = currentTime
    }
  }, [targetFPS])

  return {
    updateFPS,
    getCurrentFPS: () => fps.current
  }
}