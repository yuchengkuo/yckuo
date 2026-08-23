#!/usr/bin/env node
/**
 * port-guard.mjs — the build gate.
 *
 *     pnpm build   ==   astro build && node scripts/port-guard.mjs
 *     pnpm guard              the gate alone, against an existing dist/
 *     pnpm guard --strict     census drift and skipped rungs become errors
 *
 * Every assertion here guards a failure of one shape: **green build, no warning, visible
 * damage.** There is no fallback path to take when one fires — only a silence to break.
 * They live in one named file rather than scattered through the source, because a
 * scattered assertion gets deleted by whoever hits it at a bad moment, while a named gate
 * is visible in the build log.
 *
 * A1, A5 and A10 read `dist/`, which is why the gate runs post-build. A2, A3 and A9 read
 * source and would run anywhere; they are here so that there is one gate rather than two.
 *
 * ---------------------------------------------------------------------------------
 * STRUCTURE IS HARD, PROVENANCE WARNS.
 *
 * A first version hard-coded every corpus figure and failed the build on any drift. That
 * fails `pnpm build` for anyone who clones and runs `git submodule update` against a
 * different content revision — which is the one moment a newcomer meets it. So the two
 * split:
 *
 *   - **Assertions are revision-INDEPENDENT and always hard.** Each derives its
 *     expectation from whatever corpus is present and asserts a *relationship*: every
 *     grid utility the source implies is in the built CSS, every fence language the
 *     source uses is loaded, headings match their own source, each declared base
 *     resolves. They hold at any revision.
 *   - **The census is provenance.** The pinned counts are reported every run, warn on
 *     drift, and name the revision they came from. `--strict` promotes them to errors.
 *
 * The same split covers absent content: a clone without submodule access reports **skip**
 * on the corpus-dependent rungs, not pass — and `--strict` fails on that too.
 * ---------------------------------------------------------------------------------
 *
 * NODE >= 22.18. A2 and A3 import `markdoc.config.mjs` and `src/lib/highlighter.ts`
 * directly — driving the real config rather than a description of it is the whole point
 * of those two rungs — and the highlighter is TypeScript, so the gate needs Node's type
 * stripping, on by default from 22.18. That is the only reason `engines` exists in
 * package.json. On an older Node the gate dies on a SyntaxError; it does not pass quietly.
 */
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { createRequire } from 'node:module'
import Markdoc from '@markdoc/markdoc'
import { createGetHeadings } from '@astrojs/markdoc/runtime'
/* The fence rule lives in one file because it once lived in two and they disagreed. The
   corpus readers are shared with the ratio generator for the same reason. */
