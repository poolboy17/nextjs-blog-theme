
import fetch from 'node-fetch';

export const fetchPostImage = async (title, tags = []) => {
  try {
    const serpApiKey = process.env.SERP_API_KEY;
    
    if (!serpApiKey) {
      console.warn('SERP_API_KEY not found in environment variables');
      return null;
    }

    // Create smart keywords from title and tags
    const titleWords = title.toLowerCase()
      .replace(/[^\w\s-]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3 && !['the', 'and', 'for', 'with', 'that', 'this', 'from', 'they', 'have', 'will', 'your', 'what', 'when', 'how'].includes(word));
    
    const tagWords = Array.isArray(tags) ? tags.slice(0, 3) : [];
    const keywords = [...titleWords.slice(0, 3), ...tagWords].join(' ');

    const searchQuery = `${keywords} cybersecurity technology`;
    
    const response = await fetch(`https://serpapi.com/search.json?engine=google_images&q=${encodeURIComponent(searchQuery)}&api_key=${serpApiKey}&num=1&safe=active&imgtype=photo`);
    
    if (!response.ok) {
      throw new Error(`SerpAPI request failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.images_results && data.images_results.length > 0) {
      const image = data.images_results[0];
      return {
        url: image.original,
        thumbnail: image.thumbnail,
        title: image.title || title,
        source: image.source
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
};

export const getPostImageUrl = (post) => {
  // Check if post already has an image
  if (post.data.image) {
    return post.data.image;
  }
  
  // Generate a consistent placeholder based on post title
  const hash = post.data.title.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const colors = ['3b82f6', '8b5cf6', '06b6d4', '10b981', 'f59e0b', 'ef4444'];
  const color = colors[Math.abs(hash) % colors.length];
  
  return `https://via.placeholder.com/400x250/${color}/ffffff?text=${encodeURIComponent(post.data.title.substring(0, 30))}`;
};
