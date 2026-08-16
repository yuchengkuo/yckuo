import { defineConfig } from 'astro/config'
import markdoc from '@astrojs/markdoc'
import svelte from '@astrojs/svelte'
import unocss from 'unocss/astro'

export default defineConfig({
  integrations: [
    /*
     * UnoCSS carries two edits the `.md -> .mdoc` rename makes mandatory. Either one
     * alone kills all 68 `{% .span-* %}` / `{% .start-* %}` grid annotations with a
     * green build and no warning (finding 07-3, ladder A1 asserts it in 13).
     *
     * 1. `pipeline.include` below. The vite plugin runs every scanned file through
     *    `ctx.filter` first, whose default include is
     *      /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/
     *    `mdx?` covers `.md` and `.mdx`. It does NOT cover `.mdoc`, so content files
     *    are read, filtered out, and never extracted.
     * 2. `mdoc` in uno.config.ts's own "MDC order" extractor regex.
     *
     * `content.filesystem` lives here rather than in uno.config.ts (where SvelteKit
     * kept it) because the path is Astro-side: the gitignored mirror ticket 12 writes.
     */
    unocss({
      injectReset: false,
      content: {
        filesystem: ['src/content/**/*.mdoc'],
        pipeline: {
          include: [/\.(vue|svelte|[jt]sx|mdx?|mdoc|astro|elm|php|phtml|html)($|\?)/]
        }
      }
    }),
    markdoc(),
    svelte()
  ],
  devToolbar: { enabled: false }
})
