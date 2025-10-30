'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, Eye, Heart, User } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function BlogCard({ blog, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl overflow-hidden hover:border-cyan-500/30 transition-all duration-500"
    >
      {/* Blog Cover Image */}
      <div className="relative h-48 overflow-hidden">
        {blog.coverImage ? (
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-purple-600/20 flex items-center justify-center">
            <div className="text-6xl text-gray-600">📝</div>
          </div>
        )}
        
        {/* Featured Badge */}
        {blog.featured && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </div>
        )}

        {/* Published Status */}
        {!blog.published && (
          <div className="absolute top-4 left-4 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-3 py-1 rounded-full text-sm font-medium">
            Draft
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category & Meta */}
        <div className="flex items-center gap-2 mb-3 text-sm">
          <span className="text-cyan-400 font-medium">
            {blog.category?.name || 'Uncategorized'}
          </span>
          <span className="text-gray-500">•</span>
          <div className="flex items-center gap-1 text-gray-400">
            <User size={12} />
            <span>{blog.author}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
          {blog.title}
        </h3>

        {/* Summary */}
        {blog.summary && (
          <p className="text-gray-300 text-sm mb-4 line-clamp-3">
            {blog.summary}
          </p>
        )}

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-md border border-gray-700/50"
              >
                #{tag}
              </span>
            ))}
            {blog.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-800/50 text-gray-400 text-xs rounded-md border border-gray-700/50">
                +{blog.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>
                {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{blog.readTime || 5} min read</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Eye size={14} />
              <span>{blog.views || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart size={14} />
              <span>{blog.likes || 0}</span>
            </div>
          </div>
        </div>

        {/* Read More Link */}
        <Link
          href={`/blog/${blog.slug || blog._id}`}
          className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors"
        >
          Read More →
        </Link>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.article>
  )
}