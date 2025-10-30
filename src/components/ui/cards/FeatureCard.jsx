'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useCallback, useMemo } from 'react'

// Optimized variants with reduced complexity
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4, // Reduced duration
      delay: 0.05 // Reduced delay
    }
  }
}

export function FeatureCard({ title, description, icon, index }) {
  // Use motion values for better performance
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [30, -30])
  const rotateY = useTransform(x, [-100, 100], [-30, 30])

  const handleMouseMove = useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(event.clientX - centerX)
    y.set(event.clientY - centerY)
  }, [x, y])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  // Memoize style objects
  const cardStyle = useMemo(() => ({
    rotateX,
    rotateY,
    transformStyle: 'preserve-3d'
  }), [rotateX, rotateY])

  const iconStyle = useMemo(() => ({
    transform: 'translateZ(30px)',
    willChange: 'transform' // Hint for layer creation
  }), [])

  return (
    <motion.div
      variants={cardVariants}
      style={cardStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: 1.02, // Reduced scale for better performance
        transition: { duration: 0.2 }
      }}
      className="group relative bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-sm border border-gray-700/60 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-cyan-500/30"
    >
      <motion.div
        whileHover={{
          scale: 1.2, // Reduced scale
          transition: { duration: 0.3 }
        }}
        className="text-cyan-400 mb-6 inline-block text-6xl"
        style={iconStyle}
      >
        {icon}
      </motion.div>

      <motion.h3
        className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300"
        style={{
          transform: 'translateZ(20px)',
          willChange: 'transform'
        }}
      >
        {title}
      </motion.h3>

      <motion.p
        className="text-gray-300 leading-relaxed"
        style={{
          transform: 'translateZ(10px)',
          willChange: 'transform'
        }}
      >
        {description}
      </motion.p>

      {/* Simplified background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
    </motion.div>
  )
}