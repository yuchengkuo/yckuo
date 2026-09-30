#!/usr/bin/env node
/**
 * port-guard.mjs — the build gate.
 *
 *     pnpm build   ==   astro build && node scripts/port-guard.mjs
 *     pnpm guard              the gate alone, against an existing dist/
 *     pnpm guard --strict     census drift and skipped rungs become errors
 *
 * Every assertion guards one failure shape: green build, no warning, visible damage. They
 * live in one named file so that one firing is visible in the build log rather than
 * deleted in place.
 *
 * A1, A5, A10, A11, A12 and A14 read `dist/`, which is why the gate runs post-build. A2, A3,
 * A7, A8 and A9 read source; they are here so there is one gate rather than two.
 *
 * Structure is hard, provenance warns. Assertions derive their expectation from whatever
 * corpus is present, so they hold at any content revision. The pinned census only warns on
 * drift, so a clone at another revision still builds. Absent content reports skip, not
 * pass. `--strict` fails on both.
 *
 * Node >= 22.18: A2 and A3 import the real `markdoc.config.mjs` and the TypeScript
 * `src/lib/highlighter.ts`, which needs Node's default type stripping. That is the only
 * reason `engines` exists in package.json. An older Node dies on a SyntaxError.
 */
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { createRequire } from 'node:module'
import Markdoc from '@markdoc/markdoc'
import { createGetHeadings } from '@astrojs/markdoc/runtime'
/* Shared with the converter and the ratio generator: one copy of each rule. */
import { scanLines } from './fences.mjs'
import { ROOT, walk, globMatcher, collectionGlobs, collectionFiles, mediaSites } from './corpus.mjs'

const DIST = path.join(ROOT, 'dist')

const STRICT = process.argv.includes('--strict')

/*
 * The recorded corpus — provenance, not a gate. Drift warns and names the revision it was
 * measured at.
 *
 * The `.span-full` line is the one worth reading twice: `.span-full` is NOT
 * `.span-<digits>`, so the obvious `\.span-[0-9]+` census silently misses every one of
 * them and looks entirely plausible doing it.
 */
const CENSUS = {
  rev: '19ee03f',
  files: 26,
  gridBlocks: 68,
  spanTokens: 68,
  spanFull: 10,
  startTokens: 18,
  endTokens: 0,
  gridFiles: 7,
  utilities: 12,
  fences: 17,
  fenceLanguages: { ts: 10, svelte: 2, css: 2, html: 1, tsx: 1, liquid: 1 },
  /* A12. Measured against a working tree, NOT against `rev` above — the count is real and
     its provenance is not. Re-measure it with the rest of this block when `rev` moves. */
  mediaBoxes: 119,
  /* A14. Same caveat as A12's mediaBoxes: measured against a working tree, not `rev`. */
  grids: 6,
  derivedBoxes: 55,
  /* A2's probe. `note/markdoc-shiki` is chosen because it is heading-dense AND carries
     the ````liquid fence A3 needs, so one file exercises both paths. */
  headingProbe: { file: 'note/markdoc-shiki.mdoc', headings: 5 }
}

/* presetWind4's reset. Its presence in a linked stylesheet is what identifies that
   sheet as a UnoCSS ENTRY rather than a component's scoped chunk (A5). */
const UNO_PREFLIGHT = '*,:after,:before,::backdrop{box-sizing:border-box'

const results = []
const drift = []

async function check(id, title, fn) {
  try {
    const detail = await fn()
    results.push({ id, title, ok: true, ...(detail?.skip ? detail : { detail }) })
  } catch (err) {
    results.push({ id, title, ok: false, detail: err.message })
  }
}
const assert = (cond, message) => {
  if (!cond) throw new Error(message)
}
/** Provenance, not structure: record the difference, never throw. */
const census = (id, label, actual, want) => {
  if (actual !== want) drift.push(`${id} ${label}: ${actual}, recorded ${want} at ${CENSUS.rev}`)
  return actual
}
const skip = (why) => ({ skip: true, detail: why })

// --- shared readers ----------------------------------------------------------------

function distHtml() {
  return walk(DIST).filter((f) => f.endsWith('.html'))
}

function distCss() {
  return walk(DIST).filter((f) => f.endsWith('.css'))
}

