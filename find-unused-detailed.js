const fs = require('fs');
const path = require('path');

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

const usedFiles = new Set();
const allContent = new Map();

// Read all files
files.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    allContent.set(file, content);
  } catch (err) {
    console.log(`Could not read ${file}`);
  }
});

// Check each file for references to other files
files.forEach(file => {
  const content = allContent.get(file) || '';
  
  files.forEach(otherFile => {
    if (file === otherFile) return;
    
    const fileName = path.basename(otherFile, path.extname(otherFile));
    const fileNameWithExt = path.basename(otherFile);
    const relativePath = path.relative(path.dirname(file), otherFile).replace(/\\/g, '/');
    const aliasPath = otherFile.replace('src/', '@/');
    
    // Check various ways the file might be referenced
    if (
      content.includes(`'${fileName}'`) ||
      content.includes(`"${fileName}"`) ||
      content.includes(`'${fileNameWithExt}'`) ||
      content.includes(`"${fileNameWithExt}"`) ||
      content.includes(`'${relativePath}'`) ||
      content.includes(`"${relativePath}"`) ||
      content.includes(`'${aliasPath}'`) ||
      content.includes(`"${aliasPath}"`) ||
      content.includes(`from '${fileName}'`) ||
      content.includes(`from "${fileName}"`) ||
      content.includes(`import('${fileName}')`) ||
      content.includes(`import("${fileName}")`) ||
      content.includes(`/${fileName}`) ||
      content.includes(fileName + '.jsx') ||
      content.includes(fileName + '.js')
    ) {
      usedFiles.add(otherFile);
    }
  });
});

// Special cases - Next.js conventions
const nextJsSpecialFiles = [
  'src/app/layout.jsx',
  'src/app/page.jsx',
  'src/app/loading.jsx',
  'src/app/error.jsx',
  'src/app/not-found.jsx'
];

nextJsSpecialFiles.forEach(file => usedFiles.add(file));

// Find unused files
const unusedFiles = files.filter(file => !usedFiles.has(file));

console.log('=== DETAILED UNUSED FILES ANALYSIS ===\n');

console.log('DEFINITELY UNUSED FILES:');
unusedFiles.forEach(file => {
  console.log(`❌ ${file}`);
});

console.log('\n=== POTENTIALLY UNUSED FILES (need manual verification) ===');
const suspiciousFiles = [
  'src/components/AnimatedHero.jsx',
  'src/components/ClientOnly.jsx', 
  'src/components/CursorFollower.jsx',
  'src/components/3d/test.jsx',
  'src/lib/i18n.js'
];

suspiciousFiles.forEach(file => {
  if (!usedFiles.has(file)) {
    console.log(`⚠️  ${file} - No direct imports found`);
  }
});

console.log(`\nSUMMARY:`);
console.log(`Total files: ${files.length}`);
console.log(`Used files: ${usedFiles.size}`);
console.log(`Unused files: ${unusedFiles.length}`);