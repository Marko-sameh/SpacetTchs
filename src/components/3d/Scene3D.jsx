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
  
  // Detect device capabilities for performance optimization
  const deviceCapabilities = useMemo(() => {
    if (typeof window === 'undefined') return { isMobile: false, isLowEnd: false }
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const isLowEnd = navigator.hardwareConcurrency <= 4 || navigator.deviceMemory <= 4
    
    return { isMobile, isLowEnd }
  }, [])

  const canvasConfig = useMemo(() => ({
    camera: { position: [0, 0, 5], fov: 75 },
    gl: { 
      antialias: !deviceCapabilities.isMobile,
      alpha: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true
    },
    dpr: deviceCapabilities.isMobile ? [1, 1.5] : [1, 2],
    style: { background: 'transparent' },
    performance: {
      min: 0.5,
      max: 1,
      debounce: 200
    }
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
          {!deviceCapabilities.isLowEnd && <Environment preset="city" />}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={deviceCapabilities.isLowEnd ? 0.8 : 1} />
          {children}
        </Suspense>
      </Canvas>
    </div>
  )
})

Scene3D.displayName = 'Scene3D'

export default Scene3D