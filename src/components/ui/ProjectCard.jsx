'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Calendar, User } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function ProjectCard({ project, index = 0 }) {
  const statusColors = {
    'Completed': 'bg-green-500/20 text-green-400 border-green-500/30',
    'Ongoing': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'Paused': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl overflow-hidden hover:border-cyan-500/30 transition-all duration-500"
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        {project.images && project.images.length > 0 ? (
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-purple-600/20 flex items-center justify-center">
            <div className="text-6xl text-gray-600">🚀</div>
          </div>
        )}

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </div>
        )}

        {/* Status Badge */}
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium border ${statusColors[project.status] || statusColors['Ongoing']}`}>
          {project.status}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-cyan-400 text-sm font-medium">
            {project.category?.name || 'Uncategorized'}
          </span>
          {project.client && (
            <>
              <span className="text-gray-500">•</span>
              <div className="flex items-center gap-1 text-gray-400 text-sm">
                <User size={12} />
                <span>{project.client}</span>
              </div>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies?.slice(0, 3).map((tech, idx) => {
            if (!tech) return null;
            return (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-md border border-gray-700/50"
              >
                {tech}
              </span>
            );
          })}
          {project.technologies?.length > 3 && (
            <span className="px-2 py-1 bg-gray-800/50 text-gray-400 text-xs rounded-md border border-gray-700/50">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        {/* Date */}
        {project.startDate && (
          <div className="flex items-center gap-1 text-gray-400 text-sm mb-4">
            <Calendar size={14} />
            <span>
              {(() => {
                try {
                  const startDate = new Date(project.startDate).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric'
                  });
                  const endDate = project.endDate ? new Date(project.endDate).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric'
                  }) : null;
                  return endDate ? `${startDate} - ${endDate}` : startDate;
                } catch {
                  return 'Date unavailable';
                }
              })()}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Link
            href={`/projects/${project._id}`}
            className="text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors"
          >
            View Details →
          </Link>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github size={18} />
              </a>
            )}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  )
}