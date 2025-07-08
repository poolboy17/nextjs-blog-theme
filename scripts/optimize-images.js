
const fs = require('fs');
const path = require('path');
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminSvgo = require('imagemin-svgo');
const imageminGifsicle = require('imagemin-gifsicle');

const INPUT_DIR = path.join(process.cwd(), 'public', 'images');
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'images', 'optimized');

async function optimizeImages() {
  console.log('🖼️  Starting image optimization...');
  
  try {
    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Optimize images
    const files = await imagemin([`${INPUT_DIR}/*.{jpg,jpeg,png,svg,gif}`], {
      destination: OUTPUT_DIR,
      plugins: [
        imageminMozjpeg({
          quality: 85,
          progressive: true
        }),
        imageminPngquant({
          quality: [0.6, 0.8]
        }),
        imageminSvgo({
          plugins: [
            { name: 'removeViewBox', active: false },
            { name: 'cleanupIDs', active: false }
          ]
        }),
        imageminGifsicle({
          optimizationLevel: 3
        })
      ]
    });

    console.log(`✅ Optimized ${files.length} images`);
    
    // Calculate savings
    let originalSize = 0;
    let optimizedSize = 0;

    files.forEach(file => {
      const originalFile = path.join(INPUT_DIR, path.basename(file.sourcePath));
      if (fs.existsSync(originalFile)) {
        originalSize += fs.statSync(originalFile).size;
        optimizedSize += fs.statSync(file.destinationPath).size;
      }
    });

    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    console.log(`💾 Size reduction: ${savings}% (${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(optimizedSize / 1024 / 1024).toFixed(2)}MB)`);
    
  } catch (error) {
    console.error('❌ Image optimization failed:', error);
  }
}

optimizeImages();
