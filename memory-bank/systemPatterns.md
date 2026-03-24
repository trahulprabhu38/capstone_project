# KYCGate — System Patterns

## Architecture Pattern
- Monorepo with npm workspaces — all apps under `apps/`, shared code under `packages/`
- Three independent apps sharing types/validation via `@kyc-platform/shared`
- Backend (`apps/api`) follows MVC pattern: routes → controllers → services → models

## Auth Pattern
- JWT access token (15 min) + refresh token (7 days)
- Middleware chain: `authMiddleware` (verify JWT) → `adminAuthMiddleware` (check role)
- Token stored in localStorage (client-side)
- Automatic refresh via Axios interceptor on 401

## API Response Pattern
```json
{ "success": true/false, "data": {}, "message": "string" }
```

## File Upload Pattern
1. Client sends multipart/form-data
2. Multer memoryStorage receives buffer
3. Buffer uploaded to S3 with structured key: `{userId}/{docType}_{timestamp}.{ext}`
4. S3 key stored in KycApplication document
5. Admin views via 15-minute presigned URLs

## Component Pattern
- Next.js App Router with route groups: `(auth)`, `(dashboard)`
- Auth-protected layouts check `isAuthenticated()` on mount
- Custom hooks (`useAuth`, `useKyc`) encapsulate API calls and state
- KYC form uses step-based state management with step components
