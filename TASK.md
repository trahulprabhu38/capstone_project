# KYCGate — Task Tracker

## Completed Tasks

- [x] Root monorepo setup (package.json, turbo.json, tsconfig) — 2026-03-24
- [x] Shared package with types, constants, Zod validation — 2026-03-24
- [x] Backend API (Express + TypeScript) — models, middleware, services, controllers, routes — 2026-03-24
- [x] Onboarding Next.js app — landing, auth, KYC wizard, status dashboard — 2026-03-24
- [x] Admin Next.js app — login, applications CRUD, users, settings — 2026-03-24
- [x] Documentation (README, PLANNING.md) — 2026-03-24

## Pending Tasks

- [ ] Run `npm install` and verify all dependencies resolve
- [ ] Configure `.env` with real MongoDB URI, JWT secrets, AWS credentials
- [ ] Test end-to-end user flow (signup → KYC → admin review → game access)
- [ ] Add wallet signature verification on backend
- [ ] Implement email notification service (nodemailer)
- [ ] Add game URL config API endpoint (store in MongoDB config collection)
- [ ] Add user promotion endpoint (`PATCH /admin/users/:id/promote`)
- [ ] Write unit tests (Pytest-style but for TypeScript — use vitest or jest)
- [ ] Add proper error boundaries in React apps
- [ ] Production deployment configuration

## Discovered During Work

- Admin "promote to admin" feature needs a dedicated API endpoint
- Game URL configuration needs a database-backed config collection
- Email service is placeholder-only — needs SMTP integration
