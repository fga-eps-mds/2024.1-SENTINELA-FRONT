/// <reference types = "vitest" /> 
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    setupFiles: ['./setUpTests.js'],
    css: true,
    environment: 'jsdom',
  },
  plugins: [react()],
})
