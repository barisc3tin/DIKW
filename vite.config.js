import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'

// CHANGE 'DIKW' if your repo name is different
export default defineConfig({
  plugins: [react(), tailwind()],
  base: '/DIKW/',           // <-- required for GitHub Pages project sites
  build: { outDir: 'docs' } // <-- build directly into docs/
})
