#!/bin/bash

# Start the application in production mode
echo "Starting PiNets in production mode..."

# Build the frontend
echo "Building frontend..."
cd frontend
npm run build
cd ..

# Start the backend server
echo "Starting backend server..."
cd backend
npm start