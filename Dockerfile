# ─────────────────────────────────────────────────────────
# Stage 1 — Install dependencies
# ─────────────────────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json bun.lock ./
# Use npm for Cloud Run compatibility (no bun in prod image)
RUN npm install --legacy-peer-deps

# ─────────────────────────────────────────────────────────
# Stage 2 — Build the application
# ─────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Inject production environment variables at build time
ARG VITE_CONVEX_URL
ARG VITE_CLERK_PUBLISHABLE_KEY
ARG CLERK_SECRET_KEY
ARG CONVEX_DEPLOYMENT
ARG VITE_SENTRY_DSN

ENV VITE_CONVEX_URL=$VITE_CONVEX_URL
ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY
ENV CLERK_SECRET_KEY=$CLERK_SECRET_KEY
ENV CONVEX_DEPLOYMENT=$CONVEX_DEPLOYMENT
ENV VITE_SENTRY_DSN=$VITE_SENTRY_DSN

RUN npm run build

# ─────────────────────────────────────────────────────────
# Stage 3 — Production runtime
# ─────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy the built output and production dependencies
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Runtime env vars (injected by Cloud Run)
ENV VITE_CONVEX_URL=""
ENV VITE_CLERK_PUBLISHABLE_KEY=""
ENV CLERK_SECRET_KEY=""
ENV CONVEX_DEPLOYMENT=""
ENV VITE_SENTRY_DSN=""

# Cloud Run uses PORT env variable (default 8080)
ENV PORT=8080
EXPOSE 8080

# Start the TanStack Start SSR server
CMD ["node", "--import", "./.output/server/instrument.server.mjs", ".output/server/index.mjs"]
