#!/usr/bin/env node
/**
 * sync-content — the generated `.mdoc` content mirror (ticket 12, ruling R7).
 *
 * `@astrojs/markdoc` registers ONLY the `.mdoc` extension. The root SvelteKit app needs
 * those same files to stay `.md`. One submodule, one checkout, two incompatible
 * requirements — so content converts into a GITIGNORED MIRROR at `astro/src/content/`
 * and the private repo stays untouched until cutover, where it takes exactly one commit.
 *
 * Because that conversion is provably pure (`slashify.mjs` ships a round-trip proof), a
 * regenerable artifact is safe in a way a hand-maintained parallel branch is not.
 *
 *   node scripts/sync-content.mjs              mirror ../content -> src/content
 *   node scripts/sync-content.mjs --control    gates only, write nothing, print the diff
 *   node scripts/sync-content.mjs --selftest   converter fixtures only, no content needed
 *   node scripts/sync-content.mjs --in-place   ticket 17 step 2: convert the submodule
 *
 * Flags: --report (per-file counts) · --dry-run (with --in-place) · --allow-drift (see CENSUS)
 *
 * THIS IS NOT THROWAWAY TOOLING. Ticket 17 step 2 runs `--in-place` against the private
 * repo under the content freeze, producing the one commit the atomic cutover needs.
 *
 * Deliberately NOT wired to `predev`/`prebuild`. The mirror's source is private, so an
 * automatic hook would make `pnpm build` fail on a fresh clone — the exact exit condition
 * ticket 11 protected when it gave the footer's nav data a stub instead of the mirror.
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { slashify, census, tagBalance } from './slashify.mjs'

const here = path.dirname(fileURLToPath(import.meta.url))
const PKG = path.resolve(here, '..') //  astro/
const CONTENT = path.resolve(PKG, '../content') //  the private submodule
const MIRROR = path.join(PKG, 'src/content') //  gitignored, see root .gitignore

/**
 * Velite's collection globs, transcribed from `velite.config.ts`. The file set is DERIVED
 * from these, never listed — 03's correction (`docs/CONTEXT.md` is matched by no glob and
 * stays `.md`) is a consequence of the `pages` pattern being root-only, not a special case
 * anyone has to remember.
 */
const COLLECTIONS = [
  { name: 'pages', pattern: '*.md', match: (r) => /^[^/]+\.md$/.test(r) },
  { name: 'works', pattern: 'work/*.md', match: (r) => /^work\/[^/]+\.md$/.test(r) },
  { name: 'projects', pattern: 'project/**/*.md', match: (r) => /^project\/.+\.md$/.test(r) },
  { name: 'notes', pattern: 'note/**/*.md', match: (r) => /^note\/.+\.md$/.test(r) },
  // Ported for glob fidelity, not for files: `content/post/` does not exist (13 §4).
  { name: 'posts', pattern: 'post/**/*.md', match: (r) => /^post\/.+\.md$/.test(r) }
]

/**
 * Copied verbatim, no rename: `navigation` is a single-file YAML collection.
 *
 * Deliberately NOT copied: `docs/CONTEXT.md` (no collection glob matches it — 03) and
 * `work/org/*.yml` (`orgs` has zero consumers and is not ported — 13 §4). Both stay in the
 * private repo; the mirror carries only what the five ported collections read.
 */
const VERBATIM = ['navigation.yml']

/**
 * The recorded corpus. Asserted hard, because every figure this map inherited turned out
 * stale and the ladder's answer to that is a loud failure rather than a comment.
 *
 * If content legitimately grows, update these three numbers here and say so in the ticket.
 * `--allow-drift` downgrades the assertion to a report for a one-off run.
 */
const CENSUS = { files: 26, images: 128, imageFiles: 15 }

const argv = process.argv.slice(2)
const has = (f) => argv.includes(f)

if (has('--help') || has('-h')) {
  console.log(`sync-content — the generated .mdoc content mirror (ticket 12)

  node scripts/sync-content.mjs              mirror ../content -> src/content (gitignored)
  node scripts/sync-content.mjs --control    run every gate, write nothing, print the diff
  node scripts/sync-content.mjs --selftest   converter fixtures only, no content needed
  node scripts/sync-content.mjs --in-place   ticket 17 step 2: convert the submodule itself

  --report        per-file image call-site counts
  --dry-run       with --in-place: print the 26 renames and touch nothing
  --allow-drift   downgrade the corpus census from a gate to a warning, for one run
  --help          this`)
  process.exit(0)
}
const MODE = has('--selftest')
  ? 'selftest'
  : has('--in-place')
    ? 'in-place'
    : has('--control')
      ? 'control'
      : 'mirror'
