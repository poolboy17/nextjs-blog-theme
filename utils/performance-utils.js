
// Performance monitoring utilities
export const measurePerformance = (name, fn) => {
  return async (...args) => {
    const start = performance.now();
    const result = await fn(...args);
    const end = performance.now();

    if (process.env.NODE_ENV === 'development') {
      console.log(`⚡ ${name}: ${(end - start).toFixed(2)}ms`);
    }

    return result;
  };
};

export const reportWebVitals = (metric) => {
  if (process.env.NODE_ENV === 'production') {
    // Report to analytics service
    console.log('Web Vital:', metric);

    // Example: Send to Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        non_interaction: true,
      });
    }
  }
};

// Add CSS for smooth animations
export const addPerformanceStyles = () => {
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
      .perf-optimized {
        transform: translateZ(0);
        backface-visibility: hidden;
        will-change: transform;
      }
    `;
    document.head.appendChild(style);
  }
};

// Optimized pagination for large datasets
export function paginateData(data, page = 1, pageSize = 12) {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return {
    data: data.slice(startIndex, endIndex),
    totalPages: Math.ceil(data.length / pageSize),
    currentPage: page,
    hasMore: endIndex < data.length
  };
}

// Optimize post data for article cards - remove heavy content
export function optimizeArticleCards(posts) {
  return posts.map(post => ({
    filePath: post.filePath,
    data: {
      title: post.data.title,
      description: post.data.description?.substring(0, 160) || '', // SEO-friendly length
      date: post.data.date,
      categories: post.data.categories,
      tags: post.data.tags?.slice(0, 5) || [], // Limit tags for performance
      image: post.data.image,
      author: post.data.author,
      readTime: post.data.readTime || calculateReadTime(post.data.description || ''),
    },
    excerpt: post.data.description?.substring(0, 120) || '', // Card preview length
  }));
}

// Calculate estimated read time
export function calculateReadTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

// Lazy loading utility for images
export function createIntersectionObserver(callback, options = {}) {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    return new IntersectionObserver(callback, defaultOptions);
  }
  return null;
}

// Optimize images for cards
export function getOptimizedImageUrl(imagePath, width = 400, height = 300) {
  if (!imagePath) return '/images/placeholder-security.svg';
  
  // For static images, return as-is
  if (imagePath.startsWith('/images/')) {
    return imagePath;
  }
  
  // For dynamic images, could add optimization params
  return imagePath;
}
