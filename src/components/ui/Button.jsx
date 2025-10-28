'use client'

import { forwardRef, cloneElement, useMemo } from 'react'
import { cn } from '@/lib/utils'

// Memoized variant and size configurations
const BUTTON_VARIANTS = Object.freeze({
  primary: 'bg-primary text-white border border-primary/20 hover:bg-secondary hover:border-accent hover:shadow-lg hover:shadow-accent/20 hover:scale-105 active:scale-95',
  secondary: 'glass text-text border-border hover:border-accent hover:bg-accent/5',
  ghost: 'text-text hover:bg-surface hover:text-accent border border-transparent hover:border-border'
})

const BUTTON_SIZES = Object.freeze({
  sm: 'px-3 py-2 text-responsive-sm sm:px-4',
  md: 'px-4 py-2 text-responsive-base sm:px-6 sm:py-3',
  lg: 'px-6 py-3 text-responsive-lg sm:px-8 sm:py-4'
})

const BASE_CLASSES = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 sm:focus:ring-offset-2 active:scale-95 touch-manipulation'

const Button = forwardRef(({
  className,
  variant = 'primary',
  size = 'md',
  magnetic = false,
  asChild = false,
  disabled = false,
  children,
  ...props
}, ref) => {
  const buttonClasses = useMemo(() => {
    if (!BUTTON_VARIANTS[variant]) {
      console.warn(`Invalid button variant: ${variant}. Using 'primary' as fallback.`)
    }
    if (!BUTTON_SIZES[size]) {
      console.warn(`Invalid button size: ${size}. Using 'md' as fallback.`)
    }

    return cn(
      BASE_CLASSES,
      BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.primary,
      BUTTON_SIZES[size] || BUTTON_SIZES.md,
      magnetic && 'magnetic',
      disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
      className
    )
  }, [variant, size, magnetic, disabled, className])

  if (asChild && children) {
    try {
      return cloneElement(children, {
        className: cn(buttonClasses, children.props?.className),
        ref,
        disabled,
        ...props
      })
    } catch (error) {
      console.error('Button asChild error:', error)
      return null
    }
  }

  return (
    <button
      ref={ref}
      className={buttonClasses}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export { Button }