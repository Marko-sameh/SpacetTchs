import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { FeatureGrid } from '@/components/FeatureGrid'

const StarField3D = dynamic(() => import('@/components/3d/StarField3D').then(mod => ({ default: mod.StarField3D })))
const Scene3D = dynamic(() => import('@/components/3d/Scene3D'))

export const metadata = {
  title: 'Services - Speed Tech',
  description: 'Professional web development and design services'
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-purple-900/10 to-cyan-900/10" />}>
          <Scene3D>
            <StarField3D count={800} />
          </Scene3D>
        </Suspense>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold  mb-6 font-display">
            Services
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Comprehensive digital solutions tailored to your needs
          </p>
        </div>

        <FeatureGrid title="" />

        <div className="mt-20 text-center">
          <div className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-4 font-display">
              Ready to Start Your Project?
            </h2>
            <p className="text-white/70 mb-6">
              Let's discuss how we can bring your vision to life with cutting-edge technology.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}