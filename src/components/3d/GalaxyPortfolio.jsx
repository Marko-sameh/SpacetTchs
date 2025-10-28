'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Float, Text, Sphere, useProgress, Html } from '@react-three/drei'
import { motion } from 'framer-motion'
import React, { useRef, useState, useEffect, useMemo, Suspense, memo, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Button } from '../ui/Button'
import { useProjects } from '@/hooks/useProjects'

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

// Optimized project transformation with memoization
const transformProjectsForGalaxy = (() => {
  let lastProjects = null
  let lastResult = null

  return (projects) => {
    if (projects === lastProjects) return lastResult

    const { maxProjects } = PERFORMANCE_CONFIG
    const limitedProjects = projects.slice(0, maxProjects)
    const dynamicPositions = generateDynamicPositions(limitedProjects.length)

    const result = limitedProjects.map((project, index) => {
      const colorSet = COLOR_PALETTE[index % COLOR_PALETTE.length]
      return {
        id: project._id || project.id,
        name: project.title || project.name,
        position: dynamicPositions[index],
        color: colorSet.base,
        colorVariants: colorSet,
        description: project.description,
        image: project.images?.[0] || 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=512&h=512&fit=crop&q=80&fm=webp',
        slug: project.slug
      }
    })

    lastProjects = projects
    lastResult = result
    return result
  }
})()

const Planet = memo(function Planet({ project, onHover, onSelect, isHovered, isSelected, prefersReducedMotion }) {
  const meshRef = useRef()
  const textRef = useRef()

  const timeOffset = useMemo(() => typeof project.id === 'string' ? project.id.length : project.id, [project.id])

  useEffect(() => {
    return () => {
      if (meshRef.current) {
        meshRef.current.geometry?.dispose()
        meshRef.current.material?.dispose()
        meshRef.current.material?.map?.dispose()
      }
    }
  }, [])

  useFrame((state, delta) => {
    if (!meshRef.current || prefersReducedMotion) return

    // Frame-rate independent animation
    meshRef.current.rotation.y += ANIMATION_SPEEDS.planetRotationY * delta * 60
    meshRef.current.rotation.x += ANIMATION_SPEEDS.planetRotationX * delta * 60

    // Throttled text rotation for performance
    if (textRef.current && isHovered && state.clock.elapsedTime % PERFORMANCE_CONFIG.throttleInterval < delta) {
      textRef.current.lookAt(state.camera.position)
    }
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
        <Sphere ref={meshRef} args={[0.8, 32, 32]}>
          <meshStandardMaterial
            color={project.color}
            roughness={0.7}
            metalness={0.1}
          />
        </Sphere>

        {/* Latitude lines */}
        {[0.2, 0.4, -0.2, -0.4].map((y, i) => (
          <mesh key={`lat-${i}`} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[Math.sqrt(0.64 - y * y) - 0.01, Math.sqrt(0.64 - y * y), 64]} />
            <meshBasicMaterial color={project.colorVariants?.light || "#ffffff"} transparent opacity={0.6} />
          </mesh>
        ))}

        {/* Longitude lines */}
        {[0, Math.PI / 3, (2 * Math.PI) / 3, Math.PI, (4 * Math.PI) / 3, (5 * Math.PI) / 3].map((angle, i) => (
          <mesh key={`lon-${i}`} rotation={[0, angle, 0]}>
            <ringGeometry args={[0.79, 0.81, 32, 1, 0, Math.PI]} />
            <meshBasicMaterial color={project.colorVariants?.light || "#ffffff"} transparent opacity={0.4} side={THREE.DoubleSide} />
          </mesh>
        ))}

        {/* Engraved text effect */}
        <group>
          {/* Shadow layer (deepest) */}
          <Text
            position={[0.01, -0.01, 0.795]}
            fontSize={0.12}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            maxWidth={1.4}
            letterSpacing={0.02}
            fillOpacity={0.6}
          >
            {project.name}
          </Text>

          {/* Main carved text */}
          <Text
            position={[0, 0, 0.798]}
            fontSize={0.12}
            color={project.colorVariants?.light || "#ffffff"}
            anchorX="center"
            anchorY="middle"
            maxWidth={1.4}
            letterSpacing={0.02}
            fillOpacity={0}
            strokeWidth={0.005}
            strokeColor={project.colorVariants?.light || "#ffffff"}
            material-transparent={true}
            material-depthTest={false}
          >
            {project.name}
          </Text>

          {/* Highlight layer (top edge) */}
          <Text
            position={[-0.005, 0.005, 0.801]}
            fontSize={0.12}
            color={project.colorVariants?.light || "#ffffff"}
            anchorX="center"
            anchorY="middle"
            maxWidth={1.4}
            letterSpacing={0.02}
            fillOpacity={0.3}
          >
            {project.name}
          </Text>
        </group>

        {(isHovered || isSelected) && (
          <Sphere args={[1.2, 16, 16]}>
            <meshBasicMaterial
              color={project.color}
              transparent
              opacity={0.15}
              side={THREE.BackSide}
            />
          </Sphere>
        )}

        {isHovered && (
          <>
            <Text
              ref={textRef}
              position={[0, 1.5, 0]}
              fontSize={0.3}
              color={project.color}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.03}
              outlineColor="#000000"
            >
              {project.name}
            </Text>
            {/* Hover Ring Effect */}
            <mesh position={[0, 0, 0]}>
              <ringGeometry args={[1.1, 1.3, 32]} />
              <meshBasicMaterial
                color={project.color}
                transparent
                opacity={0.6}
                side={THREE.DoubleSide}
              />
            </mesh>
            {/* Particle Ring */}
            <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[1.4, 1.5, 64]} />
              <meshBasicMaterial
                color={project.color}
                transparent
                opacity={0.3}
                side={THREE.DoubleSide}
              />
            </mesh>
          </>
        )}
      </group>
    </Float>
  )
})

