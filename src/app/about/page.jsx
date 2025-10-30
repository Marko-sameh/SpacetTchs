import AboutClient from './AboutClient'
import { BreadcrumbStructuredData, FAQStructuredData } from '@/components/SEO/StructuredData'

export const metadata = {
  title: 'About SpaceTechs - Leading Web Development Company | Our Story & Expertise',
  description: 'Learn about SpaceTechs, a premier web development company with expertise in custom websites, mobile app development, AI solutions, and digital marketing. Discover our mission to transform businesses through innovative technology.',
  keywords: [
    'about SpaceTechs', 'web development company story', 'mobile app development expertise',
    'AI solutions provider background', 'digital marketing agency team', 'custom web development company',
    'professional web developers', 'mobile app developers', 'AI specialists', 'digital marketing experts',
    'web development services team', 'technology company background', 'software development expertise'
  ],
  openGraph: {
    title: 'About SpaceTechs - Leading Web Development Company | Our Story & Expertise',
    description: 'Learn about SpaceTechs, a premier web development company with expertise in custom websites, mobile app development, AI solutions, and digital marketing.',
    url: 'https://spacetechs.net/about',
    images: [
      {
        url: 'https://spacetechs.net/images/og-about-spacetechs-team.jpg',
        width: 1200,
        height: 630,
        alt: 'SpaceTechs Team - Web Development Company',
      },
    ],
  },
  twitter: {
    title: 'About SpaceTechs - Leading Web Development Company | Our Story & Expertise',
    description: 'Learn about SpaceTechs, a premier web development company with expertise in custom websites, mobile app development, AI solutions, and digital marketing.',
  },
  alternates: {
    canonical: 'https://spacetechs.net/about',
  },
}

const services = [
  {
    title: 'Custom Web Development',
    description: 'We design and build fully custom websites — no templates, no limits.',
    features: ['Speed: Optimized for your exact needs', 'Uniqueness: 100% tailored design', 'Security: Built with best practices', 'Scalability: Easy to grow']
  },
  {
    title: 'Mobile App Development',
    description: 'From idea to launch, we create sleek, high-performance apps for Android and iOS.',
    features: ['Lightning-fast performance', 'Intuitive user experiences', 'Integration with web systems', 'Long-term support']
  },
  {
    title: 'AI & Automation',
    description: 'Turn your business into a smart, data-driven machine.',
    features: ['Smart chatbots', 'Predictive analytics', 'Automated workflows', 'Personalized recommendations']
  },
  {
    title: 'Digital Marketing',
    description: 'We don\'t just build — we help you grow.',
    features: ['Social Media Campaigns', 'SEO Optimization', 'Branding & Creative Content', 'Email & Ads Management']
  }
]

const whyUs = [
  { title: 'Speed + Precision', description: 'We combine speed with perfection — delivering products that are fast, clean, and flawless.' },
  { title: 'Innovation-Driven', description: 'Our solutions are guided by the latest tech — from AI automation to modern frameworks.' },
  { title: 'Client-Centered', description: 'We treat every project as a partnership — understanding your goals deeply.' }
]

export default function AboutPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://spacetechs.net' },
    { name: 'About', url: 'https://spacetechs.net/about' }
  ]

  const faqs = [
    {
      question: 'What makes SpaceTechs different from other web development companies?',
      answer: 'We combine cutting-edge technology with personalized service, offering custom solutions without templates, AI-powered features, and comprehensive digital marketing support.'
    },
    {
      question: 'How long has SpaceTechs been in business?',
      answer: 'SpaceTechs was founded in 2020 and has been delivering innovative web development, mobile apps, and AI solutions to clients worldwide.'
    },
    {
      question: 'Do you work with startups or only established companies?',
      answer: 'We work with businesses of all sizes, from startups to enterprise companies, providing scalable solutions that grow with your business.'
    }
  ]

  return (
    <>
      <BreadcrumbStructuredData items={breadcrumbs} />
      <FAQStructuredData faqs={faqs} />
      <AboutClient services={services} whyUs={whyUs} />
    </>
  )
}