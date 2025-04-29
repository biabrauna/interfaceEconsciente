import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'https://api-register-users-tau.vercel.app',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})