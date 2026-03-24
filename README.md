# KYCGate — Web3 Game KYC Onboarding Platform

A monorepo containing three services for a Web3 game KYC onboarding and admin approval platform. The system gates access to a deployed WebGL game behind identity verification and admin approval.

## Architecture

```
kyc-web3-game-platform/
├── apps/
│   ├── onboarding/       # User-facing Next.js app (port 3000)
│   ├── admin/            # Admin panel Next.js app (port 3001)
│   └── api/              # Express.js backend API (port 5000)
└── packages/
    └── shared/           # Shared types, constants, Zod validation
```

## Tech Stack

| Layer     | Technology                                        |
|-----------|---------------------------------------------------|
| Frontend  | Next.js 14+ (App Router), TypeScript, Tailwind CSS |
| Backend   | Node.js, Express.js, TypeScript                   |
| Database  | MongoDB Atlas (Mongoose ODM)                      |
| Storage   | AWS S3 (presigned URLs)                           |
| Auth      | JWT (access + refresh tokens), bcrypt             |
| Validation| Zod (shared schemas)                              |
| Monorepo  | Turborepo + npm workspaces                        |
| Web3      | ethers.js (MetaMask wallet connection)            |

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB Atlas cluster (or local MongoDB)
- AWS S3 bucket (for document uploads)

### Setup

```bash
# 1. Clone and install
git clone <repo-url>
cd kyc-web3-game-platform
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secrets, AWS credentials, etc.

# 3. Seed the admin user
npm run seed:admin

# 4. Run all services in development
npm run dev
```

### Development Commands

```bash
npm run dev               # Run all services
npm run dev:onboarding    # Onboarding app at localhost:3000
npm run dev:admin         # Admin panel at localhost:3001
npm run dev:api           # API server at localhost:5000
npm run build             # Build all services
npm run seed:admin        # Create default admin user (admin@game.com / Admin@123)
```

## User Flow

1. User signs up on the **Onboarding App** → fills multi-step KYC form (personal info, document upload, wallet connect)
2. Application status becomes **PENDING**
3. Admin reviews on the **Admin Panel** → approves or rejects with remarks
4. On approval → user sees **Play Game** button → redirected to WebGL game

## API Endpoints

| Method | Endpoint                     | Description                | Auth    |
|--------|------------------------------|----------------------------|---------|
| POST   | `/api/auth/signup`           | Register new user          | Public  |
| POST   | `/api/auth/login`            | Login, returns JWT tokens  | Public  |
| GET    | `/api/auth/me`               | Get current user profile   | User    |
| POST   | `/api/auth/refresh`          | Refresh access token       | Public  |
| POST   | `/api/kyc/submit`            | Submit KYC application     | User    |
| GET    | `/api/kyc/status`            | Get user's KYC status      | User    |
| PUT    | `/api/kyc/update`            | Update KYC application     | User    |
| POST   | `/api/upload/document`       | Upload document to S3      | User    |
| GET    | `/api/upload/document/:key`  | Get presigned URL          | User    |
| GET    | `/api/admin/applications`    | List all applications      | Admin   |
| GET    | `/api/admin/applications/:id`| Get application detail     | Admin   |
| PATCH  | `/api/admin/applications/:id`| Approve/reject application | Admin   |
| GET    | `/api/admin/users`           | List all users             | Admin   |
| GET    | `/api/admin/stats`           | Dashboard statistics       | Admin   |
| GET    | `/api/game/url`              | Get game URL (approved)    | User    |

## Brand Colors

- Primary Green: `#05A049`
- Dark Background: `#00111B`
- Light Mint: `#B4E3C8`
- Off-White: `#FFFFFC`

## License

Private — Capstone Project
