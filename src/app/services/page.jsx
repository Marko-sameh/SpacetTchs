import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { FeatureGrid } from '@/components/FeatureGrid'
import { DetailedServices } from '@/components/DetailedServices'
import { ServiceStructuredData, BreadcrumbStructuredData, FAQStructuredData } from '@/components/SEO/StructuredData'

const StarField3D = dynamic(() => import('@/components/three/effects/StarField3D').then(mod => ({ default: mod.StarField3D })))
const Scene3D = dynamic(() => import('@/components/three/core/Scene3D'))

export const metadata = {
  title: 'Web Development Services - SpaceTechs | Mobile Apps, AI Solutions & Digital Marketing',
  description: 'Comprehensive web development services by SpaceTechs: custom website development, mobile app development, AI solutions, digital marketing, e-commerce development, and more. Professional web development company serving businesses worldwide.',
  keywords: [
    'web development services', 'mobile app development services', 'AI solutions services',
    'digital marketing services', 'custom website development', 'e-commerce development services',
    'React development services', 'Next.js development', 'React Native app development',
    'Flutter app development', 'Node.js development services', 'Python development services',
    'API development services', 'database design services', 'UI/UX design services',
    'SEO optimization services', 'social media marketing services', '3D web development services',
    'progressive web app development', 'cloud solutions services', 'DevOps services'
  ],
  openGraph: {
    title: 'Web Development Services - SpaceTechs | Mobile Apps, AI Solutions & Digital Marketing',
    description: 'Comprehensive web development services: custom websites, mobile apps, AI solutions, digital marketing, and more. Professional development services for businesses worldwide.',
    url: 'https://spacetechs.net/services',
    images: [
      {
        url: 'https://spacetechs.net/images/og-services-spacetechs.jpg',
        width: 1200,
        height: 630,
        alt: 'SpaceTechs Web Development Services',
      },
    ],
  },
  twitter: {
    title: 'Web Development Services - SpaceTechs | Mobile Apps, AI Solutions & Digital Marketing',
    description: 'Comprehensive web development services: custom websites, mobile apps, AI solutions, digital marketing, and more.',
  },
  alternates: {
    canonical: 'https://spacetechs.net/services',
  },
}

export default function ServicesPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://spacetechs.net' },
    { name: 'Services', url: 'https://spacetechs.net/services' }
  ]

  const faqs = [
    {
      question: 'What web development services do you offer?',
      answer: 'We offer custom website development, e-commerce solutions, web applications, API development, and responsive design using modern frameworks like React and Next.js.'
    },
    {
      question: 'How long does mobile app development take?',
      answer: 'Mobile app development typically takes 3-6 months depending on complexity. We develop for both iOS and Android using React Native and Flutter.'
    },
    {
      question: 'Do you provide AI solutions for businesses?',
      answer: 'Yes, we develop custom AI solutions including chatbots, machine learning models, data analysis tools, and automation systems tailored to your business needs.'
    },
    {
      question: 'What digital marketing services are included?',
      answer: 'Our digital marketing services include SEO optimization, social media campaigns, content marketing, email marketing, and performance analytics.'
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      <ServiceStructuredData serviceType="webDevelopment" />
      <BreadcrumbStructuredData items={breadcrumbs} />
      <FAQStructuredData faqs={faqs} />
      <div className="fixed inset-0 -z-10 h-screen w-screen">
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

        <DetailedServices />

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