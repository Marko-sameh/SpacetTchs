'use client'

import { useRef, useMemo, memo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Performance constants
const ROTATION_SPEEDS = {
  x: 0.1,
  y: 0.15
}

const PARTICLE_CONFIG = {
  spread: 20,
  size: 0.02
}

export const ParticleField = memo(({ count = 5000 }) => {
  const ref = useRef()
  const lastUpdate = useRef(0)
  
  // Use static count to avoid hydration mismatch
  const optimizedCount = useMemo(() => Math.min(count, 3000), [count])
  
  const [positions, colors, geometry] = useMemo(() => {
    const positions = new Float32Array(optimizedCount * 3)
    const colors = new Float32Array(optimizedCount * 3)
    
    // Use more efficient random generation
    const { spread } = PARTICLE_CONFIG
    
    for (let i = 0; i < optimizedCount; i++) {
      const i3 = i * 3
      
      // Position
      positions[i3] = (Math.random() - 0.5) * spread
      positions[i3 + 1] = (Math.random() - 0.5) * spread
      positions[i3 + 2] = (Math.random() - 0.5) * spread
      
      // Colors with better distribution
      const hue = Math.random()
      colors[i3] = hue
      colors[i3 + 1] = Math.random() * 0.5 + 0.5
      colors[i3 + 2] = Math.random() * 0.3 + 0.7
    }
    
    // Create geometry once
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    
    return [positions, colors, geometry]
  }, [optimizedCount])
  
  // Throttled animation for better performance
  useFrame((state) => {
    if (!ref.current) return
    
    const now = state.clock.elapsedTime
    if (now - lastUpdate.current < 0.016) return // ~60fps throttle
    
    ref.current.rotation.x = Math.sin(now * ROTATION_SPEEDS.x)
    ref.current.rotation.y = Math.sin(now * ROTATION_SPEEDS.y)
    
    lastUpdate.current = now
  })
  
  // Cleanup geometry on unmount
  useMemo(() => {
    return () => {
      geometry?.dispose()
    }
  }, [geometry])
  
  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        transparent
        vertexColors
        size={PARTICLE_CONFIG.size}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
})

ParticleField.displayName = 'ParticleField'