const CameraController = memo(function CameraController({ disabled }) {
  useFrame((state, delta) => {
    if (disabled) return
    const time = state.clock.elapsedTime * ANIMATION_SPEEDS.cameraOrbit
    state.camera.position.x = Math.sin(time) * 1.5
    state.camera.position.y = Math.cos(time * 0.5) * 0.8
    state.camera.lookAt(0, 0, 0)
  })

  return null
})

const Nebula = memo(function Nebula({ prefersReducedMotion }) {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (!meshRef.current || prefersReducedMotion) return
    meshRef.current.rotation.z += 0.001 * delta * 60
    // Throttle opacity updates
    if (state.clock.elapsedTime % 0.2 < delta) {
      meshRef.current.material.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  return (
    <Sphere ref={meshRef} args={[50, 32, 32]}>
      <meshBasicMaterial
        color="#4a0e4e"
        transparent
        opacity={0.1}
        side={THREE.BackSide}
      />
    </Sphere>
  )
})

const ScrollStars = memo(function ScrollStars({ scrollY, prefersReducedMotion }) {
  const starsRef = useRef()
  const lastScrollY = useRef(scrollY)

  useFrame(() => {
    if (!starsRef.current || prefersReducedMotion) return
    // Only update if scroll changed significantly
    if (Math.abs(scrollY - lastScrollY.current) > 10) {
      starsRef.current.rotation.y = scrollY * 0.0001
      starsRef.current.rotation.x = scrollY * 0.00005
      lastScrollY.current = scrollY
    }
  })

  return (
    <Stars
      ref={starsRef}
      radius={100}
      depth={50}
      count={5000}
      factor={4}
      saturation={0}
      fade
      speed={1}
    />
  )
})

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color="#00ffff" wireframe opacity={0.5} transparent />
    </mesh>
  )
}


// Enhanced Global loading screen
function GlobalLoader() {
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
}

export default function GalaxyPortfolio() {
  const [hoveredPlanet, setHoveredPlanet] = useState(null)
  const [selectedPlanet, setSelectedPlanet] = useState(null)
  const [scrollY, setScrollY] = useState(0)

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

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

        {/* 🪐 3D Canvas */}
        <Canvas
          camera={{
            position: isMobile ? [0, 0, 7] : [0, 0, 5],
            fov: 70,
          }}
          gl={{
            antialias: !isMobile,
            alpha: true,
            powerPreference: 'high-performance',
            pixelRatio: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1
          }}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} color="#00ffff" intensity={1.2} />
          <pointLight position={[-5, -5, -5]} color="#ff00ff" intensity={0.8} />
          <pointLight position={[0, 8, 0]} color="#ffffff" intensity={0.6} />
          <directionalLight position={[10, 10, 5]} color="#4a90e2" intensity={0.3} />

          <Suspense fallback={null}>
            <Stars radius={100} depth={50} count={isMobile ? 2000 : 3000} factor={4} saturation={0} fade speed={1} />
          </Suspense>
          <Nebula prefersReducedMotion={prefersReducedMotion} />

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

          <CameraController disabled={prefersReducedMotion} />

          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            autoRotate={!prefersReducedMotion}
            autoRotateSpeed={prefersReducedMotion ? 0 : 0.5}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 2.2}
            minDistance={3}
            maxDistance={10}
          />
        </Canvas>

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
}