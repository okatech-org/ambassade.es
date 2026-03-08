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
 * 3. Also check the SSR router for CSS references that don't match
 *    any client asset, and patch them to point to the correct client CSS.
 */
import { readdirSync, readFileSync, writeFileSync, copyFileSync, statSync, existsSync } from 'fs';
import { join, basename } from 'path';

const SSR_ASSETS = 'node_modules/.nitro/vite/services/ssr/assets';
const PUBLIC_ASSETS = '.output/public/assets';
const SERVER_INDEX = '.output/server/index.mjs';
const SSR_DIR = '.output/server/_ssr';

// ─── Step 0: Identify client & SSR CSS hashes ───────────────────
const clientCssFiles = existsSync(PUBLIC_ASSETS)
  ? readdirSync(PUBLIC_ASSETS).filter(f => f.startsWith('styles-') && f.endsWith('.css'))
  : [];

const ssrCssFiles = existsSync(SSR_ASSETS)
  ? readdirSync(SSR_ASSETS).filter(f => f.startsWith('styles-') && f.endsWith('.css'))
  : [];

console.log(`[fix-ssr-css] Client CSS: ${clientCssFiles.join(', ') || '(none)'}`);
console.log(`[fix-ssr-css] SSR CSS:    ${ssrCssFiles.join(', ') || '(none)'}`);

// ─── Step 1: Copy SSR CSS into public assets & patch manifest ───
let code = readFileSync(SERVER_INDEX, 'utf8');
let manifestPatched = false;

for (const cssFile of ssrCssFiles) {
  const srcPath = join(SSR_ASSETS, cssFile);
  const destPath = join(PUBLIC_ASSETS, cssFile);
  const assetKey = `/assets/${cssFile}`;

  // Skip if already in public (same hash)
  if (existsSync(destPath)) {
    console.log(`[fix-ssr-css] ${cssFile} already in public assets, skipping copy.`);
    continue;
  }

  // Check if already in manifest
  if (code.includes(`"${assetKey}"`)) {
    console.log(`[fix-ssr-css] ${cssFile} already in manifest, skipping.`);
    // Still copy the file even if manifest entry exists
    copyFileSync(srcPath, destPath);
    continue;
  }

  // 1. Copy the file
  copyFileSync(srcPath, destPath);
  const size = statSync(destPath).size;
  console.log(`[fix-ssr-css] Copied ${cssFile} (${size} bytes) to public/assets/`);

  // 2. Build the manifest entry
  const entry = `"${assetKey}":{"type":"text/css; charset=utf-8","etag":"\\\"${size}-ssr\\\"","mtime":"${new Date().toISOString()}","size":${size},"path":"../public/assets/${cssFile}"}`;

  // 3. Inject before the first existing styles-*.css entry in the manifest
  const cssPattern = /\"\/assets\/styles-[^"]+\.css"\s*:\s*\{/;
  const match = code.match(cssPattern);
  if (match) {
    code = code.replace(cssPattern, `${entry},${match[0]}`);
    manifestPatched = true;
    console.log(`[fix-ssr-css] Injected manifest entry for ${cssFile}`);
  } else {
    console.warn(`[fix-ssr-css] WARNING: Could not find CSS entry in manifest to inject before.`);
  }
}

if (manifestPatched) {
  writeFileSync(SERVER_INDEX, code);
  console.log('[fix-ssr-css] Manifest patched successfully.');
}

// ─── Step 2: Patch SSR router references ────────────────────────
// The SSR router (e.g. router-*.mjs) contains:
//   const appCss = "/assets/styles-HASH.css";
// If that HASH doesn't match any file in public/assets, patch it.
if (existsSync(SSR_DIR) && clientCssFiles.length > 0) {
  const clientCss = clientCssFiles[0]; // The actual client CSS file
  const ssrRouterFiles = readdirSync(SSR_DIR).filter(f => f.startsWith('router-') && f.endsWith('.mjs'));

  for (const routerFile of ssrRouterFiles) {
    const routerPath = join(SSR_DIR, routerFile);
    let routerCode = readFileSync(routerPath, 'utf8');

    // Match: const appCss = "/assets/styles-XXXX.css";
    const appCssPattern = /const\s+appCss\s*=\s*"\/assets\/styles-([^"]+)\.css"/;
    const appCssMatch = routerCode.match(appCssPattern);

    if (appCssMatch) {
      const referencedFile = `styles-${appCssMatch[1]}.css`;
      const referencedPath = join(PUBLIC_ASSETS, referencedFile);

      if (!existsSync(referencedPath)) {
        // The SSR references a CSS file that doesn't exist — patch it
        console.log(`[fix-ssr-css] SSR router references ${referencedFile} which doesn't exist in public assets.`);
        console.log(`[fix-ssr-css] Patching ${routerFile}: ${referencedFile} → ${clientCss}`);
        routerCode = routerCode.replace(
          `/assets/${referencedFile}`,
          `/assets/${clientCss}`
        );
        writeFileSync(routerPath, routerCode);
        console.log(`[fix-ssr-css] SSR router patched successfully.`);
      } else {
        console.log(`[fix-ssr-css] SSR router references ${referencedFile} — file exists, OK.`);
      }
    } else {
      console.log(`[fix-ssr-css] No appCss reference found in ${routerFile}.`);
    }
  }

  // Also check all other .mjs files in _ssr for CSS references
  const allSsrFiles = readdirSync(SSR_DIR).filter(f => f.endsWith('.mjs'));
  for (const ssrFile of allSsrFiles) {
    if (ssrRouterFiles.includes(ssrFile)) continue; // Already handled
    const filePath = join(SSR_DIR, ssrFile);
    let fileCode = readFileSync(filePath, 'utf8');
    const cssRefPattern = /\/assets\/styles-([^"']+)\.css/g;
    let cssMatch;
    let filePatched = false;
    while ((cssMatch = cssRefPattern.exec(fileCode)) !== null) {
      const refFile = `styles-${cssMatch[1]}.css`;
      if (!existsSync(join(PUBLIC_ASSETS, refFile))) {
        console.log(`[fix-ssr-css] Patching ${ssrFile}: ${refFile} → ${clientCss}`);
        fileCode = fileCode.replaceAll(`/assets/${refFile}`, `/assets/${clientCss}`);
        filePatched = true;
      }
    }
    if (filePatched) {
      writeFileSync(filePath, fileCode);
    }
  }
} else {
  console.log('[fix-ssr-css] No SSR router dir or no client CSS found, skipping router patch.');
}

console.log('[fix-ssr-css] Done.');
