import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'
import WindiCss from 'vite-plugin-windicss'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),

    paths: {
      base: '',
    },

    // Override http methods in the Todo forms
    methodOverride: {
      allowed: ['PATCH', 'DELETE'],
    },

    vite: {
      plugins: [WindiCss()],
    },
  },
}

export default config
