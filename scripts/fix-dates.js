
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const POSTS_PATH = path.join(process.cwd(), 'posts');

function fixDates() {
  console.log('Starting date fix process...');
  
  // Get all markdown files
  const files = fs.readdirSync(POSTS_PATH).filter(file => /\.mdx?$/.test(file));
  
  let fixedCount = 0;
  let errorCount = 0;
  
  files.forEach(file => {
    try {
      const filePath = path.join(POSTS_PATH, file);
      const source = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(source);
      
      let needsUpdate = false;
      
      // Fix date if it exists and is not properly formatted
      if (data.date) {
        let originalDate = data.date;
        
        // If it's a Date object, convert to ISO string
        if (data.date instanceof Date) {
          data.date = data.date.toISOString();
          needsUpdate = true;
          console.log(`Fixed Date object in ${file}: ${originalDate} -> ${data.date}`);
        }
        // If it's a string but not ISO format, try to parse and convert
        else if (typeof data.date === 'string') {
          // Check if it's already in ISO format
          const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;
          
          if (!isoRegex.test(data.date)) {
            try {
              const parsedDate = new Date(data.date);
              if (!isNaN(parsedDate.getTime())) {
                data.date = parsedDate.toISOString();
                needsUpdate = true;
                console.log(`Fixed date string in ${file}: ${originalDate} -> ${data.date}`);
              }
            } catch (e) {
              console.error(`Could not parse date in ${file}: ${data.date}`);
            }
          }
        }
      }
      
      // Write back to file if changes were made
      if (needsUpdate) {
        const newContent = matter.stringify(content, data);
        fs.writeFileSync(filePath, newContent);
        fixedCount++;
        console.log(`✓ Updated ${file}`);
      }
      
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
      errorCount++;
    }
  });
  
  console.log('\n=== Date Fix Summary ===');
  console.log(`Total files processed: ${files.length}`);
  console.log(`Files fixed: ${fixedCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log('Date fix process completed!');
}

// Run the fix
fixDates();
