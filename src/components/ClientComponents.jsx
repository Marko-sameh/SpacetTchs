'use client'

import dynamic from 'next/dynamic'

export const Scene3D = dynamic(() => import('@/components/three/core/Scene3D'), {
  loading: () => <div className="w-full h-screen bg-gradient-to-br from-purple-200/30 to-cyan-200/30 dark:from-purple-900/20 dark:to-cyan-900/20" />
})

export const FloatingGeometry = dynamic(() => import('@/components/three/objects/FloatingGeometry'), { ssr: false })

export const GalaxyPortfolio = dynamic(() => import('@/components/features/portfolio/GalaxyPortfolio'), { ssr: false })