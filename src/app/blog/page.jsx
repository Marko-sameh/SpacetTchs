'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useBlogs } from '@/hooks/useBlogs'
import { motion } from 'framer-motion'
import { BlogSkeleton } from '@/components/ui/common/LoadingSkeleton'

const StarField3D = dynamic(() => import('@/components/three/effects/StarField3D').then(mod => ({ default: mod.StarField3D })))

const ParticleField = dynamic(() => import('@/components/three/objects/ParticleField').then(mod => ({ default: mod.ParticleField })), { ssr: false })
const Scene3D = dynamic(() => import('@/components/three/core/Scene3D').then(mod => ({ default: mod.Scene3D })), { ssr: false })

function BlogCard({ blog, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 p-6 rounded-xl hover:border-cyan-500/30 hover:scale-105 transition-all duration-500"
    >
      {blog.coverImage && (
        <div className="h-48 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-lg mb-4 overflow-hidden">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="flex items-center gap-2 mb-3">
        {blog.featured && (
          <span className="px-2 py-1 bg-gradient-to-r from-[#273469] to-[#E4D9FF] text-white text-xs rounded-full">
            Featured
          </span>
        )}
        <span className="text-white/60 text-sm">{blog.category?.name}</span>
      </div>
      <Link href={`/blog/${blog._id}`} className="block">
        <h3 className="text-xl font-bold ">{blog.title}</h3>
      </Link>
      <p className="text-white/70 mb-4 line-clamp-3">{blog.summary}</p>
      <div className="flex items-center justify-between">
        <span className="text-white/60 text-sm">{blog.author}</span>
        <span className="text-white/60 text-sm">
          {new Date(blog.createdAt).toLocaleDateString()}
        </span>
      </div>
      {blog.tags && (
        <div className="flex flex-wrap gap-2 mt-3">
          {blog.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.article>
  )
}

function BlogsContent() {
  const { data, isLoading, error } = useBlogs({
    sort: '-createdAt',
    limit: 20
  })

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <BlogSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="glass p-8 rounded-2xl inline-block">
          <p className="text-red-400 mb-4">Failed to load blog posts</p>
          <p className="text-white/60 text-sm">{error.message}</p>
        </div>
      </div>
    )
  }

  const blogs = data?.data?.blogs || []

  if (blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="glass p-8 rounded-2xl inline-block">
          <p className="text-white/80 text-lg">No blog posts found</p>
          <p className="text-white/60 text-sm mt-2">Check back later for new content</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog, index) => (
        <BlogCard key={blog._id || blog.id} blog={blog} index={index} />
      ))}
    </div>
  )
}

export default function BlogPage() {
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
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Blogs
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Insights, tutorials, and thoughts on technology and development
            </p>
          </div>

          <BlogsContent />
        </div>
      </section>
    </main>
  )
}