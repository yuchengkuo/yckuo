#!/usr/bin/env node
/**
 * port-guard.mjs — the build gate.
 *
 *     pnpm build   ==   astro build && node scripts/port-guard.mjs
 *     pnpm guard              the gate alone, against an existing dist/
 *     pnpm guard --strict     census drift becomes an error (tickets 16 and 17)
 *
 * Ticket 08 re-chartered the fallback ladder from a DECISION-risk register into an
 * EXECUTION-risk register, and found that eight of the nine risks 02/03/07 surfaced
 * share one shape: **green build, no warning, visible damage.** There is no alternative
 * path to fall back to — only a silence to break. So the instrument is an assertion, and
 * the assertions live in one named file rather than scattered through the source,
 * because a scattered assertion gets deleted by whoever hits it at a bad moment while a
 * named gate is visible in the build log.
 *
 * Seven of the nine rungs are here. The other two are elsewhere by 08's cost rule — the
 * phase that introduces a risk pays for its assertion:
 *   A4 (the subgrid sever) rides `parity.mjs` in ticket 16; it needs a laid-out DOM.
 *   A6 (the converter's self-checks) is already live inside `slashify.mjs`.
 *
 * A1 and A5 read `dist/`, which is why the gate is post-build and could not have been
 * written earlier. A2, A3 and A9 read source and would run anywhere; they are here so
 * that there is one gate rather than two.
 *
 * ---------------------------------------------------------------------------------
 * STRUCTURE IS HARD, PROVENANCE WARNS — ticket 12-5's ruling, applied here.
 *
 * The first version of this gate hard-coded every corpus figure and failed the build on
 * any drift. That is the landmine 12 had already found and defused in `sync-content.mjs`:
 * this repo pins `content` at `d862f74` while the migration's figures were measured at
 * `19ee03f`, and the two corpora differ — **60 grid-annotation blocks at the pinned
 * commit against 68 in the working tree.** A hard census therefore failed `pnpm build`
 * for anyone who cloned `dev` and ran `git submodule update`, which is the one moment a
 * newcomer meets it.
 *
 * So the two split, exactly as they do in `sync-content.mjs`:
 *
 *   - **Assertions are revision-INDEPENDENT and always hard.** Each one derives its
 *     expectation from whatever corpus is present and asserts a *relationship*: every
 *     grid utility the source implies is in the built CSS, every fence language the
 *     source uses is loaded, headings match their own source, each declared base
 *     resolves. They hold at both revisions and would hold at a third.
 *   - **The census is provenance.** The pinned counts are reported every run, warn on
 *     drift, and name the revision they came from. `--strict` promotes them to errors —
 *     that is the flag 16 and 17 use, and it is where an unreproducible corpus must stop
 *     the line.
 *
 * The same split covers the absent mirror. `astro/src/content/` is gitignored and
 * arrives via `pnpm sync`, which a clone without submodule access cannot run; "the
 * package builds from a fresh clone" is ticket 11's exit condition. With no content the
 * corpus-dependent rungs report **skip**, not pass — and `--strict` fails on that too.
 * ---------------------------------------------------------------------------------
 *
 * NODE >= 22.18. A2 and A3 import `markdoc.config.mjs` and `src/lib/highlighter.ts`
 * directly — driving the real config rather than a description of it is the whole point
 * of those two rungs — and the highlighter is TypeScript, so the gate needs Node's
 * type stripping, on by default from 22.18. That is the only reason `engines` exists in
 * package.json. On an older Node the gate dies on a SyntaxError; it does not pass quietly.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { createRequire } from 'node:module'
import Markdoc from '@markdoc/markdoc'
import { createGetHeadings } from '@astrojs/markdoc/runtime'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(ROOT, 'dist')
const CONTENT_CONFIG = path.join(ROOT, 'src/content.config.ts')

const STRICT = process.argv.includes('--strict')

/*
 * The recorded corpus — provenance, not a gate. Measured at content `19ee03f`; the repo
 * pins `d862f74`, where several of these differ. Drift warns and names the revision.
 *
 * The `.span-full` line is the one worth reading twice: `.span-full` is NOT
 * `.span-<digits>`, so the obvious `\.span-[0-9]+` census counts 58 of the 68 and looks
 * entirely plausible doing it (12-3).
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
  /* A2's probe. `note/markdoc-shiki` is chosen because it is heading-dense AND is the
     file whose ````liquid fence made 07-5 fire, so one file exercises both paths. */
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

