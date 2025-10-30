// SEO Configuration and Utilities for SpaceTechs
export const SEO_CONFIG = {
  defaultTitle: 'SpaceTechs - Premier Web Development Company | Mobile Apps | AI Solutions',
  titleTemplate: '%s | SpaceTechs - Web Development Company',
  defaultDescription: 'Leading web development company specializing in custom websites, mobile app development, AI solutions, and digital marketing. Transform your business with cutting-edge technology.',
  siteUrl: 'https://spacetechs.net',
  defaultImage: 'https://spacetechs.net/images/og-spacetechs-web-development.jpg',
  twitterHandle: '@spacetechs',
  
  // Core business keywords for SEO
  keywords: {
    primary: [
      'web development company',
      'mobile app development',
      'AI solutions provider',
      'digital marketing agency',
      'custom websites and mobile apps',
      'SpaceTechs',
      'spacetechs.net'
    ],
    secondary: [
      'web development services',
      'mobile application development',
      'artificial intelligence solutions',
      'digital marketing services',
      'custom web development',
      'responsive web design',
      'e-commerce development',
      'React development',
      'Next.js development',
      'React Native apps',
      'Flutter development',
      'Node.js development',
      'Python development',
      'machine learning',
      'SEO optimization',
      'social media marketing',
      '3D web development',
      'Three.js',
      'interactive websites',
      'modern web applications'
    ],
    technical: [
      'cross-platform mobile apps',
      'iOS app development',
      'Android app development',
      'web app development',
      'progressive web apps',
      'API development',
      'database design',
      'cloud solutions',
      'DevOps services',
      'UI/UX design',
      'branding services'
    ]
  }
};

// Organization structured data
export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SpaceTechs',
  alternateName: 'Space Techs',
  url: 'https://spacetechs.net',
  logo: 'https://spacetechs.net/logo_wbg.png',
  description: 'Leading web development company specializing in mobile app development, AI solutions, and digital marketing. Custom websites and mobile apps built with cutting-edge technology.',
  foundingDate: '2020',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'San Francisco',
    addressRegion: 'CA',
    addressCountry: 'US'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-555-123-4567',
    contactType: 'customer service',
    email: 'contact@spacetechs.net',
    availableLanguage: 'English'
  },
  sameAs: [
    'https://github.com/spacetechs',
    'https://linkedin.com/company/spacetechs',
    'https://twitter.com/spacetechs',
    'https://facebook.com/spacetechs'
  ],
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: '37.7749',
      longitude: '-122.4194'
    },
    geoRadius: '50000'
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Digital Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Web Development',
          description: 'Custom website development with modern frameworks',
          provider: {
            '@type': 'Organization',
            name: 'SpaceTechs'
          }
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Mobile App Development',
          description: 'Native and cross-platform mobile applications',
          provider: {
            '@type': 'Organization',
            name: 'SpaceTechs'
          }
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI Solutions',
          description: 'Artificial intelligence and machine learning solutions',
          provider: {
            '@type': 'Organization',
            name: 'SpaceTechs'
          }
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Digital Marketing',
          description: 'SEO, social media, and digital marketing services',
          provider: {
            '@type': 'Organization',
            name: 'SpaceTechs'
          }
        }
      }
    ]
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '127',
    bestRating: '5',
    worstRating: '1'
  },
  knowsAbout: [
    'Web Development',
    'Mobile App Development',
    'Artificial Intelligence',
    'Digital Marketing',
    'Custom Websites',
    'Mobile Apps',
    'AI Solutions',
    'React',
    'Next.js',
    'React Native',
    'Flutter',
    'Node.js',
    'Python',
    'Machine Learning',
    'SEO Optimization',
    '3D Web Development',
    'Three.js'
  ]
};

// Website structured data
export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'SpaceTechs',
  alternateName: 'SpaceTechs - Web Development Company',
  url: 'https://spacetechs.net',
  description: 'Leading web development company specializing in custom websites, mobile app development, AI solutions, and digital marketing.',
  publisher: {
    '@type': 'Organization',
    name: 'SpaceTechs'
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://spacetechs.net/search?q={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  }
};

