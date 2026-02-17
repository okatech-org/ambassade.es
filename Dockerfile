# ─────────────────────────────────────────────────────────
# Stage 1 — Install dependencies with Bun
# ─────────────────────────────────────────────────────────
FROM oven/bun:1-alpine AS deps
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# ─────────────────────────────────────────────────────────
# Stage 2 — Build with Node 20 + Nitro
# ─────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Install bun for the build step (needed for bun-managed deps)
RUN npm install -g bun

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

# Use Nitro instead of Netlify for Node.js server output
ENV DOCKER_BUILD=true

RUN npx vite build

# ─────────────────────────────────────────────────────────
# Stage 3 — Production runtime (Node 20, minimal)
# ─────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy Nitro output + full node_modules for unbundled native deps (OpenTelemetry/Sentry)
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/node_modules ./node_modules

# Nitro creates a partial node_modules inside .output/server/ that lacks
# some @opentelemetry packages. Replace it with a symlink to the full deps.
RUN rm -rf .output/server/node_modules && \
    ln -s /app/node_modules .output/server/node_modules

# Runtime env vars (injected by Cloud Run)
ENV VITE_CONVEX_URL=""
ENV VITE_CLERK_PUBLISHABLE_KEY=""
ENV CLERK_SECRET_KEY=""
ENV CONVEX_DEPLOYMENT=""
ENV VITE_SENTRY_DSN=""

# Cloud Run uses PORT env variable (default 8080)
ENV PORT=8080
EXPOSE 8080

# Start the Nitro Node.js server
CMD ["node", ".output/server/index.mjs"]
