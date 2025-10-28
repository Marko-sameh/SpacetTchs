import { useQuery } from '@tanstack/react-query'
import { blogService } from '@/lib/services/blogService'

export function useBlogs(params = {}) {
  const { filters = {}, sort, page = 1, limit = 10, search, ...otherParams } = params
  
  const queryParams = {
    ...filters,
    ...otherParams,
    ...(sort && { sort }),
    ...(page && { page }),
    ...(limit && { limit }),
    ...(search && { search })
  }

  return useQuery({
    queryKey: ['blogs', queryParams],
    queryFn: () => blogService.getBlogs(queryParams),
    staleTime: 2 * 60 * 1000, // 2 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
    keepPreviousData: true, // For pagination
  })
}

export function useBlog(id) {
  return useQuery({
    queryKey: ['blogs', id],
    queryFn: () => blogService.getBlog(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  })
}