function walk(dir) {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]))
}

/**
 * The collection globs, read out of `src/content.config.ts` rather than restated here.
 *
 * This is what makes A9 the one assertion that survives the cutover meaningfully: 17
 * step 3 repoints every `base` from `./src/content` (the gitignored mirror) to
 * `../content` (the private submodule, post-rename), and this reads whichever is
 * declared. Restating the path would turn A9 into a test of a constant.
 */
function collectionGlobs() {
  const src = fs.readFileSync(CONTENT_CONFIG, 'utf8')
  const globs = [
    ...src.matchAll(/glob\(\{\s*pattern:\s*'([^']+)'\s*,\s*base:\s*'([^']+)'\s*\}\)/g)
  ].map(([, pattern, base]) => ({ pattern, base }))
  assert(globs.length > 0, `no glob({pattern,base}) pairs found in ${CONTENT_CONFIG}`)
  return globs
}

/** Every `.mdoc` the declared collection globs actually resolve to. */
function collectionFiles() {
  const seen = new Set()
  for (const { pattern, base } of collectionGlobs()) {
    if (!pattern.endsWith('.mdoc')) continue
    const dir = path.resolve(ROOT, base)
    if (!fs.existsSync(dir)) continue
    const matches = globMatcher(pattern)
    for (const abs of walk(dir)) if (matches(path.relative(dir, abs))) seen.add(abs)
  }
  return [...seen]
}

/**
 * A single star does not cross a path separator; a double star matches zero or more
 * directories.
 *
 * That distinction is load-bearing rather than pedantic: it is the whole of 03's
 * `docs/CONTEXT.md` ruling. `pages` is `*.mdoc`, root-only, so a file one directory down
 * is matched by no collection glob and stays documentation. Reproducing the semantics
 * here means A9 keeps deriving that result instead of restating it.
 */
function globMatcher(pattern) {
  const source = pattern
    .split('/')
    .map((seg, i, all) => {
      if (seg === '**') return '(?:[^/]+/)*'
      const escaped = seg.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '[^/]*')
      return i === all.length - 1 ? escaped : `${escaped}/`
    })
    .join('')
  const rx = new RegExp(`^${source}$`)
  return (rel) => rx.test(rel.split(path.sep).join('/'))
}

function distHtml() {
  return walk(DIST).filter((f) => f.endsWith('.html'))
}

function distCss() {
  return walk(DIST).filter((f) => f.endsWith('.css'))
}

/**
 * Fence-aware line scan, shared by the fence census and A2's heading count.
 *
 * The naive version — toggle a boolean on any line starting with three backticks —
 * returns 18 fences and six languages, so it looks right. It is not:
 * `note/markdoc-shiki.mdoc` demonstrates Markdoc syntax inside a FOUR-backtick
 * ````liquid fence containing a nested ```css one, and the naive toggle treats the
 * nested opener as a CLOSER. 03 counted that nested fence as top-level and recorded
 * five languages, and the omission degraded a real fence to plain text with a green
 * build (07-5). A closer must be at least as long as its opener and carry no info string.
 */
