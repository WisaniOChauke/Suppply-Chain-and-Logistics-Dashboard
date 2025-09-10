#!/bin/bash

# Database setup script for production deployment

set -e

echo "🚀 Setting up Supply Chain Dashboard Database..."

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi

# Default values
DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-5432}
DB_NAME=${DB_NAME:-supply_chain}
DB_USERNAME=${DB_USERNAME:-postgres}

echo "📊 Database Configuration:"
echo "  Host: $DB_HOST"
echo "  Port: $DB_PORT"
echo "  Database: $DB_NAME"
echo "  Username: $DB_USERNAME"

# Check if PostgreSQL is running
echo "🔍 Checking PostgreSQL connection..."
if ! pg_isready -h $DB_HOST -p $DB_PORT -U $DB_USERNAME; then
    echo "❌ PostgreSQL is not running or not accessible"
    echo "Please ensure PostgreSQL is running and accessible at $DB_HOST:$DB_PORT"
    exit 1
fi

echo "✅ PostgreSQL is running"

# Create database if it doesn't exist
echo "🗄️  Creating database if it doesn't exist..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USERNAME -tc "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'" | grep -q 1 || psql -h $DB_HOST -p $DB_PORT -U $DB_USERNAME -c "CREATE DATABASE $DB_NAME"

# Run migrations
echo "🔄 Running database migrations..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USERNAME -d $DB_NAME -f apps/backend/src/database/migrations/001-initial-schema.sql

echo "✅ Database setup completed successfully!"
echo ""
echo "🎯 Next steps:"
echo "  1. Update your .env file with the correct database credentials"
echo "  2. Run 'npm run start:prod' to start the application"
echo "  3. Access the application at http://localhost:3000"