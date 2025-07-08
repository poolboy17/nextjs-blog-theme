
// Image utility functions for the blog
export function getImageForPost(post) {
  // Check if post has a custom image
  if (post?.data?.image) {
    return post.data.image;
  }
  
  // Check if post has a title to generate themed image
  if (post?.data?.title) {
    const title = post.data.title.toLowerCase();
    
    // Security-related keywords
    if (title.includes('scam') || title.includes('phishing') || title.includes('fraud')) {
      return '/images/scam-detection.svg';
    }
    if (title.includes('ai') || title.includes('artificial intelligence')) {
      return '/images/ai-security.svg';
    }
    if (title.includes('antivirus') || title.includes('malware')) {
      return '/images/antivirus-protection.svg';
    }
    if (title.includes('router') || title.includes('wifi') || title.includes('network')) {
      return '/images/router-security.svg';
    }
    if (title.includes('privacy') || title.includes('vpn')) {
      return '/images/privacy-tools.svg';
    }
    if (title.includes('email') || title.includes('mail')) {
      return '/images/email-security.svg';
    }
    if (title.includes('identity') || title.includes('personal data')) {
      return '/images/identity-protection.svg';
    }
    if (title.includes('cyber') || title.includes('security')) {
      return '/images/cyber-defense.svg';
    }
    if (title.includes('data') || title.includes('protection')) {
      return '/images/data-protection.svg';
    }
  }
  
  // Default fallback
  return '/images/placeholder-security.svg';
}

// Alias for backward compatibility
export function getPostImageUrl(post) {
  return getImageForPost(post);
}

// Generate category-specific images
export function getCategoryImage(category) {
  if (!category) return '/images/cybersecurity-default.svg';
  
  const categoryLower = category.toLowerCase();
  
  if (categoryLower.includes('scam') || categoryLower.includes('fraud')) {
    return '/images/scam-detection.svg';
  }
  if (categoryLower.includes('ai')) {
    return '/images/ai-security.svg';
  }
  if (categoryLower.includes('antivirus')) {
    return '/images/antivirus-protection.svg';
  }
  if (categoryLower.includes('router') || categoryLower.includes('network')) {
    return '/images/router-security.svg';
  }
  if (categoryLower.includes('privacy')) {
    return '/images/privacy-tools.svg';
  }
  
  return '/images/cybersecurity-default.svg';
}

// Validate image URL
export function validateImageUrl(url) {
  if (!url) return false;
  
  // Check for local images
  if (url.startsWith('/images/')) {
    return true;
  }
  
  // Check for allowed external domains
  const allowedDomains = [
    'via.placeholder.com',
    'images.unsplash.com',
    'cdn.jsdelivr.net'
  ];
  
  try {
    const urlObj = new URL(url);
    return allowedDomains.includes(urlObj.hostname);
  } catch {
    return false;
  }
}
