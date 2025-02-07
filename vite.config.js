import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://api-register-users-ny35.onrender.com/'
    }
  },
  plugins: [react()],
})
