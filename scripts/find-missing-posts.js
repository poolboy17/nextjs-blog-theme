
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const POSTS_PATH = path.join(process.cwd(), 'posts');

function findMissingPosts() {
  console.log('Scanning for missing post references...');
  
  // Get all existing post files
  const existingFiles = fs.readdirSync(POSTS_PATH).filter(file => /\.mdx?$/.test(file));
  console.log(`Found ${existingFiles.length} existing post files`);
  
  // Look for references to missing posts in various places
  const missingRefs = [];
  
  // Check if any posts reference non-existing files in their content
  existingFiles.forEach(file => {
    try {
      const filePath = path.join(POSTS_PATH, file);
      const source = fs.readFileSync(filePath, 'utf8');
      const { content, data } = matter(source);
      
      // Look for markdown links that might reference missing posts
      const linkPattern = /\[.*?\]\(\/posts\/(.*?)\)/g;
      let match;
      while ((match = linkPattern.exec(content)) !== null) {
        const referencedSlug = match[1];
        const referencedFile = `${referencedSlug}.mdx`;
        if (!existingFiles.includes(referencedFile)) {
          missingRefs.push({
            sourceFile: file,
            missingReference: referencedFile,
            type: 'content_link'
          });
        }
      }
      
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  });
  
  // Report findings
  if (missingRefs.length > 0) {
    console.log('\n=== Missing Post References Found ===');
    missingRefs.forEach(ref => {
      console.log(`${ref.sourceFile} references missing post: ${ref.missingReference}`);
    });
  } else {
    console.log('\n✓ No missing post references found in content');
  }
  
  // Check for any orphaned references in navigation or static paths
  console.log('\n=== Checking for common missing posts ===');
  const commonMissingPosts = [
    'ftc-finalizes-order-with-godaddy-to-address-data-security-failures.mdx'
  ];
  
  commonMissingPosts.forEach(missingPost => {
    const fullPath = path.join(POSTS_PATH, missingPost);
    if (!fs.existsSync(fullPath)) {
      console.log(`❌ Missing: ${missingPost}`);
      
      // Create a placeholder file to prevent errors
      const slug = missingPost.replace(/\.mdx?$/, '');
      const placeholderContent = `---
title: ${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
date: '${new Date().toISOString()}'
categories:
  - Uncategorized
tags:
  - placeholder
featured_image: /images/featured/placeholder.jpg
---

This post is currently unavailable.
`;
      
      fs.writeFileSync(fullPath, placeholderContent);
      console.log(`✓ Created placeholder for: ${missingPost}`);
    }
  });
  
  console.log('\n=== Scan Complete ===');
}

// Run the scan
findMissingPosts();
