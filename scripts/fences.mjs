/**
 * The one fenced-code scanner, shared by `port-guard.mjs` and `slashify.mjs`.
 *
 * A naive toggle on any ``` line looks right on this corpus and is not:
 * `note/markdoc-shiki` nests a ```css fence inside a ````liquid one, and the toggle reads
 * the nested opener as a closer — the gate then misses a fence language, and the converter
 * slashes image ids inside the fence.
 *
 * Per CommonMark, a closer uses its opener's character, is at least as long, and has no
 * info string. An opener has at most three spaces of indent (a tab counts as four), and a
 * backtick opener's info string holds no backtick. A false opener costs the rest of the
 * document, not one line.
 */

const FENCE = /^ {0,3}(`{3,}|~{3,})(.*)$/

/**
 * Calls `onTopLevelLine(line, index)` for each line outside any fence and
 * `onFenceOpen(language, index)` for each top-level opener; `language` is `'text'` when
 * the info string is empty.
 *
 * Returns false when a fence never closed. Callers must check it: an unterminated fence
 * swallows the rest of the document, so the scan's silence after it means nothing.
 */
export function scanLines(text, onTopLevelLine, onFenceOpen) {
  let open = null
  const lines = text.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i]
    const m = FENCE.exec(raw)
    // A backtick opener whose info string holds a backtick is not a fence — it is prose
    // starting with inline code, and it may well carry an image call site.
    if (m && !(m[1][0] === '`' && m[2].includes('`'))) {
      const [, marker, info] = m
      if (open === null) {
        open = { char: marker[0], length: marker.length }
        onFenceOpen?.(info.trim().split(/\s+/)[0] || 'text', i)
      } else if (marker[0] === open.char && marker.length >= open.length && info.trim() === '') {
        open = null
      }
      continue
    }
    if (open === null) onTopLevelLine?.(raw, i)
  }
  return open === null
}
