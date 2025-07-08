// Browser-compatible image utilities
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

// Cybersecurity themed placeholder images
export const getCyberSecurityPlaceholder = (post) => {
  const themes = [
    'shield-security',
    'cybersecurity-network',
    'data-protection',
    'digital-privacy',
    'security-technology',
    'cyber-defense'
  ];

  const hash = post.data.title.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);

  const theme = themes[Math.abs(hash) % themes.length];
  const colors = ['1e40af', '7c3aed', '0891b2', '059669', 'd97706', 'dc2626'];
  const color = colors[Math.abs(hash) % colors.length];

  return `https://via.placeholder.com/400x250/${color}/ffffff?text=${encodeURIComponent(theme)}`;
};