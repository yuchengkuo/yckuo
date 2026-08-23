#!/usr/bin/env node
/**
 * converter-selftest.mjs — the proof behind `slashify()`.
 *
 *     node scripts/converter-selftest.mjs             run every fixture
 *     node scripts/converter-selftest.mjs --report    name each fixture as it passes
 *
 * `slashify()` inserts one leading `/` into a markdown image src, turning a bare
 * Cloudinary id into the form Astro's `emitOptimizedImages` will accept. That is a
 * one-character edit to authored prose, so the bar it has to clear is that it is a PURE
 * INSERTION: same image call sites before and after, each either untouched or exactly one
 * `/` longer, byte-identical once the inserted slashes are normalised away, markdoc tag
 * balance unchanged, and idempotent.
 *
 * `convert()` below is those five gates. This file runs them over fixtures rather than
 * over content, so the proof holds without a content checkout — the fixtures are the
 * record of what was actually tried, including the traps a naive
 * `!\[[^\]]*\]\(([^)\s]+)` pattern falls into: nested brackets, fenced code, an escaped
 * opener.
 *
 * The gates run in BOTH directions. `GATE_FIXTURES` must pass and `REJECT_FIXTURES` must
 * each produce at least one failure, so a gate that has quietly stopped firing is caught
 * as surely as one that misfires.
 *
 * The fence rule is shared with `port-guard.mjs` through `fences.mjs`, deliberately: it
 * once lived in two copies and they disagreed.
 */
import { slashify, census, tagBalance } from './slashify.mjs'

const argv = process.argv.slice(2)
const has = (f) => argv.includes(f)

if (has('--help') || has('-h')) {
  console.log(`converter-selftest — the proof behind slashify()

  node scripts/converter-selftest.mjs             run every fixture
  node scripts/converter-selftest.mjs --report    name each fixture as it passes
  node scripts/converter-selftest.mjs --help      this`)
  process.exit(0)
}

const REPORT = has('--report')

const problems = []
const fail = (msg) => problems.push(msg)

// --- fixtures -----------------------------------------------------------------------
// Three silent-mangle traps were found in an earlier, superseded tag-rewrite approach.
// All three are structurally inapplicable to a one-character insertion — but the checks
// stay, so that claim is measured rather than argued.
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
    why: 'an annotation on a LATER line must not be pulled across a blank line',
    in: '![alt](work/x)\n\n{% /gallery %}',
    out: '![alt](/work/x)\n\n{% /gallery %}'
  },
  {
    why: 'fenced code is not content',
    in: '```md\n![alt](work/x)\n```',
    out: '```md\n![alt](work/x)\n```'
  },
  {
    // The nested-fence defect this fixture exists for. `note/markdoc-shiki` demonstrates
    // Markdoc syntax inside a FOUR-backtick fence holding a nested ```css one; a naive
    // toggle reads that nested opener as a closer, so the lines between the nested fences
    // count as live content. The corpus happens to put no image there, so the divergence
    // is LATENT — which is why nothing caught it, and why this fixture has to.
    why: 'an image inside a NESTED fence is still code',
    in: '````liquid {% process=false %}\n```css\n![alt](work/x)\n```\n````',
    out: '````liquid {% process=false %}\n```css\n![alt](work/x)\n```\n````'
  },
  {
    // The other half of the same rule: a shorter run cannot close a longer opener, and a
    // fence closed by its own length must resume top-level scanning afterwards. Without
    // this an over-strict scanner would swallow the rest of every document silently.
    why: 'content after a nested fence closes is live again',
    in: '````text\n```\n````\n\n![alt](work/x)',
    out: '````text\n```\n````\n\n![alt](/work/x)'
  },
  {
    // Tildes were handled by the naive toggle and must survive the lift; the corpus has
    // none today, so only a fixture keeps that true.
    why: 'a ~~~ fence is a fence, and ``` does not close it',
    in: '~~~md\n```\n![alt](work/x)\n~~~\n\n![b](work/y)',
    out: '~~~md\n```\n![alt](work/x)\n~~~\n\n![b](/work/y)'
  },
  {
    // The two false-OPENER rules. Both cost the whole rest of the document rather than
    // one line: they open a fence that can never close, so every later call site is read
    // as code and left relative — with G1–G4 agreeing, because census() reads the same
    // scanner. G5 fails on the unterminated fence they leave behind; these fixtures pin
    // the reason it should never get there.
    why: 'four spaces of indent is a code block, not a fence opener',
    in: '    ```\n    code\n\n![alt](work/x)',
    out: '    ```\n    code\n\n![alt](/work/x)'
  },
  {
    why: 'three spaces of indent IS a fence opener (the boundary, from the other side)',
    in: '   ```\n![alt](work/x)\n   ```\n\n![b](work/y)',
    out: '   ```\n![alt](work/x)\n   ```\n\n![b](/work/y)'
  },
  {
    why: 'a backtick in the info string means inline code, not a fence',
    in: '```js``` is inline\n\n![alt](work/x)',
    out: '```js``` is inline\n\n![alt](/work/x)'
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
  { why: 'an escaped opener is not an image', in: '\\![a](work/x)', out: '\\![a](work/x)' },
  {
    // G2's original reconstruct-and-compare form failed this: it un-slashed the
    // hand-slashed src too, so `restored !== raw` rejected a correct conversion. The
    // symmetric form below has no such asymmetry, and this fixture pins it.
    why: 'a hand-slashed src beside a relative one — must convert, not fail G2',
    in: "![a](/work/keep 'k')\n\n![b](work/new 'n')\n",
    out: "![a](/work/keep 'k')\n\n![b](/work/new 'n')\n"
  }
]

