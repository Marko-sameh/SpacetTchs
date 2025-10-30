import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import {
  ArrowLeft,
  Calendar,
  User,
  Tag
} from 'lucide-react'
import { generateBlogPostSchema, generateCanonicalUrl, generateOpenGraphImage } from '@/lib/seo'
import { blogService } from '@/lib/services/blogService'

const StarField3D = dynamic(() => import('@/components/three/effects/StarField3D').then(mod => ({ default: mod.StarField3D })))
const ParticleField = dynamic(() => import('@/components/three/objects/ParticleField').then(mod => ({ default: mod.ParticleField })))
const Scene3D = dynamic(() => import('@/components/three/core/Scene3D').then(mod => ({ default: mod.Scene3D })))

export async function generateMetadata({ params }) {
  const { slug } = await params

  try {
    const response = await blogService.getBlog(slug)
    const blog = response.data?.blog || response.data

    if (!blog) {
      return {
        title: 'Blog Post Not Found - SpaceTechs',
        description: 'The requested blog post could not be found.',
      }
    }

    const title = `${blog.title} - SpaceTechs Blog`
    const description = blog.summary || blog.description || 'Read the latest insights from SpaceTechs on web development, mobile apps, AI solutions, and digital marketing.'
    const image = blog.coverImage ? generateOpenGraphImage(blog.coverImage) : 'https://spacetechs.net/images/og-blog-spacetechs.jpg'
    const url = generateCanonicalUrl(`/blog/${slug}`)

    return {
      title,
      description,
      keywords: [
        'SpaceTechs blog',
        'web development blog',
        'mobile app development insights',
        'AI solutions articles',
        'digital marketing tips',
        ...(blog.tags || []),
        blog.category?.name || 'Technology'
      ],
      authors: [{ name: blog.author || 'SpaceTechs Team' }],
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
            alt: blog.title,
          },
        ],
        publishedTime: blog.createdAt || blog.datePublished,
        modifiedTime: blog.updatedAt || blog.dateModified,
        authors: [blog.author || 'SpaceTechs Team'],
        section: blog.category?.name || 'Technology',
        tags: blog.tags || [],
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
    console.error('Error generating blog metadata:', error)
    return {
      title: 'SpaceTechs Blog - Web Development, Mobile Apps, AI Solutions',
      description: 'Read the latest insights from SpaceTechs on web development, mobile apps, AI solutions, and digital marketing.',
    }
  }
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params

  let blog = null
  try {
    const response = await blogService.getBlog(slug)
    blog = response.data?.blog || response.data
  } catch (error) {
    console.error('Error fetching blog:', error)
  }

  if (!blog) {
    return notFound()
  }

  const blogSchema = generateBlogPostSchema(blog)

  return (
    <main className="text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <div className="fixed inset-0 -z-10 h-screen w-screen">
        <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-purple-900/10 to-cyan-900/10" />} suppressHydrationWarning>
          <Scene3D>
            <StarField3D count={900} />
            <ParticleField count={2000} />
          </Scene3D>
        </Suspense>
      </div>

      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
        </div>
      </div>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="text-cyan-400 font-medium">
              {blog.category?.name || 'Uncategorized'}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {blog.title}
            </span>
          </h1>

          {blog.summary && (
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {blog.summary}
            </p>
          )}

          <div className="flex items-center gap-6 mb-8 text-gray-400">
            {blog.author && (
              <div className="flex items-center gap-2">
                <User size={18} />
                <span>{blog.author}</span>
              </div>
            )}
            {blog.createdAt && (
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>
                  {new Date(blog.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
            )}
          </div>

          {blog.coverImage && (
            <div className="relative aspect-video rounded-xl overflow-hidden mb-12">
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                className="object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg prose-invert max-w-4xl prose-headings:text-white prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-cyan-400 prose-a:hover:text-cyan-300 prose-strong:text-white prose-code:text-cyan-400 prose-code:bg-gray-800/50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-blockquote:border-l-cyan-500 prose-blockquote:bg-gray-800/30 prose-blockquote:p-4 prose-blockquote:rounded-r prose-ul:text-gray-300 prose-ol:text-gray-300 prose-li:marker:text-cyan-400 break-words overflow-wrap-anywhere">
            {blog.content ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: typeof blog.content === 'string' ? blog.content : 'Invalid content format'
                }}
                onError={() => console.warn('Failed to render blog content')}
              />
            ) : (
              <p className="text-gray-300 leading-relaxed">
                {blog.description || 'Content not available.'}
              </p>
            )}
          </div>

          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Tag className="text-cyan-400" size={20} />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-800/50 border border-gray-700/50 text-gray-300 rounded-lg text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>


    </main>
  )
}