#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const readline = require('readline');

// ANSI color codes for better CLI experience
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
};

// Readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Utility to ask questions
function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

// Validate project name
function validateProjectName(name) {
  if (!name) return false;
  if (!/^[a-z0-9-_]+$/i.test(name)) {
    console.log(`${colors.yellow}⚠️  Project name can only contain letters, numbers, hyphens, and underscores${colors.reset}`);
    return false;
  }
  return true;
}

// Validate bundle identifier
function validateBundleId(id) {
  if (!id) return false;
  if (!/^[a-z][a-z0-9-]*(\.[a-z][a-z0-9-]*)+$/i.test(id)) {
    console.log(`${colors.yellow}⚠️  Bundle ID should be in reverse domain format (e.g., com.company.app)${colors.reset}`);
    return false;
  }
  return true;
}

// Main function
async function main() {
  console.log(`${colors.bright}${colors.cyan}`);
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║                                                          ║');
  console.log('║           🌬️   Project Wind CLI Installer  🌬️            ║');
  console.log('║                                                          ║');
  console.log('║   Modern Tauri + React + TypeScript + Shadcn/UI         ║');
  console.log('║                                                          ║');
  console.log('╚══════════════════════════════════════════════════════════╝');
  console.log(colors.reset);
  console.log(`${colors.dim}Let's set up your new desktop application!${colors.reset}\n`);

  let config = {};

  // 1. Project folder name
  console.log(`${colors.cyan}📁 Project folder name:${colors.reset}`);
  console.log(`   ${colors.dim}This will be your project directory name${colors.reset}`);
  console.log(`   ${colors.dim}Use lowercase with dashes (e.g., my-awesome-app)${colors.reset}`);
  let projectName = process.argv[2];
  while (!validateProjectName(projectName)) {
    projectName = await question(`   > `);
  }
  config.projectName = projectName.trim();

  // 2. App display name
  const autoDisplayName = config.projectName.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  console.log(`\n${colors.cyan}🏷️  App display name:${colors.reset}`);
  console.log(`   ${colors.dim}This is the name shown in your app's titlebar and windows${colors.reset}`);
  console.log(`   ${colors.dim}Can use spaces and capitals (e.g., My Awesome App)${colors.reset}`);
  console.log(`   ${colors.dim}Press Enter to use: "${autoDisplayName}"${colors.reset}`);
  let appName = await question(`   > `);
  config.appName = appName.trim() || autoDisplayName;

  // 3. Author name
  let author = await question(`\n${colors.cyan}👤 Author name:${colors.reset} ${colors.dim}(your name or company)${colors.reset}\n   > `);
  config.author = author.trim() || 'Your Name';

  // 4. Bundle identifier
  let bundleId = '';
  const defaultBundleId = `com.${config.author.toLowerCase().replace(/\s+/g, '')}.${config.projectName.replace(/[^a-z0-9]/gi, '')}`;
  while (!validateBundleId(bundleId)) {
    bundleId = await question(`\n${colors.cyan}📦 Bundle identifier:${colors.reset} ${colors.dim}(defaults to "${defaultBundleId}")${colors.reset}\n   > `);
    if (!bundleId.trim()) {
      bundleId = defaultBundleId;
    }
  }
  config.bundleId = bundleId.trim();

  // 5. Package manager
  console.log(`\n${colors.cyan}📦 Package manager:${colors.reset}`);
  console.log(`   ${colors.dim}1) npm${colors.reset}`);
  console.log(`   ${colors.dim}2) yarn${colors.reset}`);
  console.log(`   ${colors.dim}3) pnpm${colors.reset}`);
  console.log(`   ${colors.dim}4) bun${colors.reset}`);
  let pmChoice = await question(`   > `);
  config.packageManager = ['npm', 'yarn', 'pnpm', 'bun'][parseInt(pmChoice) - 1] || 'npm';

  // 6. Auto install dependencies
  let autoInstall = await question(`\n${colors.cyan}⚡ Install dependencies automatically?${colors.reset} ${colors.dim}(y/n, default: y)${colors.reset}\n   > `);
  config.autoInstall = autoInstall.trim().toLowerCase() !== 'n';

  // Set defaults for non-prompted options
  config.description = `A modern desktop application built with Tauri and React`;
  config.theme = 'system';
  config.initGit = false;
  config.includeDemo = true;

  rl.close();

  // Display configuration summary
  console.log(`\n${colors.bright}${colors.magenta}📋 Configuration Summary:${colors.reset}`);
  console.log(`${colors.dim}${'─'.repeat(60)}${colors.reset}`);
  console.log(`   Project Name:     ${colors.green}${config.projectName}${colors.reset}`);
  console.log(`   App Name:         ${colors.green}${config.appName}${colors.reset}`);
  console.log(`   Author:           ${colors.green}${config.author}${colors.reset}`);
  console.log(`   Bundle ID:        ${colors.green}${config.bundleId}${colors.reset}`);
  console.log(`   Package Manager:  ${colors.green}${config.packageManager}${colors.reset}`);
  console.log(`${colors.dim}${'─'.repeat(60)}${colors.reset}\n`);

  // Clone the repository
  console.log(`${colors.blue}📦 Cloning template...${colors.reset}`);
  try {
    execSync(
      `git clone --depth 1 https://github.com/ssanaullahrais/project-wind-tauri-js-starter-kit.git ${config.projectName}`,
      { stdio: 'inherit' }
    );
  } catch (error) {
    console.error(`${colors.yellow}⚠️  Failed to clone repository. Make sure git is installed.${colors.reset}`);
    process.exit(1);
  }

  const projectPath = path.join(process.cwd(), config.projectName);

  // Remove .git directory
  console.log(`${colors.blue}🧹 Cleaning up...${colors.reset}`);
  const gitDir = path.join(projectPath, '.git');
  if (fs.existsSync(gitDir)) {
    fs.rmSync(gitDir, { recursive: true, force: true });
  }

  // Remove cli directory from cloned project
  const cliDir = path.join(projectPath, 'cli');
  if (fs.existsSync(cliDir)) {
    fs.rmSync(cliDir, { recursive: true, force: true });
  }

  // Remove demo components if not wanted
  if (!config.includeDemo) {
    console.log(`${colors.blue}🗑️  Removing demo components...${colors.reset}`);
    const demoComponentPath = path.join(projectPath, 'src', 'components', 'demo');
    if (fs.existsSync(demoComponentPath)) {
      fs.rmSync(demoComponentPath, { recursive: true, force: true });
    }
  }

  // Update configuration files
  console.log(`${colors.blue}⚙️  Configuring project...${colors.reset}`);

  // Update package.json
  const packageJsonPath = path.join(projectPath, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.name = config.projectName;
    packageJson.description = config.description;
    packageJson.author = config.author;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }

  // Update tauri.conf.json
  const tauriConfPath = path.join(projectPath, 'src-tauri', 'tauri.conf.json');
  if (fs.existsSync(tauriConfPath)) {
    const tauriConf = JSON.parse(fs.readFileSync(tauriConfPath, 'utf8'));
    tauriConf.package.productName = config.appName;
    tauriConf.tauri.windows[0].title = config.appName;
    tauriConf.tauri.bundle.identifier = config.bundleId;
    fs.writeFileSync(tauriConfPath, JSON.stringify(tauriConf, null, 2));
  }

  // Update index.html
  const indexHtmlPath = path.join(projectPath, 'index.html');
  if (fs.existsSync(indexHtmlPath)) {
    let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
    indexHtml = indexHtml.replace(/<title>.*?<\/title>/, `<title>${config.appName}</title>`);
    fs.writeFileSync(indexHtmlPath, indexHtml);
  }

  // Update TitleBar.tsx
  const titleBarPath = path.join(projectPath, 'src', 'components', 'TitleBar.tsx');
  if (fs.existsSync(titleBarPath)) {
    let titleBar = fs.readFileSync(titleBarPath, 'utf8');
    // Replace all instances of "Project Wind" with the app name
    titleBar = titleBar.replace(/Project Wind/g, config.appName);
    // Update copyright year and author
    const currentYear = new Date().getFullYear();
    titleBar = titleBar.replace(/© \d{4} .*?\. All rights reserved\./, `© ${currentYear} ${config.author}. All rights reserved.`);
    // Update created by
    titleBar = titleBar.replace(/<span className="font-medium">Sunny<\/span>/, `<span className="font-medium">${config.author}</span>`);
    fs.writeFileSync(titleBarPath, titleBar);
  }

  // Update theme-provider.tsx if theme is not system
  if (config.theme !== 'system') {
    const themeProviderPath = path.join(projectPath, 'src', 'components', 'theme-provider.tsx');
    if (fs.existsSync(themeProviderPath)) {
      let themeProvider = fs.readFileSync(themeProviderPath, 'utf8');
      themeProvider = themeProvider.replace(/defaultTheme="system"/, `defaultTheme="${config.theme}"`);
      fs.writeFileSync(themeProviderPath, themeProvider);
    }
  }

  // Update DemoComponents.tsx if it exists
  if (config.includeDemo) {
    const demoComponentsPath = path.join(projectPath, 'src', 'components', 'demo', 'DemoComponents.tsx');
    if (fs.existsSync(demoComponentsPath)) {
      let demoComponents = fs.readFileSync(demoComponentsPath, 'utf8');
      demoComponents = demoComponents.replace(/Project Wind/g, config.appName);
      fs.writeFileSync(demoComponentsPath, demoComponents);
    }
  }

  // Initialize git if requested
  if (config.initGit) {
    console.log(`${colors.blue}🔧 Initializing git repository...${colors.reset}`);
    try {
      execSync('git init', { cwd: projectPath, stdio: 'ignore' });
      execSync('git add .', { cwd: projectPath, stdio: 'ignore' });
      execSync(`git commit -m "Initial commit: ${config.appName}"`, { cwd: projectPath, stdio: 'ignore' });
    } catch (error) {
      console.log(`${colors.yellow}⚠️  Git initialization failed (git may not be installed)${colors.reset}`);
    }
  }

  // Install dependencies if requested
  if (config.autoInstall) {
    console.log(`\n${colors.blue}📥 Installing dependencies with ${config.packageManager}...${colors.reset}`);
    console.log(`${colors.dim}This may take a few minutes...${colors.reset}\n`);
    try {
      const installCmd = config.packageManager === 'npm' ? 'npm install' :
                        config.packageManager === 'yarn' ? 'yarn' :
                        config.packageManager === 'pnpm' ? 'pnpm install' :
                        'bun install';
      execSync(installCmd, { cwd: projectPath, stdio: 'inherit' });
    } catch (error) {
      console.log(`${colors.yellow}⚠️  Dependency installation failed. You can install them manually later.${colors.reset}`);
    }
  }

  // Success message
  console.log(`\n${colors.bright}${colors.green}✅ Project created successfully!${colors.reset}\n`);
  console.log(`${colors.bright}📝 Next steps:${colors.reset}\n`);
  console.log(`   ${colors.cyan}cd ${config.projectName}${colors.reset}`);

  if (!config.autoInstall) {
    console.log(`   ${colors.cyan}${config.packageManager} install${colors.reset}`);
  }

  const devCmd = config.packageManager === 'npm' ? 'npm run tauri dev' :
                config.packageManager === 'yarn' ? 'yarn tauri dev' :
                config.packageManager === 'pnpm' ? 'pnpm tauri dev' :
                'bun run tauri dev';
  console.log(`   ${colors.cyan}${devCmd}${colors.reset}\n`);

  console.log(`${colors.bright}${colors.magenta}🚀 Happy coding!${colors.reset}\n`);
}

// Run the main function
main().catch(error => {
  console.error(`${colors.yellow}❌ An error occurred:${colors.reset}`, error.message);
  process.exit(1);
});
