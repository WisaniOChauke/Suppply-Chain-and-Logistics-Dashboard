# Supply Chain and Logistics Dashboard

An enterprise-grade web application for tracking, managing, and optimizing global shipments in real time. Features live map visualization, predictive ETA and SLA breach alerts, role-based dashboards, and supplier/customer portals.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Git

### Installation

1. **Clone and setup**
```bash
git clone <repository-url>
cd Suppply-Chain-and-Logistics-Dashboard
npm install
```

2. **Start infrastructure**
```bash
docker-compose up -d
```

3. **Setup environment**
```bash
cp .env.example .env
```

4. **Start development servers**
```bash
npm run dev
```

Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Storybook: http://localhost:6006

## 📁 Project Structure

```
├── apps/
│   ├── frontend/          # Next.js React application
│   └── backend/           # NestJS API server
├── packages/
│   └── shared/            # Shared types and utilities
├── docker-compose.yml     # Local development infrastructure
└── package.json          # Workspace configuration
```

## 🛠 Tech Stack

**Frontend:**
- Next.js 14 + React 18 + TypeScript
- Tailwind CSS + Radix UI
- React Query + Zustand
- Socket.IO + Mapbox GL JS

**Backend:**
- NestJS + TypeScript
- PostgreSQL + TypeORM
- Redis + Socket.IO
- Pino logging

## 📋 Development Roadmap

### Phase 0 - Inception ✅
- [x] Project scaffolding
- [x] Monorepo setup
- [x] Core architecture
- [x] Design system foundation

### Phase 1 - MVP Visibility ✅
- [x] Shipment tracking core
- [x] Live map integration
- [x] Real-time event streaming
- [x] Interactive shipment details
- [x] Event timeline tracking
- [x] WebSocket real-time updates

### Phase 2 - Actionability ✅
- [x] SLA management
- [x] Exception handling
- [x] Work queues
- [x] Priority-based assignment
- [x] Real-time notifications
- [x] Exception lifecycle management

### Phase 3 - Prediction ✅
- [x] ETA forecasting
- [x] Risk scoring
- [x] ML-like prediction algorithms
- [x] Predictive analytics dashboard
- [x] Model performance tracking
- [x] Confidence scoring

### Phase 4 - Portals (3-4 weeks)
- [ ] Supplier portal
- [ ] Customer portal
- [ ] Multi-tenant support
- [ ] Role-based access control
- [ ] Portal dashboards
- [ ] Notification preferences

### Phase 5 - Hardening (ongoing)
- [ ] Performance optimization
- [ ] Security hardening
- [ ] Observability
- [ ] Production deployment

## 🧪 Testing

```bash
# Run all tests
npm test

# Frontend tests
npm run test:frontend

# Backend tests
npm run test:backend

# E2E tests
npm run test:e2e
```

## 📚 Documentation

- [API Documentation](./docs/api.md)
- [Component Library](http://localhost:6006) (Storybook)
- [Architecture Guide](./docs/architecture.md)
- [Deployment Guide](./docs/deployment.md)

## 🤝 Contributing

1. Create feature branch from `main`
2. Follow conventional commits
3. Ensure tests pass
4. Submit pull request

## 📄 License

Private - All rights reserved