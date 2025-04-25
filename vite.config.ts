import { defineConfig } from "vite";
import tailwindcss from '@tailwindcss/vite'
import htmlMinifier from 'vite-plugin-html-minifier';

export default defineConfig({
  plugins: [
    tailwindcss(),
    htmlMinifier({
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
      },
    }),
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      format: {
        comments: false,
      },
    },
  },
});
