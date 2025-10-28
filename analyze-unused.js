const fs = require('fs');
const path = require('path');

// Get all JS/JSX files
const files = [
  'src/app/error.jsx',
  'src/app/HomeClient.jsx',
  'src/app/layout.jsx',
  'src/app/loading.jsx',
  'src/app/not-found.jsx',
  'src/app/page.jsx',
  'src/app/about/AboutClient.jsx',
  'src/app/about/page.jsx',
  'src/app/blog/page.jsx',
  'src/app/blog/[slug]/page.jsx',
  'src/app/contact/page.jsx',
  'src/app/galaxy/page.jsx',
  'src/app/projects/page.jsx',
  'src/app/projects/[slug]/page.jsx',
  'src/app/services/page.jsx',
  'src/components/AnimatedHero.jsx',
  'src/components/ClientComponents.jsx',
  'src/components/ClientOnly.jsx',
  'src/components/ContactForm.jsx',
  'src/components/CursorFollower.jsx',
  'src/components/FeatureCard.jsx',
  'src/components/FeatureGrid.jsx',
  'src/components/FeatureGridClient.jsx',
  'src/components/PageTransition.jsx',
  'src/components/ProjectCard.jsx',
  'src/components/ProjectsWithFilters.jsx',
  'src/components/Providers.jsx',
  'src/components/ScrollProgress.jsx',
  'src/components/ThemeProvider.jsx',
  'src/components/3d/FloatingGeometry.jsx',
  'src/components/3d/GalaxyPortfolio.jsx',
  'src/components/3d/ParticleField.jsx',
  'src/components/3d/Scene3D.jsx',
  'src/components/3d/StarField3D.jsx',
  'src/components/3d/test.jsx',
  'src/components/ui/AboutUs.jsx',
  'src/components/ui/BlogCard.jsx',
  'src/components/ui/Button.jsx',
  'src/components/ui/ErrorBoundary.jsx',
  'src/components/ui/FeaturedSection.jsx',
  'src/components/ui/Footer.jsx',
  'src/components/ui/LazyImage.jsx',
  'src/components/ui/LoadingSkeleton.jsx',
  'src/components/ui/Navbar.jsx',
  'src/components/ui/ProjectCard.jsx',
  'src/components/ui/ProjectsGrid.jsx',
  'src/components/ui/SplitRevealSection.jsx',
  'src/components/ui/ThemeToggle.jsx',
  'src/hooks/useBlogs.js',
  'src/hooks/useCategories.js',
  'src/hooks/useMediaQuery.js',
  'src/hooks/useMousePosition.js',
  'src/hooks/useProjects.js',
  'src/lib/apiClient.js',
  'src/lib/i18n.js',
  'src/lib/utils.js',
  'src/lib/services/blogService.js',
  'src/lib/services/categoryService.js',
  'src/lib/services/projectService.js',
  'src/stores/useUIStore.js'
];

const importedFiles = new Set();
const allContent = [];

// Read all files and extract imports
files.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    allContent.push({ file, content });
    
    // Extract import statements
    const importRegex = /import.*?from\s+['"`]([^'"`]+)['"`]/g;
    const dynamicImportRegex = /import\(['"`]([^'"`]+)['"`]\)/g;
    
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      const importPath = match[1];
      if (importPath.startsWith('@/') || importPath.startsWith('./') || importPath.startsWith('../')) {
        importedFiles.add(importPath);
      }
    }
    
    while ((match = dynamicImportRegex.exec(content)) !== null) {
      const importPath = match[1];
      if (importPath.startsWith('@/') || importPath.startsWith('./') || importPath.startsWith('../')) {
        importedFiles.add(importPath);
      }
    }
  } catch (err) {
    console.log(`Could not read ${file}: ${err.message}`);
  }
});

// Normalize paths and find unused files
const normalizeImportPath = (importPath, currentFile) => {
  if (importPath.startsWith('@/')) {
    return importPath.replace('@/', 'src/');
  }
  if (importPath.startsWith('./') || importPath.startsWith('../')) {
    const currentDir = path.dirname(currentFile);
    return path.normalize(path.join(currentDir, importPath)).replace(/\\/g, '/');
  }
  return importPath;
};

const usedFiles = new Set();

// Process all imports
importedFiles.forEach(importPath => {
  files.forEach(file => {
    const normalized = normalizeImportPath(importPath, file);
    
    // Try different extensions
    const possiblePaths = [
      normalized,
      normalized + '.js',
      normalized + '.jsx',
      normalized + '/index.js',
      normalized + '/index.jsx'
    ];
    
    possiblePaths.forEach(possiblePath => {
      if (files.includes(possiblePath)) {
        usedFiles.add(possiblePath);
      }
    });
  });
});

// Also check for string references in content
files.forEach(file => {
  const content = allContent.find(c => c.file === file)?.content || '';
  files.forEach(otherFile => {
    const fileName = path.basename(otherFile, path.extname(otherFile));
    const relativePath = path.relative(path.dirname(file), otherFile).replace(/\\/g, '/');
    
    if (content.includes(fileName) || content.includes(relativePath)) {
      usedFiles.add(otherFile);
    }
  });
});

// Find unused files
const unusedFiles = files.filter(file => !usedFiles.has(file));

console.log('=== UNUSED FILES ===');
unusedFiles.forEach(file => console.log(file));

console.log('\n=== USED FILES ===');
Array.from(usedFiles).sort().forEach(file => console.log(file));

console.log(`\nTotal files: ${files.length}`);
console.log(`Used files: ${usedFiles.size}`);
console.log(`Unused files: ${unusedFiles.length}`);