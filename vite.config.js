import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: false, // saves CPU & RAM
    },
    hmr: {
      overlay: false, // optional: disable red error screen
    },
  },
  esbuild: {
    jsx: 'automatic',
    minify: false,     // disable minify in dev
    treeShaking: true, // still keep tree-shaking
  },
  build: {
    sourcemap: false,  // disables source map to reduce memory
  },
})