/** The per-file gates, run over a fixture so the gates themselves are covered, not just the
 * converter. `convert()` reports through `fail()`, so a fixture that trips a gate shows up as
 * a normal gate failure naming the fixture. */
const GATE_FIXTURES = [
  {
    why: 'G2 on a mixed hand-slashed / relative document',
    text: "![a](/work/keep 'k')\n\n![b](work/new 'n')\n"
  },
  { why: 'G2 on an all-relative document', text: '![a](work/x)\n\n![b](work/y)\n' },
  { why: 'G2 on a fully-converted document (nothing to do)', text: '![a](/work/x)\n' },
  { why: 'a document with no images at all', text: '# Title\n\nprose {% .base %}\n' },
  {
    // The nested-fence defect again, from the gates' side. G1 compares census-before against census-after
    // and G2 diffs the documents, so both were blind while `census()` shared the bug —
    // this fixture is only meaningful because the two now share the fixed rule instead.
    why: 'G1–G4 over a nested fence holding an image, beside a live one',
    text: '![a](work/live)\n\n````liquid\n```css\n![b](work/dead)\n```\n````\n'
  }
]

/** Fixtures the gates must REJECT. A gate nothing can trip is not a gate, and G5 is the
 * one whose absence left no other trace — the four before it all pass on the document it
 * refuses. */
const REJECT_FIXTURES = [
  {
    why: 'G5: an unterminated fence hides every call site after it',
    text: '```ts\nconst x = 1\n\n![a](work/x)\n'
  }
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

  // The gates over fixtures. `convert()` pushes into `problems`, so any gate that misfires on
  // a document it should accept surfaces here rather than on real content months later.
  const beforeGates = problems.length
  for (const f of GATE_FIXTURES) convert(`fixture[${f.why}]`, f.text)
  const misfired = problems.length - beforeGates
  console.log(
    `selftest: ${GATE_FIXTURES.length - misfired}/${GATE_FIXTURES.length} gate fixtures pass`
  )

  // The other direction: each of these must produce at least one problem. Their failures
  // are the expected result, so the tally is truncated back afterwards — only a gate that
  // stayed silent survives into `problems`.
  const beforeReject = problems.length
  let caught = 0
  for (const f of REJECT_FIXTURES) {
    const n = problems.length
    convert(`fixture[${f.why}]`, f.text)
    if (problems.length > n) caught++
    else if (REPORT) console.log(`  MISS ${f.why}`)
  }
  problems.length = beforeReject
  console.log(`selftest: ${caught}/${REJECT_FIXTURES.length} reject fixtures rejected`)
  if (caught !== REJECT_FIXTURES.length)
    fail(`selftest: ${REJECT_FIXTURES.length - caught} gate(s) that must fire did not`)
}

function convert(rel, raw) {
  const { text, sites, skipped, closed } = slashify(raw)

  // G5 — every fence terminates. The one gate the other four cannot stand in for: an
  // unterminated fence makes the rest of the document read as code, so the tail is
  // silently left unconverted AND `census()` agrees, which is what G1–G4 compare.
  if (!closed) fail(`${rel}: unterminated code fence — every image after it is invisible`)

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

  // G2 — round-trip purity, in two halves. This is the proof that the conversion is
  // safe on authored prose, so it has to hold for reasons rather than by luck.
  //
  // (a) Every site is either untouched or exactly one leading '/' longer. Positional, so
  //     it cannot be fooled by two sites sharing a prefix.
  for (let i = 0; i < Math.min(before.length, after.length); i++) {
    const b = before[i].src
    const a = after[i].src
    if (a !== b && a !== `/${b}`)
      fail(`${rel}: L${after[i].line} src changed by more than a leading slash: ${b} -> ${a}`)
  }
  // (b) Normalise `](/` to `](` on BOTH sides and the documents must be byte-identical.
  //     Symmetric, so a source site that was ALREADY slashed cancels out instead of being
  //     un-slashed only on one side — the earlier reconstruct-and-compare form failed a file
  //     mixing a hand-slashed src with a relative one.
  const bare = (t) => t.replaceAll('](/', '](')
  if (bare(text) !== bare(raw)) fail(`${rel}: round-trip differs — NOT a pure insertion`)

  // G3 — tag balance untouched.
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
  const imageless = changed.filter((ln) => !census(outLines[ln - 1] ?? '').length)
  if (imageless.length)
    fail(`${rel}: changed line(s) with no image call site: ${imageless.join(', ')}`)
  const slashedAny = sites > 0
  const movedAny = changed.length > 0
  if (slashedAny !== movedAny)
    fail(`${rel}: ${sites} site(s) slashed but ${changed.length} line(s) changed`)

  return { text, sites, skipped, changed }
}

selftest()

if (problems.length) {
  console.error(`\nFAILED (${problems.length}):`)
  for (const p of problems) console.error('  ' + p)
  process.exit(1)
}
console.log('gates: clean')
