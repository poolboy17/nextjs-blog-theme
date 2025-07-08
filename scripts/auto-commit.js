
#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function runCommand(command) {
  try {
    return execSync(command, { encoding: 'utf8', stdio: 'pipe' });
  } catch (error) {
    console.error(`Error running command: ${command}`);
    console.error(error.message);
    return null;
  }
}

function hasChanges() {
  const status = runCommand('git status --porcelain');
  return status && status.trim().length > 0;
}

function generateCommitMessage() {
  const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const status = runCommand('git status --porcelain') || '';
  
  const changes = {
    added: (status.match(/^A /gm) || []).length,
    modified: (status.match(/^M /gm) || []).length,
    deleted: (status.match(/^D /gm) || []).length,
    untracked: (status.match(/^\?\? /gm) || []).length
  };
  
  let message = `Auto-commit: ${timestamp}`;
  
  const changeParts = [];
  if (changes.added > 0) changeParts.push(`${changes.added} added`);
  if (changes.modified > 0) changeParts.push(`${changes.modified} modified`);
  if (changes.deleted > 0) changeParts.push(`${changes.deleted} deleted`);
  if (changes.untracked > 0) changeParts.push(`${changes.untracked} new files`);
  
  if (changeParts.length > 0) {
    message += ` - ${changeParts.join(', ')}`;
  }
  
  return message;
}

function autoCommit() {
  console.log('🔄 Checking for changes...');
  
  if (!hasChanges()) {
    console.log('✅ No changes to commit');
    return;
  }
  
  console.log('📝 Changes detected, creating auto-commit...');
  
  // Add all changes
  runCommand('git add .');
  
  // Generate and execute commit
  const commitMessage = generateCommitMessage();
  const result = runCommand(`git commit -m "${commitMessage}"`);
  
  if (result) {
    console.log(`✅ Auto-commit created: ${commitMessage}`);
    
    // Push to remote if configured
    const remoteResult = runCommand('git push origin main 2>/dev/null || git push origin master 2>/dev/null');
    if (remoteResult) {
      console.log('🚀 Changes pushed to remote repository');
    } else {
      console.log('⚠️  Could not push to remote (check if remote is configured)');
    }
  } else {
    console.log('❌ Failed to create commit');
  }
}

// Run the auto-commit
autoCommit();