import { scanLines } from './fences.mjs'
import {
  ROOT,
  walk,
  globMatcher,
  collectionGlobs,
  collectionFiles,
  mediaSites
} from './corpus.mjs'

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
// The grid annotations are the largest silent-failure surface in the repo: they live
// ONLY inside content, so anything that stops UnoCSS reading `.mdoc` collapses every
// image to one column with a green build and no warning. The two edits in
// `uno.config.ts` and `astro.config.mjs` are independently load-bearing.
//
// The ASSERTION derives the expected utility set from whatever source is present, so it
// holds at any content revision. The pinned counts ride alongside as census.
await check('A1', 'grid annotations reach the generated CSS', () => {
  const files = collectionFiles()
  if (files.length === 0) return skip('no content — run `git submodule update --init`')
  const sources = files.map((f) => fs.readFileSync(f, 'utf8'))

  const blocks = sources.flatMap((s) => [...s.matchAll(/\{%[^%]*\.(?:span|start|end)-[^%]*%\}/g)])
  const tokens = sources.flatMap((s) => [...s.matchAll(/\.(span|start|end)-([a-zA-Z0-9]+)/g)])
  const utilities = [...new Set(tokens.map((t) => `${t[1]}-${t[2]}`))].sort()
  const gridFiles = sources.filter((s) => /\{%[^%]*\.(?:span|start|end)-/.test(s))

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

  /* `.span-full` is generated as `span-full`, not `col-span-full`: uno emits the rule
     under the SHORTCUT's own name. Deriving the expected set from source rather than
     listing it is also what keeps the `.span-[0-9]+` trap from reappearing here. */
  const missing = utilities.filter((u) => !new RegExp(`\\.${u}(?![a-zA-Z0-9_-])`).test(css))
  assert(
    missing.length === 0,
    `generated CSS is missing ${missing.length} of ${utilities.length} grid utilit${missing.length === 1 ? 'y' : 'ies'}: ${missing.join(', ')}. ` +
      `UnoCSS needs BOTH the 'mdoc' in astro.config.mjs's pipeline.include AND the 'mdoc' in uno.config.ts's extractor regex — either one alone kills every annotation silently.`
  )

  return `${blocks.length} blocks · ${utilities.length}/${utilities.length} utilities in CSS · ${gridFiles.length} files`
})

// --- A2 ----------------------------------------------------------------------------
// ONE async transform anywhere makes getHeadings() return [] for EVERY document, not
// just near the async node. `createGetHeadings` calls
// `Markdoc.transform` synchronously and then walks the result; an async config hands it
// a Promise, `Tag.isTag(promise)` is false, and it returns [] without complaining.
//
// It is still LATENT — nothing in the site consumes headings today — which is exactly
// why it needs asserting rather than observing. A latent regression has no symptom.
//
// This drives Astro's OWN `createGetHeadings`, exported from `@astrojs/markdoc/runtime`,
// over an AST parsed the way `content-entry-type.js` parses one. It is not a
// re-implementation of the collector; it is the collector.
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

  /* Headings inside a fence are prose, not structure. The fence-aware scan is why —
     a bare `!/^```/` test on a `## ` line can never be false and excludes nothing. */
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
  /* 03(v): the anchor used to carry a literal '#' text child, which landed inside
     getHeadings().text. The glyph is CSS now (A7); if it comes back as a text child it
     comes back in every TOC entry. */
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
// Shiki's sync path takes a STATIC language list. An unlisted language degrades to plain
// text with a green build and no warning, and it has fired for real on `liquid`.
// `highlighter.ts` throws at build time on an unknown language; this asserts the corpus
// side, that every language the content actually uses is covered.
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
// @unocss/astro injects the uno entry itself (`injectEntry` defaults to true). The
// obvious risk is a DOUBLE stylesheet — an `import 'uno.css'` in `Base.astro` on top of
// the injected one — but Vite dedupes the identical virtual module id, so that one does
// not reproduce. The reproducible side is the other end of the same count:
// `injectEntry: false` ships zero entries, a green build, and a site with no utilities
// at all. Hence a two-sided assertion rather than an upper bound.
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
// `markdoc.config.mjs` deliberately emits no '#' text child, so it stays out of
// getHeadings().text. The glyph is VISIBLE on the site, so the text child and the CSS
// are one change in two files — and dropping the CSS half deletes the glyph from every
// heading silently. Hence an assertion rather than trust.
await check('A7', 'prose.css restores the anchor glyph (a[data-anchor]::after)', () => {
  const css = fs.readFileSync(path.join(ROOT, 'src/styles/prose.css'), 'utf8')
  assert(
    /a\[data-anchor\]::after/.test(css),
    'prose.css has no `a[data-anchor]::after` rule — the heading anchor glyph is gone from every heading, because markdoc.config.mjs stopped emitting it as a text child'
  )
  return 'present'
})

// --- A8 ----------------------------------------------------------------------------
// The sync-Shiki rule forces Shiki 1 -> 3, and v3 moves light-mode italics from an
// inline `font-style` to a `--shiki-light-font-style` custom property. Same shape as A7:
// an unconditional 3-line fix whose omission is invisible except that every italic token
// quietly stops being italic in light mode.
await check('A8', 'prose.css reads --shiki-light-font-style (Shiki 3 italics)', () => {
  const css = fs.readFileSync(path.join(ROOT, 'src/styles/prose.css'), 'utf8')
  /* `var(...)`, not a bare substring. The first version of this rung tested
     `css.includes('--shiki-light-font-style')`, and it PASSED when the injection renamed
     the property to `--shiki-light-font-style-renamed` — the rename satisfies the
     substring by prefix, so the rung was asserting a property nothing reads. Asserting
     the READ is the whole point. */
  assert(
    /var\(\s*--shiki-light-font-style\s*[,)]/.test(css),
    'prose.css does not read `var(--shiki-light-font-style)` — Shiki 3 emits light-mode italics there, so every italic token loses its italics in light mode'
  )
  return 'present'
})

// --- A10 ---------------------------------------------------------------------------
// `<astro-island>` and `<astro-slot>` are `display: contents`: they generate no box —
// but CSS SELECTORS match the DOM tree, not the box tree. So a `>`-combinator aimed at
// what they wrap lands on the wrapper, which has no box to style, while the wrapped
// element becomes the grid item and falls through to auto-placement. `/shots` rendered
// 39.7% short that way, with a green build, every other assertion passing, 0 differing
// characters of `<main>` text and 0 differing class attributes.
//
// It asserts the STRUCTURE rather than any particular figure's computed span, so it does
// not depend on which figures happen to carry a `{% .span-N %}`.
//
// STATIC ON PURPOSE. The mechanism is `display: contents`, which only a browser
// computes — but the only thing that *renders* as `display: contents` in this tree is an
// Astro wrapper element, and those are visible in `dist/`. So the build can hold the line
// on every page of every build.
//
// The corollary: **adding a `client:` directive inside `<main>` is a layout change.**
// This is where you find that out.
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
      `\`.gallery > *\`, \`main > article > *\` and prose's \`> figure\` / \`> figure + :not(figure)\` all read this way, ` +
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
// 19 added this one, and it is the rung A5 was one count short of.
//
// A5 asserts ONE uno entry per page and records that the double-stylesheet risk could not
// be reproduced, because Vite dedupes an identical virtual module id. That holds for the
// id Base.astro would have imported. It does NOT hold in dev: `@unocss/astro`'s own
// `resolveId` rewrites the resolved `/__uno.css` to an absolute `<root>/__uno.css`, so
// the client-injected copy and the SSR-inlined one carry DIFFERENT `data-vite-dev-id`s,
// Vite dedupes on that id, and the second copy is appended after theme.css instead of
// replacing the first. Uno's preflight `:root,:host` then lands last and wins.
//
// What that cost: every font on the site fell back to the system default in dev, with a
// clean build, no console error, all 26 @font-face rules registered and `fonts.check()`
// true for all three families. Nothing referenced them. The build was untouched — dist
// happened to emit theme.css last — so `pnpm build` could not see it.
//
// The assertion is therefore not about order, which is what dev gets wrong and dist gets
// right by luck. It is that each family is declared EXACTLY ONCE, so no order exists to
// get wrong. Two declarations is the defect whichever one currently wins. The expected
// stacks are derived from uno.config.ts, so this stays a test of the invariant and not of
// a constant, and a fourth family added there is covered without touching the gate.
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

    /* The first name is the only one the site actually ships; the rest are the OS
       fallbacks. It must have a face to load, or the stack silently degrades to them. */
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
