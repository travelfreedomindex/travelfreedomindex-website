#!/bin/bash

# Kill any process running on port 3000
echo "🔍 Checking for processes on port 3000..."
PORT_PID=$(lsof -ti:3000)

if [ ! -z "$PORT_PID" ]; then
  echo "⚠️  Found process $PORT_PID using port 3000"
  echo "🔪 Killing process..."
  kill -9 $PORT_PID
  echo "✅ Process killed"
  sleep 1
else
  echo "✅ Port 3000 is free"
fi

# Start the Next.js development server
echo "🚀 Starting Next.js server on port 3000..."
npm run dev