function scanLines(text, onTopLevelLine, onFenceOpen) {
  let open = null
  for (const raw of text.split('\n')) {
    const m = /^(`{3,})(.*)$/.exec(raw.trim())
    if (m) {
      const [, ticks, info] = m
      if (open === null) {
        open = ticks.length
        onFenceOpen?.(info.trim().split(/\s+/)[0] || 'text')
      } else if (ticks.length >= open && info.trim() === '') {
        open = null
      }
      continue
    }
    if (open === null) onTopLevelLine?.(raw)
  }
  return open === null
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
// The grid annotations are the largest silent-failure surface in the port: they live
// ONLY inside content, so the `.md -> .mdoc` rename disarmed both UnoCSS edits at once
// (07-3) and every image collapsed to one column with a green build and no warning.
// 11 proved the two edits are independently load-bearing with a negative control.
//
// The ASSERTION derives the expected utility set from whatever source is present, so it
// holds at any content revision. The pinned counts ride alongside as census.
await check('A1', 'grid annotations reach the generated CSS', () => {
  const files = collectionFiles()
  if (files.length === 0) return skip('no content mirror — run `pnpm sync`')
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
// 02's second side finding: ONE async transform anywhere makes getHeadings() return []
// for EVERY document, not just near the async node. `createGetHeadings` calls
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
     error line numbers stay honest — and it is also 02's entire trigger, because it
     makes the document's leading whitespace equal to the frontmatter's line count.
     Resolved through @astrojs/markdoc rather than reproduced, so the guard parses what
     the build parses. */
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
// text with a green build and no warning — ladder entry (d), which fired for real on
// `liquid` (07-5). `highlighter.ts` throws at build time on an unknown language; this
// asserts the corpus side, that every language the content actually uses is covered.
await check('A3', 'every corpus fence language is in the static Shiki set', async () => {
  const files = collectionFiles()
  if (files.length === 0) return skip('no content mirror — run `pnpm sync`')

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
// ladder records the risk as a DOUBLE stylesheet — an `import 'uno.css'` in Base.astro
// on top of the injected one, putting a second copy of presetWind4's reset after
// prose.css (07-3b). 13 could not reproduce that: Vite dedupes the identical virtual
// module id. What it DID reproduce is the other side of the same count — `injectEntry:
// false` ships zero entries, a green build, and a site with no utilities at all. Hence a
// two-sided assertion rather than an upper bound.
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
// 03(v) removed the anchor's literal '#' text child so it would stop appearing inside
// getHeadings().text. The glyph is VISIBLE on the site today, so removing the text child
// without the CSS deletes it from every heading — an unconditional fix that fails
// silently if forgotten, which is why the assertion is the rung and not the fix (07-2).
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

// --- A9 ----------------------------------------------------------------------------
// 09 added this one. It guards the SINGLE path that changes at cutover: ticket 17 step 3
// repoints every collection `base` from `./src/content` (the gitignored mirror) to
// `../content` (the private submodule, post-rename). That edit cannot be exercised
// before the cutover window, so the assertion is the only thing standing between a
// mistyped base and a site that builds green with no content in it.
//
// The ASSERTION is that every declared base resolves to at least one file — which is
// what a wrong base breaks, and what holds at any revision. Pointing a base at
// `../content` before the rename lands resolves 0 (`.md`, not `.mdoc`) and fails here.
// The 26 rides alongside as census.
await check('A9', 'every declared collection base resolves', () => {
  const globs = collectionGlobs()
  const mdoc = globs.filter((g) => g.pattern.endsWith('.mdoc'))
  const bases = [...new Set(globs.map((g) => g.base))]

  const present = mdoc.filter((g) => fs.existsSync(path.resolve(ROOT, g.base)))
  if (present.length === 0)
    return skip(`no collection base exists (${bases.join(', ')}) — run \`pnpm sync\``)

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

console.log(`\nport-guard — ticket 08’s assertion tier${STRICT ? ' (--strict)' : ''}\n`)
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
    `    This repo pins \`content\` at an older commit than the migration was measured against, so a` +
      `\n    difference here is provenance, not damage — every assertion above still passed. If content` +
      `\n    legitimately changed, update CENSUS and record it in the ticket.`
  )
}

console.log(
  `\n  ${results.length - failed.length - skipped.length}/${results.length} assertions pass` +
    `${skipped.length ? `, ${skipped.length} skipped` : ''}` +
    `  (A4 rides parity.mjs in ticket 16; A6 is live in slashify.mjs)\n`
)

const strictFailure = STRICT && (drift.length > 0 || skipped.length > 0)
process.exit(failed.length || strictFailure ? 1 : 0)
