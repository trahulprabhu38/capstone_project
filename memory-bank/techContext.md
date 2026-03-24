# KYCGate — Tech Context

## Stack
- **Monorepo**: Turborepo + npm workspaces
- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS
- **Backend**: Express.js, TypeScript, Mongoose ODM
- **Database**: MongoDB Atlas
- **File Storage**: AWS S3 with presigned URLs
- **Auth**: JWT (bcrypt password hashing)
- **Validation**: Zod (shared between frontend/backend)
- **Web3**: ethers.js for MetaMask wallet connection

## Key Dependencies
- `@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner` — S3 uploads
- `bcrypt`, `jsonwebtoken` — Auth
- `multer` — File upload middleware
- `helmet`, `express-mongo-sanitize`, `express-rate-limit` — Security
- `winston` — Logging
- `react-dropzone` — Drag-and-drop file upload
- `lucide-react` — Icons

## Ports
- Onboarding: 3000
- Admin: 3001
- API: 5000
