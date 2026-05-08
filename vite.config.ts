import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // Cần import thư viện path của Node.js

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Định nghĩa @ trỏ về thư mục src
      '@': path.resolve(__dirname, './src'),
    },
  },
})