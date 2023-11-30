import lume from 'lume/mod.ts'
import lightningCss from 'lume/plugins/lightningcss.ts'

import anchor from 'npm:markdown-it-anchor'
import section from 'npm:markdown-it-header-sections'
import shiki from 'npm:markdown-it-shiki'
import { getHighlighter } from 'npm:shikiji'

const site = lume({ src: 'src', dest: '.output' })

site.hooks.addMarkdownItPlugin(section)
site.hooks.addMarkdownItPlugin(anchor, {
  slugify: (s: string) => s.replace(' ', '-').toLowerCase(),
  permalink: anchor.permalink['ariaHidden']({ placement: 'after' }),
})
site.hooks.addMarkdownItPlugin(shiki, {
  theme: { light: 'slack-ochin', dark: 'slack-dark' },
  langs: ['markdown', 'typescript', 'javascript', 'liquid'],
  highlightLines: true,
  highlighter: await getHighlighter({
    themes: ['slack-ochin', 'slack-dark'],
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

site.use(lightningCss())

site
  .copy('static/fonts', 'fonts/')
  .copy('static/favicons', 'favicons/')
  .copy('static/og', 'og/')

export default site
