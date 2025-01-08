import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import tailwind from 'tailwindcss';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [autoprefixer(), tailwind()],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
