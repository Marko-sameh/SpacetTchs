'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'
import ProjectCard from './ProjectCard'
import BlogCard from './BlogCard'
import apiClient from '@/lib/apiClient'

export default function FeaturedSection() {
  const [featuredProjects, setFeaturedProjects] = useState([])
  const [featuredBlogs, setFeaturedBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedContent = async () => {
      try {
        const [projectsResponse, blogsResponse] = await Promise.all([
          apiClient.getFeaturedProjects(),
          apiClient.getFeaturedBlogs()
        ])

        setFeaturedProjects(projectsResponse.data?.projects?.slice(0, 3) || [])
        setFeaturedBlogs(blogsResponse.data?.blogs?.slice(0, 3) || [])
      } catch (error) {
        console.error('Failed to fetch featured content:', error)
        // Set mock data when API is not available
        setFeaturedProjects([
          {
            _id: '1',
            title: 'AI Dashboard',
            slug: 'ai-dashboard',
            description: 'Advanced machine learning analytics platform',
            category: { name: 'AI' },
            technologies: ['React', 'Python', 'TensorFlow'],
            status: 'Completed',
            featured: true,
            images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'],
            githubUrl: 'https://github.com/example/ai-dashboard',
            liveDemoUrl: 'https://ai-dashboard-demo.vercel.app'
          }
        ])
        setFeaturedBlogs([])
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedContent()
  }, [])

  if (loading) {
    return (
      <section className="py-20 px-6 bg-gray-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-6 bg-gray-900/20">
      <div className="max-w-7xl mx-auto">
        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-between mb-12"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="flex items-center gap-3">
                    <Star className="text-cyan-400" size={40} />
                    <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                      Featured Projects
                    </span>
                  </span>
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl">
                  Discover our most innovative and impactful projects that showcase
                  our expertise and creativity.
                </p>
              </div>

              <Link
                href="/projects"
                className="hidden md:inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors group"
              >
                View All Projects
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  index={index}
                />
              ))}
            </div>

            <div className="text-center mt-8 md:hidden">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
              >
                View All Projects
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        )}

        {/* Featured Blogs */}
        {featuredBlogs.length > 0 && (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-between mb-12"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="flex items-center gap-3">
                    <Star className="text-purple-400" size={40} />
                    <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                      Featured Articles
                    </span>
                  </span>
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl">
                  Read our latest insights, tutorials, and thoughts on technology,
                  development, and innovation.
                </p>
              </div>

              <Link
                href="/blog"
                className="hidden md:inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors group"
              >
                View All Articles
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredBlogs.map((blog, index) => (
                <BlogCard
                  key={blog._id}
                  blog={blog}
                  index={index}
                />
              ))}
            </div>

            <div className="text-center mt-8 md:hidden">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
              >
                View All Articles
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        )}

        {/* Empty State */}
        {featuredProjects.length === 0 && featuredBlogs.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="text-2xl font-semibold text-white mb-2">No Featured Content</h3>
            <p className="text-gray-400">Featured projects and articles will appear here when available.</p>
          </div>
        )}
      </div>
    </section>
  )
}