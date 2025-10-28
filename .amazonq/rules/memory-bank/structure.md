# Project Structure

## Directory Organization

### `/src/app/` - Next.js App Router
- **Pages**: Home, About, Projects, Services, Blog, Contact, Galaxy
- **Layout**: Root layout with global providers and navigation
- **Special Files**: Error boundaries, loading states, not-found pages
- **Dynamic Routes**: `projects/[slug]` for individual project pages

### `/src/components/` - React Components
- **`3d/`**: Three.js components (GalaxyPortfolio, ParticleField, Scene3D, FloatingGeometry)
- **`ui/`**: Reusable UI components (Navbar, Footer, Cards, Buttons)
- **Root Level**: Page-specific and utility components

### `/src/lib/` - Utilities and APIs
- **`api/`**: API client modules for projects, blogs, categories
- **Core Files**: API client, internationalization, utilities

### `/src/hooks/` - Custom React Hooks
- Data fetching hooks (useProjects, useBlogs, useCategories)
- UI interaction hooks (useMousePosition, useMediaQuery)

### `/src/stores/` - State Management
- Zustand stores for global UI state

### `/public/` - Static Assets
- Images, icons, and other static resources

## Core Components Relationships
- **Layout** → Navbar + Footer (persistent across pages)
- **Pages** → Feature components → UI components
- **3D Components** → Three.js/React Three Fiber integration
- **API Layer** → Hooks → Components (data flow)

## Architectural Patterns
- **App Router**: File-based routing with server/client components
- **Component Composition**: Modular, reusable component architecture
- **State Management**: Zustand for client state, TanStack Query for server state
- **Styling**: Tailwind CSS with custom CSS variables