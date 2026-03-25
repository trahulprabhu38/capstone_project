FROM node:20-alpine AS builder
WORKDIR /app

# Copy workspace manifests
COPY package.json package-lock.json turbo.json tsconfig.json ./

# Copy shared package source
COPY packages/shared ./packages/shared

# Copy API source
COPY apps/api ./apps/api

# Install all workspace dependencies
RUN npm ci

# Build shared package first, then API
RUN npm run build --workspace=packages/shared && \
    npm run build --workspace=apps/api

# ---- Runner ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy workspace root manifests
COPY --from=builder /app/package.json /app/package-lock.json ./

# Copy hoisted node_modules (includes workspace symlinks)
COPY --from=builder /app/node_modules ./node_modules

# Copy shared package (symlink target)
COPY --from=builder /app/packages ./packages

# Copy compiled API output
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json

EXPOSE 5001

CMD ["node", "apps/api/dist/index.js"]
