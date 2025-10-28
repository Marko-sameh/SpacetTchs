'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
  }
}

export function ProjectCard({ title, description, image, tech, link, index }) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10, rotateY: 5 }}
      className="glass rounded-2xl overflow-hidden group cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20" />
        <motion.div
          className="absolute inset-0 bg-black/20"
          whileHover={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 font-display">
          {title}
        </h3>

        <p className="text-gray-700 dark:text-white/70 mb-4 leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tech?.map((item) => (
            <span
              key={item}
              className="px-3 py-1 text-xs bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-white/80 rounded-full"
            >
              {item}
            </span>
          )) || null}
        </div>

        <div className="flex items-center gap-4">
          <motion.a
            href={link}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ExternalLink size={16} />
            <span className="text-sm">View Project</span>
          </motion.a>

          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-gray-600 dark:text-white/60 hover:text-gray-800 dark:hover:text-white/80 transition-colors"
          >
            <Github size={16} />
            <span className="text-sm">Code</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}