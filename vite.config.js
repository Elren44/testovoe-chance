import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/testovoe-chance/",
  plugins: [react()],
  server: {
    proxy: {
      '/products': {
        target: "http://react.ohotaktiv.ru:5000/goods",
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/products/, '')
      }
    }
  }
})
