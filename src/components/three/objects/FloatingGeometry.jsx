'use client'

import { useRef, useMemo, memo, Suspense, useState, useEffect } from 'react'
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
        loadedTexture.anisotropy = 16
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
    return new THREE.MeshStandardMaterial({
      map: texture,
      color: texture ? '#ffffff' : '#ff6b35',
      roughness: 0.6,
      metalness: 0.2
    })
  }, [texture])

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += PLANET_ROTATION_SPEED
  })

  return (
    <mesh ref={ref} material={material}>
      <sphereGeometry args={[2, 64, 64]} />
    </mesh>
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
        loadedTexture.anisotropy = 8
        setMoonTexture(loadedTexture)
      },
      undefined,
      (error) => {
        console.warn('⚠️ Moon texture failed to load, using fallback')
        setMoonTexture(null)
      }
    )
  }, [])

  // 🧱 Reuse material & geometry
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: moonTexture,
      color: moonTexture ? '#ffffff' : '#cccccc',
      roughness: 0.9,
      metalness: 0.1
    })
  }, [moonTexture])

  const geometry = useMemo(() => new THREE.SphereGeometry(size, 32, 32), [size])

  // 🎬 Animate orbit and rotation
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed

    // كل قمر عنده زاوية بداية مختلفة (angleOffset)
    const x = Math.cos(t + angleOffset) * distance
    const y = Math.sin(t + angleOffset) * distance * Math.sin(TILT_ANGLE)
    const z = Math.sin(t + angleOffset) * distance * Math.cos(TILT_ANGLE)

    if (moonRef.current) {
      moonRef.current.position.set(x, y, z)
      moonRef.current.rotation.y += MOON_ROTATION_SPEED
    }

    if (textRef.current) {
      textRef.current.position.set(x, y + size * 1.6, z)
      textRef.current.quaternion.copy(state.camera.quaternion)
    }
  })

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

// Memoized moon configurations
const MOON_CONFIGS = [
  { distance: 2.5, speed: 0.2, label: "Web", size: 0.1, angleOffset: 0 },
  { distance: 3, speed: 0.1, label: "Mobile", size: 0.3, angleOffset: Math.PI / 4 },
  { distance: 3.6, speed: 0.2, label: "AI", size: 0.2, angleOffset: Math.PI / 2 },
  { distance: 4.5, speed: 0.1, label: "Digital Marketing", size: 0.4, angleOffset: (3 * Math.PI) / 4 }
];


export default memo(function FloatingGeometry({ ctaText = '' }) {
  const { scene } = useThree()

  useMemo(() => {
    scene.background = new THREE.Color('#000000')
  }, [scene])

  const moons = useMemo(() =>
    MOON_CONFIGS.map((config, index) => (
      <Moon key={`moon-${index}`} {...config} />
    )), []
  )

  return (
    <group>
      {/* 🌟 Optimized Lighting */}
      <ambientLight intensity={0.0015} />
      <directionalLight position={[5, 3, 5]} intensity={2.5} color="#ffffff" />
      <pointLight position={[-8, -3, -6]} intensity={1.2} color="#4a90e2" />
      <Stars radius={80} depth={60} count={6000} factor={3.5} fade />

      {/* 🪐 Tilted System */}
      <group rotation={[TILT_ANGLE, 0, 0]}>
        <Suspense fallback={<Loading />}>
          <Jupiter />
        </Suspense>
        {/* <PlanetRings /> */}
        <Suspense fallback={null}>
          {moons}
        </Suspense>
      </group>

      {ctaText && (
        <Html position={[0, -3, 0]} center transform occlude>
          <Link href="/projects" className="block pointer-events-auto">
            <button className="w-[6rem] sm:w-[10rem] px-2 sm:px-2 py-2 sm:py-2 text-sm  text-white glass border-border hover:border-accent hover:bg-accent/5 transition-all ">
              {ctaText}
            </button>
          </Link>
        </Html>
      )}

      {/* 🎮 Camera controls */}
      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.05}
        rotateSpeed={0.3}
        dampingFactor={0.05}
      />
    </group>

  )
})