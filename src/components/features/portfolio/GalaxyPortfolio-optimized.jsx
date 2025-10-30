'use client'

import OptimizedCanvas from './OptimizedCanvas'
import { OrbitControls, Stars, Float, Text, Sphere } from '@react-three/drei'
import { motion } from 'framer-motion'
import React, { useRef, useState, useEffect, useMemo, Suspense, memo, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Button } from '../ui/Button'
import { useProjects } from '@/hooks/useProjects'

// Ultra-aggressive performance constants
const ANIMATION_SPEEDS = {
  planetRotationY: 0.005, // Reduced by 50%
  planetRotationX: 0.002, // Reduced by 60%
  orbitSpeed: 0.3,
  cameraOrbit: 0.1,
  hoverScale: 1.2,
  orbitRadius: 0.3
}

const PERFORMANCE_CONFIG = {
  maxProjects: 8, // Reduced from 12
  baseRadius: 5,
  updateInterval: 200, // 5fps for non-critical updates
  scrollThreshold: 50 // Increased threshold
}

// Memoized and frozen constants
const COLOR_PALETTE = Object.freeze([
  Object.freeze({ base: '#3B4A8C', light: '#5063A6', dark: '#2C3875' }),
  Object.freeze({ base: '#3A4EA0', light: '#5568B8', dark: '#2E3D85' }),
  Object.freeze({ base: '#EDE4FF', light: '#F8F3FF', dark: '#E0D2FF' }),
  Object.freeze({ base: '#FFFFFF', light: '#FFFFFF', dark: '#F5F7FF' })
])

const FALLBACK_PROJECTS = Object.freeze([
  {
    id: '1',
    name: 'AI Dashboard',
    position: [3, 1, -1],
    color: '#00ffff',
    description: 'Machine Learning Analytics Platform',
    slug: 'ai-dashboard'
  },
  {
    id: '2',
    name: 'E-Commerce Platform',
    position: [-1, -0.5, -1],
    color: '#ff00ff',
    description: 'Full-stack e-commerce solution',
    slug: 'ecommerce-platform'
  }
])

// Ultra-optimized Planet component with minimal re-renders
const Planet = memo(function Planet({ 
  project, 
  onHover, 
  onSelect, 
  isHovered, 
  isSelected, 
  prefersReducedMotion 
}) {
  const meshRef = useRef()
  const lastUpdate = useRef(0)

  // Memoize expensive calculations
  const geometry = useMemo(() => new THREE.SphereGeometry(0.8, 12, 12), [])
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: project.color,
    roughness: 0.7,
    metalness: 0.1
  }), [project.color])

  useFrame((state) => {
    if (!meshRef.current || prefersReducedMotion) return
    
    // Ultra-throttled updates - 5fps
    if (state.clock.elapsedTime - lastUpdate.current < 0.2) return
    
    meshRef.current.rotation.y += ANIMATION_SPEEDS.planetRotationY
    meshRef.current.rotation.x += ANIMATION_SPEEDS.planetRotationX
    lastUpdate.current = state.clock.elapsedTime
  })

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      geometry?.dispose()
      material?.dispose()
    }
  }, [geometry, material])

  const handlePointerEnter = useCallback(() => onHover(project.id), [onHover, project.id])
  const handlePointerLeave = useCallback(() => onHover(null), [onHover])
  const handleClick = useCallback((e) => {
    e.stopPropagation()
    onSelect(project.id)
  }, [onSelect, project.id])

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.3}>
      <group
        position={project.position}
        scale={isHovered || isSelected ? ANIMATION_SPEEDS.hoverScale : 1}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
      >
        <mesh ref={meshRef} geometry={geometry} material={material} />
        
        {/* Simplified text - only when hovered */}
        {isHovered && (
          <Text
            position={[0, 1.5, 0]}
            fontSize={0.3}
            color={project.color}
            anchorX="center"
            anchorY="middle"
          >
            {project.name}
          </Text>
        )}
      </group>
    </Float>
  )
}, (prevProps, nextProps) => {
  // Custom comparison for better memoization
  return (
    prevProps.project.id === nextProps.project.id &&
    prevProps.isHovered === nextProps.isHovered &&
    prevProps.isSelected === nextProps.isSelected &&
    prevProps.prefersReducedMotion === nextProps.prefersReducedMotion
  )
})

