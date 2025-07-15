#!/bin/bash

# Vercel Install Script for Private Git Submodules
# This script handles git authentication and submodule initialization
# where environment variables are properly expanded

set -e  # Exit on any error

echo "Starting Vercel install process..."

# Check if GITHUB_TOKEN is available
if [ -z "$GITHUB_TOKEN" ]; then
    echo "Error: GITHUB_TOKEN environment variable is not set"
    exit 1
fi

echo "GITHUB_TOKEN is available"

# Configure git to use the token for GitHub HTTPS requests
echo "Configuring git authentication..."
git config --global url."https://${GITHUB_TOKEN}@github.com/".insteadOf "https://github.com/"

# Initialize and update submodules
echo "Initializing git submodules..."
if git submodule status | grep -q "^-"; then
    echo "Submodules not initialized, running init..."
    git submodule update --init --recursive --verbose
else
    echo "Updating existing submodules..."
    git submodule update --recursive --verbose
fi

# Check if submodule update was successful
if [ $? -ne 0 ]; then
    echo "Error: Git submodule update failed"
    echo "Checking git configuration..."
    git config --global --list | grep github || echo "No GitHub configuration found"
    exit 1
fi

# Verify submodule was cloned successfully
if [ -d "content" ] && [ -n "$(ls -A content 2>/dev/null)" ]; then
    echo "Submodule 'content' successfully cloned"
    echo "Content directory contains: $(ls -la content | wc -l) items"
else
    echo "Error: Submodule 'content' appears to be empty or missing"
    ls -la content || echo "Content directory does not exist"
    exit 1
fi

# Install dependencies with pnpm
echo "Installing dependencies with pnpm..."
pnpm install

echo "Vercel install process completed successfully!"