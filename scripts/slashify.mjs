/**
 * slashify — the leading-slash content conversion.
 *
 * `@astrojs/markdoc`'s `shouldOptimizeImage` is `!isValidUrl(src) && !src.startsWith('/')`,
 * so a LEADING SLASH is all it takes to keep markdown image syntax and still have Astro
 * resolve a Cloudinary id. The whole conversion is:
 *
 *     ![alt](work/abc 'caption')   ->   ![alt](/work/abc 'caption')
 *
 * one character per call site.
 *
 * Why this is hand-written rather than a regex one-liner: two properties of the SOURCE
 * defeat any naive `!\[[^\]]*\]\(([^)\s]+)` pattern —
 *
 *   - nested [brackets] in alt text
 *   - single-quoted titles
 *
 * So the alt text is bracket-matched, not `[^\]]*`-matched, and the src token is read as
 * "up to the first whitespace or `)`" so a quoted title is never touched. Fenced code
 * blocks are skipped by `fences.mjs`, the SHARED rule, and not by a local `inFence`
 * toggle: a naive toggle reads the corpus's nested ```css block as a closer, so three
 * lines of a four-backtick fence count as live content and an image written there gets
 * slashed.
 *
 * This module has no CLI. The gates that prove it live in `converter-selftest.mjs`.
 */
import { scanLines } from './fences.mjs'

/**
 * Rewrite one document. Returns { text, sites, skipped, closed }.
 *
 * `closed` is false when a fence never terminates, and G5 in `converter-selftest.mjs`
 * fails on it. It has to be REPORTED rather than absorbed: an unterminated fence makes
 * every line after it look like code, so the converter returns `sites: 0` for the tail
 * and every gate built on `census()` agrees with it.
 */
export function slashify(text) {
  const lines = text.split('\n')
  let sites = 0
  const skipped = []

  const closed = scanLines(text, (line, li) => {
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
  })

  return { text: lines.join('\n'), sites, skipped, closed }
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

/**
 * Every `![…](…)` call site in a document, for the gates.
 *
 * It shares `scanLines` with `slashify()` deliberately: G1 compares a census before
 * against a census after, so a scanner that disagreed with the converter's would report
 * a clean pass over lines the converter had wrongly rewritten. Sharing the CORRECT rule
 * is the fix for that blindness, not sharing less.
 */
export function census(text) {
  const found = []
  scanLines(text, (line, li) => {
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

/** Markdoc tag-open/close count. A converter must not move this. */
export function tagBalance(text) {
  return (text.match(/\{%\s*\/?\s*[a-z]/g) ?? []).length
}