// Simplified Camera Controller
const CameraController = memo(function CameraController({ disabled }) {
  const lastUpdate = useRef(0)
  
  useFrame((state) => {
    if (disabled || state.clock.elapsedTime - lastUpdate.current < 0.1) return
    
    const time = state.clock.elapsedTime * ANIMATION_SPEEDS.cameraOrbit
    state.camera.position.x = Math.sin(time) * 1.2
    state.camera.position.y = Math.cos(time * 0.5) * 0.6
    state.camera.lookAt(0, 0, 0)
    lastUpdate.current = state.clock.elapsedTime
  })

  return null
})

// Optimized main component
const GalaxyPortfolio = memo(function GalaxyPortfolio() {
  const [hoveredPlanet, setHoveredPlanet] = useState(null)
  const [selectedPlanet, setSelectedPlanet] = useState(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const { data: projectsData, isLoading } = useProjects()
  
  // Memoize projects transformation
  const projects = useMemo(() => {
    const rawProjects = projectsData?.data?.projects || []
    const sourceProjects = rawProjects.length > 0 ? rawProjects : FALLBACK_PROJECTS
    
    return sourceProjects.slice(0, PERFORMANCE_CONFIG.maxProjects).map((project, index) => {
      const colorSet = COLOR_PALETTE[index % COLOR_PALETTE.length]
      return Object.freeze({
        id: project._id || project.id,
        name: project.title || project.name,
        position: [
          Math.cos(index * 0.8) * 4 + (index % 2 === 0 ? -2 : 2),
          (index % 3 - 1) * 1.2,
          Math.sin(index * 0.8) * 4 - 1
        ],
        color: colorSet.base,
        description: project.description,
        slug: project.slug
      })
    })
  }, [projectsData])

  const selectedProject = useMemo(
    () => projects.find(p => p.id === selectedPlanet) || null,
    [selectedPlanet, projects]
  )

  // Device detection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      setIsMobile(window.matchMedia('(max-width: 768px)').matches)
    }
  }, [])

  const handleSelect = useCallback((id) => {
    setSelectedPlanet(prev => prev === id ? null : id)
  }, [])

  const handleClose = useCallback(() => {
    setSelectedPlanet(null)
  }, [])

  if (isLoading && projects.length === 0) {
    return (
      <div className="flex items-center justify-center h-[70vh] bg-black">
        <div className="text-cyan-400 text-xl">Loading Galaxy...</div>
      </div>
    )
  }

  return (
    <section className="relative w-full h-[70vh] bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* Optimized 3D Canvas */}
      <OptimizedCanvas
        camera={{
          position: isMobile ? [0, 0, 8] : [0, 0, 6],
          fov: 65,
        }}
        isMobile={isMobile}
        performanceLevel={prefersReducedMotion ? 'low' : 'medium'}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} color="#00ffff" intensity={0.8} />
        <pointLight position={[-5, -5, -5]} color="#ff00ff" intensity={0.6} />

        <Suspense fallback={null}>
          <Stars 
            radius={80} 
            depth={40} 
            count={isMobile ? 500 : 800} 
            factor={3} 
            saturation={0} 
            fade 
            speed={0.5} 
          />
        </Suspense>

        {projects.map((project) => (
          <Planet
            key={project.id}
            project={project}
            onHover={setHoveredPlanet}
            onSelect={handleSelect}
            isHovered={hoveredPlanet === project.id}
            isSelected={selectedPlanet === project.id}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}

        <CameraController disabled={prefersReducedMotion} />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={!isMobile}
          autoRotate={!prefersReducedMotion && !isMobile}
          autoRotateSpeed={0.2}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.2}
          minDistance={4}
          maxDistance={8}
          enableDamping={true}
          dampingFactor={0.08}
        />
      </OptimizedCanvas>

      {/* Simplified UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-8 left-8 z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              SpaceTech
              <br />
              <span className="text-2xl md:text-3xl text-gray-300 font-light">
                Project Galaxy
              </span>
            </h1>
            <p className="text-lg text-gray-200 max-w-md">
              Explore our digital universe of innovative projects.
            </p>
          </motion.div>
        </div>

        {/* Project Details Panel */}
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute bottom-8 right-8 bg-black/80 backdrop-blur-xl border border-cyan-500/50 rounded-xl p-6 max-w-sm"
          >
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">
              {selectedProject.name}
            </h2>
            <p className="text-gray-200 mb-4">
              {selectedProject.description}
            </p>
            <div className="flex justify-between items-center">
              <Button
                onClick={() => window.location.href = `/projects/${selectedProject.slug}`}
                className="bg-cyan-500 hover:bg-cyan-400 text-white px-4 py-2 rounded-lg pointer-events-auto"
              >
                View Project
              </Button>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-white pointer-events-auto p-2"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
})

export default GalaxyPortfolio