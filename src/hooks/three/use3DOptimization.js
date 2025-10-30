/**
 * 3D Optimization Hook
 * Performance monitoring and adaptive quality management for 3D scenes
 */

import { useEffect, useRef, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import { use3DStore } from '@/stores/three/use3DStore'
import { detectDeviceCapabilities } from '@/lib/utils/three'

export function use3DOptimization() {
  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())
  const fpsHistory = useRef([])
  
  const {
    setFPS,
    setDeviceCapabilities,
    setIsMobile,
    setPrefersReducedMotion,
    startPerformanceMonitoring,
    getOptimalSettings
  } = use3DStore()

  // Initialize device detection
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Detect device capabilities
    const capabilities = detectDeviceCapabilities()
    setDeviceCapabilities(capabilities)

    // Mobile detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    setIsMobile(isMobile)

    // Reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setPrefersReducedMotion(prefersReducedMotion)

    // Start performance monitoring
    const stopMonitoring = startPerformanceMonitoring()

    return stopMonitoring
  }, [setDeviceCapabilities, setIsMobile, setPrefersReducedMotion, startPerformanceMonitoring])

  // FPS monitoring with useFrame
  useFrame(() => {
    frameCount.current++
    const currentTime = performance.now()
    
    // Calculate FPS every second
    if (currentTime - lastTime.current >= 1000) {
      const fps = Math.round((frameCount.current * 1000) / (currentTime - lastTime.current))
      
      // Smooth FPS with history
      fpsHistory.current.push(fps)
      if (fpsHistory.current.length > 5) {
        fpsHistory.current.shift()
      }
      
      const smoothedFPS = Math.round(
        fpsHistory.current.reduce((sum, f) => sum + f, 0) / fpsHistory.current.length
      )
      
      setFPS(smoothedFPS)
      
      frameCount.current = 0
      lastTime.current = currentTime
    }
  })

  // Get current optimal settings
  const optimalSettings = getOptimalSettings()

  // Performance regression callback
  const handlePerformanceRegression = useCallback(() => {
    use3DStore.getState().setPerformanceMode(true)
  }, [])

  return {
    optimalSettings,
    handlePerformanceRegression,
    
    // Utility functions
    shouldReduceQuality: use3DStore((state) => state.shouldUseReducedQuality()),
    currentFPS: use3DStore((state) => state.fps),
    currentQuality: use3DStore((state) => state.quality),
    isPerformanceMode: use3DStore((state) => state.isPerformanceMode)
  }
}

// Specialized hook for adaptive rendering
export function useAdaptiveRendering() {
  const { optimalSettings, shouldReduceQuality } = use3DOptimization()
  
  return {
    // Particle count based on performance
    particleCount: optimalSettings.particles,
    
    // Geometry quality
    geometryQuality: optimalSettings.geometry,
    
    // Feature toggles
    enableShadows: optimalSettings.shadows,
    enablePostprocessing: optimalSettings.postprocessing,
    enableAnimations: optimalSettings.animations,
    
    // Render settings
    pixelRatio: shouldReduceQuality ? 1 : Math.min(window.devicePixelRatio || 1, 2),
    antialias: !shouldReduceQuality,
    
    // LOD distances
    lodDistances: shouldReduceQuality ? [5, 15, 30] : [10, 25, 50]
  }
}

// Hook for performance-aware animations
export function usePerformanceAwareAnimation() {
  const prefersReducedMotion = use3DStore((state) => state.prefersReducedMotion)
  const isPerformanceMode = use3DStore((state) => state.isPerformanceMode)
  
  const shouldAnimate = !prefersReducedMotion && !isPerformanceMode
  
  return {
    shouldAnimate,
    animationSpeed: shouldAnimate ? 1 : 0,
    
    // Throttled animation updates
    updateInterval: isPerformanceMode ? 100 : 16, // 10fps vs 60fps
    
    // Simplified animations for performance mode
    useSimpleAnimations: isPerformanceMode
  }
}