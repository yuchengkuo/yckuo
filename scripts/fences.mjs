/**
 * fences.mjs — the one fenced-code scanner.
 *
 * One copy, imported by both `port-guard.mjs` and `slashify.mjs`. It was written
 * correctly in one and naively in the other, and two copies of a rule is how they came to
 * disagree.
 *
 * The naive version — toggle a boolean on any line starting with three backticks —
 * returns 18 fences and six languages on this corpus, so it looks right. It is not:
 * `note/markdoc-shiki` demonstrates Markdoc syntax inside a FOUR-backtick ````liquid
 * fence containing a nested ```css one, and the naive toggle treats the nested opener as
 * a CLOSER. Counting that nested fence as top-level records five languages instead of
 * six, and the omitted language degrades a real fence to plain text with a green build.
 * Under the converter the same misreading is worse: the lines between the nested fences read as
 * live content, so an `![alt](id)` written there is silently slashed — and `--in-place`
 * writes that into the private repo.
 *
 * The rule, per CommonMark: a closer must use the SAME character as its opener, be at
 * least as long, and carry no info string.
 *
 * Two neighbouring CommonMark rules are measured rather than tolerated, because the cost
 * of a false OPENER is the whole rest of the document, not one line — it opens a fence
 * that can never close, and every image call site after it goes unconverted in silence:
 *
 *   - **At most three spaces of indent.** Four is an indented code block, and a ``` line
 *     inside one is content. A tab is four columns, so it is not an opener either.
 *   - **No backtick inside a backtick fence's info string.** That rule exists precisely
 *     so a line beginning with inline code is not read as a fence.
 *
 * Both were found by review against this file's first draft, which trimmed the line and
 * accepted any info string. The old per-caller toggles had the same holes.
 */

const FENCE = /^ {0,3}(`{3,}|~{3,})(.*)$/

/**
 * Walk `text` a line at a time, calling `onTopLevelLine(line, index)` for each line
 * OUTSIDE any fence and `onFenceOpen(language, index)` for each top-level fence opener.
 *
 * Returns true when every fence closed. **Callers must read it**: an unterminated fence
 * swallows the rest of the document, so a scan that ignores this reports a confident,
 * empty answer about everything after the stray marker.
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
