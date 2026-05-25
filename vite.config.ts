import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { compression } from 'vite-plugin-compression2'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ViteImageOptimizer({
      jpg: { quality: 80 },
      jpeg: { quality: 80 },
      png: { quality: 80, compressionLevel: 9 },
      webp: { quality: 80 },
      svg: { multipass: true },
    }),
    compression({ algorithms: ['gzip'] }),
    compression({ algorithms: ['brotliCompress'] }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
            return 'react-vendor'
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'motion'
          }
          if (id.includes('node_modules/@phosphor-icons')) {
            return 'icons'
          }
          if (id.includes('node_modules/@octokit')) {
            return 'octokit'
          }
          if (id.includes('node_modules/@react-pdf') || id.includes('node_modules/pdfkit') || id.includes('node_modules/fontkit') || id.includes('node_modules/linebreak')) {
            return 'pdf'
          }
        },
      },
    },
  },
})
