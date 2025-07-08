
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const hookContent = `#!/bin/sh
# Auto-commit hook for development
node scripts/auto-commit.js
`;

const preCommitHook = `#!/bin/sh
# Pre-commit hook to run auto-fix, linting and formatting
echo "🔍 Running pre-commit checks..."

# Auto-fix syntax issues
echo "🤖 Auto-fixing syntax issues..."
npm run fix:syntax --silent

# Run ESLint
npm run lint --silent
if [ $? -ne 0 ]; then
  echo "❌ ESLint failed. Please fix the remaining issues before committing."
  exit 1
fi

# Run tests
npm run test:ci --silent
if [ $? -ne 0 ]; then
  echo "❌ Tests failed. Please fix the issues before committing."
  exit 1
fi

echo "✅ Pre-commit checks passed"
`;

function setupGitHooks() {
  const gitHooksDir = path.join(process.cwd(), '.git', 'hooks');
  
  // Check if .git directory exists
  if (!fs.existsSync(path.join(process.cwd(), '.git'))) {
    console.log('🔧 Initializing git repository...');
    execSync('git init');
  }
  
  // Ensure hooks directory exists
  if (!fs.existsSync(gitHooksDir)) {
    fs.mkdirSync(gitHooksDir, { recursive: true });
  }
  
  // Setup pre-commit hook
  const preCommitPath = path.join(gitHooksDir, 'pre-commit');
  fs.writeFileSync(preCommitPath, preCommitHook);
  fs.chmodSync(preCommitPath, 0o755);
  
  console.log('✅ Git hooks configured successfully');
  console.log('🎯 Pre-commit hook will run linting before each commit');
}

setupGitHooks();
