import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import ProjectsGrid from '@/components/ui/ProjectsGrid'
import { projectService } from '@/lib/services/projectService'
import { categoryService } from '@/lib/services/categoryService'
import { ParticleField } from '@/components/three/objects/ParticleField'
import { BreadcrumbStructuredData } from '@/components/SEO/StructuredData'

const StarField3D = dynamic(() => import('@/components/three/effects/StarField3D').then(mod => ({ default: mod.StarField3D })))
const Scene3D = dynamic(() => import('@/components/three/core/Scene3D'))

export const metadata = {
  title: 'Our Projects - SpaceTechs Portfolio | Web Development & Mobile App Showcase',
  description: 'Explore SpaceTechs portfolio of innovative web development projects, mobile applications, AI solutions, and digital marketing campaigns. See our expertise in action with real client projects and case studies.',
  keywords: [
    'SpaceTechs projects',
    'web development portfolio',
    'mobile app portfolio',
    'AI solutions showcase',
    'digital marketing projects',
    'web development case studies',
    'mobile app development examples',
    'custom website projects',
    'React projects',
    'Next.js projects',
    'React Native apps',
    'Flutter apps',
    'portfolio showcase',
    'client projects',
    'web development work',
    'mobile development work'
  ],
  openGraph: {
    title: 'Our Projects - SpaceTechs Portfolio | Web Development & Mobile App Showcase',
    description: 'Explore SpaceTechs portfolio of innovative web development projects, mobile applications, AI solutions, and digital marketing campaigns.',
    url: 'https://spacetechs.net/projects',
    images: [
      {
        url: 'https://spacetechs.net/images/og-projects-spacetechs.jpg',
        width: 1200,
        height: 630,
        alt: 'SpaceTechs Projects Portfolio',
      },
    ],
  },
  twitter: {
    title: 'Our Projects - SpaceTechs Portfolio | Web Development & Mobile App Showcase',
    description: 'Explore SpaceTechs portfolio of innovative web development projects, mobile applications, AI solutions, and digital marketing campaigns.',
  },
  alternates: {
    canonical: 'https://spacetechs.net/projects',
  },
}

async function getProjectsData() {
  try {
    const [projectsResponse, categoriesResponse] = await Promise.all([
      projectService.getProjects({ sort: '-createdAt' }),
      categoryService.getCategories()
    ])

    return {
      projects: projectsResponse.data?.projects || [],
      categories: categoriesResponse.data?.categories || []
    }
  } catch (error) {
    console.error('Failed to fetch projects data:', error)
    // Return mock data when API is not available
    return {
      projects: [
        {
          _id: '1',
          title: 'AI Dashboard',
          slug: 'ai-dashboard',
          description: 'Advanced machine learning analytics platform with real-time data visualization and predictive modeling capabilities.',
          category: { _id: '1', name: 'Artificial Intelligence' },
          technologies: ['React', 'Python', 'TensorFlow', 'MongoDB'],
          status: 'Completed',
          featured: true,
          images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'],
          githubUrl: 'https://github.com/example/ai-dashboard',
          liveDemoUrl: 'https://ai-dashboard-demo.vercel.app',
          startDate: '2024-01-15',
          endDate: '2024-06-30',
          createdAt: '2024-01-15T00:00:00.000Z'
        },
        {
          _id: '2',
          title: 'E-Commerce Platform',
          slug: 'ecommerce-platform',
          description: 'Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.',
          category: { _id: '2', name: 'Web Development' },
          technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
          status: 'Ongoing',
          featured: true,
          images: ['https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop'],
          githubUrl: 'https://github.com/example/ecommerce',
          startDate: '2024-03-01',
          createdAt: '2024-03-01T00:00:00.000Z'
        },
        {
          _id: '3',
          title: 'Mobile Banking App',
          slug: 'mobile-banking-app',
          description: 'Secure mobile banking application with biometric authentication and real-time transaction monitoring.',
          category: { _id: '3', name: 'Mobile Development' },
          technologies: ['React Native', 'Firebase', 'Node.js', 'JWT'],
          status: 'Completed',
          featured: false,
          images: ['https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop'],
          client: 'FinTech Corp',
          startDate: '2023-09-01',
          endDate: '2024-02-15',
          createdAt: '2023-09-01T00:00:00.000Z'
        }
      ],
      categories: [
        { _id: '1', name: 'Artificial Intelligence', slug: 'ai' },
        { _id: '2', name: 'Web Development', slug: 'web-dev' },
        { _id: '3', name: 'Mobile Development', slug: 'mobile-dev' }
      ]
    }
  }
}

export default async function ProjectsPage() {
  const { projects, categories } = await getProjectsData()
  console.log(projects);

  const breadcrumbs = [
    { name: 'Home', url: 'https://spacetechs.net' },
    { name: 'Projects', url: 'https://spacetechs.net/projects' }
  ]

  return (
    <main className="text-white">
      <BreadcrumbStructuredData items={breadcrumbs} />
      <div className="fixed inset-0 -z-10 h-screen w-screen">
        <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-purple-900/10 to-cyan-900/10" />}>
          <Scene3D>
            <StarField3D count={10000} speed={0.08} />
            <ParticleField count={2000} />
          </Scene3D>
        </Suspense>
      </div>
      {/* Hero Section */}
      <section className="pt-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">

              Our Projects

            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our portfolio of innovative solutions, cutting-edge applications,
              and transformative digital experiences that push the boundaries of technology.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#273469] mb-2">
                {projects.length}
              </div>
              <div className="text-gray-400">Total Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#E4D9FF] mb-2">
                {projects.filter(p => p.status === 'Completed').length}
              </div>
              <div className="text-gray-400">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#FAFAFF] mb-2">
                {categories.length}
              </div>
              <div className="text-gray-400">Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ProjectsGrid
            initialProjects={projects}
            categories={categories}
          />
        </div>
      </section>
    </main>
  )
}