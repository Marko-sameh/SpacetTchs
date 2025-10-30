'use client'

import { Canvas } from '@react-three/fiber'
import { memo, useMemo } from 'react'

/**
 * Optimized Canvas wrapper with performance-focused settings
 */
const OptimizedCanvas = memo(function OptimizedCanvas({ 
  children, 
  isMobile = false, 
  performanceLevel = 'high',
  ...props 
}) {
  const canvasConfig = useMemo(() => ({
    gl: {
      antialias: false,
      alpha: true,
      powerPreference: isMobile ? 'low-power' : 'high-performance',
      stencil: false,
      depth: true
    },
    dpr: Math.min(isMobile ? 1 : 1.5, window?.devicePixelRatio || 1),
    performance: { min: 0.3 },
    ...props
  }), [isMobile, props])

  return (
    <Canvas {...canvasConfig}>
      {children}
    </Canvas>
  )
})

export default OptimizedCanvas