
#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class AutoFixHelper {
  constructor() {
    this.watchedDirs = ['components', 'pages', 'utils', '__tests__'];
    this.isRunning = false;
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = type === 'error' ? '❌' : type === 'warn' ? '⚠️' : '🔧';
    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  async fixSyntaxErrors() {
    try {
      this.log('Running ESLint auto-fix...');
      
      // Run ESLint with auto-fix
      execSync('npx eslint . --ext .js,.jsx --fix', {
        stdio: 'pipe',
        encoding: 'utf8'
      });
      
      this.log('✅ Auto-fix completed successfully');
      return true;
    } catch (error) {
      // ESLint returns non-zero exit code when there are unfixable errors
      const output = error.stdout || error.message;
      
      if (output.includes('problems')) {
        this.log('Some issues require manual attention', 'warn');
        console.log(output);
      } else {
        this.log(`Auto-fix error: ${error.message}`, 'error');
      }
      return false;
    }
  }

  async runTests() {
    try {
      this.log('Running tests to verify fixes...');
      execSync('npm run test -- --passWithNoTests --silent', {
        stdio: 'pipe'
      });
      this.log('✅ Tests passed');
      return true;
    } catch (error) {
      this.log('⚠️ Some tests failed - manual review needed', 'warn');
      return false;
    }
  }

  async watchForChanges() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.log('🚀 Auto-fix helper started - watching for file changes...');
    
    const chokidar = require('chokidar');
    
    const watcher = chokidar.watch(this.watchedDirs, {
      ignored: /(^|[\/\\])\../, // ignore dotfiles
      persistent: true,
      ignoreInitial: true
    });

    let timeout;
    
    watcher.on('change', (filePath) => {
      if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
        this.log(`File changed: ${filePath}`);
        
        // Debounce multiple rapid changes
        clearTimeout(timeout);
        timeout = setTimeout(async () => {
          await this.fixSyntaxErrors();
        }, 1000);
      }
    });

    process.on('SIGINT', () => {
      this.log('Auto-fix helper stopped');
      watcher.close();
      process.exit(0);
    });
  }

  async runOnce() {
    this.log('Running one-time syntax fix...');
    const success = await this.fixSyntaxErrors();
    
    if (success) {
      await this.runTests();
    }
    
    this.log('One-time fix completed');
  }
}

// CLI interface
const args = process.argv.slice(2);
const autoFixer = new AutoFixHelper();

if (args.includes('--watch')) {
  autoFixer.watchForChanges();
} else {
  autoFixer.runOnce();
}
