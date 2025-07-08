
#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

class BackgroundFixer {
  constructor() {
    this.processes = new Map();
  }

  startWatcher() {
    console.log('🤖 Starting background AI syntax fixer...');
    
    const fixerProcess = spawn('node', [
      path.join(__dirname, 'auto-fix-syntax.js'),
      '--watch'
    ], {
      stdio: 'inherit',
      detached: false
    });

    this.processes.set('syntax-fixer', fixerProcess);

    fixerProcess.on('error', (error) => {
      console.error('❌ Syntax fixer error:', error);
      this.restart();
    });

    fixerProcess.on('exit', (code) => {
      if (code !== 0) {
        console.log('🔄 Syntax fixer stopped, restarting...');
        setTimeout(() => this.restart(), 2000);
      }
    });

    // Graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n🛑 Stopping background fixer...');
      this.stop();
      process.exit(0);
    });

    console.log('✅ Background AI helper is now running!');
    console.log('💡 It will automatically fix syntax errors as you code');
    console.log('📝 Press Ctrl+C to stop');
  }

  restart() {
    this.stop();
    setTimeout(() => this.startWatcher(), 1000);
  }

  stop() {
    for (const [name, process] of this.processes) {
      try {
        process.kill('SIGTERM');
        console.log(`✅ Stopped ${name}`);
      } catch (error) {
        console.error(`❌ Error stopping ${name}:`, error);
      }
    }
    this.processes.clear();
  }
}

const fixer = new BackgroundFixer();
fixer.startWatcher();
