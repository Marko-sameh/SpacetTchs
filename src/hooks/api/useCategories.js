import { useQuery } from '@tanstack/react-query'
import { categoryService } from '@/lib/services/categoryService'

export function useCategories(params = {}) {
  return useQuery({
    queryKey: ['categories', params],
    queryFn: () => categoryService.getCategories(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useCategory(id) {
  return useQuery({
    queryKey: ['categories', id],
    queryFn: () => categoryService.getCategory(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  })
}