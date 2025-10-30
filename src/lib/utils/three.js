/**
 * Three.js Utilities
 * Performance-optimized utilities for 3D operations
 */

import * as THREE from 'three'
import { PERFORMANCE_CONFIG, QUALITY_LEVELS } from '../constants/performance'

// Device capability detection
export const detectDeviceCapabilities = () => {
  if (typeof window === 'undefined') return QUALITY_LEVELS.MEDIUM

  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
  
  if (!gl) return QUALITY_LEVELS.LOW

  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
  const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : ''
  
  // Mobile detection
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  
  // Memory estimation
  const memory = navigator.deviceMemory || 4 // Default to 4GB if not available
  
  // Performance scoring
  let score = 0
  if (!isMobile) score += 2
  if (memory >= 8) score += 2
  if (renderer.toLowerCase().includes('nvidia') || renderer.toLowerCase().includes('amd')) score += 1
  
  if (score >= 4) return QUALITY_LEVELS.HIGH
  if (score >= 2) return QUALITY_LEVELS.MEDIUM
  return QUALITY_LEVELS.LOW
}

// Optimized position generation with caching
const positionCache = new Map()

export const generateDynamicPositions = (count) => {
  if (positionCache.has(count)) return positionCache.get(count)

  const positions = []
  const { baseRadius } = PERFORMANCE_CONFIG

  for (let i = 0; i < count; i++) {
    const angleStep = (Math.PI * 2) / count
    const angle = i * angleStep
    const layerRadius = baseRadius + (i % 2) * 2

    const x = Math.cos(angle) * layerRadius + (i % 2 === 0 ? -8.5 : 6.5)
    const z = Math.sin(angle) * layerRadius
    const y = (i % 3 - 1) * 1.5

    positions.push([x, y, z - 2])
  }

  positionCache.set(count, positions)
  return positions
}

// Material factory with caching
const materialCache = new Map()

export const createOptimizedMaterial = (type, options = {}) => {
  const cacheKey = `${type}_${JSON.stringify(options)}`
  
  if (materialCache.has(cacheKey)) {
    return materialCache.get(cacheKey).clone()
  }

  let material
  
  switch (type) {
    case 'planet':
      material = new THREE.MeshStandardMaterial({
        roughness: 0.9,
        metalness: 0.1,
        ...options
      })
      break
      
    case 'glass':
      material = new THREE.MeshPhysicalMaterial({
        transparent: true,
        opacity: 0.2,
        roughness: 0,
        metalness: 0.1,
        transmission: 1,
        ...options
      })
      break
      
    case 'holographic':
      material = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.8,
        color: options.color || '#00ffff',
        ...options
      })
      break
      
    default:
      material = new THREE.MeshBasicMaterial(options)
  }

  materialCache.set(cacheKey, material)
  return material.clone()
}

// Geometry factory with LOD support
const geometryCache = new Map()

export const createOptimizedGeometry = (type, quality = 'medium', options = {}) => {
  const cacheKey = `${type}_${quality}_${JSON.stringify(options)}`
  
  if (geometryCache.has(cacheKey)) {
    return geometryCache.get(cacheKey)
  }

  let geometry
  
  switch (type) {
    case 'sphere':
      const sphereParams = {
        low: [0.8, 16, 16],
        medium: [0.8, 32, 32],
        high: [0.8, 64, 64]
      }
      geometry = new THREE.SphereGeometry(...sphereParams[quality], ...Object.values(options))
      break
      
    case 'plane':
      const planeParams = {
        low: [1, 1, 8, 8],
        medium: [1, 1, 16, 16],
        high: [1, 1, 32, 32]
      }
      geometry = new THREE.PlaneGeometry(...planeParams[quality], ...Object.values(options))
      break
      
    default:
      geometry = new THREE.BufferGeometry()
  }

  geometryCache.set(cacheKey, geometry)
  return geometry
}

// Texture optimization
export const optimizeTexture = (texture) => {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.anisotropy = Math.min(16, window.renderer?.capabilities?.getMaxAnisotropy?.() || 16)
  texture.generateMipmaps = true
  texture.minFilter = THREE.LinearMipmapLinearFilter
  texture.magFilter = THREE.LinearFilter
  return texture
}

// Memory cleanup utilities
export const disposeObject = (object) => {
  if (!object) return

  if (object.geometry) {
    object.geometry.dispose()
  }

  if (object.material) {
    if (Array.isArray(object.material)) {
      object.material.forEach(material => {
        disposeMaterial(material)
      })
    } else {
      disposeMaterial(object.material)
    }
  }

  if (object.children) {
    object.children.forEach(child => disposeObject(child))
  }
}

const disposeMaterial = (material) => {
  if (!material) return

  // Dispose textures
  Object.keys(material).forEach(key => {
    const value = material[key]
    if (value && typeof value.dispose === 'function') {
      value.dispose()
    }
  })

  material.dispose()
}

// Performance monitoring
export const createPerformanceMonitor = () => {
  let frameCount = 0
  let lastTime = performance.now()
  let fps = 60

  return {
    update: () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime - lastTime >= 1000) {
        fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        frameCount = 0
        lastTime = currentTime
      }
      
      return fps
    },
    
    getFPS: () => fps,
    
    getQualityRecommendation: () => {
      if (fps >= 55) return QUALITY_LEVELS.HIGH
      if (fps >= 45) return QUALITY_LEVELS.MEDIUM
      return QUALITY_LEVELS.LOW
    }
  }
}