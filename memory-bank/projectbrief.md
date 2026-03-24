# KYCGate — Project Brief

## Core Purpose
Build a Web3 game KYC onboarding and admin approval platform as a monorepo. The system gates access to a deployed WebGL game behind identity verification and admin approval.

## Three Services
1. **Onboarding App** (Next.js) — User signup, multi-step KYC form, status dashboard
2. **Admin Panel** (Next.js) — Application review, user management, settings
3. **Backend API** (Express) — Auth, KYC CRUD, S3 uploads, admin endpoints

## Key Requirements
- JWT authentication with access + refresh tokens
- Multi-step KYC form: personal info → document upload (S3) → wallet connect → review
- Admin approval/rejection flow with remarks
- WebGL game access gated behind KYC approval
- Dark theme with gaming aesthetic
- Responsive design (mobile-first for onboarding)

## Brand
- Primary: #05A049, Dark: #00111B, Mint: #B4E3C8, Off-White: #FFFFFC
- Fonts: Bricolage Grotesque, Manrope, Inter
