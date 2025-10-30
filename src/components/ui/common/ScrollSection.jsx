'use client'

import { motion } from 'framer-motion'
import { useScrollAnimations } from '@/hooks/useScrollAnimations'
import { reducedMotionVariants } from '@/lib/animations'

/**
 * ScrollSection - Reusable component for scroll-triggered animations
 * 
 * @param {Object} variants - Framer Motion animation variants
 * @param {string} className - Additional CSS classes
 * @param {Object} viewportOptions - Intersection observer options
 * @param {React.ReactNode} children - Child components
 * @param {string} as - HTML element type (default: 'section')
 */
export function ScrollSection({ 
  variants, 
  className = '', 
  viewportOptions = {}, 
  children, 
  as = 'section',
  ...props 
}) {
  const { prefersReducedMotion } = useScrollAnimations()
  
  // Use reduced motion variants if user prefers reduced motion
  const animationVariants = prefersReducedMotion ? reducedMotionVariants : variants

  const defaultViewport = {
    once: true, // Animation runs only once when visible
    margin: '-10% 0px -10% 0px', // Trigger slightly before element is fully visible
    amount: 0.3, // Trigger when 30% of element is visible
    ...viewportOptions
  }

  const MotionComponent = motion[as]

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={animationVariants}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  )
}

/**
 * ScrollContainer - For complex staggered animations
 * Provides container variants with stagger timing
 */
export function ScrollContainer({ 
  variants, 
  className = '', 
  children, 
  staggerChildren = 0.1,
  delayChildren = 0,
  ...props 
}) {
  const { prefersReducedMotion } = useScrollAnimations()

  const containerVariants = prefersReducedMotion 
    ? reducedMotionVariants 
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren,
            delayChildren
          }
        },
        ...variants
      }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      variants={containerVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}