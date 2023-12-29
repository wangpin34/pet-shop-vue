import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),  UnoCSS(),],
  define: {
    global: {},
    'process.env': {},
  },
})
