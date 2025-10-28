import apiClient from '../apiClient'

export const categoryService = {
  getCategories: (params = {}) => apiClient.getCategories(params),
  getCategory: (id) => apiClient.getCategory(id)
}