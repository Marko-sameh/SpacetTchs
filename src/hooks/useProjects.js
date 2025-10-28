import { useQuery } from "@tanstack/react-query";
import { projectService } from "@/lib/services/projectService";

export function useProjects(params = {}) {
  const {
    filters = {},
    sort,
    page = 1,
    limit = 10,
    search,
    ...otherParams
  } = params;

  const queryParams = {
    ...filters,
    ...otherParams,
    ...(sort && { sort }),
    ...(page && { page }),
    ...(limit && { limit }),
    ...(search && { search }),
  };

  return useQuery({
    queryKey: ["projects", queryParams],
    queryFn: () => projectService.getProjects(queryParams),
    staleTime: 2 * 60 * 1000, // 2 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
    keepPreviousData: true, // For pagination
  });
}

export function useProject(id) {
  return useQuery({
    queryKey: ["projects", id],
    queryFn: () => projectService.getProject(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
}
