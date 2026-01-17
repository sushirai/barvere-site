import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/barvere-site' : ''
		},
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore missing images (placeholder photos that don't exist yet)
				if (path.startsWith('/images/')) {
					console.warn(`Warning: Missing image ${path} (referenced from ${referrer})`);
					return;
				}
				// Throw for other errors
				throw new Error(message);
			}
		}
	}
};

export default config;
