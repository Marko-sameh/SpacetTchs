/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://spacetechs.net',
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  exclude: ['/api/*', '/_next/*', '/admin/*', '/server-sitemap.xml'],
  alternateRefs: [
    {
      href: 'https://spacetechs.net',
      hreflang: 'en-US',
    },
  ],
  transform: async (config, path) => {
    // Custom priority and changefreq based on path
    let priority = config.priority;
    let changefreq = config.changefreq;
    
    if (path === '/') {
      priority = 1.0;
      changefreq = 'weekly';
    } else if (path.startsWith('/services')) {
      priority = 0.9;
      changefreq = 'monthly';
    } else if (path.startsWith('/projects')) {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path.startsWith('/blog')) {
      priority = 0.8;
      changefreq = 'daily';
    } else if (path.startsWith('/about')) {
      priority = 0.8;
      changefreq = 'monthly';
    } else if (path.startsWith('/contact')) {
      priority = 0.7;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
  additionalPaths: async (config) => [
    // Add dynamic paths that might not be discovered automatically
    await config.transform(config, '/services/web-development'),
    await config.transform(config, '/services/mobile-app-development'),
    await config.transform(config, '/services/ai-solutions'),
    await config.transform(config, '/services/digital-marketing'),
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/', '/private/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/', '/private/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/', '/private/'],
      },
    ],
    additionalSitemaps: [
      'https://spacetechs.net/server-sitemap.xml',
    ],
  },
}