/**
 * A SYNCHRONOUS Shiki highlighter.
 *
 * This file exists because **any `async transform` anywhere in the Markdoc config makes
 * `getHeadings()` return `[]` for every document**, whether or not the heading is near
 * the async node. The obvious `fence` transform is async — it awaits
 * `getSingletonHighlighter` and two dynamic theme imports — and would silently zero
 * `getHeadings()` site-wide. A2 in `port-guard.mjs` catches a regression.
 *
 * Shiki's sync path needs three things the async path does for itself:
 *   - `createHighlighterCoreSync` instead of `getSingletonHighlighter`
 *   - the JavaScript regex engine (the default WASM Oniguruma engine is async-init)
 *   - every language and theme imported STATICALLY and passed up front
 *
 * That forces Shiki 1 -> 3. The output is byte-identical except that v3 moves
 * light-mode italics to `--shiki-light-font-style`; `prose.css` reads it (A8).
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
// `liquid` is easy to miss: the corpus fence that needs it is a ````liquid wrapping a
// nested ```css, so a scan that reads the inner fence records the wrong language. Without
// this import that block degrades to plain text with a green build.
import liquid from 'shiki/langs/liquid.mjs'

// The repo's own TMR themes, not github-light/dark. They are plain TextMate theme JSON,
// so a static import satisfies the sync path. An `await import()` of these INSIDE the
// fence transform is exactly the async-transform trap described above.
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
 * An ASSERTION rather than a fallback, deliberately: an unloaded language degrades to
 * plain text with a green build and no warning, and that has happened on a real file.
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
