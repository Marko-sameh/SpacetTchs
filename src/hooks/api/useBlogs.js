import { useQuery } from '@tanstack/react-query'
import { blogService } from '@/lib/services/blogService'

export function useBlogs() {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getBlogs(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useBlog(slug) {
  return useQuery({
    queryKey: ['blog', slug],
    queryFn: () => blogService.getBlog(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  })
}