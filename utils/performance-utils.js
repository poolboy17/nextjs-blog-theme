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

// Web Vitals reporting
export const reportWebVitals = (metric) => {
  if (process.env.NODE_ENV === 'production') {
    // Report to analytics service
    console.log('Web Vital:', metric);

    // Example: Send to Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.value),
        non_interaction: true,
      });
    }
  }
};

// Preload critical resources
export const preloadResource = (href, as = 'script', type = null) => {
  if (typeof document !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    document.head.appendChild(link);
  }
};

// Lazy load images with intersection observer
export const lazyLoadImages = () => {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img);
    });
  }
};

// Critical CSS inlining helper
export const inlineCriticalCSS = (css) => {
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }
};

// Add performance monitoring utilities here
export function measurePagePerformance(label, fn) {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`${label}: ${end - start} milliseconds`);
  return result;
}

// Optimize large data sets for better performance
export function paginateData(data, page = 1, pageSize = 10) {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return {
    data: data.slice(startIndex, endIndex),
    totalPages: Math.ceil(data.length / pageSize),
    currentPage: page,
    hasMore: endIndex < data.length
  };
}

// Reduce data size by removing unnecessary fields
export function optimizePostData(posts) {
  return posts.map(post => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    category: post.category,
    // Remove heavy content for list views
    excerpt: post.content?.substring(0, 200) || post.description
  }));
}