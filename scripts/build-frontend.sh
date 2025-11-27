#!/bin/bash

# ============================================
# CILS Frontend Build Script
# ============================================
# This script builds the frontend for production
# and prepares it for FTP upload to Ferozo

set -e  # Exit on error

echo "🚀 Building CILS Frontend for Production..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the project
echo "🔨 Building with Vite..."
npm run build

# Verify .htaccess is in dist
if [ ! -f "dist/.htaccess" ]; then
    echo "⚠️  .htaccess not found in dist/, copying from public/"
    cp public/.htaccess dist/.htaccess
fi

echo ""
echo "✅ Build completed successfully!"
echo ""
echo "📁 Files ready for upload in: ./dist/"
echo ""
echo "Next steps:"
echo "1. Connect to FTP: n7000023.ferozo.com"
echo "2. Upload ALL contents of ./dist/ to public_html/"
echo "3. Verify .htaccess was uploaded"
echo ""
echo "FTP Credentials:"
echo "  Host: n7000023.ferozo.com"
echo "  User: ftp@n7000023.ferozo.com"
echo "  Pass: tuWEfu91po"
echo ""
