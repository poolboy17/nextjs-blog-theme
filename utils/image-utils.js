
export function getImageForPost(post) {
  // Use local placeholder images based on post content
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

  // Check title and tags for keywords
  const title = post.title?.toLowerCase() || '';
  const tags = post.tags?.join(' ').toLowerCase() || '';
  const content = `${title} ${tags}`;

  // Find matching image based on keywords
  for (const [keyword, imagePath] of Object.entries(imageMap)) {
    if (content.includes(keyword)) {
      return imagePath;
    }
  }

  // Default fallback
  return '/images/cybersecurity-default.svg';
}

// Legacy function name for backward compatibility
export function getPostImageUrl(post) {
  return getImageForPost(post);
}

export function getPlaceholderImage() {
  return '/images/placeholder-security.jpg';
}
