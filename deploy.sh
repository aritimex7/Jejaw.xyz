#!/bin/bash

# 🚀 Personal Dashboard - Vercel Deployment Script

echo "🚀 Starting deployment process..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build project to check for errors
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Deploy to Vercel
    echo "🚀 Deploying to Vercel..."
    vercel --prod
    
    echo "🎉 Deployment complete!"
    echo "📝 Don't forget to set up environment variables in Vercel dashboard:"
    echo "   - DATABASE_URL"
    echo "   - NEXTAUTH_URL"
    echo "   - NEXTAUTH_SECRET"
    echo "   - NEXT_PUBLIC_APP_URL"
else
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi