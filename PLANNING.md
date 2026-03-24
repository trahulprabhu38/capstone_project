# KYCGate — Planning Document

## Project Overview

Monorepo containing three services for a Web3 game KYC onboarding and admin approval platform. Access to a WebGL game is gated behind identity verification and admin approval.

## Architecture

- **Monorepo**: Turborepo + npm workspaces
- **Three apps**: Onboarding (Next.js), Admin (Next.js), API (Express) — all under `apps/`
- **Shared package**: Types, constants, Zod validation schemas under `packages/`

## Key Design Decisions

1. **App Router (Next.js 14+)**: Modern React patterns, server components where possible
2. **JWT with refresh tokens**: Access tokens (15 min) + refresh tokens (7 days)
3. **S3 presigned URLs**: Documents never publicly accessible; admin views via time-limited URLs
4. **Zod shared validation**: Same schemas validate on both frontend and backend
5. **Dark theme**: Gaming aesthetic with `#00111B` background and `#05A049` primary green
6. **ethers.js**: Direct MetaMask integration without heavy wagmi dependency

## File Structure Conventions

- `src/app/` — Next.js App Router pages
- `src/components/` — Reusable UI components
- `src/lib/` — Utility functions (API client, auth helpers, web3)
- `src/hooks/` — Custom React hooks
- `src/types/` — TypeScript type re-exports

## Style Guide

- TailwindCSS with custom design tokens
- Fonts: Bricolage Grotesque (titles), Manrope (headings), Inter (body)
- Cards: `rounded-card` (12px), Inputs: `rounded-input` (8px)
- Dark mode only

## Current Status

All three services have been scaffolded with complete functionality. The project is ready for environment configuration and npm install.
