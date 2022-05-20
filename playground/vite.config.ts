import path from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '#/': `${path.resolve(__dirname, '../dist')}/`,
      'code-hike-classer-vue3': path.resolve(__dirname, process.env.USEPACK === 'true' ? '../dist/esm' : '../src'),
    },
  },
  plugins: [
    Vue({
      reactivityTransform: true,
    }),

    vueJsx(),
  ],
});
