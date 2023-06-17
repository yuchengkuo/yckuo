import { sveltekit } from '@sveltejs/kit/vite'
import UnoCSS from 'unocss/vite'

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [UnoCSS({ hmrTopLevelAwait: false }), sveltekit()],
  define: { 'process.env': process.env },

  server: {
    fs: {
      // Allow serving files from one level up to the project root
      strict: false,
    },
  },
}

export default config
