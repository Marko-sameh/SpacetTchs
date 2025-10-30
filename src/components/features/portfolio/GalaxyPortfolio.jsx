'use client'

import OptimizedCanvas from '../../three/core/OptimizedCanvas'
import { OrbitControls, Stars, Float, Text, Sphere, useProgress, Html } from '@react-three/drei'
import { motion } from 'framer-motion'
import React, { useRef, useState, useEffect, useMemo, Suspense, memo, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Button } from '../../ui/common/Button'
import { useProjects } from '@/hooks/api/useProjects'
import { useThrottledScroll } from '@/hooks/ui/useThrottledScroll'

// Performance constants
const ANIMATION_SPEEDS = {
  planetRotationY: 0.01,
  planetRotationX: 0.005,
  orbitSpeed: 0.5,
  cameraOrbit: 0.15,
  hoverScale: 1.3,
  orbitRadius: 0.3
}

const PERFORMANCE_CONFIG = {
  maxProjects: 12,
  baseRadius: 5,
  throttleInterval: 0.1,
  scrollThreshold: 10
}

// Memoized color palette
const COLOR_PALETTE = Object.freeze([
  Object.freeze({ base: '#3B4A8C', light: '#5063A6', dark: '#2C3875' }),
  Object.freeze({ base: '#3A4EA0', light: '#5568B8', dark: '#2E3D85' }),
  Object.freeze({ base: '#EDE4FF', light: '#F8F3FF', dark: '#E0D2FF' }),
  Object.freeze({ base: '#FFFFFF', light: '#FFFFFF', dark: '#F5F7FF' }),
  Object.freeze({ base: '#4A4E5F', light: '#606476', dark: '#383B49' })
])

// Fallback projects for offline/error states
const FALLBACK_PROJECTS = Object.freeze([
  {
    id: '1',
    name: 'AI Dashboard',
    position: [3, 1, -1],
    color: '#00ffff',
    description: 'Machine Learning Analytics Platform',
    image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=512&h=512&fit=crop&q=80&fm=webp',
    slug: 'ai-dashboard'
  },
  {
    id: '2',
    name: 'E-Commerce Platform',
    position: [-1, -0.5, -1],
    color: '#ff00ff',
    description: 'Full-stack e-commerce solution',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=512&h=512&fit=crop&q=80&fm=webp',
    slug: 'ecommerce-platform'
  },
  {
    id: '3',
    name: 'Mobile Banking App',
    position: [1, -1.5, -0.5],
    color: '#ffff00',
    description: 'Secure mobile banking application',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=512&h=512&fit=crop&q=80&fm=webp',
    slug: 'mobile-banking-app'
  }
])

// Optimized position generation with memoization
const generateDynamicPositions = (() => {
  const cache = new Map()

  return (count) => {
    if (cache.has(count)) return cache.get(count)

    const positions = []
    const { baseRadius } = PERFORMANCE_CONFIG

    for (let i = 0; i < count; i++) {
      const angleStep = (Math.PI * 2) / count
      const angle = i * angleStep
      const layerRadius = baseRadius + (i % 2) * 2

      const x = Math.cos(angle) * layerRadius + (i % 2 === 0 ? -8.5 : 6.5)
      const z = Math.sin(angle) * layerRadius
      const y = (i % 3 - 1) * 1.5

      positions.push([x, y, z - 2])
    }

    cache.set(count, positions)
    return positions
  }
})()

// Optimized project transformation with deep memoization
const transformProjectsForGalaxy = (() => {
  const cache = new WeakMap()

  return (projects) => {
    if (cache.has(projects)) return cache.get(projects)

    const { maxProjects } = PERFORMANCE_CONFIG
    const limitedProjects = projects.slice(0, maxProjects)
    const dynamicPositions = generateDynamicPositions(limitedProjects.length)

    const result = limitedProjects.map((project, index) => {
      const colorSet = COLOR_PALETTE[index % COLOR_PALETTE.length]
      return Object.freeze({
        id: project._id || project.id,
        name: project.title || project.name,
        position: dynamicPositions[index],
        color: colorSet.base,
        colorVariants: colorSet,
        description: project.description,
        image: project.images?.[0] || 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=512&h=512&fit=crop&q=80&fm=webp',
        slug: project.slug
      })
    })

    const frozenResult = Object.freeze(result)
    cache.set(projects, frozenResult)
    return frozenResult
  }
})()