function fenceCensus(files) {
  const fences = []
  for (const file of files) {
    const closed = scanLines(fs.readFileSync(file, 'utf8'), null, (lang) =>
      fences.push({ file, lang })
    )
    assert(closed, `unterminated fence in ${path.relative(ROOT, file)}`)
  }
  return fences
}

// --- A1 ----------------------------------------------------------------------------
// Grid annotations live only inside content, so anything that stops UnoCSS reading
// `.mdoc` collapses every image to one column. The `mdoc` entries in `uno.config.ts` and
// `astro.config.mjs` are each load-bearing alone.
await check('A1', 'grid annotations reach the generated CSS', async () => {
  const { PLACEMENT_PREFIXES } = await import(
    pathToFileURL(path.join(ROOT, 'src/lib/media/placementTokens.ts')).href
  )
  const prefixes = PLACEMENT_PREFIXES.join('|')

  const files = collectionFiles()
  if (files.length === 0) return skip('no content — run `git submodule update --init`')
  const sources = files.map((f) => fs.readFileSync(f, 'utf8'))

  const blocks = sources.flatMap((s) => [
    ...s.matchAll(new RegExp(`\\{%[^%]*\\.(?:${prefixes})-[^%]*%\\}`, 'g'))
  ])
  const tokens = sources.flatMap((s) => [
    ...s.matchAll(new RegExp(`\\.(${prefixes})-([a-zA-Z0-9]+)`, 'g'))
  ])
  const utilities = [...new Set(tokens.map((t) => `${t[1]}-${t[2]}`))].sort()
  const gridFiles = sources.filter((s) => new RegExp(`\\{%[^%]*\\.(?:${prefixes})-`).test(s))

  census('A1', 'annotation blocks', blocks.length, CENSUS.gridBlocks)
  census('A1', '.span-* tokens', tokens.filter((t) => t[1] === 'span').length, CENSUS.spanTokens)
  census(
    'A1',
    '.span-full',
    tokens.filter((t) => t[1] === 'span' && t[2] === 'full').length,
    CENSUS.spanFull
  )
  census('A1', '.start-* tokens', tokens.filter((t) => t[1] === 'start').length, CENSUS.startTokens)
  census('A1', '.end-* tokens', tokens.filter((t) => t[1] === 'end').length, CENSUS.endTokens)
  census('A1', 'annotated files', gridFiles.length, CENSUS.gridFiles)
  census('A1', 'distinct utilities', utilities.length, CENSUS.utilities)

  const css = distCss()
    .map((f) => fs.readFileSync(f, 'utf8'))
    .join('\n')
  assert(css.length > 0, 'no CSS in dist/ — did astro build run?')

  /* Uno emits a shortcut under its own name: `.span-full`, not `.col-span-full`. */
  const missing = utilities.filter((u) => !new RegExp(`\\.${u}(?![a-zA-Z0-9_-])`).test(css))
  assert(
    missing.length === 0,
    `generated CSS is missing ${missing.length} of ${utilities.length} grid utilit${missing.length === 1 ? 'y' : 'ies'}: ${missing.join(', ')}. ` +
      `UnoCSS needs BOTH the 'mdoc' in astro.config.mjs's pipeline.include AND the 'mdoc' in uno.config.ts's extractor regex — either one alone kills every annotation silently.`
  )

  return `${blocks.length} blocks · ${utilities.length}/${utilities.length} utilities in CSS · ${gridFiles.length} files`
})

