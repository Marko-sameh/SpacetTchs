# Technology Stack

## Core Framework
- **Next.js 15.5.5**: React framework with App Router and Turbopack
- **React 19.1.0**: Latest React with concurrent features
- **React DOM 19.1.0**: DOM rendering library

## 3D Graphics & Animation
- **@react-three/drei 10.7.6**: Three.js helpers and abstractions
- **Framer Motion 12.23.24**: Animation library for React
- **Three.js**: 3D graphics library (via React Three Fiber)

## Styling & UI
- **Tailwind CSS 4.1.14**: Utility-first CSS framework
- **@tailwindcss/vite 4.1.14**: Vite integration for Tailwind
- **Lucide React 0.545.0**: Icon library
- **clsx 2.1.1**: Conditional className utility

## State Management & Data
- **Zustand 5.0.8**: Lightweight state management
- **@tanstack/react-query 5.90.5**: Server state management
- **Zod 4.1.12**: Schema validation

## Development Tools
- **ESLint 9**: Code linting with Next.js config
- **PostCSS**: CSS processing
- **Turbopack**: Fast bundler for development

## Build Commands
```bash
npm run dev      # Development server with Turbopack
npm run build    # Production build with Turbopack  
npm start        # Production server
npm run lint     # ESLint code checking
```

## Configuration Files
- `next.config.mjs`: Next.js configuration
- `tailwind.config.js`: Tailwind CSS setup
- `eslint.config.mjs`: ESLint rules
- `jsconfig.json`: JavaScript project configuration
- `postcss.config.mjs`: PostCSS processing