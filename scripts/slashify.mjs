/**
 * `@astrojs/markdoc`'s `shouldOptimizeImage` is `!isValidUrl(src) && !src.startsWith('/')`,
 * so a leading slash keeps markdown image syntax without Astro reading a Cloudinary id as a
 * local file:
 *
 *     ![alt](work/abc 'caption')   ->   ![alt](/work/abc 'caption')
 *
 * Not a regex: alt text can nest [brackets], so it is bracket-matched, and the src token
 * ends at the first whitespace or `)` so a quoted title is never touched. Fences are
 * skipped by the shared rule in `fences.mjs`.
 *
 * No CLI. `converter-selftest.mjs` holds the proofs.
 */
import { scanLines } from './fences.mjs'

/**
 * Returns `{ text, sites, skipped, closed }`. `closed` is false when a fence never
 * terminates — everything after it reads as code, and `census()` would agree — so G5
 * fails on it.
 */
export function slashify(text) {
  const lines = text.split('\n')
  let sites = 0
  const skipped = []

  const closed = scanLines(text, (line, li) => {
    let out = ''
    let i = 0
    while (i < line.length) {
      if (line[i] === '!' && line[i + 1] === '[' && line[i - 1] !== '\\') {
        const alt = matchBrackets(line, i + 1)
        if (alt !== -1 && line[alt + 1] === '(') {
          const open = alt + 1
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
 * Every `![…](…)` call site. Shares `scanLines` with `slashify()` on purpose: a scanner that
 * disagreed with the converter would give G1 a clean pass over lines it wrongly rewrote.
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
