'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'

export function StarField3D({ speed = 1 }) {
  const groupRef = useRef()

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0005 * speed
      groupRef.current.rotation.x += 0.0002 * speed
    }
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[0, 0, 0]} intensity={1.5} color="#ffffff" />
      <pointLight position={[0, 0, 0]} intensity={0.4} color="#4a90e2" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />
    </group>
  )
}