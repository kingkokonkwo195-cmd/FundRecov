#!/bin/bash

# Start the frontend and backend servers in development mode
echo "Starting PiNets development servers..."

# Install dependencies if needed
if [ ! -d "frontend/node_modules" ] || [ ! -d "backend/node_modules" ]; then
  echo "Installing dependencies..."
  npm run install:all
fi

# Start the development servers
npm run dev