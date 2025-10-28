'use client'

import { useRef, useMemo, memo, Suspense, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text, Stars, OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import { Button } from '../ui/Button'
import Loading from '@/app/loading'

// Constants for performance
const TILT_ANGLE = THREE.MathUtils.degToRad(30.7)
const RING_ROTATION_SPEED = 0.00005
const PLANET_ROTATION_SPEED = 0.0008
const MOON_ROTATION_SPEED = 0.005

// Memoized ring configuration for performance
const RING_CONFIG = [
  { start: 0.25, end: 0.35, alpha: 0.9, color: '#d4b06a' },
  { start: 0.35, end: 0.45, alpha: 0.4, color: '#a68b6b' },
  { start: 0.45, end: 0.65, alpha: 0.85, color: '#c7a15a' },
  { start: 0.65, end: 0.75, alpha: 0.2, color: '#8c7358' },
  { start: 0.75, end: 1, alpha: 0.6, color: '#bca06d' }
];

// // 🪐 Planet Rings (optimized)
// const PlanetRings = memo(() => {
//   const ringsRef = useRef()

//   const ringTexture = useMemo(() => {
//     const canvas = document.createElement('canvas')
//     canvas.width = 2048
//     canvas.height = 256
//     const ctx = canvas.getContext('2d')

//     RING_CONFIG.forEach(ring => {
//       const gradient = ctx.createLinearGradient(ring.start * 2048, 0, ring.end * 2048, 0)
//       const alphaHex = Math.floor(ring.alpha * 255).toString(16).padStart(2, '0')
//       gradient.addColorStop(0, `${ring.color}00`)
//       gradient.addColorStop(0.1, `${ring.color}${alphaHex}`)
//       gradient.addColorStop(0.9, `${ring.color}${alphaHex}`)
//       gradient.addColorStop(1, `${ring.color}00`)
//       ctx.fillStyle = gradient
//       ctx.fillRect(ring.start * 2048, 0, (ring.end - ring.start) * 2048, 256)
//     })

//     const texture = new THREE.CanvasTexture(canvas)
//     texture.wrapS = THREE.ClampToEdgeWrapping
//     texture.wrapT = THREE.ClampToEdgeWrapping
//     texture.anisotropy = 16
//     return texture
//   }, [])

//   useFrame(() => {
//     if (ringsRef.current) {
//       ringsRef.current.rotation.z += RING_ROTATION_SPEED
//     }
//   })

//   return (
//     <mesh ref={ringsRef} rotation={[Math.PI / 2, 0, 0]}>
//       <ringGeometry args={[2.6, 4.3, 256]} />
//       <meshStandardMaterial
//         map={ringTexture}
//         transparent
//         side={THREE.DoubleSide}
//         opacity={0.9}
//         roughness={0.8}
//         metalness={0.3}
//       />
//     </mesh>
//   )
// })

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

// 🌕 Optimized Moon component
const Moon = memo(({ distance = 3, speed = 0.3, label = '', size = 0.25 }) => {
  const moonRef = useRef()
  const textRef = useRef()
  const [moonTexture, setMoonTexture] = useState(null)
  
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
        console.warn('Moon texture failed to load, using fallback')
        setMoonTexture(null)
      }
    )
  }, [])

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: moonTexture,
      color: moonTexture ? '#ffffff' : '#cccccc',
      roughness: 0.9,
      metalness: 0.1
    })
  }, [moonTexture])

  const geometry = useMemo(() => new THREE.SphereGeometry(size, 32, 32), [size])

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed
    const x = Math.cos(t) * distance
    const y = Math.sin(t) * distance * Math.sin(TILT_ANGLE)
    const z = Math.sin(t) * distance * Math.cos(TILT_ANGLE)

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
  );
})

// Memoized moon configurations
const MOON_CONFIGS = [
  { distance: 2.5, speed: 0.15, label: "Web", size: 0.15 },
  { distance: 3.3, speed: 0.1, label: "Mobile", size: 0.18 },
  { distance: 4.0, speed: 0.09, label: "AI", size: 0.22 },
  { distance: 4.3, speed: 0.05, label: "Digital Marketing", size: 0.24 }
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
        <Html position={[0, -3.5, 0]} center>
          <div className="pointer-events-auto">
            <a href="/projects" className="block w-full">
              <button className="w-[12rem] sm:w-[16rem] px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:from-cyan-400 hover:to-purple-500 transition-all font-medium">
                {ctaText}
              </button>
            </a>
          </div>
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