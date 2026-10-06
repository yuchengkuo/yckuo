#!/usr/bin/env node
/**
 * gridspan-selftest.mjs — the proof behind `spanFromRatio()`.
 *
 *     node scripts/gridspan-selftest.mjs             run every fixture
 *     node scripts/gridspan-selftest.mjs --report    name each fixture as it passes
 *
 * Pins each threshold from both sides — a shifted boundary changes spans with no type
 * error — and checks totality. Reject fixtures must each throw, so a check that stopped
 * firing is caught as surely as one that misbuckets.
 *
 * `gridSpan.ts` must stay importable by plain Node, free of `astro:*` imports.
 */
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const { spanFromRatio } = await import(
  pathToFileURL(path.join(import.meta.dirname, '..', 'src/lib/media/gridSpan.ts')).href
)

const argv = process.argv.slice(2)
const has = (f) => argv.includes(f)

if (has('--help') || has('-h')) {
  console.log(`gridspan-selftest — the proof behind spanFromRatio()

  node scripts/gridspan-selftest.mjs             run every fixture
  node scripts/gridspan-selftest.mjs --report    name each fixture as it passes
  node scripts/gridspan-selftest.mjs --help      this`)
  process.exit(0)
}

const REPORT = has('--report')

const problems = []
const fail = (msg) => problems.push(msg)

// --- fixtures -----------------------------------------------------------------------

const ACCEPT_FIXTURES = [
  { why: 'just under the 0.8 threshold', ratio: 0.79, want: 3 },
  { why: 'exactly the 0.8 threshold — inclusive at the lower end', ratio: 0.8, want: 4 },
  { why: 'just under the 0.5 threshold', ratio: 0.49, want: 2 },
  { why: 'exactly the 0.5 threshold — inclusive at the lower end', ratio: 0.5, want: 3 },
  { why: 'just under the 0.25 threshold', ratio: 0.24, want: 1 },
  { why: 'exactly the 0.25 threshold — inclusive at the lower end', ratio: 0.25, want: 2 },
  { why: 'corpus extreme: the one sub-0.25 image (1440x5992)', ratio: 0.24, want: 1 },
  { why: 'corpus extreme: a wide landscape screenshot near 2.17', ratio: 2.17, want: 4 },
  { why: 'a tiny positive ratio, well below every threshold', ratio: 0.001, want: 1 },
  { why: 'a huge ratio, well above every threshold', ratio: 50, want: 4 }
]

const REJECT_FIXTURES = [
  { why: 'zero', ratio: 0 },
  { why: 'a negative ratio', ratio: -0.8 },
  { why: 'NaN', ratio: NaN },
  { why: 'positive Infinity', ratio: Infinity },
  { why: 'negative Infinity', ratio: -Infinity }
]

// --- the two directions ---------------------------------------------------------------

let accepted = 0
for (const f of ACCEPT_FIXTURES) {
  let got
  try {
    got = spanFromRatio(f.ratio)
  } catch (err) {
    fail(`accept: ${f.why} (ratio ${f.ratio})\n        refused: ${err.message}`)
    continue
  }
  if (got === f.want) {
    accepted++
    if (REPORT) console.log(`  ok   ${f.why} (${f.ratio}) -> span ${got}`)
  } else {
    fail(`accept: ${f.why} (ratio ${f.ratio})\n        want: ${f.want}\n        got:  ${got}`)
  }
}
console.log(`gridspan: ${accepted}/${ACCEPT_FIXTURES.length} accept fixtures bucket correctly`)

let rejected = 0
for (const f of REJECT_FIXTURES) {
  try {
    const got = spanFromRatio(f.ratio)
    fail(`reject: ${f.why}\n        returned ${JSON.stringify(got)} instead of refusing`)
    if (REPORT) console.log(`  MISS ${f.why}`)
  } catch {
    rejected++
    if (REPORT) console.log(`  ok   refused: ${f.why}`)
  }
}
console.log(`gridspan: ${rejected}/${REJECT_FIXTURES.length} reject fixtures refused`)

// Totality: catches a threshold rewritten to fall through to `undefined`.
const SPREAD = [
  0.001, 0.01, 0.1, 0.2, 0.24, 0.25, 0.3, 0.4, 0.49, 0.5, 0.6, 0.79, 0.8, 0.9, 1, 1.45, 2.17, 5, 10,
  100, 1e6
]
let total = 0
for (const ratio of SPREAD) {
  const got = spanFromRatio(ratio)
  if (Number.isInteger(got) && got >= 1 && got <= 4) {
    total++
  } else {
    fail(`totality: ratio ${ratio} produced ${JSON.stringify(got)}, not an integer in 1-4`)
  }
}
console.log(`gridspan: ${total}/${SPREAD.length} spread ratios bucket to an integer in 1-4`)

if (problems.length) {
  console.error(`\nFAILED (${problems.length}):`)
  for (const p of problems) console.error('  ' + p)
  process.exit(1)
}
console.log('gridspan: clean')
