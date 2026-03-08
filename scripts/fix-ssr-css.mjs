#!/usr/bin/env node
/**
 * Fix TailwindCSS v4 client/SSR CSS hash mismatch.
 *
 * Problem: Vite builds "client" and "SSR" environments separately.
 * TailwindCSS v4 generates different content-hashes for each because
 * the SSR pass includes extra utilities not tree-shaken the same way.
 * Nitro's static asset handler uses a hardcoded manifest in index.mjs,
 * so simply copying the file isn't enough — the manifest must be patched.
 *
 * Solution:
 * 1. Copy SSR CSS files into .output/public/assets/
 * 2. Inject matching entries into the Nitro asset manifest in index.mjs
 */
import { readdirSync, readFileSync, writeFileSync, copyFileSync, statSync, existsSync } from 'fs';
import { join, basename } from 'path';

const SSR_ASSETS = 'node_modules/.nitro/vite/services/ssr/assets';
const PUBLIC_ASSETS = '.output/public/assets';
const SERVER_INDEX = '.output/server/index.mjs';

// Find SSR CSS files
const ssrCssFiles = existsSync(SSR_ASSETS)
  ? readdirSync(SSR_ASSETS).filter(f => f.startsWith('styles-') && f.endsWith('.css'))
  : [];

if (ssrCssFiles.length === 0) {
  console.log('[fix-ssr-css] No SSR CSS files found, skipping.');
  process.exit(0);
}

let code = readFileSync(SERVER_INDEX, 'utf8');
let patched = false;

for (const cssFile of ssrCssFiles) {
  const srcPath = join(SSR_ASSETS, cssFile);
  const destPath = join(PUBLIC_ASSETS, cssFile);
  const assetKey = `/assets/${cssFile}`;

  // Skip if already in public (same hash)
  if (existsSync(destPath)) {
    console.log(`[fix-ssr-css] ${cssFile} already in public assets, skipping.`);
    continue;
  }

  // Check if already in manifest
  if (code.includes(`"${assetKey}"`)) {
    console.log(`[fix-ssr-css] ${cssFile} already in manifest, skipping.`);
    continue;
  }

  // 1. Copy the file
  copyFileSync(srcPath, destPath);
  const size = statSync(destPath).size;
  console.log(`[fix-ssr-css] Copied ${cssFile} (${size} bytes) to public/assets/`);

  // 2. Build the manifest entry
  const entry = `"${assetKey}":{"type":"text/css; charset=utf-8","etag":"\\\"${size}-ssr\\\"","mtime":"${new Date().toISOString()}","size":${size},"path":"../public/assets/${cssFile}"}`;

  // 3. Inject before the first existing styles-*.css entry in the manifest
  const cssPattern = /"\/assets\/styles-[^"]+\.css"\s*:\s*\{/;
  const match = code.match(cssPattern);
  if (match) {
    code = code.replace(cssPattern, `${entry},${match[0]}`);
    patched = true;
    console.log(`[fix-ssr-css] Injected manifest entry for ${cssFile}`);
  } else {
    console.warn(`[fix-ssr-css] WARNING: Could not find CSS entry in manifest to inject before.`);
  }
}

if (patched) {
  writeFileSync(SERVER_INDEX, code);
  console.log('[fix-ssr-css] Manifest patched successfully.');
} else {
  console.log('[fix-ssr-css] No patching needed.');
}
