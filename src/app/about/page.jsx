import AboutClient from './AboutClient'

export const metadata = {
  title: 'About - SpaceTechs',
  description: 'We build the future, one pixel at a time. Digital engineers crafting custom websites, mobile apps, AI systems, and marketing strategies.'
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
  return <AboutClient services={services} whyUs={whyUs} />
}