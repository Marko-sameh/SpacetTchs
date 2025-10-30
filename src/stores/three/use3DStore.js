/**
 * 3D State Management
 * Zustand store for 3D scene state and performance monitoring
 */

import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { QUALITY_LEVELS, PERFORMANCE_THRESHOLDS } from '@/lib/constants/performance'

export const use3DStore = create(
  subscribeWithSelector((set, get) => ({
    // Performance state
    fps: 60,
    quality: QUALITY_LEVELS.MEDIUM,
    isPerformanceMode: false,
    
    // Scene state
    hoveredObject: null,
    selectedObject: null,
    cameraPosition: [0, 0, 12],
    
    // Device capabilities
    deviceCapabilities: null,
    isMobile: false,
    prefersReducedMotion: false,
    
    // Loading state
    isSceneLoading: true,
    loadingProgress: 0,
    
    // Actions
    setFPS: (fps) => {
      set({ fps })
      
      // Auto-adjust quality based on FPS
      const { quality: currentQuality } = get()
      const newQuality = get().getQualityRecommendation(fps)
      
      if (newQuality !== currentQuality) {
        set({ quality: newQuality })
      }
    },
    
    setQuality: (quality) => set({ quality }),
    
    setPerformanceMode: (isPerformanceMode) => set({ isPerformanceMode }),
    
    setHoveredObject: (objectId) => set({ hoveredObject: objectId }),
    
    setSelectedObject: (objectId) => set({ selectedObject: objectId }),
    
    setCameraPosition: (position) => set({ cameraPosition: position }),
    
    setDeviceCapabilities: (capabilities) => set({ 
      deviceCapabilities: capabilities,
      quality: capabilities // Use detected capabilities as initial quality
    }),
    
    setIsMobile: (isMobile) => set({ isMobile }),
    
    setPrefersReducedMotion: (prefersReducedMotion) => set({ prefersReducedMotion }),
    
    setSceneLoading: (isLoading) => set({ isSceneLoading: isLoading }),
    
    setLoadingProgress: (progress) => set({ loadingProgress: progress }),
    
    // Computed values
    getQualityRecommendation: (fps) => {
      if (fps >= PERFORMANCE_THRESHOLDS.fps.excellent) return QUALITY_LEVELS.HIGH
      if (fps >= PERFORMANCE_THRESHOLDS.fps.good) return QUALITY_LEVELS.MEDIUM
      return QUALITY_LEVELS.LOW
    },
    
    shouldUseReducedQuality: () => {
      const { fps, isMobile, prefersReducedMotion, isPerformanceMode } = get()
      return (
        fps < PERFORMANCE_THRESHOLDS.fps.good ||
        isMobile ||
        prefersReducedMotion ||
        isPerformanceMode
      )
    },
    
    getOptimalSettings: () => {
      const { quality, isMobile, prefersReducedMotion } = get()
      
      return {
        particles: quality.particles * (isMobile ? 0.5 : 1),
        geometry: prefersReducedMotion ? 'low' : quality.geometry,
        shadows: quality.shadows && !isMobile && !prefersReducedMotion,
        postprocessing: quality.postprocessing && !isMobile && !prefersReducedMotion,
        animations: !prefersReducedMotion
      }
    },
    
    // Performance monitoring
    startPerformanceMonitoring: () => {
      const monitor = setInterval(() => {
        const { fps } = get()
        
        // Log performance issues in development
        if (process.env.NODE_ENV === 'development' && fps < PERFORMANCE_THRESHOLDS.fps.poor) {
          console.warn(`Low FPS detected: ${fps}fps`)
        }
        
        // Auto-enable performance mode if FPS is critically low
        if (fps < PERFORMANCE_THRESHOLDS.fps.critical) {
          set({ isPerformanceMode: true })
        }
      }, 5000) // Check every 5 seconds
      
      return () => clearInterval(monitor)
    },
    
    // Reset to defaults
    reset: () => set({
      fps: 60,
      quality: QUALITY_LEVELS.MEDIUM,
      isPerformanceMode: false,
      hoveredObject: null,
      selectedObject: null,
      cameraPosition: [0, 0, 12],
      isSceneLoading: true,
      loadingProgress: 0
    })
  }))
)

// Selectors for performance
export const use3DPerformance = () => use3DStore((state) => ({
  fps: state.fps,
  quality: state.quality,
  isPerformanceMode: state.isPerformanceMode,
  shouldUseReducedQuality: state.shouldUseReducedQuality(),
  getOptimalSettings: state.getOptimalSettings()
}))

export const use3DScene = () => use3DStore((state) => ({
  hoveredObject: state.hoveredObject,
  selectedObject: state.selectedObject,
  cameraPosition: state.cameraPosition,
  setHoveredObject: state.setHoveredObject,
  setSelectedObject: state.setSelectedObject,
  setCameraPosition: state.setCameraPosition
}))

export const use3DLoading = () => use3DStore((state) => ({
  isSceneLoading: state.isSceneLoading,
  loadingProgress: state.loadingProgress,
  setSceneLoading: state.setSceneLoading,
  setLoadingProgress: state.setLoadingProgress
}))