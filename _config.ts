/// <reference lib="deno.ns"/>
import lume from 'lume/mod.ts'
import lightningCss from 'lume/plugins/lightningcss.ts'

import unocss from './plugins/unocss.ts'
import lastModified from './plugins/lastModified.ts'

import anchor from 'npm:markdown-it-anchor'
import section from 'npm:markdown-it-header-sections'
import shiki from 'npm:markdown-it-shiki'
import { getHighlighter } from 'npm:shikiji'

import unoConfig from './uno.config.ts'

const site = lume(
  { src: 'src', dest: '.output' },
  { search: { returnPageData: true } }
)

/**
 * Markdown-it plugins
 */
site.hooks.addMarkdownItPlugin(section)
site.hooks.addMarkdownItPlugin(anchor, {
  slugify: (s: string) => s.replace(' ', '-').toLowerCase(),
  permalink: anchor.permalink['ariaHidden']({ placement: 'after' }),
})
site.hooks.addMarkdownItPlugin(shiki, {
  theme: { light: 'tomorrow', dark: 'tomorrow-night' },
  langs: ['markdown', 'typescript', 'javascript', 'liquid'],
  highlightLines: true,
  highlighter: await getHighlighter({
    themes: [
      JSON.parse(await Deno.readTextFile('./lib/tmr.json')),
      JSON.parse(await Deno.readTextFile('./lib/tmr-night.json')),
    ],
    langs: [
      'markdown',
      'typescript',
      'javascript',
      'liquid',
      'css',
      'svelte',
      'tsx',
    ],
  }),
})

/**
 * Site plugins, helpers
 */
site
  .use(
    unocss({
      config: unoConfig,
      cssFile: 'styles/uno.css',
      reset: 'tailwind-compat',
    })
  )
  .use(lightningCss())
  .use(lastModified())

site.helper(
  'fmtDate',
  (v) =>
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Taipei',
      dateStyle: 'medium',
    })
      .format(new Date(v))
      .toString(),
  { type: 'filter' }
)

/**
 * Static Files
 */
site
  .copy('static/fonts', 'fonts/')
  .copy('static/favicons', 'favicons/')
  .copy('static/og', 'og/')

export default site
