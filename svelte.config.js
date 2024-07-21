import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  extensions: ['.svelte', '.md'],

  kit: {
    adapter: adapter(),

    alias: {
      $components: 'src/components',
      $utils: 'src/utils',
      $content: '.velite'
    },

    prerender: { concurrency: 3 }
  }
}

export default config
