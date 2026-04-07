#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('==> Building TuniChat Backend with Frontend...');

// Check if frontend exists
const frontendPath = path.join(__dirname, 'frontend');

if (!fs.existsSync(frontendPath)) {
  console.log('==> Cloning frontend repo...');
  try {
    execSync('git clone https://github.com/MedBenSlama/tunchatfrontend.git frontend', {
      cwd: __dirname,
      stdio: 'inherit',
      shell: true
    });
  } catch (err) {
    console.log('Warning: Frontend clone failed, continuing anyway...');
  }
}

if (fs.existsSync(frontendPath)) {
  console.log('==> Installing frontend dependencies...');
  try {
    execSync('npm install', {
      cwd: frontendPath,
      stdio: 'inherit'
    });

    console.log('==> Building frontend...');
    execSync('npm run build', {
      cwd: frontendPath,
      stdio: 'inherit'
    });

    console.log('==> Frontend build complete!');
  } catch (err) {
    console.error('Error building frontend:', err.message);
  }
} else {
  console.log('Frontend directory not found, skipping build');
}

console.log('==> Backend ready to start!');
