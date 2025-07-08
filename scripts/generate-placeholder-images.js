
const fs = require('fs');
const path = require('path');

// Create images directory if it doesn't exist
const imagesDir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Generate simple SVG placeholder images
const placeholderImages = [
  { name: 'cybersecurity-1.jpg', theme: 'Shield Security', color: '#3b82f6' },
  { name: 'cybersecurity-2.jpg', theme: 'Network Protection', color: '#8b5cf6' },
  { name: 'cybersecurity-3.jpg', theme: 'Data Security', color: '#06b6d4' },
  { name: 'cybersecurity-4.jpg', theme: 'Privacy Guard', color: '#10b981' },
  { name: 'cybersecurity-5.jpg', theme: 'Secure Access', color: '#f59e0b' },
  { name: 'cybersecurity-6.jpg', theme: 'Threat Defense', color: '#ef4444' },
  { name: 'security-shield.jpg', theme: 'Security Shield', color: '#1e40af' },
  { name: 'data-protection.jpg', theme: 'Data Protection', color: '#7c3aed' },
  { name: 'privacy-security.jpg', theme: 'Privacy Security', color: '#0891b2' },
  { name: 'cyber-defense.jpg', theme: 'Cyber Defense', color: '#059669' },
  { name: 'privacy-tools.jpg', theme: 'Privacy Tools', color: '#d97706' },
  { name: 'scam-detection.jpg', theme: 'Scam Detection', color: '#dc2626' },
  { name: 'email-security.jpg', theme: 'Email Security', color: '#4338ca' },
  { name: 'router-security.jpg', theme: 'Router Security', color: '#7c2d12' },
  { name: 'antivirus-protection.jpg', theme: 'Antivirus Protection', color: '#166534' },
  { name: 'ai-security.jpg', theme: 'AI Security', color: '#be185d' },
  { name: 'identity-protection.jpg', theme: 'Identity Protection', color: '#0c4a6e' },
  { name: 'cybersecurity-default.jpg', theme: 'Cybersecurity', color: '#374151' },
  { name: 'placeholder-security.jpg', theme: 'Security Topic', color: '#6b7280' },
];

placeholderImages.forEach(({ name, theme, color }) => {
  const svgContent = `
<svg width="400" height="250" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color}CC;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="400" height="250" fill="url(#grad)"/>
  <text x="200" y="120" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">
    ${theme}
  </text>
  <circle cx="200" cy="80" r="20" fill="white" opacity="0.3"/>
  <rect x="180" y="140" width="40" height="3" fill="white" opacity="0.5"/>
</svg>
  `.trim();

  // Convert SVG name to match expected format
  const fileName = name.replace('.jpg', '.svg');
  const filePath = path.join(imagesDir, fileName);
  
  fs.writeFileSync(filePath, svgContent);
  console.log(`Created: ${fileName}`);
});

console.log('Placeholder images generated successfully!');
