/**
 * API Client for Our Company Portfolio
 * Centralized API communication layer with security and performance optimizations
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://backend.spacetechs.net/api";
const apiKey = (() => {
  const key = process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY;
  if (!key && process.env.NODE_ENV === "production") {
    console.warn("API key not found in environment variables");
  }
  return key;
})();

// Request cache for performance with size limit
const requestCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const MAX_CACHE_SIZE = 100; // Limit cache size

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.validateBaseURL();
  }

  validateBaseURL() {
    try {
      new URL(this.baseURL);
    } catch (error) {
      throw new Error(
        `Invalid API base URL: ${this.baseURL}. ${error.message}`
      );
    }
  }

  getCacheKey(url, options) {
    // Only include relevant options for caching
    const cacheableOptions = {
      method: options.method,
      body: options.body,
    };
    return `${url}_${JSON.stringify(cacheableOptions)}`;
  }

  cleanupCache() {
    try {
      const now = Date.now();
      for (const [key, value] of requestCache.entries()) {
        if (now - value.timestamp > CACHE_TTL) {
          requestCache.delete(key);
        }
      }
      // Enforce size limit
      if (requestCache.size > MAX_CACHE_SIZE) {
        const entries = Array.from(requestCache.entries());
        const toDelete = entries.slice(0, entries.length - MAX_CACHE_SIZE);
        toDelete.forEach(([key]) => requestCache.delete(key));
      }
    } catch (error) {
      console.warn("Cache cleanup failed:", error.message);
    }
  }

  /**
   * Generic request method with caching and security
   */
  async request(endpoint, options = {}) {
    if (!endpoint || typeof endpoint !== "string") {
      throw new Error("Invalid endpoint");
    }

    // Validate endpoint to prevent SSRF
    if (endpoint.includes("://") || endpoint.startsWith("//")) {
      throw new Error("Invalid endpoint: absolute URLs not allowed");
    }

    const url = `${this.baseURL}${endpoint}`;

    // Validate final URL matches expected base and prevent SSRF
    let finalUrl, baseUrl;
    try {
      finalUrl = new URL(url);
      baseUrl = new URL(this.baseURL);
    } catch (error) {
      throw new Error(`Invalid URL format: ${error.message}`);
    }
    if (
      finalUrl.origin !== baseUrl.origin ||
      finalUrl.hostname !== baseUrl.hostname
    ) {
      throw new Error("Invalid endpoint: URL origin mismatch");
    }

    // Additional SSRF protection - block private/local addresses
    const hostname = finalUrl.hostname;
    if (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname.startsWith("192.168.") ||
      hostname.startsWith("10.") ||
      hostname.startsWith("172.16.") ||
      hostname === "0.0.0.0"
    ) {
      if (!this.baseURL.includes(hostname)) {
        throw new Error("Invalid endpoint: private network access denied");
      }
    }

    const cacheKey = this.getCacheKey(url, options);

    // Check cache for GET requests
    if (!options.method || options.method === "GET") {
      this.cleanupCache();
      const cached = requestCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return cached.data;
      }
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...(apiKey && { "X-API-Key": apiKey }),
        ...options.headers,
      },
      redirect: "error", // Prevent redirects to avoid SSRF
      timeout: 30000, // 30 second timeout
      ...options,
    };

    try {
      // Additional URL validation before fetch
      if (!url.startsWith(this.baseURL)) {
        throw new Error("Invalid URL: must start with base URL");
      }

      const response = await fetch(url, config);

      if (!response.ok) {
        let errorData = "Unknown error";
        try {
          errorData = await response.text();
        } catch {
          errorData = `${response.status} ${response.statusText || "Error"}`;
        }
        throw new Error(`HTTP ${response.status}: ${errorData}`);
      }

      const data = await response.json().catch(() => {
        throw new Error(`Invalid JSON response from ${response.status}`);
      });

      // Cache successful GET requests
      if (!options.method || options.method === "GET") {
        const now = Date.now();
        requestCache.set(cacheKey, { data, timestamp: now });
      }

      return data;
    } catch (error) {
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        throw new Error("Network error: Please check your connection");
      }
      throw error;
    }
  }

  // Categories API
  async getCategories(params = {}) {
    if (params && typeof params !== "object") {
      throw new Error("Invalid parameters: must be an object");
    }
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/categories${queryString ? `?${queryString}` : ""}`;
    return this.request(endpoint);
  }

  async getCategory(id) {
    if (!id || typeof id !== "string") {
      throw new Error("Category ID is required and must be a string");
    }
    return this.request(`/categories/${encodeURIComponent(id)}`);
  }

  // Projects API
  async getProjects(params = {}) {
    if (params && typeof params !== "object") {
      throw new Error("Invalid parameters: must be an object");
    }
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/projects${queryString ? `?${queryString}` : ""}`;
    return this.request(endpoint);
  }

  async getProject(slugOrId) {
    if (!slugOrId || typeof slugOrId !== "string") {
      throw new Error("Project slug or ID is required and must be a string");
    }
    return this.request(`/projects/${encodeURIComponent(slugOrId)}`);
  }

  async getFeaturedProjects() {
    return this.request("/projects?featured=true&sort=-createdAt");
  }

  async getProjectsByCategory(categoryId, params = {}) {
    if (!categoryId || typeof categoryId !== "string") {
      throw new Error("Category ID is required and must be a string");
    }
    if (params && typeof params !== "object") {
      throw new Error("Invalid parameters: must be an object");
    }
    const queryString = new URLSearchParams({
      category: categoryId,
      ...params,
    }).toString();
    return this.request(`/projects?${queryString}`);
  }

  // Blogs API
  async getBlogs(params = {}) {
    if (params && typeof params !== "object") {
      throw new Error("Invalid parameters: must be an object");
    }
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/blogs${queryString ? `?${queryString}` : ""}`;
    return this.request(endpoint);
  }

  async getBlog(slugOrId) {
    if (!slugOrId || typeof slugOrId !== "string") {
      throw new Error("Blog slug or ID is required and must be a string");
    }
    return this.request(`/blogs/${encodeURIComponent(slugOrId)}`);
  }

  async getFeaturedBlogs() {
    try {
      const params = new URLSearchParams({
        featured: "true",
        published: "true",
        sort: "-publishedAt",
      }).toString();
      return this.request(`/blogs?${params}`);
    } catch (error) {
      throw new Error(`Failed to fetch featured blogs: ${error.message}`);
    }
  }

  async getBlogsByCategory(categoryId, params = {}) {
    if (!categoryId || typeof categoryId !== "string") {
      throw new Error("Category ID is required and must be a string");
    }
    if (params && typeof params !== "object") {
      throw new Error("Invalid parameters: must be an object");
    }
    const queryString = new URLSearchParams({
      category: categoryId,
      published: "true",
      ...params,
    }).toString();
    return this.request(`/blogs?${queryString}`);
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;
