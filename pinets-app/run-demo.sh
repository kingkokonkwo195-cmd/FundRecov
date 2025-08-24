#!/bin/bash

# Start the frontend development server
cd frontend
npm run dev -- --host 0.0.0.0 &
FRONTEND_PID=$!

# Wait for the frontend to start
echo "Starting frontend server..."
sleep 5

# Start the backend server
cd ../backend
npm run dev &
BACKEND_PID=$!

echo "Starting backend server..."
sleep 2

# Expose the frontend port
echo "Exposing frontend to public URL..."
cd ../..
expose-port 5173

# Handle cleanup on exit
function cleanup {
  echo "Shutting down servers..."
  kill $FRONTEND_PID
  kill $BACKEND_PID
  exit
}

trap cleanup SIGINT SIGTERM

# Keep the script running
wait