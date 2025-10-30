/**
 * Three.js Configuration
 * Optimized settings for React Three Fiber
 */

import { PERFORMANCE_CONFIG } from '../constants/performance'

// Canvas Configuration
export const CANVAS_CONFIG = {
  // Performance settings
  dpr: PERFORMANCE_CONFIG.pixelRatio,
  antialias: PERFORMANCE_CONFIG.antialias,
  alpha: PERFORMANCE_CONFIG.alpha,
  powerPreference: PERFORMANCE_CONFIG.powerPreference,
  
  // Camera settings
  camera: {
    fov: 75,
    near: 0.1,
    far: 1000,
    position: [0, 0, 12]
  },
  
  // Renderer settings
  gl: {
    preserveDrawingBuffer: false,
    failIfMajorPerformanceCaveat: true,
    stencil: false,
    depth: true
  },
  
  // Frame loop settings
  frameloop: 'demand', // On-demand rendering for better performance
  
  // Performance monitoring
  performance: {
    min: 0.5,
    max: 1,
    debounce: 200
  }
}

// Lighting Configuration
export const LIGHTING_CONFIG = {
  ambient: {
    intensity: 0.6,
    color: '#ffffff'
  },
  
  directional: {
    position: [10, 10, 5],
    color: '#ffffff',
    intensity: 2.0,
    castShadow: true
  },
  
  point: [
    {
      position: [-5, 5, 5],
      color: '#4a90e2',
      intensity: 1.2
    },
    {
      position: [5, -5, -5],
      color: '#ff6b35',
      intensity: 0.8
    }
  ],
  
  spot: {
    position: [0, 10, 0],
    color: '#ffffff',
    intensity: 1.5,
    angle: 0.3
  }
}

// Material Presets
export const MATERIAL_PRESETS = {
  planet: {
    roughness: 0.9,
    metalness: 0.1,
    normalScale: [1, 1],
    displacementScale: 0.01
  },
  
  glass: {
    transparent: true,
    opacity: 0.2,
    roughness: 0,
    metalness: 0.1,
    transmission: 1
  },
  
  holographic: {
    transparent: true,
    opacity: 0.8,
    emissive: '#00ffff',
    emissiveIntensity: 0.2
  }
}

// Geometry Optimization
export const GEOMETRY_CONFIG = {
  sphere: {
    low: [0.8, 16, 16],
    medium: [0.8, 32, 32],
    high: [0.8, 64, 64]
  },
  
  plane: {
    low: [1, 1, 8, 8],
    medium: [1, 1, 16, 16],
    high: [1, 1, 32, 32]
  }
}