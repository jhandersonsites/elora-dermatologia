import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves the site from /elora-dermatologia/; set via BASE_PATH in CI.
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
  resolve: {
    // The project lives in a OneDrive folder: synced files become reparse points,
    // which the resolver would otherwise try (and fail) to follow like symlinks.
    preserveSymlinks: true,
  },
})