const Planet = memo(function Planet({ project, onHover, onSelect, isHovered, isSelected, prefersReducedMotion }) {
  const meshRef = useRef()
  const textRef = useRef()
  const lastUpdate = useRef(0)

  // Create procedural textures for realistic planet surface
  const { colorTexture, normalTexture, displacementTexture } = useMemo(() => {
    const size = 512

    // Color texture with horizontal bands
    const colorCanvas = document.createElement('canvas')
    colorCanvas.width = colorCanvas.height = size
    const colorCtx = colorCanvas.getContext('2d')

    const baseColor = new THREE.Color(project.color)
    const lightColor = new THREE.Color(project.colorVariants?.light || project.color).multiplyScalar(1.2)
    const darkColor = new THREE.Color(project.colorVariants?.dark || project.color).multiplyScalar(0.7)

    // Create horizontal bands
    for (let y = 0; y < size; y++) {
      const bandIndex = Math.floor((y / size) * 8) // 8 bands
      const noise = (Math.sin(y * 0.1) + Math.sin(y * 0.03)) * 0.1
      const bandColor = bandIndex % 2 === 0 ?
        baseColor.clone().lerp(lightColor, 0.3 + noise) :
        baseColor.clone().lerp(darkColor, 0.2 + noise)

      colorCtx.fillStyle = `rgb(${Math.floor(bandColor.r * 255)}, ${Math.floor(bandColor.g * 255)}, ${Math.floor(bandColor.b * 255)})`
      colorCtx.fillRect(0, y, size, 1)
    }

    // Add surface details (craters/spots)
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * size
      const y = Math.random() * size
      const radius = 5 + Math.random() * 15

      const gradient = colorCtx.createRadialGradient(x, y, 0, x, y, radius)
      gradient.addColorStop(0, `rgba(${Math.floor(darkColor.r * 255)}, ${Math.floor(darkColor.g * 255)}, ${Math.floor(darkColor.b * 255)}, 0.8)`)
      gradient.addColorStop(1, 'rgba(0,0,0,0)')

      colorCtx.fillStyle = gradient
      colorCtx.beginPath()
      colorCtx.arc(x, y, radius, 0, Math.PI * 2)
      colorCtx.fill()
    }

    // Normal map for surface bumps
    const normalCanvas = document.createElement('canvas')
    normalCanvas.width = normalCanvas.height = size
    const normalCtx = normalCanvas.getContext('2d')

    const imageData = normalCtx.createImageData(size, size)
    for (let i = 0; i < imageData.data.length; i += 4) {
      const x = (i / 4) % size
      const y = Math.floor((i / 4) / size)

      // Create surface normal variations
      const noise = Math.sin(x * 0.1) * Math.cos(y * 0.1) * 0.5 + 0.5
      imageData.data[i] = 128 + noise * 50     // R (X normal)
      imageData.data[i + 1] = 128 + noise * 50 // G (Y normal)
      imageData.data[i + 2] = 255              // B (Z normal)
      imageData.data[i + 3] = 255              // A
    }
    normalCtx.putImageData(imageData, 0, 0)

    // Displacement map for surface height
    const dispCanvas = document.createElement('canvas')
    dispCanvas.width = dispCanvas.height = size
    const dispCtx = dispCanvas.getContext('2d')

    const dispImageData = dispCtx.createImageData(size, size)
    for (let i = 0; i < dispImageData.data.length; i += 4) {
      const x = (i / 4) % size
      const y = Math.floor((i / 4) / size)

      // Create height variations for craters and bands
      const bandHeight = Math.sin((y / size) * Math.PI * 8) * 0.3 + 0.5
      const craterNoise = Math.random() * 0.2
      const height = Math.floor((bandHeight + craterNoise) * 255)

      dispImageData.data[i] = height     // R
      dispImageData.data[i + 1] = height // G
      dispImageData.data[i + 2] = height // B
      dispImageData.data[i + 3] = 255    // A
    }
    dispCtx.putImageData(dispImageData, 0, 0)

    return {
      colorTexture: new THREE.CanvasTexture(colorCanvas),
      normalTexture: new THREE.CanvasTexture(normalCanvas),
      displacementTexture: new THREE.CanvasTexture(dispCanvas)
    }
  }, [project.color, project.colorVariants])

  useEffect(() => {
    return () => {
      if (meshRef.current) {
        meshRef.current.geometry?.dispose()
        meshRef.current.material?.dispose()
        colorTexture?.dispose()
        normalTexture?.dispose()
        displacementTexture?.dispose()
      }
    }
  }, [colorTexture, normalTexture, displacementTexture])

  useFrame((state, delta) => {
    if (!meshRef.current || prefersReducedMotion) return

    if (state.clock.elapsedTime - lastUpdate.current < 0.05) return

    meshRef.current.rotation.y += ANIMATION_SPEEDS.planetRotationY
    meshRef.current.rotation.x += ANIMATION_SPEEDS.planetRotationX

    if (textRef.current && isHovered) {
      textRef.current.lookAt(state.camera.position)
    }

    lastUpdate.current = state.clock.elapsedTime
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group
        position={project.position}
        scale={isHovered || isSelected ? ANIMATION_SPEEDS.hoverScale : 1}
        onPointerEnter={() => onHover(project.id)}
        onPointerLeave={() => onHover(null)}
        onClick={(e) => {
          e.stopPropagation()
          onSelect(project.id)
        }}
      >
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.8, 64, 64]} />
          <meshStandardMaterial
            map={colorTexture}
            normalMap={normalTexture}
            displacementMap={displacementTexture}
            displacementScale={0.01}
            roughness={0.9}
            metalness={0.1}
            normalScale={[1, 1]}
          />
        </mesh>

        <Text
          position={[0, 1.2, 0]}
          fontSize={0.15}
          color={project.colorVariants?.light || "#ffffff"}
          anchorX="center"
          anchorY="middle"
          maxWidth={2}
        >
          {project.name}
        </Text>

        {isHovered && (
          <>
            <mesh>
              <sphereGeometry args={[1.1, 16, 16]} />
              <meshBasicMaterial
                color={project.color}
                transparent
                opacity={0.2}
                side={THREE.BackSide}
              />
            </mesh>
            <Text
              ref={textRef}
              position={[0, 1.2, 0]}
              fontSize={0.2}
              color={project.color}
              anchorX="center"
              anchorY="middle"
            >
              {project.name}
            </Text>
          </>
        )}
      </group>
    </Float>
  )
})



