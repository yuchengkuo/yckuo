#!/usr/bin/env node
/**
 * converter-selftest.mjs — the proof behind `slashify()`.
 *
 *     node scripts/converter-selftest.mjs             run every fixture
 *     node scripts/converter-selftest.mjs --report    name each fixture as it passes
 *
 * `slashify()` edits authored prose, so it must be a pure insertion: same call sites,
 * each untouched or one `/` longer, byte-identical once slashes are normalised away, tag
 * balance unchanged, idempotent. `convert()` is those gates.
 *
 * `GATE_FIXTURES` must pass and `REJECT_FIXTURES` must each fail, so a gate that stopped
 * firing is caught as surely as one that misfires.
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
const TRAPS = [
  {
    why: 'nested [brackets] in alt text',
    in: "![a [b] c](work/x 'cap') {% .span-7 %}",
    out: "![a [b] c](/work/x 'cap') {% .span-7 %}"
  },
  {
    why: 'single-quoted title — the src token must stop before the quote',
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
    // The corpus shape (see `fences.mjs`), with an image where the corpus has none.
    why: 'an image inside a NESTED fence is still code',
    in: '````liquid {% process=false %}\n```css\n![alt](work/x)\n```\n````',
    out: '````liquid {% process=false %}\n```css\n![alt](work/x)\n```\n````'
  },
  {
    // A shorter run cannot close a longer opener, and scanning resumes after the real closer.
    why: 'content after a nested fence closes is live again',
    in: '````text\n```\n````\n\n![alt](work/x)',
    out: '````text\n```\n````\n\n![alt](/work/x)'
  },
  {
    // The corpus has no tilde fences, so only this fixture covers them.
    why: 'a ~~~ fence is a fence, and ``` does not close it',
    in: '~~~md\n```\n![alt](work/x)\n~~~\n\n![b](work/y)',
    out: '~~~md\n```\n![alt](work/x)\n~~~\n\n![b](/work/y)'
  },
  {
    // False openers: each would swallow the rest of the document, with G1–G4 agreeing.
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
    // G2 must normalise both sides, or a hand-slashed src fails a correct conversion.
    why: 'a hand-slashed src beside a relative one — must convert, not fail G2',
    in: "![a](/work/keep 'k')\n\n![b](work/new 'n')\n",
    out: "![a](/work/keep 'k')\n\n![b](/work/new 'n')\n"
  }
]

/* Covers the gates themselves, not just the converter. */
const GATE_FIXTURES = [
  {
    why: 'G2 on a mixed hand-slashed / relative document',
    text: "![a](/work/keep 'k')\n\n![b](work/new 'n')\n"
  },
  { why: 'G2 on an all-relative document', text: '![a](work/x)\n\n![b](work/y)\n' },
  { why: 'G2 on a fully-converted document (nothing to do)', text: '![a](/work/x)\n' },
  { why: 'a document with no images at all', text: '# Title\n\nprose {% .base %}\n' },
  {
    // The nested fence from the gates' side: G1 and G2 are only as good as `census()`.
    why: 'G1–G4 over a nested fence holding an image, beside a live one',
    text: '![a](work/live)\n\n````liquid\n```css\n![b](work/dead)\n```\n````\n'
  }
]

/* G1–G4 all pass on an unterminated fence, so only this catches G5 going silent. */
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

  const beforeGates = problems.length
  for (const f of GATE_FIXTURES) convert(`fixture[${f.why}]`, f.text)
  const misfired = problems.length - beforeGates
  console.log(
    `selftest: ${GATE_FIXTURES.length - misfired}/${GATE_FIXTURES.length} gate fixtures pass`
  )

  // Expected failures are truncated away; only a gate that stayed silent survives.
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

  // G5 — every fence terminates. G1–G4 cannot stand in: `census()` shares the blindness.
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

  // G2 — round-trip purity.
  //
  // (a) Positional, so two sites sharing a prefix cannot fool it.
  for (let i = 0; i < Math.min(before.length, after.length); i++) {
    const b = before[i].src
    const a = after[i].src
    if (a !== b && a !== `/${b}`)
      fail(`${rel}: L${after[i].line} src changed by more than a leading slash: ${b} -> ${a}`)
  }
  // (b) Normalised on both sides, so an already-slashed source site cancels out.
  const bare = (t) => t.replaceAll('](/', '](')
  if (bare(text) !== bare(raw)) fail(`${rel}: round-trip differs — NOT a pure insertion`)

  // G3 — tag balance untouched.
  if (tagBalance(raw) !== tagBalance(text)) fail(`${rel}: markdoc tag count changed`)

  // G4 — idempotence: a second run must not double-slash.
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
