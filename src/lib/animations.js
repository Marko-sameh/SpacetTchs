// Re-export animation utilities from different locations
export * from './constants/animations'
export * from './utils/animations'

// Optimized animation variants with reduced complexity
const baseTransition = { duration: 0.3, ease: "easeOut" }

export const heroVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { ...baseTransition, staggerChildren: 0.1 }
    }
  },
  parallax: {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: baseTransition
    }
  }
}

export const aboutVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: baseTransition
    }
  }
}

export const ctaVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: baseTransition
    }
  },
  glow: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: baseTransition
    }
  }
}

export const featuresVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: baseTransition
  }
}

export const footerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: baseTransition
  }
}