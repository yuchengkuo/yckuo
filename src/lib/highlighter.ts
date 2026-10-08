/**
 * Synchronous because any `async transform` in the Markdoc config makes `getHeadings()`
 * return `[]` for every document. A2 asserts it.
 *
 * Shiki's sync path needs `createHighlighterCoreSync`, the JavaScript regex engine (the
 * default Oniguruma engine initialises asynchronously), and every language and theme
 * imported statically. Light-mode italics arrive as `--shiki-light-font-style`, which
 * `prose.css` reads (A8).
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
// Easy to miss: the one liquid fence wraps a nested css fence — see `scripts/fences.mjs`.
import liquid from 'shiki/langs/liquid.mjs'

// An `await import()` of these inside the fence transform is the async trap above.
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
 * Throws on a language not imported above, rather than degrading to plain text with a
 * green build. `'text'` is always accepted.
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
    transformers: [
      transformerNotationHighlight(),
      // A wide block scrolls sideways; Lenis would stall it, for the reason in `Strip.astro`.
      {
        pre(node) {
          node.properties['data-lenis-prevent-horizontal'] = ''
        }
      }
    ]
  })
}
