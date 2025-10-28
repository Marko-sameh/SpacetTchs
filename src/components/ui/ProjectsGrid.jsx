'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Grid, List, ChevronDown } from 'lucide-react'
import ProjectCard from './ProjectCard'



export default function ProjectsGrid({ initialProjects = [], categories: serverCategories = [] }) {
  const [projects, setProjects] = useState(initialProjects)
  const [filteredProjects, setFilteredProjects] = useState(initialProjects)
  const [loading, setLoading] = useState(false)

  // Extract unique categories from projects (client-side)
  const [clientCategories, setClientCategories] = useState([])

  useEffect(() => {
    const uniqueCategories = projects.reduce((acc, project) => {
      if (project?.category?.name) {
        const categoryName = project.category.name
        if (!acc.includes(categoryName)) {
          acc.push(categoryName)
        }
      }
      return acc
    }, [])
    setClientCategories(uniqueCategories)
  }, [projects])

  const categories = clientCategories.length > 0 ? clientCategories : serverCategories.map(c => c.name)

  // Filters and sorting
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [sortBy, setSortBy] = useState('-createdAt')
  const [viewMode, setViewMode] = useState('grid')

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(9)

  // Update projects when initialProjects changes
  useEffect(() => {
    setProjects(initialProjects)
  }, [initialProjects])

  // Filter and sort projects
  useEffect(() => {
    let filtered = [...projects]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project?.technologies?.some(tech =>
          tech?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => {
        const categoryName = project?.category?.name
        return categoryName === selectedCategory
      })
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(project => project?.status === selectedStatus)
    }

    // Sort
    filtered.sort((a, b) => {
      try {
        switch (sortBy) {
          case 'title':
            return (a.title || '').localeCompare(b.title || '')
          case '-title':
            return (b.title || '').localeCompare(a.title || '')
          case 'createdAt':
            return new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
          case '-createdAt':
            return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
          case 'featured':
            return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
          default:
            return 0
        }
      } catch {
        return 0
      }
    })

    setFilteredProjects(filtered)
    setCurrentPage(1)
  }, [projects, searchTerm, selectedCategory, selectedStatus, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="space-y-8">
      {/* Filters and Controls */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
              >
                <option value="all">All Categories</option>
                {categories.map((categoryName, index) => (
                  <option key={index} value={categoryName}>
                    {categoryName}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
              >
                <option value="all">All Status</option>
                <option value="Completed">Completed</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Paused">Paused</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
              >
                <option value="-createdAt">Newest First</option>
                <option value="createdAt">Oldest First</option>
                <option value="title">A-Z</option>
                <option value="-title">Z-A</option>
                <option value="featured">Featured First</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>

            {/* View Mode */}
            <div className="flex bg-gray-800/50 border border-gray-700/50 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${viewMode === 'grid'
                  ? 'bg-cyan-500 text-white'
                  : 'text-gray-400 hover:text-white'
                  }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${viewMode === 'list'
                  ? 'bg-cyan-500 text-white'
                  : 'text-gray-400 hover:text-white'
                  }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-gray-400 text-sm">
          Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProjects.length)} of {filteredProjects.length} projects
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
        </div>
      ) : paginatedProjects.length > 0 ? (
        <div className={`grid gap-6 ${viewMode === 'grid'
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          : 'grid-cols-1'
          }`}>
          {paginatedProjects.map((project, index) => (
            <ProjectCard
              key={project._id}
              project={project}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
          <p className="text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-cyan-500/50 transition-colors"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-lg transition-colors ${currentPage === page
                ? 'bg-cyan-500 text-white'
                : 'bg-gray-800/50 border border-gray-700/50 text-white hover:border-cyan-500/50'
                }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-cyan-500/50 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}