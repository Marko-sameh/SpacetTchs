'use client'

import { use, Suspense } from 'react'
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
import { useBlog, useBlogs } from '@/hooks/useBlogs'

const StarField3D = dynamic(() => import('@/components/3d/StarField3D').then(mod => ({ default: mod.StarField3D })))
const ParticleField = dynamic(() => import('@/components/3d/ParticleField').then(mod => ({ default: mod.ParticleField })), { ssr: false })
const Scene3D = dynamic(() => import('@/components/3d/Scene3D').then(mod => ({ default: mod.Scene3D })), { ssr: false })

export default function BlogDetailPage({ params }) {
  const { slug } = use(params)
  const { data: blogData, isLoading, error } = useBlog(slug)
  const { data: relatedData } = useBlogs({ limit: 3 })

  if (isLoading) {
    return (
      <main className="text-white flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading blog post...</p>
        </div>
      </main>
    )
  }

  const blog = blogData?.data?.blog || blogData?.data
  if (error || !blog) {
    return notFound()
  }

  const relatedBlogs = relatedData?.data?.blogs?.filter(b => b?._id && b._id !== blog._id)?.slice(0, 3) || []

  return (
    <main className="text-white">
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