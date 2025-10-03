import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
// Use GitHub Pages base path only when deploying to GitHub Pages
const isGithubPages = process.env.GITHUB_PAGES === 'true' || process.env.VERCEL === undefined && process.env.CI === 'true'

export default defineConfig({
  base: isGithubPages ? '/DataAnalize-SAS-/' : '/',
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
