# Development Guidelines

## Code Quality Standards

### File Structure & Naming
- Use PascalCase for React components (e.g., `GalaxyPortfolio.jsx`, `AboutUs.jsx`)
- Use camelCase for functions and variables (e.g., `handleSelect`, `selectedProject`)
- Use kebab-case for URLs and slugs (e.g., `/projects/[slug]`)
- Group related files in logical directories (`3d/`, `ui/`, `api/`)

### Import Organization
```javascript
// External libraries first
import { Canvas, useLoader } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'

// Internal imports second
import { Button } from '../ui/Button'
import apiClient from '@/lib/apiClient'
```

### Component Structure Patterns
- Use `'use client'` directive for client-side components
- Implement proper error boundaries and fallbacks
- Use `memo()` for performance optimization on heavy components
- Extract constants outside components (e.g., `ANIMATION_SPEEDS`, `projects`)

## Semantic Patterns

### State Management
```javascript
// Zustand pattern for global state
const [hoveredPlanet, setHoveredPlanet] = useState(null)
const [selectedPlanet, setSelectedPlanet] = useState(null)

// useMemo for expensive calculations
const selectedProject = useMemo(
  () => (selectedPlanet ? projectsMap.get(selectedPlanet) : null),
  [selectedPlanet]
)
```

### Event Handling
```javascript
// useCallback for event handlers to prevent re-renders
const handleSelect = useCallback((id) => {
  setSelectedPlanet((prev) => (prev === id ? null : id))
}, [])

// Keyboard accessibility patterns
const handleKeyDown = useCallback((e, projectId) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    handleSelect(projectId)
  }
}, [handleSelect])
```

### API Integration
```javascript
// Async/await with try-catch error handling
async function getProject(slug) {
  try {
    const response = await apiClient.getProject(slug)
    return response.data
  } catch (error) {
    // Fallback to mock data
    return mockProjects[slug] || null
  }
}
```

## Internal API Usage Patterns

### Three.js Integration
```javascript
// useFrame for animations
useFrame((state) => {
  if (!meshRef.current || prefersReducedMotion) return
  meshRef.current.rotation.y += ANIMATION_SPEEDS.planetRotationY
})

// Texture loading and optimization
const texture = useLoader(THREE.TextureLoader, project.image)
useMemo(() => {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.anisotropy = 16
}, [texture])
```

### Framer Motion Animations
```javascript
// Consistent animation patterns
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 20 }}
  className="..."
>
```

### Next.js App Router Patterns
```javascript
// Metadata generation
export async function generateMetadata({ params }) {
  const { slug } = await params
  try {
    const project = await apiClient.getProject(slug)
    return {
      title: `${project.data?.title || 'Project'} - Our Company`,
      description: project.data?.description || 'Project details',
    }
  } catch (error) {
    return fallbackMetadata
  }
}
```

## Styling Conventions

### Tailwind CSS Patterns
- Use responsive prefixes: `text-4xl md:text-6xl`
- Gradient text: `bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent`
- Glass morphism: `bg-black/70 backdrop-blur-md border border-cyan-500/40`
- Hover effects: `hover:scale-105 transition-transform`

### CSS Custom Properties
```css
/* Use CSS variables for theming */
.bg-[var(--main-color)]
.text-[var(--accent-color)]
```

## Accessibility Standards

### ARIA Implementation
```javascript
// Proper ARIA labels and roles
<div
  role="button"
  tabIndex={0}
  aria-label={`${project.name}: ${project.description}`}
  onKeyDown={(e) => handleKeyDown(e, project.id)}
/>

// Screen reader content
<div className="sr-only">
  <h1>SpaceTech - Interactive 3D Project Showcase</h1>
</div>
```

### Performance Considerations
- Use `prefersReducedMotion` for accessibility
- Implement proper loading states and suspense boundaries
- Optimize images with Next.js Image component
- Use `passive: true` for scroll listeners

## Error Handling Patterns

### Graceful Degradation
```javascript
// Always provide fallbacks for API failures
try {
  const response = await apiClient.getProjects()
  return response.data?.projects || []
} catch (error) {
  console.error('Failed to fetch projects:', error)
  return mockProjects // Fallback data
}
```

### Component Error Boundaries
- Wrap 3D components in Suspense with fallbacks
- Use `notFound()` for missing resources
- Implement proper loading states