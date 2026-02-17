import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import netlify from '@netlify/vite-plugin-tanstack-start'
import { nitro } from 'nitro/vite'

// Use Nitro for Docker/Cloud Run builds, Netlify for dev/Netlify
const isDockerBuild = process.env.DOCKER_BUILD === 'true'

const config = defineConfig({
  plugins: [
    // devtools() disabled — it injects a click-to-component inspector triggered
    // by Cmd+Shift, which conflicts with macOS screenshot shortcuts.
    // Set VITE_DEVTOOLS=true in .env.local to re-enable if needed.
    ...(process.env.VITE_DEVTOOLS === 'true' ? [devtools()] : []),

    // Netlify for Netlify deploys, Nitro for Docker/Cloud Run
    ...(isDockerBuild ? [nitro()] : [netlify()]),

    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
})

export default config
