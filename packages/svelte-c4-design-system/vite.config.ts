import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

const config = defineConfig({
	plugins: [sveltekit()],
	resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});

export default config;
