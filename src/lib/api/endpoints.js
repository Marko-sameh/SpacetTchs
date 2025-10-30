/**
 * API Endpoints Configuration
 * Centralized endpoint definitions for better maintainability
 */

const API_VERSION = 'v1'

// Base endpoints
export const ENDPOINTS = Object.freeze({
  // Projects
  PROJECTS: {
    LIST: '/projects',
    DETAIL: (id) => `/projects/${id}`,
    FEATURED: '/projects?featured=true&sort=-createdAt',
    BY_CATEGORY: (categoryId) => `/projects?category=${categoryId}`,
    SEARCH: (query) => `/projects?search=${encodeURIComponent(query)}`
  },

  // Blogs
  BLOGS: {
    LIST: '/blogs',
    DETAIL: (id) => `/blogs/${id}`,
    FEATURED: '/blogs?featured=true&published=true&sort=-publishedAt',
    BY_CATEGORY: (categoryId) => `/blogs?category=${categoryId}&published=true`,
    SEARCH: (query) => `/blogs?search=${encodeURIComponent(query)}&published=true`
  },

  // Categories
  CATEGORIES: {
    LIST: '/categories',
    DETAIL: (id) => `/categories/${id}`
  },

  // Contact
  CONTACT: {
    SUBMIT: '/contact'
  },

  // Analytics (if needed)
  ANALYTICS: {
    TRACK: '/analytics/track',
    PERFORMANCE: '/analytics/performance'
  }
})

// Query parameter builders
export const buildQueryParams = (params = {}) => {
  const searchParams = new URLSearchParams()
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(v => searchParams.append(key, v))
      } else {
        searchParams.append(key, value)
      }
    }
  })
  
  const queryString = searchParams.toString()
  return queryString ? `?${queryString}` : ''
}

// Common query parameters
export const COMMON_PARAMS = Object.freeze({
  PAGINATION: {
    page: 1,
    limit: 10,
    sort: '-createdAt'
  },
  
  FILTERS: {
    published: true,
    featured: false
  }
})

// Request headers factory
export const createHeaders = (apiKey, additionalHeaders = {}) => ({
  'Content-Type': 'application/json',
  ...(apiKey && { 'X-API-Key': apiKey }),
  ...additionalHeaders
})

// URL builder utility
export const buildURL = (baseURL, endpoint, params = {}) => {
  const url = `${baseURL}${endpoint}`
  const queryString = buildQueryParams(params)
  return `${url}${queryString}`
}