const REPORT = has('--report')
const DRY = has('--dry-run')
const LOOSE = has('--allow-drift')

const problems = []
const fail = (msg) => problems.push(msg)

// --- fixtures for --selftest ------------------------------------------------------------
// 03 found three silent-mangle traps in the superseded tag rewrite. All three are
// structurally inapplicable to a one-character insertion, and 04 and 07 both discounted
// the risk — but the checks stay, so the claim is measured rather than argued.
//
// Three of these seven discriminate against the naive `!\[[^\]]*\]\(([^)\s]+)` pattern
// (nested brackets, fenced code, escaped opener). The single-quoted-title fixture cannot:
// a leading-slash insertion is positionally immune to tail mangling, which is precisely
// ticket 12's "structurally inapplicable" claim — measured here rather than asserted.
const TRAPS = [
  {
    why: 'nested [brackets] in alt text (4 real sites)',
    in: "![a [b] c](work/x 'cap') {% .span-7 %}",
    out: "![a [b] c](/work/x 'cap') {% .span-7 %}"
  },
  {
    why: 'single-quoted title (47 of 128 sites) — the src token must stop before the quote',
    in: "![alt](work/x 'a (paren) title')",
    out: "![alt](/work/x 'a (paren) title')"
  },
  {
    why: '03 trap 1: an annotation on a LATER line must not be pulled across a blank line',
    in: '![alt](work/x)\n\n{% /gallery %}',
    out: '![alt](/work/x)\n\n{% /gallery %}'
  },
  {
    why: 'fenced code is not content',
    in: '```md\n![alt](work/x)\n```',
    out: '```md\n![alt](work/x)\n```'
  },
  {
    why: 'an already-slashed site is left alone (idempotence)',
    in: '![a](/work/x)',
    out: '![a](/work/x)'
  },
  {
    why: 'an absolute url is left alone',
    in: '![a](https://x.test/y)',
    out: '![a](https://x.test/y)'
  },
  { why: 'an escaped opener is not an image', in: '\\![a](work/x)', out: '\\![a](work/x)' }
]

function selftest() {
  let pass = 0
  for (const t of TRAPS) {
    const got = slashify(t.in).text
    if (got === t.out) {
      pass++
      if (REPORT) console.log(`  ok   ${t.why}`)
    } else {
      fail(
        `selftest: ${t.why}\n         in:  ${JSON.stringify(t.in)}\n         want:${JSON.stringify(t.out)}\n         got: ${JSON.stringify(got)}`
      )
    }
  }
  console.log(`selftest: ${pass}/${TRAPS.length} converter fixtures pass`)
}

// --- collection walk --------------------------------------------------------------------
function walk(dir, base = dir, acc = []) {
  for (const e of fs
    .readdirSync(dir, { withFileTypes: true })
    .sort((a, b) => (a.name < b.name ? -1 : 1))) {
    if (e.name.startsWith('.')) continue //  .git, .DS_Store
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, base, acc)
    else acc.push(path.relative(base, p).split(path.sep).join('/'))
  }
  return acc
}

function collectionFiles(root) {
  const all = walk(root)
  const matched = []
  for (const rel of all) {
    const c = COLLECTIONS.find((c) => c.match(rel))
    if (c) matched.push({ rel, collection: c.name })
  }
  return { matched, all }
}

/**
 * Convert one file and run the four per-file gates (ladder A6). Returns the converted text
 * plus the numbers the corpus census is built from.
 */
