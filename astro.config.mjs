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
     * `content.filesystem` points at the submodule ITSELF. It used to glob under
     * `src/content` — the mirror ticket 12 was going to write — but that mirror was
     * never built: the submodule is read directly by `src/content.config.ts`, so the
     * glob matched nothing and Uno never pre-scanned the corpus. The build survived on
     * `pipeline.include` alone (every `.mdoc` is transformed there, so A1 stayed green),
     * but DEV is lazy — a `.mdoc` is only extracted once its route has been rendered, so
     * the first paint of a case study had no `.span-N` or `.start-N` at all and every
     * image collapsed into one column until a reload. A dead glob is invisible; it reports
     * as a warning when the path resolves to nothing AND something else stops covering.
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
    svelte()
  ],
  devToolbar: { enabled: false }
})
