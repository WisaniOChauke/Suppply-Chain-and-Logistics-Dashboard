# Deployment Guide

## 🚀 Deployment Environments

### Development
```bash
npm run dev
```

### Staging
```bash
npm run deploy:staging
```

### Production
```bash
npm run deploy:prod
```

## 🔧 Environment Configuration

### 1. Staging Environment
- Automatic deployment on `develop` branch push
- Uses test/sandbox external APIs
- Debug logging enabled
- Test database and Redis instances

### 2. Production Environment
- Automatic deployment on `main` branch push
- Production external APIs
- Info-level logging
- Managed database services

## 📋 Pre-deployment Checklist

### Staging Deployment
- [ ] Update `.env.staging` with staging credentials
- [ ] Verify test API keys are configured
- [ ] Ensure staging database is accessible
- [ ] Run full test suite: `npm test`

### Production Deployment
- [ ] Update `.env.production` with production credentials
- [ ] Configure production API keys
- [ ] Set up managed database services
- [ ] Configure monitoring and alerting
- [ ] Run security audit: `npm audit`
- [ ] Verify SSL certificates
- [ ] Set up backup procedures

## 🔍 Health Checks

### Application Health
```bash
curl http://localhost:3000/health
```

### Database Health
```bash
curl http://localhost:3001/health/db
```

### Redis Health
```bash
curl http://localhost:3001/health/redis
```

## 🔄 Rollback Procedure

### Quick Rollback
```bash
# Stop current deployment
docker-compose -f docker-compose.prod.yml down

# Deploy previous version
docker-compose -f docker-compose.prod.yml up -d
```

### Database Rollback
```bash
# Restore from backup
psql -h localhost -U postgres -d supply_chain < backup.sql
```

## 📊 Monitoring

### Application Metrics
- Response times
- Error rates
- Active connections
- Memory usage

### Business Metrics
- Active shipments
- Exception rates
- API call volumes
- User activity

## 🚨 Troubleshooting

### Common Issues
1. **Database connection failed**
   - Check database credentials
   - Verify network connectivity
   - Check database service status

2. **Redis connection failed**
   - Verify Redis service is running
   - Check Redis configuration
   - Validate connection parameters

3. **External API failures**
   - Check API key validity
   - Verify rate limits
   - Review API endpoint status

### Logs
```bash
# Application logs
docker logs supply-chain-backend
docker logs supply-chain-frontend

# Database logs
docker logs supply-chain-postgres
```