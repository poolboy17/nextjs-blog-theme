
// Simple image utilities for static blog posts
export function getImageForPost(post) {
  // Map keywords to local SVG images
  const imageMap = {
    'ai': '/images/ai-security.svg',
    'antivirus': '/images/antivirus-protection.svg',
    'cyber': '/images/cyber-defense.svg',
    'security': '/images/cybersecurity-1.svg',
    'privacy': '/images/privacy-security.svg',
    'protection': '/images/data-protection.svg',
    'email': '/images/email-security.svg',
    'identity': '/images/identity-protection.svg',
    'router': '/images/router-security.svg',
    'scam': '/images/scam-detection.svg',
    'tools': '/images/privacy-tools.svg',
    'shield': '/images/security-shield.svg'
  };

  if (!post) {
    return '/images/cybersecurity-default.svg';
  }

  // Get post content to search for keywords
  const title = (post.title || post.data?.title || '').toLowerCase();
  const tags = Array.isArray(post.tags) ? post.tags.join(' ').toLowerCase() : 
               Array.isArray(post.data?.tags) ? post.data.tags.join(' ').toLowerCase() : '';
  const content = `${title} ${tags}`;

  // Find matching image based on keywords
  for (const [keyword, imagePath] of Object.entries(imageMap)) {
    if (content.includes(keyword)) {
      return imagePath;
    }
  }

  return '/images/cybersecurity-default.svg';
}

// Legacy function name for backward compatibility
export function getPostImageUrl(post) {
  return getImageForPost(post);
}

export function getPlaceholderImage() {
  return '/images/placeholder-security.svg';
}
