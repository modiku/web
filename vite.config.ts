import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    port:3002,
    proxy:{
      '/api': {
        target: 'http://localhost:3000/api/v1',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
      '/assets':{
        target: 'http://localhost:3000/static',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/assets/, '')
      }
    }
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
