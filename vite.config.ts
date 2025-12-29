import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import postcssNested from 'postcss-nested';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [postcssNested(), tailwindcss(), autoprefixer()],
    },
  },
});
