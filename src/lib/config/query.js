/**
 * React Query Configuration
 * Optimized settings for data fetching and caching
 */

export const QUERY_CONFIG = {
  defaultOptions: {
    queries: {
      // Cache settings
      staleTime: 2 * 60 * 1000, // 2 minutes
      cacheTime: 5 * 60 * 1000, // 5 minutes
      
      // Retry settings
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error?.status >= 400 && error?.status < 500) {
          return false
        }
        return failureCount < 3
      },
      
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Background updates
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
      
      // Performance
      keepPreviousData: true,
      suspense: false
    },
    
    mutations: {
      retry: 1,
      retryDelay: 1000
    }
  }
}

// Query Keys Factory
export const queryKeys = {
  // Projects
  projects: {
    all: ['projects'],
    lists: () => [...queryKeys.projects.all, 'list'],
    list: (filters) => [...queryKeys.projects.lists(), filters],
    details: () => [...queryKeys.projects.all, 'detail'],
    detail: (id) => [...queryKeys.projects.details(), id],
    featured: () => [...queryKeys.projects.all, 'featured']
  },
  
  // Blogs
  blogs: {
    all: ['blogs'],
    lists: () => [...queryKeys.blogs.all, 'list'],
    list: (filters) => [...queryKeys.blogs.lists(), filters],
    details: () => [...queryKeys.blogs.all, 'detail'],
    detail: (id) => [...queryKeys.blogs.details(), id],
    featured: () => [...queryKeys.blogs.all, 'featured']
  },
  
  // Categories
  categories: {
    all: ['categories'],
    lists: () => [...queryKeys.categories.all, 'list'],
    list: (filters) => [...queryKeys.categories.lists(), filters],
    details: () => [...queryKeys.categories.all, 'detail'],
    detail: (id) => [...queryKeys.categories.details(), id]
  }
}

// Cache invalidation patterns
export const CACHE_PATTERNS = {
  // Invalidate all project-related queries
  invalidateProjects: (queryClient) => {
    queryClient.invalidateQueries({ queryKey: queryKeys.projects.all })
  },
  
  // Invalidate specific project
  invalidateProject: (queryClient, id) => {
    queryClient.invalidateQueries({ queryKey: queryKeys.projects.detail(id) })
  },
  
  // Prefetch featured content
  prefetchFeatured: async (queryClient, services) => {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: queryKeys.projects.featured(),
        queryFn: services.projectService.getFeaturedProjects,
        staleTime: 5 * 60 * 1000
      }),
      queryClient.prefetchQuery({
        queryKey: queryKeys.blogs.featured(),
        queryFn: services.blogService.getFeaturedBlogs,
        staleTime: 5 * 60 * 1000
      })
    ])
  }
}