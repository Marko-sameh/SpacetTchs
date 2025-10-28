# Speed Tech - Interactive 3D Portfolio

> Accelerating the Future with Mobile, Web, and AI Innovation

A cutting-edge portfolio and business showcase website built with Next.js 15, featuring immersive 3D experiences and interactive animations. This platform demonstrates modern web technologies while providing a professional business presence.

## ✨ Features

- **🌌 3D Interactive Portfolio**: Galaxy-themed portfolio visualization with Three.js integration
- **🎨 Modern UI/UX**: Responsive design with Framer Motion animations and Tailwind CSS
- **📱 Fully Responsive**: Optimized for all devices and screen sizes
- **⚡ Performance Optimized**: Next.js 15 with Turbopack for lightning-fast builds
- **🎯 SEO Ready**: Comprehensive metadata, structured data, and OpenGraph tags
- **♿ Accessible**: WCAG compliant with proper ARIA labels and keyboard navigation
- **🔄 State Management**: Zustand for client-side state and TanStack Query for server state

## 🚀 Tech Stack

### Core Framework
- **Next.js 15.5.5** - React framework with App Router and Turbopack
- **React 19.1.0** - Latest React with concurrent features
- **React DOM 19.1.0** - DOM rendering library

### 3D Graphics & Animation
- **@react-three/drei 10.7.6** - Three.js helpers and abstractions
- **Framer Motion 12.23.24** - Animation library for React
- **Three.js** - 3D graphics library (via React Three Fiber)

### Styling & UI
- **Tailwind CSS 4.1.14** - Utility-first CSS framework
- **Lucide React 0.545.0** - Beautiful icon library
- **clsx 2.1.1** - Conditional className utility

### State Management & Data
- **Zustand 5.0.8** - Lightweight state management
- **@tanstack/react-query 5.90.5** - Server state management
- **Zod 4.1.12** - Schema validation

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/speed-tech-portfolio.git
   cd speed-tech-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your environment variables in `.env.local`

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Available Scripts

```bash
npm run dev      # Development server with Turbopack
npm run build    # Production build with Turbopack  
npm start        # Production server
npm run lint     # ESLint code checking
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── about/             # About page
│   ├── blog/              # Blog pages
│   ├── contact/           # Contact page
│   ├── projects/          # Projects pages
│   ├── services/          # Services page
│   ├── globals.css        # Global styles
│   ├── layout.jsx         # Root layout
│   └── page.jsx           # Home page
├── components/            # React components
│   ├── 3d/               # Three.js components
│   │   ├── FloatingGeometry.jsx
│   │   ├── GalaxyPortfolio.jsx
│   │   ├── ParticleField.jsx
│   │   └── Scene3D.jsx
│   └── ui/               # UI components
│       ├── Button.jsx
│       ├── Footer.jsx
│       ├── Navbar.jsx
│       └── ...
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and APIs
├── stores/               # Zustand stores
└── styles/               # CSS files
```

## 🎨 Key Components

### 3D Components
- **GalaxyPortfolio**: Interactive 3D galaxy with project planets
- **FloatingGeometry**: Animated 3D planet with orbital moons
- **ParticleField**: Dynamic particle system for backgrounds
- **Scene3D**: Optimized 3D scene wrapper with device detection

### UI Components
- **Navbar**: Responsive navigation with smooth animations
- **Footer**: Animated footer with social links
- **Button**: Versatile button component with multiple variants

## 🌟 Performance Features

- **Device Capability Detection**: Adaptive rendering based on device performance
- **Lazy Loading**: Dynamic imports for heavy 3D components
- **Memoization**: Optimized re-renders with React.memo and useMemo
- **Responsive Images**: Next.js Image optimization
- **Bundle Optimization**: Tree shaking and code splitting

## 🎯 SEO & Accessibility

- **Structured Data**: JSON-LD schema markup
- **Meta Tags**: Comprehensive OpenGraph and Twitter cards
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: ARIA labels and descriptions
- **Performance**: Lighthouse score optimization

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically on every push

### Other Platforms
- **Netlify**: Connect GitHub repository
- **AWS Amplify**: Use the AWS console
- **Docker**: Use the included Dockerfile

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Speed Tech**
- Website: [https://speedtech.dev](https://speedtech.dev)
- Email: contact@speedtech.dev
- GitHub: [@speedtech](https://github.com/speedtech)
- LinkedIn: [Speed Tech](https://linkedin.com/company/speedtech)

---

<div align="center">
  <p>Built with ❤️ by Speed Tech</p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>