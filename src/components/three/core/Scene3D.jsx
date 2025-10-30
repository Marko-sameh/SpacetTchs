'use client'

import { Suspense, useEffect, useState, memo, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'

const Loader = memo(() => (
  <div className="flex items-center justify-center w-full h-full">
    <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
  </div>
))

Loader.displayName = 'Loader'

export const Scene3D = memo(({ children, className = "w-full h-full" }) => {
  const [mounted, setMounted] = useState(false)
  
  // Enhanced device capabilities detection
  const deviceCapabilities = useMemo(() => {
    if (typeof window === 'undefined') return { isMobile: false, isLowEnd: false, hasWebGL2: false }
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const isLowEnd = navigator.hardwareConcurrency <= 4 || navigator.deviceMemory <= 4
    const hasWebGL2 = !!window.WebGL2RenderingContext
    
    return { isMobile, isLowEnd, hasWebGL2 }
  }, [])

  const canvasConfig = useMemo(() => ({
    camera: { 
      position: [0, 0, 8], 
      fov: 60,
      near: 0.1,
      far: 1000
    },
    gl: { 
      antialias: !deviceCapabilities.isMobile && !deviceCapabilities.isLowEnd,
      alpha: true,
      powerPreference: deviceCapabilities.isLowEnd ? 'default' : 'high-performance',
      stencil: false,
      depth: true,
      logarithmicDepthBuffer: false,
      precision: deviceCapabilities.isLowEnd ? 'mediump' : 'highp'
    },
    dpr: deviceCapabilities.isMobile ? [1, 1.5] : deviceCapabilities.isLowEnd ? [1, 1.5] : [1, 2],
    style: { background: 'transparent' },
    performance: {
      min: deviceCapabilities.isLowEnd ? 0.3 : 0.5,
      max: deviceCapabilities.isLowEnd ? 0.8 : 1,
      debounce: deviceCapabilities.isLowEnd ? 300 : 200
    },
    frameloop: 'always' // Continuous rendering for better UX
  }), [deviceCapabilities])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={className}>
        <div className="w-full h-full bg-gradient-to-br from-purple-900/10 to-cyan-900/10" />
      </div>
    )
  }

  return (
    <div className={className}>
      <Canvas {...canvasConfig}>
        <Suspense fallback={null}>
          {/* Conditionally load Environment based on device capabilities */}
          {!deviceCapabilities.isLowEnd && !deviceCapabilities.isMobile && (
            <Environment preset="city" background={false} />
          )}
          {/* Reduced lighting for performance */}
          <ambientLight intensity={deviceCapabilities.isLowEnd ? 0.3 : 0.4} />
          <pointLight 
            position={[10, 10, 10]} 
            intensity={deviceCapabilities.isLowEnd ? 0.6 : 0.8}
            castShadow={false}
          />
          {children}
        </Suspense>
      </Canvas>
    </div>
  )
})

Scene3D.displayName = 'Scene3D'

export default Scene3D