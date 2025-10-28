'use client'

import { motion } from 'framer-motion'

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.1
    }
  }
}

export function FeatureCard({ title, description, icon, index }) {
  return (
    <motion.div
      variants={cardVariants}
      initial={{
        rotateX: 5,
        rotateY: 3,
        y: -5
      }}
      whileHover={{
        y: -20,
        rotateX: 15,
        rotateY: 15,
        scale: 1.05,
        transition: { duration: 0.4 }
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        transform: 'rotateX(8deg) rotateY(5deg) translateZ(20px)'
      }}
      className="group relative bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-sm border border-gray-700/60 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-cyan-500/30"
    >
      <motion.div
        whileHover={{
          scale: 1.5,
          rotateY: 360,
          z: 50
        }}
        transition={{ duration: 0.6 }}
        className="text-cyan-400 mb-6 inline-block text-6xl"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'translateZ(30px)',
          filter: 'drop-shadow(0 10px 20px rgba(6, 182, 212, 0.3)) drop-shadow(0 0 10px rgba(6, 182, 212, 0.2))',
          textShadow: '0 0 20px rgba(6, 182, 212, 0.5)'
        }}
      >
        {icon}
      </motion.div>

      <motion.h3
        whileHover={{ z: 30 }}
        className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'translateZ(20px)'
        }}
      >
        {title}
      </motion.h3>

      <motion.p
        whileHover={{ z: 20 }}
        className="text-gray-300 leading-relaxed"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'translateZ(10px)'
        }}
      >
        {description}
      </motion.p>

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/3 to-transparent opacity-100 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" />
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-xl blur opacity-100 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/5 to-purple-500/5 rounded-xl blur-lg opacity-100 group-hover:opacity-60 transition-opacity duration-700 -z-20" />
    </motion.div>
  )
}