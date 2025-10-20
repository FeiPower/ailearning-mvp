import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/139_AI_Fluency_Training/',
  build: {
    outDir: 'dist',
  },
})