// --- A2 ----------------------------------------------------------------------------
// One async transform anywhere makes getHeadings() return [] for every document:
// `createGetHeadings` calls `Markdoc.transform` synchronously, gets a Promise,
// `Tag.isTag(promise)` is false, and it returns [] without complaint.
//
// Drives Astro's own `createGetHeadings` over an AST parsed the way
// `content-entry-type.js` parses one — the collector itself, not a re-implementation.
await check('A2', 'getHeadings() is alive (the async-transform tripwire)', async () => {
  const probe = collectionFiles().find((f) => f.endsWith(CENSUS.headingProbe.file))
  if (!probe) return skip(`${CENSUS.headingProbe.file} not in the corpus`)

  const config = (await import(pathToFileURL(path.join(ROOT, 'markdoc.config.mjs')).href)).default
  const raw = fs.readFileSync(probe, 'utf8')

  /* `empty-with-lines` replaces the frontmatter with an equal number of blank lines so
     error line numbers stay honest. Resolved through @astrojs/markdoc rather than
     reproduced, so the guard parses what the build parses. */
  const fromMarkdoc = createRequire(
    createRequire(import.meta.url).resolve('@astrojs/markdoc/package.json')
  )
  const { parseFrontmatter } = await import(
    pathToFileURL(fromMarkdoc.resolve('@astrojs/internal-helpers/frontmatter')).href
  )
  const parsed = parseFrontmatter(raw, { frontmatter: 'empty-with-lines' })
  const tokenizer = new Markdoc.Tokenizer({ allowComments: true })
  const ast = Markdoc.parse(tokenizer.tokenize(parsed.content))

  const headings = createGetHeadings(JSON.stringify(ast), config, {})()

  /* Headings inside a fence are code, not structure. */
  let sourceCount = 0
  scanLines(parsed.content, (line) => {
    if (/^#{1,6}\s+\S/.test(line)) sourceCount++
  })

  assert(
    headings.length > 0,
    `getHeadings() returned [] for ${CENSUS.headingProbe.file}. Some transform in markdoc.config.mjs is async — one is enough, and it zeroes headings site-wide.`
  )
  assert(
    headings.length === sourceCount,
    `getHeadings() returned ${headings.length} for ${CENSUS.headingProbe.file}, source has ${sourceCount} heading(s) outside code fences`
  )
  /* A `#` text child on the anchor would land in every entry's text; the glyph is CSS (A7). */
  const withHash = headings.filter((h) => h.text.includes('#'))
  assert(
    withHash.length === 0,
    `${withHash.length} heading(s) carry the anchor '#' in .text — the anchor's text child is back; the glyph belongs in prose.css (A7)`
  )

  census(
    'A2',
    `${CENSUS.headingProbe.file} headings`,
    headings.length,
    CENSUS.headingProbe.headings
  )
  return `${headings.length} headings on ${CENSUS.headingProbe.file}, matching source, none carrying '#'`
})

// --- A3 ----------------------------------------------------------------------------
// Shiki's sync path takes a static language list. `highlighter.ts` throws on an unknown
// language at render time; this asserts the corpus side, over every fence.
await check('A3', 'every corpus fence language is in the static Shiki set', async () => {
  const files = collectionFiles()
  if (files.length === 0) return skip('no content — run `git submodule update --init`')

  const { LOADED_LANGUAGES } = await import(
    pathToFileURL(path.join(ROOT, 'src/lib/highlighter.ts')).href
  )
  const loaded = new Set(LOADED_LANGUAGES)

  const fences = fenceCensus(files)
  const byLang = {}
  for (const f of fences) byLang[f.lang] = (byLang[f.lang] ?? 0) + 1

  const uncovered = Object.keys(byLang).filter((l) => l !== 'text' && !loaded.has(l))
  assert(
    uncovered.length === 0,
    `fence language(s) not in the statically-imported Shiki set: ${uncovered.join(', ')} — they would render as plain text with a green build`
  )

  census('A3', 'top-level fences', fences.length, CENSUS.fences)
  for (const lang of new Set([...Object.keys(byLang), ...Object.keys(CENSUS.fenceLanguages)]))
    census('A3', `fence language '${lang}'`, byLang[lang] ?? 0, CENSUS.fenceLanguages[lang] ?? 0)

  return `${fences.length} fences · ${Object.keys(byLang).length} languages (${Object.entries(
    byLang
  )
    .map(([l, n]) => `${l} ${n}`)
    .join(', ')}) · all loaded`
})

// --- A5 ----------------------------------------------------------------------------
// Two-sided: `injectEntry: false` ships zero entries and a site with no utilities. A
// duplicate `import 'uno.css'` is deduped by Vite in the build (not in dev — see A11).
await check('A5', 'exactly one UnoCSS entry stylesheet per page', () => {
  const pages = distHtml()
  assert(pages.length > 0, 'no HTML in dist/ — did astro build run?')

  const isUnoEntry = new Map()
  const offenders = []
  for (const page of pages) {
    const html = fs.readFileSync(page, 'utf8')
    const hrefs = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)].map(
      (m) => m[1]
    )
    let count = 0
    for (const href of hrefs) {
      if (!isUnoEntry.has(href)) {
        const file = path.join(DIST, href.replace(/^\//, ''))
        isUnoEntry.set(
          href,
          fs.existsSync(file) && fs.readFileSync(file, 'utf8').includes(UNO_PREFLIGHT)
        )
      }
      if (isUnoEntry.get(href)) count++
    }
    if (count !== 1) offenders.push(`${path.relative(DIST, page)} has ${count}`)
  }
  assert(
    offenders.length === 0,
    `expected exactly 1 UnoCSS entry stylesheet per page: ${offenders.slice(0, 5).join('; ')}${offenders.length > 5 ? ` (+${offenders.length - 5} more)` : ''}`
  )
  return `${pages.length} pages, 1 uno entry each`
})

// --- A7 ----------------------------------------------------------------------------
// `markdoc.config.mjs` emits no `#` text child, so the visible glyph depends on this rule
// in another file.
await check('A7', 'prose.css restores the anchor glyph (a[data-anchor]::after)', () => {
  const css = fs.readFileSync(path.join(ROOT, 'src/styles/prose.css'), 'utf8')
  assert(
    /a\[data-anchor\]::after/.test(css),
    'prose.css has no `a[data-anchor]::after` rule — the heading anchor glyph is gone from every heading, because markdoc.config.mjs stopped emitting it as a text child'
  )
  return 'present'
})

// --- A8 ----------------------------------------------------------------------------
// Shiki emits light-mode italics as `--shiki-light-font-style`, not inline; without the
// read, every italic token loses its italics in light mode.
await check('A8', 'prose.css reads --shiki-light-font-style (Shiki 3 italics)', () => {
  const css = fs.readFileSync(path.join(ROOT, 'src/styles/prose.css'), 'utf8')
  /* `var(...)`, not a substring: `--shiki-light-font-style-renamed` contains the name by
     prefix and reads nothing. */
  assert(
    /var\(\s*--shiki-light-font-style\s*[,)]/.test(css),
    'prose.css does not read `var(--shiki-light-font-style)` — Shiki 3 emits light-mode italics there, so every italic token loses its italics in light mode'
  )
  return 'present'
})

// --- A10 ---------------------------------------------------------------------------
// `<astro-island>` and `<astro-slot>` are `display: contents`: no box, but selectors match
// the DOM tree, so a `>`-combinator aimed at what they wrap lands on the wrapper and the
// wrapped element falls through to auto-placement.
//
// Static on purpose: only a browser computes `display: contents`, but the only elements
// here that render that way are Astro wrappers, and those are visible in `dist/`.
//
// Adding a `client:` directive inside `<main>` is a layout change. This is where you find
// that out.
await check('A10', 'no display:contents wrapper inside <main> (the subgrid sever)', () => {
  const pages = distHtml()
  assert(pages.length > 0, 'no HTML in dist/ — did astro build run?')

  const WRAPPER = /<astro-(island|slot|static-slot)\b/g
  let total = 0
  const offenders = []
  for (const page of pages) {
    const html = fs.readFileSync(page, 'utf8')
    total += [...html.matchAll(WRAPPER)].length

    const i = html.indexOf('<main')
    const j = html.indexOf('</main>', i)
    if (i === -1 || j === -1) continue
    const inside = [...html.slice(i, j).matchAll(WRAPPER)].map((m) => m[1])
    if (inside.length)
      offenders.push(
        `${path.relative(DIST, page)}: ${inside.length} (${[...new Set(inside)].map((t) => `astro-${t}`).join(', ')})`
      )
  }

  assert(
    offenders.length === 0,
    `${offenders.length} page(s) render an Astro wrapper element inside <main>: ` +
      `${offenders.slice(0, 5).join('; ')}${offenders.length > 5 ? ` (+${offenders.length - 5} more)` : ''}. ` +
      `These are display:contents — no box, but every \`>\`-combinator still matches them: ` +
      `\`.media-grid > *\`, \`main > article > *\` and prose's \`> figure\` / \`> figure + :not(figure)\` all read this way, ` +
      `so the wrapped <figure> loses its utility AND becomes the grid item, landing on one track instead of four. ` +
      `The HTML, the classes and the text all stay correct, which is why nothing else catches it. ` +
      `If the component genuinely needs hydrating, the island must not sit between a grid container and its item.`
  )

  /* Reported so the rung cannot read as vacuous: islands DO exist on these pages — the
     Header, the Footer and the analytics element are all hydrated. The invariant is
     about where, not whether. */
  return `${pages.length} pages · ${total} island wrappers, 0 inside <main>`
})

// --- A11 ---------------------------------------------------------------------------
// Dev appends a second `__uno.css` after theme.css (see `astro.config.mjs`), so a font
// stack declared in two places renders the fallback in dev while the build looks right.
// The assertion is not about order, which the build cannot observe: each family must be
// declared exactly once. Expected stacks come from uno.config.ts.
await check('A11', 'each font family is declared exactly once', async () => {
  const { default: unoConfig } = await import(pathToFileURL(path.join(ROOT, 'uno.config.ts')))
  const families = Object.entries(unoConfig.theme?.font ?? {})
  assert(
    families.length > 0,
    'uno.config.ts declares no theme.font — the stacks moved back out of the Uno theme, which is what lets presetWind4 emit its OWN --font-* and race them'
  )

  const css = distCss()
    .map((f) => fs.readFileSync(f, 'utf8'))
    .join('\n')
  assert(css.length > 0, 'no CSS in dist/ — did astro build run?')

  const report = []
  for (const [slot, stack] of families) {
    const decls = [...css.matchAll(new RegExp(`--font-${slot}\\s*:\\s*([^;}]+)`, 'g'))].map((m) =>
      m[1].trim()
    )
    assert(
      decls.length !== 0,
      `--font-${slot} is never declared, but a utility still resolves var(--font-${slot}). ` +
        `preflights.theme is 'on-demand': it emits a family only for one something was seen to use, and only sans and mono are guaranteed a user by wind4's reset. That is what the font safelist in uno.config.ts is for.`
    )
    assert(
      decls.length === 1,
      `--font-${slot} is declared ${decls.length} times (${decls.map((d) => JSON.stringify(d.slice(0, 40))).join(' then ')}). ` +
        `Whichever wins here, DEV loads Uno's copy last and takes the other one — the site renders the fallback stack with a green build. Declare the stack ONCE, as a theme key in uno.config.ts.`
    )

    const expected = Array.isArray(stack) ? stack.join(',') : String(stack)
    const norm = (v) =>
      v
        .replace(/["']/g, '')
        .replace(/\s*,\s*/g, ',')
        .trim()
    assert(
      norm(decls[0]) === norm(expected),
      `--font-${slot} is declared as ${JSON.stringify(decls[0])}, but uno.config.ts asks for ${JSON.stringify(expected)}`
    )

    /* The first name is the only one the site ships a face for; the rest are OS fallbacks. */
    const primary = norm(expected).split(',')[0]
    assert(
      new RegExp(`font-family:\\s*["']?${primary}["']?`, 'i').test(css),
      `--font-${slot} names '${primary}' first, but no @font-face declares it — every glyph comes from the fallback stack instead`
    )
    report.push(`${slot}=${primary}`)
  }

  const faces = (css.match(/@font-face/g) ?? []).length
  return `${families.length} families, 1 declaration each (${report.join(', ')}) · ${faces} @font-face rules`
})

// --- A12 ---------------------------------------------------------------------------
// Reads `dist/`, so body images, body videos and the work thumbnail are covered at once,
// whatever code path each takes.
//
// Parse: every declaration is two positive integers. The browser silently drops an empty
// value, a stringified `undefined`, or a zero.
//
// Count: boxes equal what `mediaSites()` implies, which catches a call site that stops
// rendering one.
//
// The projects `cover` field is excluded: nothing renders it, though it stays in the
// schema and the manifest. A cover renderer that returns must be added here — and a crop
// or fixed-ratio card is art direction, not box reservation, so it reopens the
// authored-ratio question.
await check('A12', 'every media box reserves a real aspect ratio', () => {
  const sites = mediaSites()
  if (sites.length === 0) return skip('no content — run `git submodule update --init`')

  const pages = distHtml()
  assert(pages.length > 0, 'no HTML in dist/ — did astro build run?')

  /* Inline STYLE ATTRIBUTES only. Scanning the whole document would also sweep up any
     `aspect-ratio` a stylesheet declares, and a utility class is not a reserved box. */
  let boxes = 0
  const bad = []
  for (const page of pages) {
    const html = fs.readFileSync(page, 'utf8')
    for (const [, declarations] of html.matchAll(/style="([^"]*)"/g))
      for (const [, value] of declarations.matchAll(/aspect-ratio:([^;]*)/g)) {
        boxes++
        const pair = /^(\d+)\s*\/\s*(\d+)$/.exec(value.trim())
        if (!pair || Number(pair[1]) <= 0 || Number(pair[2]) <= 0)
          bad.push(`${path.relative(DIST, page)}: ${JSON.stringify(value)}`)
      }
  }

  assert(
    bad.length === 0,
    `${bad.length} of ${boxes} media box(es) carry an aspect-ratio that is not two positive integers: ` +
      `${bad.slice(0, 5).join('; ')}${bad.length > 5 ? ` (+${bad.length - 5} more)` : ''}. ` +
      `The browser DROPS an invalid declaration silently, so the box is never reserved and the page ` +
      `shifts under the reader when the asset loads. Ratios come from \`aspect-ratios.json\` in the ` +
      `content submodule — \`pnpm ratios\` records a missing one.`
  )

  /* A draft renders in `astro dev` and not in a build, so its boxes are not in dist. */
  const rendered = sites.filter((s) => !s.draft && s.from !== 'cover')
  const byOrigin = {}
  for (const s of rendered) byOrigin[s.from] = (byOrigin[s.from] ?? 0) + 1
  const breakdown = Object.entries(byOrigin)
    .map(([from, n]) => `${n} ${from}`)
    .join(', ')

  assert(
    boxes === rendered.length,
    `the build emits ${boxes} media box(es), but the corpus implies ${rendered.length} ` +
      `(${breakdown}). ` +
      `A call site has stopped rendering a box, or has started rendering one twice — either way the ` +
      `HTML, the classes and the text all stay correct, which is why nothing else catches it.`
  )

  census('A12', 'media boxes', boxes, CENSUS.mediaBoxes)
  return `${boxes} boxes (${breakdown}) · all two positive integers`
})

// --- A14 ---------------------------------------------------------------------------
// A13 stays retired (docs/adr/0003-client-routing-removed.md) and is not reused.
//
// Pairs `gridSpan.ts`'s table with `Grid.astro`'s stylesheet: a `data-span` value with no
// matching `[data-span='N']` rule falls to span 1 silently.
//
// Shares the read with an unrelated invariant: a grid has ten columns, not the page's
// twelve, and CSS clamps an overrun `.span-11`/`.span-12` on a grid child without error.
await check('A14', 'data-span matches Grid.astro CSS; no grid child spans past 10', () => {
  const pages = distHtml()
  assert(pages.length > 0, 'no HTML in dist/ — did astro build run?')

  const GRID_OPEN = '<div class="media-grid"'
  const NESTED_DIV = /<div\b|<\/div>/g

  let grids = 0
  let derivedBoxes = 0
  const spanValues = new Set()
  const overspan = []

  for (const page of pages) {
    const html = fs.readFileSync(page, 'utf8')

    /* Grid blocks nest a `<div>` per media wrapper, so a naive "next `</div>`" (A10's
       approach for `<main>`, which never nests) would truncate on the first one. This
       counts depth instead. */
    let from = 0
    for (let start; (start = html.indexOf(GRID_OPEN, from)) !== -1;) {
      grids++
      const bodyStart = html.indexOf('>', start) + 1
      NESTED_DIV.lastIndex = bodyStart
      let depth = 1
      let end = html.length
      for (let m; (m = NESTED_DIV.exec(html));) {
        depth += m[0] === '</div>' ? -1 : 1
        if (depth === 0) {
          end = m.index + m[0].length
          break
        }
      }
      const block = html.slice(start, end)
      from = end

      for (const [, value] of block.matchAll(/data-span="(\d+)"/g)) {
        derivedBoxes++
        spanValues.add(value)
      }

      for (const [, classList] of block.matchAll(/<figure\b[^>]*\bclass="([^"]*)"/g))
        for (const token of classList.split(/\s+/)) {
          const span = /^span-(\d+)$/.exec(token)
          if (span && Number(span[1]) > 10) overspan.push(`${path.relative(DIST, page)}: .${token}`)
        }
    }
  }

  assert(
    overspan.length === 0,
    `${overspan.length} grid child(ren) carry a .span-* above 10: ${overspan.slice(0, 5).join('; ')}` +
      `${overspan.length > 5 ? ` (+${overspan.length - 5} more)` : ''}. ` +
      `A grid's ten columns are not the page's twelve — .span-11 and .span-12 ask for more ` +
      `tracks than the subgrid has, and CSS clamps the overrun in silence rather than erroring.`
  )

  /* Astro may inline Grid.astro's scoped style into each page or emit it to a CSS file;
     search both. */
  const styleText = [...distCss(), ...pages].map((f) => fs.readFileSync(f, 'utf8')).join('\n')
  const missing = [...spanValues].filter(
    (v) => !new RegExp(`\\[data-span=["']?${v}["']?\\]`).test(styleText)
  )
  assert(
    missing.length === 0,
    `data-span value(s) ${missing.join(', ')} appear in dist/ with no matching rule in Grid.astro's ` +
      `stylesheet — an unmatched value falls to span 1 with correct HTML, correct classes and a ` +
      `green build. gridSpan.ts's table and Grid.astro's [data-span] rules have drifted apart.`
  )

  census('A14', 'grids', grids, CENSUS.grids)
  census('A14', 'derived boxes', derivedBoxes, CENSUS.derivedBoxes)

  return `${grids} grids · ${derivedBoxes} derived boxes · data-span {${[...spanValues].sort().join(',')}} all matched · none above span-10`
})

// --- A9 ----------------------------------------------------------------------------
// Every declared base must resolve to at least one file. A mistyped or stale `base` in
// `content.config.ts` otherwise gives a site that builds green with no content in it —
// the glob simply matches nothing and every collection comes back empty.
await check('A9', 'every declared collection base resolves', () => {
  const globs = collectionGlobs()
  const mdoc = globs.filter((g) => g.pattern.endsWith('.mdoc'))
  const bases = [...new Set(globs.map((g) => g.base))]

  const present = mdoc.filter((g) => fs.existsSync(path.resolve(ROOT, g.base)))
  if (present.length === 0)
    return skip(
      `no collection base exists (${bases.join(', ')}) — run \`git submodule update --init\``
    )

  const empty = present.filter((g) => {
    const dir = path.resolve(ROOT, g.base)
    const matches = globMatcher(g.pattern)
    return !walk(dir).some((abs) => matches(path.relative(dir, abs)))
  })
  assert(
    empty.length === 0,
    `${empty.length} collection glob(s) resolve to nothing: ${empty.map((g) => `${g.base}/${g.pattern}`).join(', ')}. ` +
      `A base pointed at the submodule before the rename lands sees .md, not .mdoc.`
  )

  const files = collectionFiles()
  census('A9', 'collection files', files.length, CENSUS.files)
  return `${files.length} files under ${bases.join(', ')} (${globs.map((g) => g.pattern).join(', ')})`
})

// --- report ------------------------------------------------------------------------
const failed = results.filter((r) => !r.ok)
const skipped = results.filter((r) => r.skip)
const width = Math.max(...results.map((r) => r.title.length))

console.log(`\nport-guard${STRICT ? ' (--strict)' : ''}\n`)
for (const r of results)
  console.log(
    `  ${r.ok ? (r.skip ? '–' : '✓') : '✗'} ${r.id}  ${r.title.padEnd(width)}  ${r.detail}`
  )

if (drift.length) {
  console.log(
    `\n  ${STRICT ? 'error' : 'warning'}: the corpus differs from the figures recorded at content ${CENSUS.rev}.`
  )
  for (const d of drift) console.log(`    ${d}`)
  console.log(
    `    The pinned figures were measured at a different content revision, so a difference here is` +
      `\n    provenance, not damage — every assertion above still passed. If content` +
      `\n    legitimately changed, update CENSUS above and the revision it names.`
  )
}

console.log(
  `\n  ${results.length - failed.length - skipped.length}/${results.length} assertions pass` +
    `${skipped.length ? `, ${skipped.length} skipped` : ''}` +
    `\n`
)

const strictFailure = STRICT && (drift.length > 0 || skipped.length > 0)
process.exit(failed.length || strictFailure ? 1 : 0)
