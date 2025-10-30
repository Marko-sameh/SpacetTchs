/**
 * Performance optimization configuration and utilities
 */

// Device capability detection
export const getDeviceCapabilities = () => {
  if (typeof window === 'undefined') return { level: 'high', mobile: false }
  
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
  
  const capabilities = {
    mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    memory: navigator.deviceMemory || 4,
    cores: navigator.hardwareConcurrency || 4,
    webgl: !!gl,
    webgl2: !!canvas.getContext('webgl2'),
    maxTextureSize: gl ? gl.getParameter(gl.MAX_TEXTURE_SIZE) : 2048
  }
  
  // Determine performance level
  let level = 'high'
  if (capabilities.mobile || capabilities.memory < 4 || capabilities.cores < 4) {
    level = 'medium'
  }
  if (capabilities.memory < 2 || capabilities.cores < 2 || !capabilities.webgl) {
    level = 'low'
  }
  
  return { ...capabilities, level }
}

// Performance configurations by device capability
export const PERFORMANCE_CONFIGS = {
  low: {
    maxProjects: 4,
    particleCount: 200,
    animationSpeed: 0.5,
    updateInterval: 200, // 5fps
    textureSize: 256,
    shadowsEnabled: false,
    antialiasing: false,
    pixelRatio: 1
  },
  medium: {
    maxProjects: 6,
    particleCount: 500,
    animationSpeed: 0.75,
    updateInterval: 100, // 10fps
    textureSize: 512,
    shadowsEnabled: false,
    antialiasing: true,
    pixelRatio: Math.min(window.devicePixelRatio, 1.5)
  },
  high: {
    maxProjects: 12,
    particleCount: 1000,
    animationSpeed: 1,
    updateInterval: 50, // 20fps
    textureSize: 1024,
    shadowsEnabled: true,
    antialiasing: true,
    pixelRatio: Math.min(window.devicePixelRatio, 2)
  }
}

// Adaptive performance manager with optimizations
export class PerformanceManager {
  constructor() {
    this.capabilities = getDeviceCapabilities()
    this.config = PERFORMANCE_CONFIGS[this.capabilities.level]
    this.frameRate = 60
    this.frameCount = 0
    this.lastTime = typeof performance !== 'undefined' ? performance.now() : Date.now()
    this.adaptiveMode = true
    this.rafId = null
    this.isRunning = false
  }

  // Start performance monitoring
  start() {
    if (this.isRunning) return
    this.isRunning = true
    this.monitor()
  }

  // Stop performance monitoring
  stop() {
    this.isRunning = false
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }

  // RAF-based monitoring to reduce main thread work
  monitor() {
    if (!this.isRunning) return
    
    this.updateFrameRate()
    this.rafId = requestAnimationFrame(() => this.monitor())
  }

  // Monitor frame rate and adapt settings - optimized to prevent forced reflows
  updateFrameRate() {
    this.frameCount++
    const currentTime = typeof performance !== 'undefined' ? performance.now() : Date.now()
    
    if (currentTime - this.lastTime >= 1000) {
      this.frameRate = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime))
      
      // Batch performance adjustments to prevent forced reflows
      requestAnimationFrame(() => {
        if (this.adaptiveMode && this.frameRate < 45) {
          this.degradePerformance()
        } else if (this.frameRate > 55 && this.capabilities.level !== 'high') {
          this.improvePerformance()
        }
      })
      
      this.frameCount = 0
      this.lastTime = currentTime
    }
  }

  degradePerformance() {
    if (this.config.maxProjects > 3) {
      this.config.maxProjects = Math.max(3, this.config.maxProjects - 1)
      this.config.particleCount = Math.max(100, this.config.particleCount * 0.8)
      this.config.updateInterval = Math.min(300, this.config.updateInterval * 1.2)
      console.log('🔽 Performance degraded:', this.config)
    }
  }

  improvePerformance() {
    const maxConfig = PERFORMANCE_CONFIGS[this.capabilities.level]
    if (this.config.maxProjects < maxConfig.maxProjects) {
      this.config.maxProjects = Math.min(maxConfig.maxProjects, this.config.maxProjects + 1)
      this.config.particleCount = Math.min(maxConfig.particleCount, this.config.particleCount * 1.1)
      this.config.updateInterval = Math.max(maxConfig.updateInterval, this.config.updateInterval * 0.9)
      console.log('🔼 Performance improved:', this.config)
    }
  }

  getConfig() {
    return { ...this.config }
  }

  getCurrentFPS() {
    return this.frameRate
  }
}

// Global performance manager instance
export const performanceManager = new PerformanceManager()

// Throttling utilities
export const createThrottledFunction = (func, delay) => {
  let timeoutId = null
  let lastExecTime = 0
  
  return (...args) => {
    const currentTime = Date.now()
    
    if (currentTime - lastExecTime > delay) {
      func.apply(this, args)
      lastExecTime = currentTime
    } else {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func.apply(this, args)
        lastExecTime = Date.now()
      }, delay - (currentTime - lastExecTime))
    }
  }
}

// RAF-based throttling
export const createRAFThrottledFunction = (func) => {
  let rafId = null
  let pending = false
  
  return (...args) => {
    if (!pending) {
      pending = true
      rafId = requestAnimationFrame(() => {
        func.apply(this, args)
        pending = false
      })
    }
  }
}

// Memory management utilities
export const cleanupThreeJSObjects = (object) => {
  if (object.geometry) {
    object.geometry.dispose()
  }
  
  if (object.material) {
    if (Array.isArray(object.material)) {
      object.material.forEach(material => {
        if (material.map) material.map.dispose()
        if (material.normalMap) material.normalMap.dispose()
        if (material.roughnessMap) material.roughnessMap.dispose()
        material.dispose()
      })
    } else {
      if (object.material.map) object.material.map.dispose()
      if (object.material.normalMap) object.material.normalMap.dispose()
      if (object.material.roughnessMap) object.material.roughnessMap.dispose()
      object.material.dispose()
    }
  }
  
  if (object.children) {
    object.children.forEach(child => cleanupThreeJSObjects(child))
  }
}