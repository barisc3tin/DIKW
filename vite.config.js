import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'

// dev uses '/', Pages build uses '/DIKW/' (change DIKW if your repo name differs)
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwind()],
  base: mode === 'pages' ? '/DIKW/' : '/',
  build: { outDir: 'docs' }
}))
