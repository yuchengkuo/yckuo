import { defineConfig } from 'astro/config'
import markdoc from '@astrojs/markdoc'
import svelte from '@astrojs/svelte'
import unocss from 'unocss/astro'
/* Imported rather than inline, so this file carries only the ordering hazard below. */
import { aspectRatios } from './scripts/aspect-ratios.mjs'

/*
 * Dev-only. `@unocss/astro` gives `__uno.css` two ids — `/__uno.css` in the SSR pass,
 * `<root>/__uno.css` on the client — so Vite finds no tag to replace and appends a second
 * copy after theme.css, main.css and prose.css. The presetWind4 reset in that copy then
 * beats every top-level bare-element rule it ties at (0,0,1) on source order: `h1`,
 * `strong`, `code`, `kbd`. The build emits one stylesheet, so `pnpm build` cannot see it.
 *
 * Pinning the client to the virtual id makes both passes agree. Must sort before
 * `unocss:astro` — both are `enforce: 'pre'`, so array order decides.
 */
const unoSingleDevStylesheet = {
  name: 'uno-single-dev-stylesheet',
  enforce: 'pre',
  apply: 'serve',
  resolveId(id) {
    // Only the already-virtual form: leading slash, no root prefix.
    return /^\/__uno(?:_[^/\\]*?)?\.css$/.test(id) ? id : undefined
  }
}

export default defineConfig({
  vite: { plugins: [unoSingleDevStylesheet] },
  integrations: [
    /*
     * `mdoc` must be in `pipeline.include` below (the default filter covers `.md`/`.mdx`
     * only) and in `uno.config.ts`'s extractor regex. Either alone kills every grid
     * annotation with a green build. A1 asserts it.
     *
     * `content.filesystem` pre-scans the corpus for dev, which extracts a `.mdoc` only once
     * its route renders — without it a case study's first paint has no `.span-N` classes.
     * A1 cannot see that: the build is covered by `pipeline.include`.
     */
    unocss({
      injectReset: false,
      content: {
        filesystem: ['content/**/*.mdoc'],
        pipeline: {
          include: [/\.(vue|svelte|[jt]sx|mdx?|mdoc|astro|elm|php|phtml|html)($|\?)/]
        }
      }
    }),
    markdoc(),
    svelte(),
    aspectRatios()
  ],
  devToolbar: { enabled: false }
})