function convert(rel, raw) {
  const { text, sites, skipped } = slashify(raw)

  // G1 — census stability. Same number of image call sites before and after, and every
  // one of them now resolvable by `shouldOptimizeImage`.
  const before = census(raw)
  const after = census(text)
  if (before.length !== after.length)
    fail(`${rel}: census changed ${before.length} -> ${after.length}`)
  const unresolvable = after.filter(
    (s) => !s.src.startsWith('/') && !/^[a-z][a-z0-9+.-]*:/i.test(s.src) && s.src !== ''
  )
  if (unresolvable.length)
    fail(
      `${rel}: ${unresolvable.length} site(s) still relative — would fail the Astro build: ` +
        unresolvable.map((s) => `L${s.line} ${s.src}`).join(', ')
    )

  // G2 — round-trip purity. Strip every inserted '/' back out and the document must be
  // byte-identical to the source. This is the proof that licenses a regenerable mirror.
  // Longest src first, so `/work/x` can never be un-slashed inside `/work/xy`.
  let restored = text
  const slashed = after
    .filter((x) => x.src.startsWith('/'))
    .sort((a, b) => b.src.length - a.src.length)
  for (const s of slashed) restored = restored.replace(`](${s.src}`, `](${s.src.slice(1)}`)
  if (sites > 0 && restored !== raw) fail(`${rel}: round-trip differs — NOT a pure insertion`)

  // G3 — tag balance untouched (03's trap 1).
  if (tagBalance(raw) !== tagBalance(text)) fail(`${rel}: markdoc tag count changed`)

  // G4 — idempotence. Re-converting the output must find nothing, or a second run would
  // double-slash and every image would 404 with a green build.
  const twice = slashify(text)
  if (twice.sites !== 0) fail(`${rel}: not idempotent — ${twice.sites} site(s) would slash again`)
  if (twice.text !== text) fail(`${rel}: not idempotent — a second pass changes the text`)

  // The control diff: which lines moved, and does each one hold an image?
  const srcLines = raw.split('\n')
  const outLines = text.split('\n')
  const changed = []
  for (let i = 0; i < Math.max(srcLines.length, outLines.length); i++)
    if (srcLines[i] !== outLines[i]) changed.push(i + 1)
  const bare = changed.filter((ln) => !census(outLines[ln - 1] ?? '').length)
  if (bare.length) fail(`${rel}: changed line(s) with no image call site: ${bare.join(', ')}`)
  const slashedAny = sites > 0
  const movedAny = changed.length > 0
  if (slashedAny !== movedAny)
    fail(`${rel}: ${sites} site(s) slashed but ${changed.length} line(s) changed`)

  return { text, sites, skipped, changed }
}

// --- corpus census ----------------------------------------------------------------------
function assertCensus(corpus) {
  const files = corpus.length
  const totalSites = corpus.reduce((n, f) => n + f.sites, 0)
  const touched = corpus.filter((f) => f.sites).length
  const byCollection = COLLECTIONS.map(
    (c) => `${c.name} ${corpus.filter((f) => f.collection === c.name).length}`
  ).join(' · ')

  console.log(`census: ${files} collection file(s) — ${byCollection}`)
  console.log(`        ${touched} image-bearing, ${totalSites} image call site(s)`)

  const drift =
    files !== CENSUS.files || totalSites !== CENSUS.images || touched !== CENSUS.imageFiles
  if (!drift) return
  const msg =
    `corpus census drifted from the recorded ${CENSUS.files} files / ${CENSUS.imageFiles} image-bearing / ` +
    `${CENSUS.images} sites. If content legitimately changed, update CENSUS in this file and record it in the ticket.`
  if (LOOSE) console.warn(`WARN --allow-drift: ${msg}`)
  else fail(msg)
}

// --- modes ------------------------------------------------------------------------------
function readCorpus() {
  if (!fs.existsSync(CONTENT)) {
    console.error(`no content/ submodule at ${CONTENT}`)
    console.error('the mirror is generated from private content; a clone without it cannot sync.')
    process.exit(1)
  }
  const { matched, all } = collectionFiles(CONTENT)

  // The case a human actually hits: `--in-place` re-run after the cutover conversion. A
  // bare `0 / 0 / 0` census would read as a catastrophe rather than as "already done".
  const already = all.filter((r) => r.endsWith('.mdoc')).length
  if (matched.length === 0 && already) {
    console.error(
      `no .md collection files in ${CONTENT}, but ${already} .mdoc file(s) are already there.`
    )
    console.error('this content checkout is already converted — there is nothing left to do.')
    process.exit(1)
  }

  const out = []
  for (const { rel, collection } of matched) {
    const raw = fs.readFileSync(path.join(CONTENT, rel), 'utf8')
    const r = convert(rel, raw)
    out.push({ rel, collection, ...r })
    if (REPORT && (r.sites || r.skipped.length))
      console.log(
        `  ${rel.padEnd(34)} +${String(r.sites).padStart(3)} slash` +
          (r.skipped.length
            ? `  (${r.skipped.length} skipped: ${[...new Set(r.skipped.map((s) => s.why))].join(', ')})`
            : '')
      )
  }
  assertCensus(out)
  return out
}

function mirror(corpus) {
  // Wipe first: nothing else writes here, and a stale ghost from a renamed source would
  // otherwise keep resolving as a 27th entry.
  fs.rmSync(MIRROR, { recursive: true, force: true })
  for (const f of corpus) {
    const dest = path.join(MIRROR, f.rel.replace(/\.md$/, '.mdoc'))
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.writeFileSync(dest, f.text)
  }
  for (const rel of VERBATIM) {
    const from = path.join(CONTENT, rel)
    if (!fs.existsSync(from)) {
      fail(`${rel}: missing from content/ — a ported collection reads it`)
      continue
    }
    const dest = path.join(MIRROR, rel)
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.copyFileSync(from, dest)
  }

  // A9's precondition, checked where the mirror is written rather than trusted downstream.
  const written = walk(MIRROR).filter((r) => r.endsWith('.mdoc'))
  if (written.length !== CENSUS.files && !LOOSE)
    fail(`mirror holds ${written.length} .mdoc file(s), expected ${CENSUS.files}`)
  console.log(
    `mirror: ${written.length} .mdoc + ${VERBATIM.length} verbatim -> ${path.relative(PKG, MIRROR)}/ (gitignored)`
  )
}

