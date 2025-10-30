import apiClient from '../api/client'

export const projectService = {
  getProjects: (params = {}) => apiClient.getProjects(params),
  getProject: (id) => apiClient.getProject(id),
  getFeaturedProjects: () => apiClient.getFeaturedProjects(),
  getProjectsByCategory: (categoryId, params = {}) => apiClient.getProjectsByCategory(categoryId, params)
}