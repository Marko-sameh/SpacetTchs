import { getServerSideSitemap } from 'next-sitemap'
import { blogService } from '@/lib/services/blogService'
import { projectService } from '@/lib/services/projectService'

export async function GET(request) {
  const siteUrl = 'https://spacetechs.net'
  const fields = []

  try {
    // Fetch blog posts
    const blogsResponse = await blogService.getBlogs({ limit: 1000 })
    const blogs = blogsResponse.data?.blogs || []
    
    blogs.forEach(blog => {
      if (blog.slug || blog._id) {
        fields.push({
          loc: `${siteUrl}/blog/${blog.slug || blog._id}`,
          lastmod: blog.updatedAt || blog.createdAt || new Date().toISOString(),
          changefreq: 'weekly',
          priority: 0.8,
        })
      }
    })

    // Fetch projects
    const projectsResponse = await projectService.getProjects({ limit: 1000 })
    const projects = projectsResponse.data?.projects || []
    
    projects.forEach(project => {
      if (project.slug || project._id) {
        fields.push({
          loc: `${siteUrl}/projects/${project.slug || project._id}`,
          lastmod: project.updatedAt || project.createdAt || new Date().toISOString(),
          changefreq: 'monthly',
          priority: 0.9,
        })
      }
    })

    // Add service pages
    const services = [
      'web-development',
      'mobile-app-development', 
      'ai-solutions',
      'digital-marketing'
    ]
    
    services.forEach(service => {
      fields.push({
        loc: `${siteUrl}/services/${service}`,
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.9,
      })
    })

  } catch (error) {
    console.error('Error generating server sitemap:', error)
  }

  return getServerSideSitemap(fields)
}