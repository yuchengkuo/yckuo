#!/bin/bash

# Vercel's installCommand. A script rather than an inline command so that GITHUB_TOKEN
# is expanded before git sees the URL.

set -e

echo "Starting Vercel install process..."

if [ -z "$GITHUB_TOKEN" ]; then
    echo "Error: GITHUB_TOKEN environment variable is not set"
    exit 1
fi

echo "GITHUB_TOKEN is available"

echo "Configuring git authentication..."
git config --global url."https://${GITHUB_TOKEN}@github.com/".insteadOf "https://github.com/"

echo "Initializing git submodules..."
if git submodule status | grep -q "^-"; then
    echo "Submodules not initialized, running init..."
    git submodule update --init --recursive --verbose
else
    echo "Updating existing submodules..."
    git submodule update --recursive --verbose
fi

# Unreachable on failure: `set -e` has already exited.
if [ $? -ne 0 ]; then
    echo "Error: Git submodule update failed"
    echo "Checking git configuration..."
    git config --global --list | grep github || echo "No GitHub configuration found"
    exit 1
fi

if [ -d "content" ] && [ -n "$(ls -A content 2>/dev/null)" ]; then
    echo "Submodule 'content' successfully cloned"
    echo "Content directory contains: $(ls -la content | wc -l) items"
else
    echo "Error: Submodule 'content' appears to be empty or missing"
    ls -la content || echo "Content directory does not exist"
    exit 1
fi

echo "Installing dependencies with pnpm..."
pnpm install

echo "Vercel install process completed successfully!"