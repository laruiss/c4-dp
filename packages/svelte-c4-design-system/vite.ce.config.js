import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte'

const config = defineConfig({
	build:{
    lib:{
      entry: './src/lib/index.ts',
      name: 'MyLibrary',
    }
  },
  plugins: [svelte({
    compilerOptions:{
      customElement: true
    }
  })],
	resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '$lib': fileURLToPath(new URL('./src/lib', import.meta.url))
    }
  }
});

export default config;
