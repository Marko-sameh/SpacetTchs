'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, X } from 'lucide-react'
import { footerVariants } from '@/lib/animations'
import { useScrollAnimations } from '@/hooks/useScrollAnimations'

const WAVE_VARIANTS = {
  animate: {
    d: [
      "M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
      "M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,80C672,64,768,64,864,80C960,96,1056,128,1152,128C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
      "M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    ],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

const STATIC_WAVE_PATH = "M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"

export function Footer() {
  const [mounted, setMounted] = useState(false)
  const { prefersReducedMotion } = useScrollAnimations()

  useEffect(() => {
    setMounted(true)
  }, [])

  const SOCIAL_LINKS = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: X, href: 'https://twitter.com', label: 'X (Twitter)' }
  ]

  return (
    <footer className="relative bg-surface ">
      {/* Animated Wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none text-[#273469]">
        <svg
          className="relative block w-full h-16"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          {mounted ? (
            <motion.path
              variants={WAVE_VARIANTS}
              animate="animate"
              fill="currentColor"
              className="text-accent/20"
              d={STATIC_WAVE_PATH}
            />
          ) : (
            <path
              fill="currentColor"
              className="text-accent/20"
              d={STATIC_WAVE_PATH}
            />
          )}
        </svg>
      </div>

      <div className="relative pt-20 pb-8">
        <div className="container-responsive">
          <motion.div
            variants={footerVariants.container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className="text-center space-y-6"
          >
            <motion.h3 
              variants={footerVariants.scaleUp}
              className="text-3xl font-bold"
            >
              SpaceTechs
            </motion.h3>

            <motion.div 
              variants={footerVariants.scaleUp}
              className="flex justify-center space-x-6"
            >
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }, index) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={footerVariants.scaleUp}
                  whileHover={prefersReducedMotion ? {} : { y: -3, scale: 1.1 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                  className="p-3 glass rounded-full hover:border-accent transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 text-text" />
                </motion.a>
              ))}
            </motion.div>

            <motion.p
              variants={footerVariants.scaleUp}
              className="text-text-muted text-sm"
            >
              © 2025 SpaceTechs. All rights reserved
            </motion.p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}