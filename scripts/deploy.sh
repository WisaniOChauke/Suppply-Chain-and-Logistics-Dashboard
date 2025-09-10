#!/bin/bash

# Deployment script for Supply Chain Dashboard

set -e

ENVIRONMENT=${1:-staging}
VERSION=${2:-latest}

echo "🚀 Deploying Supply Chain Dashboard to $ENVIRONMENT environment..."

# Load environment variables
if [ -f ".env.$ENVIRONMENT" ]; then
    export $(cat .env.$ENVIRONMENT | grep -v '#' | awk '/=/ {print $1}')
fi

# Build and tag images
echo "📦 Building Docker images..."
docker build -t supply-chain-backend:$VERSION -f apps/backend/Dockerfile .
docker build -t supply-chain-frontend:$VERSION -f apps/frontend/Dockerfile .

# Deploy based on environment
if [ "$ENVIRONMENT" = "production" ]; then
    echo "🏭 Deploying to production..."
    docker-compose -f docker-compose.prod.yml down
    docker-compose -f docker-compose.prod.yml up -d
elif [ "$ENVIRONMENT" = "staging" ]; then
    echo "🧪 Deploying to staging..."
    docker-compose -f docker-compose.staging.yml down
    docker-compose -f docker-compose.staging.yml up -d
else
    echo "❌ Unknown environment: $ENVIRONMENT"
    exit 1
fi

# Health check
echo "🔍 Performing health check..."
sleep 30

if curl -f http://localhost:3000/health > /dev/null 2>&1; then
    echo "✅ Deployment successful! Application is healthy."
else
    echo "❌ Deployment failed! Application health check failed."
    exit 1
fi

echo "🎉 Deployment to $ENVIRONMENT completed successfully!"