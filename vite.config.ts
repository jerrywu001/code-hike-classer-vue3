/// <reference types="vitest" />

import dts from 'vite-plugin-dts';
import path from 'path';
import shelljs from 'shelljs';
import Vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';

export default defineConfig({
  esbuild: {
    minify: true,
  },
  build: {
    lib: {
      fileName: (type) => {
        if (type === 'es') return 'index.mjs';
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
        shelljs.mv('-f', 'dist/index.mjs.d.ts', 'dist/index.d.ts');
      },
    }),
  ],
  // https://github.com/vitest-dev/vitest
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setupTests.ts'],
    transformMode: {
      web: [/.[tj]sx$/],
    },
  },
});
