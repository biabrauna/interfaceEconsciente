import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,
    proxy: {
      '/auth': {
        target: 'https://airy-charm-production.up.railway.app/',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})