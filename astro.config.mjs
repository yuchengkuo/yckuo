import { defineConfig } from 'astro/config'
import markdoc from '@astrojs/markdoc'
import svelte from '@astrojs/svelte'
import unocss from 'unocss/astro'

/*
 * DEV-ONLY. Keeps `__uno.css` to ONE stylesheet, and it is not cosmetic.
 *
 * `@unocss/astro`'s own `resolveId` rewrites the RESOLVED virtual id `/__uno.css` to an
 * absolute `<root>/__uno.css`. The SSR pass never reaches that branch — it resolves
 * `uno.css` (importer `uno-astro`) straight to `/__uno.css` — so one module ends up with
 * two ids. Astro SSR-inlines `<style data-vite-dev-id="/__uno.css">` first; the client
 * then resolves the same request to `<root>/__uno.css`, Vite's `updateStyle` finds no tag
 * carrying that id, and APPENDS a second copy at the end of `<head>` — after theme.css,
 * main.css and prose.css.
 *
 * presetWind4's reset rides in that appended copy. `h1,h2,h3,h4,h5,h6{font-weight:inherit}`
 * is specificity (0,0,1), exactly tying main.css's `h1 { --uno: 'font-medium' }`, so it wins
 * on source order and the heading renders at 400. Every top-level bare-element rule that
 * contests a property with the reset loses the same way — measured: `h1`, `strong`, `code`,
 * `kbd`. Rules nested under `article`/`.prose` compile to (0,0,2) and are unaffected, which
 * is why prose headings looked correct and only the homepage h1 was wrong.
 *
 * The BUILD is correct and always was: dist emits a single stylesheet with the reset first.
 * `pnpm build` therefore cannot see this, the same blind spot the `--font-*` ruling above hit.
 *
 * Pinning the client back to the virtual id makes both passes agree, so Vite REPLACES the
 * inlined tag instead of appending one. Must sort before `unocss:astro` — both are
 * `enforce: 'pre'`, so array order decides.
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
