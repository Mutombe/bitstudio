import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Explicit SPA mode so both dev + preview fall back to index.html on unknown
  // routes. Without this, refreshing on /work/:slug or /services/:slug under
  // `vite preview` or a strict static host can return "Not Found".
  appType: 'spa',
  plugins: [
    react(),
    tailwindcss(),
  ],
  preview: {
    // History API fallback — mirror dev server behavior for preview builds.
    port: 4173,
  },
})
