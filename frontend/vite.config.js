import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/full-stack-project-lvl-1",
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5002'
      }
    }
  }
})
