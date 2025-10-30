import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { ContactForm } from '@/components/ContactForm'
import { LocalBusinessStructuredData } from '@/components/SEO/StructuredData'

const ParticleField = dynamic(() => import('@/components/three/objects/ParticleField').then(mod => ({ default: mod.ParticleField })))
const Scene3D = dynamic(() => import('@/components/three/core/Scene3D').then(mod => ({ default: mod.Scene3D })))

export const metadata = {
  title: 'Contact SpaceTechs - Web Development Company | Get Free Quote for Your Project',
  description: 'Contact SpaceTechs for professional web development services, mobile app development, AI solutions, and digital marketing. Get a free quote for your custom website or mobile app project. Located in San Francisco, serving clients worldwide.',
  keywords: [
    'contact SpaceTechs', 'web development company contact', 'mobile app development quote',
    'AI solutions consultation', 'digital marketing consultation', 'custom website quote',
    'web development consultation', 'mobile app development consultation', 'free project quote',
    'web development company San Francisco', 'contact web developers', 'hire web developers',
    'custom web development quote', 'mobile app development cost', 'web development services contact'
  ],
  openGraph: {
    title: 'Contact SpaceTechs - Web Development Company | Get Free Quote for Your Project',
    description: 'Contact SpaceTechs for professional web development services, mobile app development, AI solutions, and digital marketing. Get a free quote for your project.',
    url: 'https://spacetechs.net/contact',
    images: [
      {
        url: 'https://spacetechs.net/images/og-contact-spacetechs.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact SpaceTechs - Web Development Company',
      },
    ],
  },
  twitter: {
    title: 'Contact SpaceTechs - Web Development Company | Get Free Quote for Your Project',
    description: 'Contact SpaceTechs for professional web development services, mobile app development, AI solutions, and digital marketing.',
  },
  alternates: {
    canonical: 'https://spacetechs.net/contact',
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      <LocalBusinessStructuredData />
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-purple-900/10 to-cyan-900/10" />}>
          <Scene3D>
            <ParticleField count={2000} />
          </Scene3D>
        </Suspense>
      </div>

      <div className="relative z-10 container-responsive py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-responsive-5xl sm:text-responsive-6xl lg:text-responsive-7xl font-bold  mb-4 sm:mb-6 font-display">
            Contact
          </h1>
          <p className="text-responsive-lg sm:text-responsive-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Ready to bring your ideas to life? Let's discuss your next project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          <div className="order-2 lg:order-1">
            <ContactForm />
          </div>

          <div className="space-y-4 sm:space-y-6 lg:space-y-8 order-1 lg:order-2">
            <div className="glass p-4 sm:p-6 rounded-xl sm:rounded-2xl">
              <h3 className="text-responsive-xl sm:text-responsive-2xl font-semibold text-white mb-3 sm:mb-4 font-display">Let's Connect</h3>
              <div className="space-y-3 sm:space-y-4 text-white/70">
                <p className="text-responsive-sm sm:text-responsive-base flex items-center gap-2">
                  <span>📧</span> contact@spacetechs.net
                </p>
                <p className="text-responsive-sm sm:text-responsive-base flex items-center gap-2">
                  <span>📱</span> +1 (555) 123-4567
                </p>
                <p className="text-responsive-sm sm:text-responsive-base flex items-center gap-2">
                  <span>📍</span> San Francisco, CA
                </p>
              </div>
            </div>

            <div className="glass p-4 sm:p-6 rounded-xl sm:rounded-2xl">
              <h3 className="text-responsive-xl sm:text-responsive-2xl font-semibold text-white mb-3 sm:mb-4 font-display">Response Time</h3>
              <p className="text-responsive-sm sm:text-responsive-base text-white/70 leading-relaxed">
                I typically respond within 24 hours. For urgent projects,
                feel free to call directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}