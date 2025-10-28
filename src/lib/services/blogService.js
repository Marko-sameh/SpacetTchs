import apiClient from '../apiClient'

export const blogService = {
  getBlogs: (params = {}) => apiClient.getBlogs(params),
  getBlog: (id) => apiClient.getBlog(id),
  getFeaturedBlogs: () => apiClient.getFeaturedBlogs(),
  getBlogsByCategory: (categoryId, params = {}) => apiClient.getBlogsByCategory(categoryId, params)
}