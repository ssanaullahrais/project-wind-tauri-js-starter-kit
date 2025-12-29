#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const projectName = process.argv[2] || 'project-wind-app';

console.log(`\n🌬️  Creating Project Wind app in ${projectName}...\n`);

// Clone the repository
console.log('📦 Cloning template...');
execSync(
  `git clone --depth 1 https://github.com/ssanaullahrais/project-wind-tauri-js-starter-kit.git ${projectName}`,
  { stdio: 'inherit' }
);

// Remove .git directory
const gitDir = path.join(process.cwd(), projectName, '.git');
if (fs.existsSync(gitDir)) {
  fs.rmSync(gitDir, { recursive: true, force: true });
}

// Remove cli directory from cloned project
const cliDir = path.join(process.cwd(), projectName, 'cli');
if (fs.existsSync(cliDir)) {
  fs.rmSync(cliDir, { recursive: true, force: true });
}

console.log('\n✅ Project created successfully!\n');
console.log('📝 Next steps:\n');
console.log(`   cd ${projectName}`);
console.log('   npm install');
console.log('   npm run tauri dev\n');
console.log('🚀 Happy coding!\n');
