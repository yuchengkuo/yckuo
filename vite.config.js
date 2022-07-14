import { sveltekit } from '@sveltejs/kit/vite'
import windicss from 'vite-plugin-windicss'

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit(), windicss()],
  define: { 'process.env': process.env },

  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
}

export default config
