/**
 * A SYNCHRONOUS Shiki highlighter.
 *
 * Promoted from ticket 07's slice, which promoted it from 03's sweep.
 *
 * This file exists because of ticket 02's second side finding: any `async transform`
 * anywhere in the Markdoc config makes `getHeadings()` return `[]` for every document,
 * whether or not the heading is near the async node. The SvelteKit `fence` transform is
 * `async` (it awaits `getSingletonHighlighter` and two dynamic theme imports), so a
 * straight port of `markdoc.config.ts` would silently zero `getHeadings()` site-wide.
 *
 * Shiki's sync path needs three things the async path does for itself:
 *   - `createHighlighterCoreSync` instead of `getSingletonHighlighter`
 *   - the JavaScript regex engine (the default WASM Oniguruma engine is async-init)
 *   - every language and theme imported STATICALLY and passed up front
 *
 * That forces Shiki 1 -> 3. 07 measured the output byte-identical except that v3 moves
 * light-mode italics to `--shiki-light-font-style`; `prose.css` reads it (ladder A8).
 *
 * CORPUS CENSUS (asserted by port-guard.mjs A3, so this comment is not the record —
 * it is the explanation of the record): 17 top-level fences in 6 languages —
 * ts 10, svelte 2, css 2, html 1, tsx 1, liquid 1. `svelte` embeds js/ts/css/html and
 * `liquid` embeds html/css/js, so those ride along as dependencies either way.
 */
import { createHighlighterCoreSync } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import { transformerNotationHighlight } from '@shikijs/transformers'

import ts from 'shiki/langs/typescript.mjs'
import tsx from 'shiki/langs/tsx.mjs'
import js from 'shiki/langs/javascript.mjs'
import jsx from 'shiki/langs/jsx.mjs'
import css from 'shiki/langs/css.mjs'
import html from 'shiki/langs/html.mjs'
import svelte from 'shiki/langs/svelte.mjs'
import json from 'shiki/langs/json.mjs'
// FINDING (07-5): `liquid` is a SIXTH fence language. 03 recorded five and counted a
// nested ```css as top-level; the outer fence is ````liquid, and without this import it
// degraded to plain text with a green build. Ladder entry (d) fired for real.
import liquid from 'shiki/langs/liquid.mjs'

// The repo's own TMR themes, not github-light/dark. They are plain TextMate theme JSON,
// so a static import satisfies the sync path — the SvelteKit config's
// `await import('./src/lib/tmr.json')` INSIDE the fence transform is exactly what 02's
// rule forbids, and this is its replacement.
import light from './tmr.json' with { type: 'json' }
import dark from './tmr-night.json' with { type: 'json' }

export const highlighter = createHighlighterCoreSync({
  themes: [light as any, dark as any],
  langs: [ts, tsx, js, jsx, css, html, svelte, json, liquid],
  engine: createJavaScriptRegexEngine()
})

export const LOADED_LANGUAGES = highlighter.getLoadedLanguages()

const LOADED = new Set(LOADED_LANGUAGES)

/**
 * Ticket 08 asked for an ASSERTION here rather than a fallback, and the slice is why: an
 * unloaded language degrades to plain text with a green build and no warning, and it
 * happened on a real file the moment the corpus met the static language list.
 */
export function highlight(code: string, lang: string) {
  if (lang !== 'text' && !LOADED.has(lang))
    throw new Error(
      `shiki: fence language '${lang}' is not in the statically-imported language set. ` +
        `Add it to src/lib/highlighter.ts — falling back silently would ship an unhighlighted block.`
    )
  const language = LOADED.has(lang) ? lang : 'text'
  return highlighter.codeToHtml(code, {
    lang: language,
    themes: { light: light.name!, dark: dark.name! },
    transformers: [transformerNotationHighlight()]
  })
}
