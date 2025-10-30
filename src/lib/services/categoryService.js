import apiClient from '../api/client'

export const categoryService = {
  getCategories: (params = {}) => apiClient.getCategories(params),
  getCategory: (id) => apiClient.getCategory(id)
}