// Service schemas for different pages
export const SERVICE_SCHEMAS = {
  webDevelopment: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Web Development Services',
    description: 'Professional custom website development services using modern frameworks and technologies',
    provider: {
      '@type': 'Organization',
      name: 'SpaceTechs',
      url: 'https://spacetechs.net'
    },
    serviceType: 'Web Development',
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom Website Development'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'E-commerce Development'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Progressive Web Apps'
          }
        }
      ]
    }
  },
  
  mobileAppDevelopment: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Mobile App Development Services',
    description: 'Professional mobile application development for iOS and Android platforms',
    provider: {
      '@type': 'Organization',
      name: 'SpaceTechs',
      url: 'https://spacetechs.net'
    },
    serviceType: 'Mobile App Development',
    areaServed: 'Worldwide'
  },
  
  aiSolutions: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Solutions Services',
    description: 'Artificial intelligence and machine learning solutions for businesses',
    provider: {
      '@type': 'Organization',
      name: 'SpaceTechs',
      url: 'https://spacetechs.net'
    },
    serviceType: 'AI Solutions',
    areaServed: 'Worldwide'
  },
  
  digitalMarketing: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Digital Marketing Services',
    description: 'Comprehensive digital marketing services including SEO, social media, and online advertising',
    provider: {
      '@type': 'Organization',
      name: 'SpaceTechs',
      url: 'https://spacetechs.net'
    },
    serviceType: 'Digital Marketing',
    areaServed: 'Worldwide'
  }
};

// Utility functions for SEO
export const generatePageTitle = (title, template = SEO_CONFIG.titleTemplate) => {
  if (!title) return SEO_CONFIG.defaultTitle;
  return template.replace('%s', title);
};

export const generateMetaDescription = (description) => {
  if (!description) return SEO_CONFIG.defaultDescription;
  return description.length > 160 ? description.substring(0, 157) + '...' : description;
};

export const generateKeywords = (pageKeywords = []) => {
  return [
    ...SEO_CONFIG.keywords.primary,
    ...pageKeywords,
    ...SEO_CONFIG.keywords.secondary.slice(0, 10) // Limit secondary keywords
  ].join(', ');
};

export const generateCanonicalUrl = (path = '') => {
  return `${SEO_CONFIG.siteUrl}${path}`;
};

export const generateOpenGraphImage = (imagePath) => {
  if (!imagePath) return SEO_CONFIG.defaultImage;
  return imagePath.startsWith('http') ? imagePath : `${SEO_CONFIG.siteUrl}${imagePath}`;
};

// Blog post schema generator
export const generateBlogPostSchema = (post) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.summary || post.description,
  image: post.coverImage ? generateOpenGraphImage(post.coverImage) : SEO_CONFIG.defaultImage,
  author: {
    '@type': 'Person',
    name: post.author || 'SpaceTechs Team'
  },
  publisher: {
    '@type': 'Organization',
    name: 'SpaceTechs',
    logo: {
      '@type': 'ImageObject',
      url: 'https://spacetechs.net/logo_wbg.png'
    }
  },
  datePublished: post.createdAt || post.datePublished,
  dateModified: post.updatedAt || post.dateModified || post.createdAt || post.datePublished,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': generateCanonicalUrl(`/blog/${post.slug || post._id}`)
  }
});

// Project schema generator
export const generateProjectSchema = (project) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: project.title,
  description: project.description,
  image: project.images && project.images.length > 0 ? generateOpenGraphImage(project.images[0]) : SEO_CONFIG.defaultImage,
  creator: {
    '@type': 'Organization',
    name: 'SpaceTechs'
  },
  dateCreated: project.startDate || project.createdAt,
  dateModified: project.endDate || project.updatedAt,
  url: generateCanonicalUrl(`/projects/${project.slug || project._id}`),
  keywords: project.technologies ? project.technologies.join(', ') : '',
  category: project.category?.name || 'Web Development'
});