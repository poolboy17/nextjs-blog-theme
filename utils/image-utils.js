
// Browser-compatible image utilities for local image serving
export const getPostImageUrl = (post) => {
  // Check if post already has an image
  if (post.data.image) {
    return post.data.image;
  }

  // Generate a consistent image selection based on post title and categories
  const hash = post.data.title.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);

  // Available local images - you can add more to public/images/
  const localImages = [
    '/images/cybersecurity-1.svg',
    '/images/cybersecurity-2.svg',
    '/images/cybersecurity-3.svg',
    '/images/cybersecurity-4.svg',
    '/images/cybersecurity-5.svg',
    '/images/cybersecurity-6.svg',
    '/images/security-shield.svg',
    '/images/data-protection.svg',
    '/images/privacy-security.svg',
    '/images/cyber-defense.svg',
  ];

  // Select image based on hash for consistency
  const imageIndex = Math.abs(hash) % localImages.length;
  const selectedImage = localImages[imageIndex];

  // Fallback to placeholder if local image doesn't exist
  return selectedImage || '/images/placeholder-security.svg';
};

// Cybersecurity themed local images
export const getCyberSecurityImage = (post) => {
  // Check if post already has an image
  if (post.data.image) {
    return post.data.image;
  }

  // Category-specific image mapping
  const categoryImages = {
    'Privacy Tools': '/images/privacy-tools.svg',
    'Scam Detection': '/images/scam-detection.svg',
    'Email Security': '/images/email-security.svg',
    'Router Security': '/images/router-security.svg',
    'Antivirus': '/images/antivirus-protection.svg',
    'AI Security': '/images/ai-security.svg',
    'Identity Protection': '/images/identity-protection.svg',
    'default': '/images/cybersecurity-default.svg'
  };

  // Get first category if available
  const category = post.data.categories && post.data.categories.length > 0 
    ? post.data.categories[0] 
    : 'default';

  return categoryImages[category] || categoryImages.default;
};

// Generate placeholder image using canvas (for development)
export const generatePlaceholderImage = (text, width = 400, height = 250, color = '#3b82f6') => {
  // This would be used server-side to generate placeholder images
  return `/images/placeholder-${encodeURIComponent(text.substring(0, 20))}.jpg`;
};
