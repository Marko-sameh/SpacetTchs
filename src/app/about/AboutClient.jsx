'use client'

import { Suspense } from 'react'
import React from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Code, Smartphone, Bot, TrendingUp, Zap, Users, Award, Target, Palette, Shield, Gauge, Lightbulb } from 'lucide-react'

const StarField3D = dynamic(() => import('@/components/three/effects/StarField3D').then(mod => ({ default: mod.StarField3D })))
const ParticleField = dynamic(() => import('@/components/three/objects/ParticleField').then(mod => ({ default: mod.ParticleField })), { ssr: false })
const Scene3D = dynamic(() => import('@/components/three/core/Scene3D').then(mod => ({ default: mod.Scene3D })), { ssr: false })

export default function AboutClient({ services, whyUs }) {
  const serviceIcons = [Code, Smartphone, Bot, TrendingUp]
  const whyUsIcons = [Zap, Lightbulb, Users]

  return (
    <main className="text-white">
      <div className="fixed inset-0 -z-10 h-screen w-screen">
        <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-purple-900/10 to-cyan-900/10" />}>
          <Scene3D>
            <StarField3D count={900} />
            <ParticleField count={2000} />
          </Scene3D>
        </Suspense>
      </div>

      <section className="pt-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">

              About

            </h1>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
              We build the future, one pixel at a time.
            </p>
            <p className="text-xl text-gray-400 max-w-5xl mx-auto">
              At SpaceTechs, we're not just developers — we're digital engineers shaping the next generation of experiences.
              We craft custom websites, mobile apps, AI-powered systems, and digital marketing strategies that don't just look great — they perform brilliantly.
            </p>
          </motion.div>

          {/* Core Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-4xl font-bold text-center mb-12">

              🌐 Our Core Services

            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8 hover:border-cyan-500/50 transition-colors"
                >
                  <div className="flex items-center mb-4">
                    {React.createElement(serviceIcons[index], { className: "w-8 h-8 mr-4 text-cyan-400" })}
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                  </div>
                  <p className="text-gray-300 mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-400">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Why SpaceTechs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-20"
          >
            <h2 className="text-4xl font-bold text-center mb-12">
              🌟 Why SpaceTechs?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {whyUs.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  className="text-center p-8 bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl hover:border-cyan-500/50 transition-colors"
                >
                  {React.createElement(whyUsIcons[index], { className: "w-12 h-12 mx-auto mb-4 text-cyan-400" })}
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-center bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-500/20 rounded-2xl p-12"
          >
            <h2 className="text-4xl font-bold mb-6">
              🛰️ Our Mission
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              To bridge creativity and technology, creating digital experiences that inspire, perform, and evolve.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}