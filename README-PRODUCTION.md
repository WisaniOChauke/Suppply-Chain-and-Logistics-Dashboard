# Production Deployment Guide

## 🚀 Database Setup (Step 1)

### Prerequisites
- PostgreSQL 15+
- Redis 7+
- Docker & Docker Compose

### Quick Setup

1. **Copy environment configuration**
```bash
cp .env.example .env
```

2. **Update .env with your production values**
```bash
# Database Configuration
DB_HOST=your-postgres-host
DB_PORT=5432
DB_USERNAME=your-db-user
DB_PASSWORD=your-secure-password
DB_NAME=supply_chain

# Redis Configuration
REDIS_HOST=your-redis-host
REDIS_PORT=6379

# JWT Configuration
JWT_SECRET=your-super-secure-jwt-secret-256-bits
```

3. **Setup database**
```bash
npm run setup:db
```

4. **Start production services**
```bash
npm run start:prod
```

### Manual Database Setup

If you prefer manual setup:

```bash
# Connect to PostgreSQL
psql -h localhost -U postgres

# Create database
CREATE DATABASE supply_chain;

# Run migrations
\c supply_chain
\i apps/backend/src/database/migrations/001-initial-schema.sql
```

### Verify Setup

1. **Check database connection**
```bash
psql -h localhost -U postgres -d supply_chain -c "SELECT COUNT(*) FROM tenants;"
```

2. **Check Redis connection**
```bash
redis-cli ping
```

3. **Access application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Health Check: http://localhost:3001/health

## 📊 Database Schema

The production database includes:
- **tenants** - Multi-tenant organization data
- **users** - User accounts with role-based access
- **shipments** - Core shipment tracking data
- **events** - Shipment event timeline
- **exceptions** - Issue tracking and management
- **eta_forecasts** - Predictive ETA data
- **risk_assessments** - Risk analysis results

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DB_HOST` | PostgreSQL host | Yes |
| `DB_PASSWORD` | Database password | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `REDIS_HOST` | Redis host | Yes |
| `MAPBOX_ACCESS_TOKEN` | Mapbox API token | Optional |

### Docker Compose

Production services are orchestrated with `docker-compose.prod.yml`:
- PostgreSQL with persistent volumes
- Redis for caching and sessions
- Backend API server
- Frontend Next.js application

## 🎯 Next Steps

1. ✅ Database Setup Complete
2. 🔄 Authentication Implementation
3. 🔄 API Integration
4. 🔄 Testing Suite
5. 🔄 CI/CD Pipeline