#!/usr/bin/env bash
# ─────────────────────────────────────────────────
# deploy-cloudrun.sh
# Builds and deploys the Consulat Gabon France app
# to Google Cloud Run via Cloud Build.
# ─────────────────────────────────────────────────
set -euo pipefail

# ── Configuration ────────────────────────────────
PROJECT_ID="${GCP_PROJECT_ID:-digitalium-ga}"
REGION="${GCP_REGION:-europe-west1}"
SERVICE_NAME="consulatdugabon"

# ── Load .env.production ─────────────────────────
ENV_FILE=".env.production"
if [ ! -f "$ENV_FILE" ]; then
  echo "❌ Missing $ENV_FILE — create it from .env.local with production values."
  exit 1
fi

echo "📦 Loading environment from $ENV_FILE..."

# Parse the .env file (ignore comments and empty lines)
VITE_CONVEX_URL=$(grep '^VITE_CONVEX_URL=' "$ENV_FILE" | cut -d'=' -f2-)
VITE_CLERK_PUBLISHABLE_KEY=$(grep '^VITE_CLERK_PUBLISHABLE_KEY=' "$ENV_FILE" | cut -d'=' -f2-)
CLERK_SECRET_KEY=$(grep '^CLERK_SECRET_KEY=' "$ENV_FILE" | cut -d'=' -f2-)
CONVEX_DEPLOYMENT=$(grep '^CONVEX_DEPLOYMENT=' "$ENV_FILE" | cut -d'=' -f2-)
VITE_SENTRY_DSN=$(grep '^VITE_SENTRY_DSN=' "$ENV_FILE" | cut -d'=' -f2- || echo "")

# ── Deploy via Cloud Build ───────────────────────
echo "🚀 Submitting build to Google Cloud Build..."
echo "   Project:  $PROJECT_ID"
echo "   Region:   $REGION"
echo "   Service:  $SERVICE_NAME"
echo ""

gcloud builds submit \
  --project "$PROJECT_ID" \
  --config cloudbuild.yaml \
  --substitutions "\
_VITE_CONVEX_URL=$VITE_CONVEX_URL,\
_VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY,\
_CLERK_SECRET_KEY=$CLERK_SECRET_KEY,\
_CONVEX_DEPLOYMENT=$CONVEX_DEPLOYMENT,\
_VITE_SENTRY_DSN=${VITE_SENTRY_DSN:-}" \
  .

echo ""
echo "✅ Deployment complete!"
echo "🌐 Service URL:"
gcloud run services describe "$SERVICE_NAME" \
  --region "$REGION" \
  --project "$PROJECT_ID" \
  --format "value(status.url)"
