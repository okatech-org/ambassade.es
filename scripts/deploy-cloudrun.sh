#!/usr/bin/env bash
# ─────────────────────────────────────────────────
# deploy-cloudrun.sh
# Builds and deploys the Consulat Gabon France app
# to Google Cloud Run.
# ─────────────────────────────────────────────────
set -euo pipefail

# ── Configuration ────────────────────────────────
PROJECT_ID="${GCP_PROJECT_ID:-digitalium-ga}"
REGION="${GCP_REGION:-europe-west1}"
SERVICE_NAME="france-consulat-ga"
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

# ── Load .env.production ─────────────────────────
ENV_FILE=".env.production"
if [ ! -f "$ENV_FILE" ]; then
  echo "❌ Missing $ENV_FILE — create it from .env.local with production values."
  exit 1
fi

echo "📦 Loading environment from $ENV_FILE..."

# Parse the .env file (ignore comments and empty lines)
export $(grep -v '^#' "$ENV_FILE" | grep -v '^\s*$' | xargs)

# ── Build Docker image ───────────────────────────
echo "🐳 Building Docker image: $IMAGE_NAME"
docker build \
  --build-arg VITE_CONVEX_URL="$VITE_CONVEX_URL" \
  --build-arg VITE_CLERK_PUBLISHABLE_KEY="$VITE_CLERK_PUBLISHABLE_KEY" \
  --build-arg CLERK_SECRET_KEY="$CLERK_SECRET_KEY" \
  --build-arg CONVEX_DEPLOYMENT="$CONVEX_DEPLOYMENT" \
  --build-arg VITE_SENTRY_DSN="${VITE_SENTRY_DSN:-}" \
  -t "$IMAGE_NAME" \
  .

# ── Push to Container Registry ──────────────────
echo "⬆️  Pushing image to GCR..."
docker push "$IMAGE_NAME"

# ── Deploy to Cloud Run ─────────────────────────
echo "🚀 Deploying to Cloud Run ($REGION)..."
gcloud run deploy "$SERVICE_NAME" \
  --image "$IMAGE_NAME" \
  --platform managed \
  --region "$REGION" \
  --project "$PROJECT_ID" \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 3 \
  --set-env-vars "\
VITE_CONVEX_URL=$VITE_CONVEX_URL,\
VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY,\
CLERK_SECRET_KEY=$CLERK_SECRET_KEY,\
CONVEX_DEPLOYMENT=$CONVEX_DEPLOYMENT,\
VITE_SENTRY_DSN=${VITE_SENTRY_DSN:-},\
NODE_ENV=production"

echo ""
echo "✅ Deployment complete!"
gcloud run services describe "$SERVICE_NAME" \
  --region "$REGION" \
  --project "$PROJECT_ID" \
  --format "value(status.url)"
