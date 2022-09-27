import adapter from '@sveltejs/adapter-auto';
import autoprefixer from 'autoprefixer';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		dev: false,
		customElement: true,
	},
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		scss: {
			  // We can use a path relative to the root because
			  // svelte-preprocess automatically adds it to `includePaths`
			  // if none is defined.
			prependData: `@import './src/assets/scss/variables.scss';`
		},
		postcss: {
			plugins: [autoprefixer()]
		}
	}),

	kit: {
		adapter: adapter()
	}
};

export default config;
