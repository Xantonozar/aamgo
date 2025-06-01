export default function sitemap() {
  const baseUrl = 'https://www.amgomangoes.com';
  
  // Core pages
  const routes = [
    '',
    '/shop',
    '/about',
    '/contact',
    '/blog',
    '/cart',
    '/checkout',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1 : 0.8,
  }));

  // Product categories (example)
  const categories = [
    'alphonso',
    'langra',
    'gift-boxes',
    'premium',
    'organic',
  ].map((category) => ({
    url: `${baseUrl}/shop/${category}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.7,
  }));

  // Blog posts (example)
  const blogPosts = [
    'mango-varieties',
    'mango-recipes',
    'mango-health-benefits',
    'mango-growing-guide',
  ].map((post) => ({
    url: `${baseUrl}/blog/${post}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...routes, ...categories, ...blogPosts];
} 