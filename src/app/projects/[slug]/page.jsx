import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  User,
  Tag,
  Clock,
  CheckCircle,
  PlayCircle,
  PauseCircle
} from 'lucide-react'
import { generateProjectSchema, generateCanonicalUrl, generateOpenGraphImage } from '@/lib/seo'
import { projectService } from '@/lib/services/projectService'

const StarField3D = dynamic(() => import('@/components/three/effects/StarField3D').then(mod => ({ default: mod.StarField3D })))
const ParticleField = dynamic(() => import('@/components/three/objects/ParticleField').then(mod => ({ default: mod.ParticleField })))
const Scene3D = dynamic(() => import('@/components/three/core/Scene3D').then(mod => ({ default: mod.Scene3D })))

export async function generateMetadata({ params }) {
  const { slug } = await params

  try {
    const response = await projectService.getProject(slug)
    const project = response.data?.project

    if (!project) {
      return {
        title: 'Project Not Found - SpaceTechs',
        description: 'The requested project could not be found.',
      }
    }

    const title = `${project.title} - SpaceTechs Project`
    const description = project.description || 'Explore this innovative project by SpaceTechs showcasing our expertise in web development, mobile apps, and technology solutions.'
    const image = project.images && project.images.length > 0 ? generateOpenGraphImage(project.images[0]) : 'https://spacetechs.net/images/og-projects-spacetechs.jpg'
    const url = generateCanonicalUrl(`/projects/${slug}`)

    return {
      title,
      description,
      keywords: [
        'SpaceTechs project',
        project.title,
        project.category?.name || 'Web Development',
        ...(project.technologies || []),
        'portfolio project',
        'case study',
        'web development project',
        'mobile app project'
      ],
      openGraph: {
        title,
        description,
        url,
        type: 'article',
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: project.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [image],
        creator: '@spacetechs',
      },
      alternates: {
        canonical: url,
      },
    }
  } catch (error) {
    console.error('Error generating project metadata:', error)
    return {
      title: 'SpaceTechs Projects - Web Development Portfolio',
      description: 'Explore our portfolio of innovative projects and solutions.',
    }
  }
}



const gridStyle = { transformStyle: 'preserve-3d', transform: 'rotateX(5deg)' };

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params

  let project = null
  try {
    const response = await projectService.getProject(slug)
    project = response.data?.project
  } catch (error) {
    console.error('Error fetching project:', error)
  }

  if (!project) {
    return notFound()
  }

  const projectSchema = generateProjectSchema(project)



  const statusIcons = {
    'Completed': <CheckCircle className="text-green-400" size={20} />,
    'Ongoing': <PlayCircle className="text-blue-400" size={20} />,
    'Paused': <PauseCircle className="text-yellow-400" size={20} />
  }

  const statusColors = {
    'Completed': 'bg-green-500/20 text-green-400 border-green-500/30',
    'Ongoing': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'Paused': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
  }

  return (
    <main className="text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <div className="fixed inset-0 -z-10 h-screen w-screen">
        <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-purple-900/10 to-cyan-900/10" />}>
          <Scene3D>
            <StarField3D count={900} />
            <ParticleField count={2000} />
          </Scene3D>
        </Suspense>
      </div>
      {/* Back Button */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800/50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 hover:scale-105 hover:translate-x-2"
            style={{
              filter: 'drop-shadow(0 4px 8px rgba(6, 182, 212, 0.2))'
            }}
          >
            <ArrowLeft size={20} />
            Back to Projects
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-6" style={{ perspective: '2000px' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" style={gridStyle}>
            {/* Project Info */}
            <div style={{ transform: 'translateZ(100px) rotateY(-10deg) rotateX(5deg)', transformStyle: 'preserve-3d' }} className=" hover:translateZ-20 transition-all duration-500 hover:rotateY(-15deg)">
              {/* Category & Status */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[#FAFAFF] font-medium">
                  {project.category?.name || 'Uncategorized'}
                </span>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${statusColors[project.status] || statusColors['Ongoing']}`}>
                  {statusIcons[project.status]}
                  {project.status}
                </div>
                {project.featured && (
                  <div className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </div>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ transform: 'translateZ(20px)', filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.5))' }}>
                <span className=" hover:scale-105 transition-transform duration-300 inline-block">
                  {project.title}
                </span>
              </h1>

              {/* Description */}
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {project.description}
              </p>

              {/* Meta Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {project.client && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <User size={18} />
                    <span>Client: {project.client}</span>
                  </div>
                )}
                {project.startDate && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar size={18} />
                    <span>
                      {new Date(project.startDate).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric'
                      })}
                      {project.endDate && (
                        <> - {new Date(project.endDate).toLocaleDateString('en-US', {
                          month: 'long',
                          year: 'numeric'
                        })}</>
                      )}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {project.liveDemoUrl && (
                  <Link
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold "
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </Link>
                )}
                {project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gray-800/50 border border-gray-700/50 text-white px-6 py-3 rounded-lg font-semibold hover:border-cyan-500/50 transition-colors"
                  >
                    <Github size={18} />
                    View Code
                  </Link>
                )}
              </div>
            </div>

            {/* Project Image */}
            <div className="relative" style={{ transform: 'translateZ(80px) rotateY(10deg) rotateX(-5deg)', transformStyle: 'preserve-3d' }}>
              {project.images && project.images.length > 0 ? (
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl hover:shadow-cyan-500/50 transition-all duration-500 hover:scale-110 hover:rotateY(15deg) hover:rotateX(-10deg)" style={{ filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 20px rgba(6, 182, 212, 0.3))' }}>
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-xl flex items-center justify-center shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 hover:scale-105" style={{ filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5))' }}>
                  <div className="text-8xl text-gray-600">🚀</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      {project.technologies && project.technologies.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
              <Tag className="text-[#273469]" size={28} />
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-800/50 border border-gray-700/50 text-gray-300 rounded-lg hover:border-cyan-500/50 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Project Gallery */}
      {project.images && project.images.length > 1 && (
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.images.slice(1).map((image, index) => (
                <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={`${project.title} - Image ${index + 2}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Videos Section */}
      {project.videos && project.videos.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Project Videos</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {project.videos.map((video, index) => (
                <div key={index} className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
                  <video
                    controls
                    className="w-full h-full object-cover"
                    poster={project.images?.[0]}
                  >
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Projects */}
      {/* {relatedProjects.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((relatedProject, index) => (
                <Link
                  key={relatedProject._id}
                  href={`/projects/${relatedProject.slug || relatedProject._id}`}
                  className="group block bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl overflow-hidden hover:border-cyan-500/30 transition-all duration-500"
                >
                  <div className="relative h-48 overflow-hidden">
                    {relatedProject.images && relatedProject.images.length > 0 ? (
                      <Image
                        src={relatedProject.images[0]}
                        alt={relatedProject.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-purple-600/20 flex items-center justify-center">
                        <div className="text-4xl text-gray-600">🚀</div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {relatedProject.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {relatedProject.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )} */}
    </main>
  )
}