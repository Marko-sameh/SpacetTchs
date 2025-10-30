'use client'

import { useRef, useMemo, memo, Suspense, useState, useEffect, useCallback } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text, Stars, OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import { Button } from '@/components/ui/Button'
import Loading from '@/app/loading'
import Link from 'next/link'

// Constants for performance
const TILT_ANGLE = 0
const RING_ROTATION_SPEED = 0.00005
const PLANET_ROTATION_SPEED = 0.0008
const MOON_ROTATION_SPEED = 0.005

// Shared geometries and materials for performance
const sharedSphereGeometry = new THREE.SphereGeometry(2, 32, 32) // Reduced segments
const sharedMoonGeometry = new THREE.SphereGeometry(0.25, 16, 16) // Reduced segments


// 🌍 Main Planet (optimized)
const Jupiter = memo(() => {
  const ref = useRef()
  const [texture, setTexture] = useState(null)

  useEffect(() => {
    const loader = new THREE.TextureLoader()
    loader.load(
      '/images/jupitermap.jpg',
      (loadedTexture) => {
        loadedTexture.wrapS = loadedTexture.wrapT = THREE.RepeatWrapping
        loadedTexture.anisotropy = Math.min(16, loadedTexture.anisotropy) // Limit anisotropy
        loadedTexture.generateMipmaps = true
        setTexture(loadedTexture)
      },
      undefined,
      (error) => {
        console.warn('Jupiter texture failed to load, using fallback')
        setTexture(null)
      }
    )
  }, [])

  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      map: texture,
      color: texture ? '#ffffff' : '#ff6b35',
      roughness: 0.6,
      metalness: 0.2
    })
    mat.matrixAutoUpdate = false // Disable auto matrix updates for static properties
    return mat
  }, [texture])

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += PLANET_ROTATION_SPEED
      ref.current.updateMatrix() // Manual matrix update
    }
  })

  return (
    <mesh ref={ref} material={material} geometry={sharedSphereGeometry} />
  )
})

// 🌕 Optimized Moon component (with separated orbits)
const Moon = memo(({ distance = 3, speed = 0.3, label = '', size = 0.25, angleOffset = 0 }) => {
  const moonRef = useRef()
  const textRef = useRef()
  const [moonTexture, setMoonTexture] = useState(null)

  // 🌀 Load moon texture efficiently
  useEffect(() => {
    const loader = new THREE.TextureLoader()
    loader.load(
      '/images/moon.jpg',
      (loadedTexture) => {
        loadedTexture.wrapS = loadedTexture.wrapT = THREE.RepeatWrapping
        loadedTexture.anisotropy = Math.min(4, loadedTexture.anisotropy) // Reduced anisotropy
        loadedTexture.generateMipmaps = true
        setMoonTexture(loadedTexture)
      },
      undefined,
      (error) => {
        console.warn('⚠️ Moon texture failed to load, using fallback')
        setMoonTexture(null)
      }
    )
  }, [])

  // 🧱 Reuse material & geometry with performance optimizations
  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      map: moonTexture,
      color: moonTexture ? '#ffffff' : '#cccccc',
      roughness: 0.9,
      metalness: 0.1
    })
    mat.matrixAutoUpdate = false
    return mat
  }, [moonTexture])

  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(size, 16, 16) // Reduced segments
    geo.computeBoundingBox()
    geo.computeBoundingSphere()
    return geo
  }, [size])

  // 🎬 Animate orbit and rotation with performance optimizations
  useFrame(useCallback((state) => {
    const t = state.clock.elapsedTime * speed

    const x = Math.cos(t + angleOffset) * distance
    const y = Math.sin(t + angleOffset) * distance * Math.sin(TILT_ANGLE)
    const z = Math.sin(t + angleOffset) * distance * Math.cos(TILT_ANGLE)

    if (moonRef.current) {
      moonRef.current.position.set(x, y, z)
      moonRef.current.rotation.y += MOON_ROTATION_SPEED
      moonRef.current.updateMatrix()
    }

    if (textRef.current) {
      textRef.current.position.set(x, y + size * 1.6, z)
      textRef.current.quaternion.copy(state.camera.quaternion)
    }
  }, [distance, speed, angleOffset, size]))

  return (
    <>
      <mesh ref={moonRef} geometry={geometry} material={material} />
      <Text
        ref={textRef}
        fontSize={0.12}
        color="#ffffff"
        outlineWidth={0.002}
        outlineColor="#000000"
        anchorX="center"
        anchorY="middle"
        depthTest={false}
      >
        {label}
      </Text>
    </>
  )
})

// Memoized moon configurations - Optimized speeds
const MOON_CONFIGS = [
  { distance: 2.5, speed: 0.1, label: "Web", size: 0.1, angleOffset: 0 },
  { distance: 3, speed: 0.08, label: "Mobile", size: 0.3, angleOffset: Math.PI / 4 },
  { distance: 3.6, speed: 0.12, label: "AI", size: 0.2, angleOffset: Math.PI / 2 },
  { distance: 4.5, speed: 0.06, label: "Digital Marketing", size: 0.4, angleOffset: (3 * Math.PI) / 4 }
];


export default memo(function FloatingGeometry({ ctaText = '' }) {
  const { scene, gl } = useThree()

  // Performance optimizations
  useMemo(() => {
    scene.background = new THREE.Color('#000000')
    // Optimize renderer settings
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    gl.shadowMap.enabled = false // Disable shadows for better performance
  }, [scene, gl])

  const moons = useMemo(() =>
    MOON_CONFIGS.map((config, index) => (
      <Moon key={`moon-${index}`} {...config} />
    )), []
  )

  return (
    <group>
      {/* 🌟 Optimized Lighting - Reduced count and intensity */}
      <ambientLight intensity={0.001} />
      <directionalLight position={[5, 3, 5]} intensity={2} color="#ffffff" castShadow={false} />
      <pointLight position={[-8, -3, -6]} intensity={1} color="#4a90e2" castShadow={false} />
      <Stars radius={80} depth={60} count={3000} factor={3} fade /> {/* Reduced star count */}

      {/* 🪐 Tilted System */}
      <group rotation={[TILT_ANGLE, 0, 0]}>
        <Suspense fallback={<Loading />}>
          <Jupiter />
        </Suspense>
        <Suspense fallback={null}>
          {moons}
        </Suspense>
      </group>

      {ctaText && (
        <Html position={[0, -3, 0]} center transform occlude>
          <Link href="/projects" className="block pointer-events-auto">
            <button className="w-[6rem] sm:w-[10rem] px-2 sm:px-2 py-2 sm:py-2 text-sm text-white glass border-border hover:border-accent hover:bg-accent/5 transition-all">
              {ctaText}
            </button>
          </Link>
        </Html>
      )}

      {/* 🎮 Improved Camera controls */}
      <OrbitControls
        enableZoom={false}
        minDistance={3}
        maxDistance={15}
        autoRotate
        autoRotateSpeed={0.5}
        rotateSpeed={0.5}
        enableDamping
        dampingFactor={0.1}
        maxPolarAngle={Math.PI * 0.8}
        minPolarAngle={Math.PI * 0.2}
        enablePan={false}
      />
    </group>
  )
})