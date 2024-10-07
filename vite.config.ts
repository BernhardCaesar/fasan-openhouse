import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/createOffering': {
        target: 'https://ulp.lab.amids.at',
        changeOrigin: true
      },
      '/mass': {
        target: 'https://ulp.lab.amids.at',
        changeOrigin: true
      }
    }
  },
  plugins: [vue()],
})
