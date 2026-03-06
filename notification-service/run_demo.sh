#!/bin/bash

# Notification SDK Demo Runner

echo "🎨 --- Notification SDK Demo ---"

# Check if Redis is running for Async Mode
if ! command -v redis-cli &> /dev/null; then
    echo "⚠️  redis-cli not found. Continuing without checking Redis..."
else
    if redis-cli ping &> /dev/null; then
        echo "✅ Redis is running. Async mode will work."
    else
        echo "❌ Redis is NOT running. Async mode will fail to publish."
        echo "   Tip: run 'docker run -d -p 6379:6379 redis'"
    fi
fi

echo ""
echo "📦 Running Go Tests..."
go test -v ./...

echo ""
echo "🚀 Running Example Application..."
go run examples/main.go

echo ""
echo "🎉 Done! Check the instructions in README.md to run the Worker service."
