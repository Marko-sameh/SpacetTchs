/**
 * Performance Constants
 * Optimized settings for 3D rendering and general app performance
 */

// 3D Performance Configuration - Optimized for better performance
export const PERFORMANCE_CONFIG = Object.freeze({
  // Galaxy Portfolio - Reduced for better performance
  maxProjects: 8,
  baseRadius: 4,
  throttleInterval: 0.16, // ~60fps
  scrollThreshold: 20,
  
  // Canvas Settings - Optimized
  pixelRatio: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 1.5) : 1,
  antialias: false, // Disabled for better performance
  alpha: true,
  powerPreference: "high-performance",
  
  // Frame Rate Targets - More conservative
  targetFPS: 60,
  minFPS: 30,
  adaptiveQuality: true,
  
  // Memory Management - Reduced cache
  maxCacheSize: 50,
  cacheTTL: 3 * 60 * 1000, // 3 minutes
  
  // Device Detection - Reduced particle counts
  mobile: {
    maxParticles: 400,
    reducedGeometry: true,
    simplifiedMaterials: true
  },
  
  desktop: {
    maxParticles: 800,
    reducedGeometry: false,
    simplifiedMaterials: false
  }
})

// Throttling Configuration
export const THROTTLE_CONFIG = Object.freeze({
  scroll: 16, // ~60fps
  resize: 100,
  mousemove: 16,
  performance: 200 // 5fps for performance monitoring
})

// Quality Levels for Adaptive Performance
export const QUALITY_LEVELS = Object.freeze({
  LOW: {
    particles: 500,
    geometry: 'low',
    shadows: false,
    postprocessing: false
  },
  
  MEDIUM: {
    particles: 1000,
    geometry: 'medium',
    shadows: true,
    postprocessing: false
  },
  
  HIGH: {
    particles: 1500,
    geometry: 'high',
    shadows: true,
    postprocessing: true
  }
})

// Performance Monitoring Thresholds
export const PERFORMANCE_THRESHOLDS = Object.freeze({
  fps: {
    excellent: 55,
    good: 45,
    poor: 30,
    critical: 20
  },
  
  memory: {
    warning: 100 * 1024 * 1024, // 100MB
    critical: 200 * 1024 * 1024  // 200MB
  }
})