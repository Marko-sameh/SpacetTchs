/**
 * Advanced memoization utilities for performance optimization
 */

// Deep memoization cache with WeakMap for garbage collection
const deepMemoCache = new WeakMap()

/**
 * Deep memoization function that handles complex objects and arrays
 * @param {Function} fn - Function to memoize
 * @param {Function} keyGenerator - Optional custom key generator
 * @returns {Function} Memoized function
 */
export function deepMemo(fn, keyGenerator) {
  const cache = new Map()
  
  return function(...args) {
    const key = keyGenerator ? keyGenerator(...args) : JSON.stringify(args)
    
    if (cache.has(key)) {
      return cache.get(key)
    }
    
    const result = fn.apply(this, args)
    cache.set(key, result)
    
    // Limit cache size to prevent memory leaks
    if (cache.size > 100) {
      const firstKey = cache.keys().next().value
      cache.delete(firstKey)
    }
    
    return result
  }
}

/**
 * Shallow comparison for React memo
 * @param {Object} prevProps 
 * @param {Object} nextProps 
 * @returns {boolean}
 */
export function shallowEqual(prevProps, nextProps) {
  const prevKeys = Object.keys(prevProps)
  const nextKeys = Object.keys(nextProps)
  
  if (prevKeys.length !== nextKeys.length) {
    return false
  }
  
  for (let key of prevKeys) {
    if (prevProps[key] !== nextProps[key]) {
      return false
    }
  }
  
  return true
}

/**
 * Throttled function executor
 * @param {Function} func - Function to throttle
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(func, delay) {
  let timeoutId = null
  let lastExecTime = 0
  
  return function(...args) {
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

/**
 * Debounced function executor
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, delay) {
  let timeoutId = null
  
  return function(...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(this, args), delay)
  }
}

/**
 * Frame-based throttling for animations
 * @param {Function} func - Function to throttle
 * @param {number} frameSkip - Number of frames to skip (1 = 30fps, 2 = 20fps, etc.)
 * @returns {Function} Frame-throttled function
 */
export function frameThrottle(func, frameSkip = 1) {
  let frameCount = 0
  
  return function(...args) {
    frameCount++
    if (frameCount % (frameSkip + 1) === 0) {
      func.apply(this, args)
      frameCount = 0
    }
  }
}