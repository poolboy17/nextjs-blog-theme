
export function getImageForPost(post) {
  // Use local placeholder images instead of external API calls
  const imageMap = {
    'cybersecurity': '/images/cybersecurity-1.svg',
    'security': '/images/security-shield.svg',
    'privacy': '/images/privacy-security.svg',
    'antivirus': '/images/antivirus-protection.svg',
    'router': '/images/router-security.svg',
    'wifi': '/images/router-security.svg',
    'protection': '/images/data-protection.svg',
    'scam': '/images/scam-detection.svg',
    'phishing': '/images/email-security.svg',
    'ai': '/images/ai-security.svg',
    'identity': '/images/identity-protection.svg',
    'malware': '/images/cyber-defense.svg',
    'vpn': '/images/privacy-tools.svg',
    'email': '/images/email-security.svg'
  };

  // Extract keywords from title and tags
  const title = post.data.title?.toLowerCase() || '';
  const tags = post.data.tags || [];
  const allText = [title, ...tags.map(tag => tag.toLowerCase())].join(' ');

  // Find matching image based on keywords
  for (const [keyword, imagePath] of Object.entries(imageMap)) {
    if (allText.includes(keyword)) {
      return imagePath;
    }
  }

  // Default fallback image
  return '/images/cybersecurity-default.svg';
}

// Legacy function name for backward compatibility
export function getPostImageUrl(post) {
  return getImageForPost(post);
}

export function getPlaceholderImage() {
  return '/images/placeholder-security.jpg';
}
