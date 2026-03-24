# KYCGate — Active Context

## Current State
All three services have been scaffolded with complete code. The project needs:
1. `npm install` to resolve dependencies
2. `.env` configuration
3. End-to-end testing

## Recent Changes (2026-03-24)
- Full monorepo scaffolded from scratch
- Shared package with types, constants, Zod schemas
- Backend API with all routes, controllers, services, middleware
- Onboarding app with auth, multi-step KYC wizard, status dashboard
- Admin app with login, applications table/detail, users, settings
- Moved API from `services/api` to `apps/api` — all three apps now live under `apps/`

## Next Steps
- Install dependencies and verify builds
- Configure environment variables
- Test the complete user flow
- Add remaining features (wallet signature verification, email notifications, promote endpoint)
