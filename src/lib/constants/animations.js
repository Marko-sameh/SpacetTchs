/**
 * Animation Constants
 * Centralized animation configuration for consistent performance
 */

// Performance-optimized animation speeds
export const ANIMATION_SPEEDS = Object.freeze({
  // 3D Animations
  planetRotationY: 0.01,
  planetRotationX: 0.005,
  orbitSpeed: 0.5,
  cameraOrbit: 0.15,
  hoverScale: 1.3,
  orbitRadius: 0.3,
  
  // UI Animations
  pageTransition: 0.6,
  menuToggle: 0.3,
  cardHover: 0.2,
  scrollProgress: 0.1,
  
  // Framer Motion Presets
  spring: {
    type: "spring",
    damping: 20,
    stiffness: 300
  },
  
  easeOut: {
    duration: 0.6,
    ease: [0.6, -0.05, 0.01, 0.99]
  }
})

// Animation variants for Framer Motion
export const ANIMATION_VARIANTS = Object.freeze({
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  },
  
  slideIn: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  },
  
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  },
  
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
})

// Reduced motion preferences
export const REDUCED_MOTION_CONFIG = Object.freeze({
  duration: 0.01,
  ease: "linear"
})