const ScrollStars = memo(function ScrollStars({ scrollY, prefersReducedMotion }) {
  const starsRef = useRef()
  const lastScrollY = useRef(scrollY)
  const lastUpdate = useRef(0)

  useFrame((state) => {
    if (!starsRef.current || prefersReducedMotion) return

    // Ultra-throttled updates to 5fps and larger scroll threshold
    if (state.clock.elapsedTime - lastUpdate.current < 0.2 || Math.abs(scrollY - lastScrollY.current) < 50) return

    lastUpdate.current = state.clock.elapsedTime
    starsRef.current.rotation.y = scrollY * 0.00008
    starsRef.current.rotation.x = scrollY * 0.00004
    lastScrollY.current = scrollY
  })

  return (
    <Stars
      ref={starsRef}
      radius={100}
      depth={50}
      count={isMobile ? 800 : 1500}
      factor={3}
      saturation={0}
      fade
      speed={0.5}
    />
  )
})

const LoadingFallback = memo(function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 8, 8]} />
      <meshBasicMaterial color="#00ffff" wireframe opacity={0.5} transparent />
    </mesh>
  )
})


// Enhanced Global loading screen
const GlobalLoader = memo(function GlobalLoader() {
  const { progress } = useProgress()

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-2">
            SpaceTech
          </h1>
          <p className="text-gray-400 text-lg">Initializing Galaxy...</p>
        </motion.div>

        {/* Progress Ring */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
            />
            <motion.circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={314}
              initial={{ strokeDashoffset: 314 }}
              animate={{ strokeDashoffset: 314 - (314 * progress) / 100 }}
              transition={{ duration: 0.5 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00ffff" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-cyan-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
})

const GalaxyPortfolio = memo(function GalaxyPortfolio() {
  const [hoveredPlanet, setHoveredPlanet] = useState(null)
  const [selectedPlanet, setSelectedPlanet] = useState(null)
  const scrollY = useThrottledScroll(32) // 30fps for smooth UX

  const { data: projectsData, isLoading, error } = useProjects()
  const projects = useMemo(() => {
    const rawProjects = projectsData?.data?.projects || []
    if (rawProjects.length === 0) {
      return transformProjectsForGalaxy(FALLBACK_PROJECTS)
    }
    return transformProjectsForGalaxy(rawProjects)
  }, [projectsData])

  const projectsMap = useMemo(() => new Map(projects.map(p => [p.id, p])), [projects])

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      setIsMobile(window.matchMedia('(max-width: 768px)').matches)
    }
  }, [])

  const selectedProject = useMemo(
    () => (selectedPlanet ? projectsMap.get(selectedPlanet) : null),
    [selectedPlanet, projectsMap]
  )

  // Scroll handling moved to useThrottledScroll hook

  const handleSelect = useCallback((id) => {
    setSelectedPlanet((prev) => (prev === id ? null : id))
  }, [])

  const handleKeyDown = useCallback(
    (e, projectId) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleSelect(projectId)
      }
    },
    [handleSelect]
  )

  const handleClose = useCallback(() => {
    setSelectedPlanet(null)
  }, [])

  // Development logging
  if (process.env.NODE_ENV === 'development' && error) {
    console.warn('Projects loading error:', error)
  }

  if (isLoading && projects.length === 0) {
    return <GlobalLoader />
  }

  return (
    <Suspense fallback={<GlobalLoader />}>
      <section className="relative w-full h-[70vh] bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
        {/* SEO Content */}
        <div className="sr-only">
          <h1>SpaceTechs - Project Showcase</h1>
          <nav aria-label="Projects">
            <ul>
              {projects.map((p) => (
                <li key={p.id}>
                  <h2>{p.name}</h2>
                  <p>{p.description}</p>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Keyboard Navigation */}
        <nav className="sr-only">
          <a href="#content" className="skip-link">
            Skip to content
          </a>
        </nav>

        {/* 🪐 Optimized 3D Canvas */}
        <OptimizedCanvas
          camera={{
            position: isMobile ? [0, 0, 15] : [0, 0, 12],
            fov: 75,
          }}
          isMobile={isMobile}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} color="#ffffff" intensity={2.0} castShadow />
          <pointLight position={[-5, 5, 5]} color="#4a90e2" intensity={1.2} />
          <pointLight position={[5, -5, -5]} color="#ff6b35" intensity={0.8} />
          <spotLight position={[0, 10, 0]} color="#ffffff" intensity={1.5} angle={0.3} />

          <Suspense fallback={null}>
            <Stars radius={100} depth={50} count={isMobile ? 800 : 1500} factor={4} saturation={0} fade speed={1} />
          </Suspense>

          {projects.map((project) => (
            <Suspense key={project.id} fallback={<LoadingFallback />}>
              <Planet
                project={project}
                onHover={setHoveredPlanet}
                onSelect={handleSelect}
                isHovered={hoveredPlanet === project.id}
                isSelected={selectedPlanet === project.id}
                prefersReducedMotion={prefersReducedMotion}
              />
            </Suspense>
          ))}



          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            autoRotate={!prefersReducedMotion}
            autoRotateSpeed={prefersReducedMotion ? 0 : 0.5}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
            minDistance={8}
            maxDistance={20}
            enableDamping={true}
            dampingFactor={0.08}
          />
        </OptimizedCanvas>

        {/* Keyboard Accessible Hitboxes */}
        {projects.map((project) => (
          <div
            key={`hitbox-${project.id}`}
            role="button"
            tabIndex={0}
            aria-label={`${project.name}: ${project.description}`}
            onKeyDown={(e) => handleKeyDown(e, project.id)}
            onClick={() => handleSelect(project.id)}
            className="pointer-events-auto absolute w-8 h-8 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded"
            style={{
              left: `${50 + project.position[0] * 8}%`,
              top: `${50 - project.position[1] * 8}%`,
            }}
          />
        ))}

        {/* Enhanced Overlay UI */}
        <div className="absolute inset-0 pointer-events-none" id="content">
          {/* Hero Section */}
          <div className="absolute top-8 left-8 z-10 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                SpaceTech
                <br />
                <span className="text-3xl md:text-4xl text-gray-300 font-light">
                  Project Galaxy
                </span>
              </h1>
              <p className="text-xl text-gray-200 max-w-lg leading-relaxed mb-8">
                Each planet represents <br /> a unique project in our digital universe.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
                  <span>Click to explore</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <span>Drag to orbit</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Project Counter */}
          <div className="absolute top-8 right-8 z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="bg-black/40 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-4 text-center"
            >
              <div className="text-3xl font-bold text-cyan-400">{projects.length}</div>
              <div className="text-sm text-gray-300">Projects</div>
            </motion.div>
          </div>

          {/* Enhanced Project Details Panel */}
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="absolute bottom-8 right-8 bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-xl border border-cyan-500/50 rounded-2xl p-8 max-w-md shadow-2xl"
              role="dialog"
              aria-labelledby="project-title"
            >
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full animate-ping"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full"></div>

              <h2 id="project-title" className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-3">
                {selectedProject.name}
              </h2>

              <p className="text-gray-200 mb-6 leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="flex items-center justify-between">
                <Button
                  onClick={() => window.location.href = `/projects/${selectedProject.id}`}
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 pointer-events-auto"
                >
                  Explore Project →
                </Button>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-white transition-colors pointer-events-auto p-2"
                  aria-label="Close project details"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          )}

        </div>
      </section>
    </Suspense>
  )
})

export default GalaxyPortfolio