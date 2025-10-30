/**
 * Color Constants
 * Centralized color palette for consistent theming
 */

// Memoized color palette for 3D objects
export const COLOR_PALETTE = Object.freeze([
  Object.freeze({ base: '#3B4A8C', light: '#5063A6', dark: '#2C3875' }),
  Object.freeze({ base: '#3A4EA0', light: '#5568B8', dark: '#2E3D85' }),
  Object.freeze({ base: '#EDE4FF', light: '#F8F3FF', dark: '#E0D2FF' }),
  Object.freeze({ base: '#FFFFFF', light: '#FFFFFF', dark: '#F5F7FF' }),
  Object.freeze({ base: '#4A4E5F', light: '#606476', dark: '#383B49' })
])

// Brand Colors
export const BRAND_COLORS = Object.freeze({
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e'
  },
  
  secondary: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7c3aed',
    800: '#6b21a8',
    900: '#581c87'
  },
  
  accent: {
    cyan: '#00ffff',
    purple: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #00ffff 0%, #8b5cf6 100%)'
  }
})

// Semantic Colors
export const SEMANTIC_COLORS = Object.freeze({
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6'
})

// Glass Morphism Colors
export const GLASS_COLORS = Object.freeze({
  background: 'rgba(0, 0, 0, 0.7)',
  border: 'rgba(6, 182, 212, 0.4)',
  backdrop: 'blur(12px)'
})