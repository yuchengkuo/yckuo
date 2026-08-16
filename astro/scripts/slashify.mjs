/**
 * slashify — the content conversion, per ticket 04's ruling.
 *
 * Promoted from `.scratch/astro-migration/scripts/slashify.mjs`, where ticket 07 wrote
 * and proved it (128 sites across 15 files, self-check clean, round-trip proof). It is
 * tracked here because ticket 17 step 2 runs it against the private repo for real, and
 * a cutover must not depend on gitignored agent working files.
 *
 * `convert.mjs` (superseded) rewrote every `![alt](id)` into a `{% img %}` tag. 04 found
 * that was never forced: `@astrojs/markdoc`'s `shouldOptimizeImage` is
 * `!isValidUrl(src) && !src.startsWith('/')`, so a LEADING SLASH is enough and markdown
 * image syntax survives. The whole conversion is therefore:
 *
 *     ![alt](work/abc 'caption')   ->   ![alt](/work/abc 'caption')
 *
 * one character per call site, plus the `.md` -> `.mdoc` rename.
 *
 * Why this is hand-written rather than a regex one-liner: 03 found three silent mangle
 * traps in the tag rewrite, two of which are properties of the *source*, not of the
 * rewrite, and would bite any naive `!\[[^\]]*\]\(([^)\s]+)` pattern:
 *
 *   - nested [brackets] in alt text  (4 sites in the corpus)
 *   - single-quoted titles           (47 of 128 sites)
 *
 * So the alt text is bracket-matched, not `[^\]]*`-matched, and the src token is read as
 * "up to the first whitespace or `)`" so a quoted title is never touched. Fenced code
 * blocks are skipped outright.
 *
 * This module has no CLI. Every gate lives in `sync-content.mjs`, at one site, visible in
 * one log — 08's rule that scattered assertions get deleted by whoever hits one at a bad
 * moment while a named gate survives.
 */

/** Rewrite one document. Returns { text, sites, skipped }. */
export function slashify(text) {
  const lines = text.split('\n')
  let inFence = false
  let sites = 0
  const skipped = []

  for (let li = 0; li < lines.length; li++) {
    const line = lines[li]

    // Fence toggling. Indented code is not a concern here: an indented block cannot
    // contain a live image call site the renderer would resolve.
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence
      continue
    }
    if (inFence) continue

    let out = ''
    let i = 0
    while (i < line.length) {
      // An image opener is `![`, and it must not itself be escaped.
      if (line[i] === '!' && line[i + 1] === '[' && line[i - 1] !== '\\') {
        const alt = matchBrackets(line, i + 1)
        if (alt !== -1 && line[alt + 1] === '(') {
          const open = alt + 1
          // Read the src token: everything up to the first whitespace or the closing
          // paren. A `'caption'` or `"caption"` therefore never enters.
          let j = open + 1
          while (j < line.length && !/[\s)]/.test(line[j])) j++
          const src = line.slice(open + 1, j)

          if (src.startsWith('/')) {
            skipped.push({ line: li + 1, src, why: 'already slashed' })
          } else if (/^[a-z][a-z0-9+.-]*:/i.test(src)) {
            skipped.push({ line: li + 1, src, why: 'absolute url' })
          } else if (src === '') {
            skipped.push({ line: li + 1, src, why: 'empty src' })
          } else {
            out += line.slice(i, open + 1) + '/'
            i = open + 1
            sites++
            continue
          }
        }
      }
      out += line[i]
      i++
    }
    lines[li] = out
  }

  return { text: lines.join('\n'), sites, skipped }
}

/** Index of the `]` matching the `[` at `start`, honouring nesting. -1 if none. */
export function matchBrackets(s, start) {
  let depth = 0
  for (let i = start; i < s.length; i++) {
    if (s[i] === '\\') {
      i++
      continue
    }
    if (s[i] === '[') depth++
    else if (s[i] === ']') {
      depth--
      if (depth === 0) return i
    }
  }
  return -1
}

/** Every `![…](…)` call site in a document, for the gates. */
export function census(text) {
  const found = []
  const lines = text.split('\n')
  let inFence = false
  lines.forEach((line, li) => {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence
      return
    }
    if (inFence) return
    let i = 0
    while (i < line.length) {
      if (line[i] === '!' && line[i + 1] === '[' && line[i - 1] !== '\\') {
        const alt = matchBrackets(line, i + 1)
        if (alt !== -1 && line[alt + 1] === '(') {
          let j = alt + 2
          while (j < line.length && !/[\s)]/.test(line[j])) j++
          found.push({ line: li + 1, src: line.slice(alt + 2, j) })
          i = j
          continue
        }
      }
      i++
    }
  })
  return found
}

/** Markdoc tag-open/close count. 03's trap 1: a converter must not move this. */
export function tagBalance(text) {
  return (text.match(/\{%\s*\/?\s*[a-z]/g) ?? []).length
}
