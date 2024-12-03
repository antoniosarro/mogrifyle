import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			$components: './src/components',
			$data: 'src/data',
			$shared: 'src/components/shared',
			$styles: 'src/styles'
		}
	}
};

export default config;
