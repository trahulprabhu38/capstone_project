# KYCGate — Progress

## What Works
- Complete monorepo structure with Turborepo
- Shared types, constants, and Zod validation schemas
- Express API with full auth, KYC, upload, admin, and game routes
- Onboarding app with landing page, signup/login, multi-step KYC form, status dashboard
- Admin panel with login, applications list/detail, users table, settings page
- JWT auth with refresh token rotation
- S3 upload flow with presigned URL generation
- MetaMask wallet connection via ethers.js
- Password strength indicator on signup
- Admin approval/rejection with remarks and modals
- Responsive dark-theme UI matching brand guidelines

## What's Left
- Dependency installation and build verification
- Environment configuration
- End-to-end testing
- Wallet signature verification
- Email notification service
- Game URL config API
- User promotion endpoint
- Unit tests
- Production deployment

## Known Issues
- Email service is a placeholder (logs only)
- Admin promote-to-admin is UI-only (needs backend endpoint)
- Game URL config is frontend-only (needs database-backed config)
