# 🚀 Galaxy 3D Portfolio Section

A futuristic, interactive 3D portfolio component built with React Three Fiber and Framer Motion 3D.

## ✨ Features

- **Interactive 3D Planets**: Each project appears as a floating planet with orbital motion
- **Hover Effects**: Planets scale up (1.3x) with glowing halos and 3D text labels
- **Cinematic Camera**: Smooth orbital camera movement with sin/cos wave motion
- **Scroll Parallax**: Background stars respond to scroll with depth effects
- **Nebula Background**: Animated cosmic background with breathing opacity
- **Performance Optimized**: High-performance WebGL rendering

## 🛠️ Tech Stack

- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers (OrbitControls, Stars, Float, Text)
- **framer-motion-3d** - 3D animations and transitions
- **three.js** - 3D graphics library
- **Next.js 15** - React framework with App Router

## 🎮 Usage

```jsx
import GalaxyPortfolio from '@/components/3d/GalaxyPortfolio'

export default function Page() {
  return <GalaxyPortfolio />
}
```

## 🎨 Customization

### Adding Projects

Edit the `projects` array in `GalaxyPortfolio.jsx`:

```javascript
const projects = [
  {
    id: 1,
    name: 'Your Project',
    position: [x, y, z], // 3D coordinates
    color: '#00ffff',    // Hex color
    description: 'Project description'
  }
]
```

### Styling

- **Colors**: Modify `color` property in projects array
- **Lighting**: Adjust `pointLight` and `spotLight` components
- **Animation Speed**: Change `autoRotateSpeed` in OrbitControls

## 🚀 Performance

- Uses `useFrame` for 60fps animations
- Optimized materials with `MeshDistortMaterial`
- Conditional rendering for hover effects
- High-performance WebGL settings

## 📱 Responsive

- Fully responsive design
- Touch-friendly on mobile devices
- Adaptive camera controls

## 🎯 MCP Integration

- **Codacy MCP**: Code quality analysis completed
- **Markitdown MCP**: Documentation generation
- **Chrome MCP**: Browser testing capabilities
- **Context7 MCP**: Ready for state persistence

Navigate to `/galaxy` to see the component in action!