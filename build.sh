#!/bin/bash
set -e

echo "==> Building TuniChat Backend with Frontend..."

# Clone frontend repo if it doesn't exist
if [ ! -d "frontend" ]; then
  echo "==> Cloning frontend repo..."
  git clone https://github.com/MedBenSlama/tunchatfrontend.git frontend
fi

# Install frontend dependencies
echo "==> Installing frontend dependencies..."
cd frontend
npm install

# Build frontend
echo "==> Building frontend..."
npm run build

# Go back to backend
cd ..

echo "==> Build complete! Frontend built in ./frontend/dist"
