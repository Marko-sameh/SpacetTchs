import HomeClient from './HomeClient'

export const metadata = {
  title: 'SpaceTechs - Premier Web Development Company | Custom Websites & Mobile Apps',
  description: 'SpaceTechs is a leading web development company specializing in custom websites, mobile app development, AI solutions, and digital marketing. Get cutting-edge web development services, mobile applications, and AI-powered solutions for your business.',
  keywords: [
    'web development company', 'mobile app development', 'AI solutions provider', 'digital marketing agency',
    'custom websites and mobile apps', 'SpaceTechs', 'spacetechs.net', 'web development services',
    'professional web development', 'mobile application development', 'artificial intelligence solutions',
    'digital marketing services', 'custom web development', 'responsive web design', 'e-commerce development'
  ],
  openGraph: {
    title: 'SpaceTechs - Premier Web Development Company | Custom Websites & Mobile Apps',
    description: 'Leading web development company specializing in custom websites, mobile app development, AI solutions, and digital marketing. Transform your business with cutting-edge technology.',
    url: 'https://spacetechs.net',
    images: [
      {
        url: 'https://spacetechs.net/images/og-spacetechs-web-development.jpg',
        width: 1200,
        height: 630,
        alt: 'SpaceTechs - Web Development Company Services',
      },
    ],
  },
  twitter: {
    title: 'SpaceTechs - Premier Web Development Company | Custom Websites & Mobile Apps',
    description: 'Leading web development company specializing in custom websites, mobile app development, AI solutions, and digital marketing.',
  },
  alternates: {
    canonical: 'https://spacetechs.net',
  },
}

export default function HomePage() {
  return <HomeClient />
}