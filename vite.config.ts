/// <reference types="vitest" />

import dts from 'vite-plugin-dts';
import path from 'path';
import Vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    minify: true,
    lib: {
      fileName: (type) => {
        if (type === 'es') return 'index.mjs';
        if (type === 'cjs') return 'index.js';
        return 'index.js';
      },
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
    },
    // sourcemap: true,
    rollupOptions: {
      external: [
        'vue',
      ],
    },
  },
  plugins: [
    Vue({
      reactivityTransform: true,
    }),
    vueJsx(),
    // https://www.npmjs.com/package/vite-plugin-dts
    dts({
      include: 'src',
      rollupTypes: true,
      afterBuild: () => {
        // do something else
      },
    }),
  ],
  // https://github.com/vitest-dev/vitest
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setupTests.ts'],
  },
});