function control(corpus) {
  const changedFiles = corpus.filter((f) => f.changed.length)
  console.log(`\ncontrol diff — ${changedFiles.length} file(s) changed, nothing written:`)
  for (const f of changedFiles)
    console.log(`  ${f.rel.padEnd(34)} ${f.changed.length} line(s), ${f.sites} site(s)`)
  const clean = corpus.filter((f) => !f.changed.length).length
  console.log(`  (${clean} file(s) byte-identical)`)
  // Every changed line holds an image, and only image-bearing files change: both asserted
  // per file in convert(). This is the report of that, not a second check.
}

function inPlace(corpus) {
  const git = (...a) => execFileSync('git', ['-C', CONTENT, ...a], { encoding: 'utf8' })
  let status
  try {
    status = git('status', '--porcelain')
  } catch {
    console.error(`${CONTENT} is not a git repository — --in-place needs one to stage the renames`)
    process.exit(1)
  }
  if (status.trim() && !DRY) {
    console.error(`${CONTENT} has uncommitted changes:\n${status}`)
    console.error('--in-place stages 26 renames; refusing to mix them with existing work.')
    process.exit(1)
  }
  const branch = git('rev-parse', '--abbrev-ref', 'HEAD').trim()
  const head = git('rev-parse', '--short', 'HEAD').trim()

  // A submodule left detached by `git submodule update` is the normal state, and committing
  // 26 renames onto a detached HEAD during a freeze is how that work gets lost. 17 step 2
  // wants a named branch on top of `main` so the merge back can be --ff-only.
  if (branch === 'HEAD' && !DRY) {
    console.error(`${CONTENT} is on a detached HEAD at ${head}.`)
    console.error('check out the content `astro` branch first — 17 step 2 needs one commit on a')
    console.error(
      'named branch on top of `main`, or the --ff-only merge back has nothing to fast-forward.'
    )
    process.exit(1)
  }
  console.log(`\nin-place: ${CONTENT} on ${branch} @ ${head}${DRY ? '  (DRY RUN)' : ''}`)

  let done = 0
  try {
    for (const f of corpus) {
      const to = f.rel.replace(/\.md$/, '.mdoc')
      if (DRY) {
        console.log(`  git mv ${f.rel} ${to}` + (f.sites ? `   +${f.sites} slash` : ''))
        continue
      }
      git('mv', f.rel, to)
      fs.writeFileSync(path.join(CONTENT, to), f.text)
      git('add', to)
      done++
    }
  } catch (err) {
    // The tree was verified clean above, so the undo is total and can be stated exactly.
    // A freeze is the wrong moment to work out what half-converted means.
    console.error(`\nfailed after ${done} of ${corpus.length} rename(s): ${err.message}`)
    console.error(`undo: git -C ${CONTENT} reset --hard && git -C ${CONTENT} clean -fd`)
    process.exit(1)
  }
  if (DRY) {
    console.log(`\n${corpus.length} rename(s) planned. Nothing touched.`)
    return
  }
  console.log(
    `\n${corpus.length} rename(s) staged, ${corpus.reduce((n, f) => n + f.sites, 0)} slash(es) applied.`
  )
  console.log("NOT committed — ticket 17 step 2 wants ONE commit that also carries 04's")
  console.log('staged CONTEXT.md rewrite. Add that, then commit on top of `main` so the')
  console.log('merge back can be --ff-only.')
}

// --- run --------------------------------------------------------------------------------
function report() {
  if (!problems.length) return
  console.error(`\nFAILED GATE (${problems.length}):`)
  for (const p of problems) console.error('  ' + p)
  process.exit(1)
}

if (MODE === 'selftest') {
  selftest()
} else {
  selftest() //  the converter proves itself before it is pointed at real content
  const corpus = readCorpus()
  // Every gate runs before anything is written. `--in-place` rewrites the private repo;
  // a mode that can stage 26 renames must never run downstream of an unread failure.
  report()
  if (MODE === 'mirror') mirror(corpus)
  else if (MODE === 'control') control(corpus)
  else if (MODE === 'in-place') inPlace(corpus)
}

report()
console.log('gates: clean')
