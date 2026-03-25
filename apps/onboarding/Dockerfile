FROM node:20-alpine AS builder
WORKDIR /app

# Copy workspace manifests
COPY package.json package-lock.json turbo.json tsconfig.json ./

# Copy shared package source
COPY packages/shared ./packages/shared

# Copy onboarding app source
COPY apps/onboarding ./apps/onboarding

# Install all workspace dependencies
RUN npm ci

# NEXT_PUBLIC_* vars must be present at build time
ARG NEXT_PUBLIC_APP_ENV=dev
ARG NEXT_PUBLIC_API_URL=http://localhost:5001
ENV NEXT_PUBLIC_APP_ENV=$NEXT_PUBLIC_APP_ENV
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build shared package first, then the app
RUN npm run build --workspace=packages/shared && \
    npm run build --workspace=apps/onboarding

# ---- Runner ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy workspace root manifests
COPY --from=builder /app/package.json /app/package-lock.json ./

# Copy hoisted node_modules (includes workspace symlinks)
COPY --from=builder /app/node_modules ./node_modules

# Copy shared package (symlink target)
COPY --from=builder /app/packages ./packages

# Copy built Next.js output and required config
COPY --from=builder /app/apps/onboarding/.next ./apps/onboarding/.next
COPY --from=builder /app/apps/onboarding/next.config.js ./apps/onboarding/next.config.js
COPY --from=builder /app/apps/onboarding/package.json ./apps/onboarding/package.json

EXPOSE 3000

CMD ["npm", "run", "start", "--workspace=apps/onboarding"]
