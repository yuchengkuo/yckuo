#!/usr/bin/env node
/**
 * getinfo-selftest.mjs — the proof behind `ratioFromGetInfo()`.
 *
 *     node scripts/getinfo-selftest.mjs             run every fixture
 *     node scripts/getinfo-selftest.mjs --report    name each fixture as it passes
 *
 * Catches what A12 cannot: a ratio that is valid but wrong. A parser reading `output`
 * instead of `input` passes A12; only the transformed fixtures, where the two blocks
 * disagree, tell them apart.
 *
 * Every body is recorded verbatim from `res.cloudinary.com`. Reject fixtures must each
 * throw — a parser that stopped refusing is as bad as one that misreads.
 */
import { ratioFromGetInfo } from './getinfo.mjs'

const argv = process.argv.slice(2)
const has = (f) => argv.includes(f)

if (has('--help') || has('-h')) {
  console.log(`getinfo-selftest — the proof behind ratioFromGetInfo()

  node scripts/getinfo-selftest.mjs             run every fixture
  node scripts/getinfo-selftest.mjs --report    name each fixture as it passes
  node scripts/getinfo-selftest.mjs --help      this`)
  process.exit(0)
}

const REPORT = has('--report')

const problems = []
const fail = (msg) => problems.push(msg)

// --- fixtures -----------------------------------------------------------------------

const ACCEPT_FIXTURES = [
  {
    why: 'image resource type, untransformed',
    body: '{"input":{"width":3840,"height":3112,"bytes":1979016},"output":{"format":"png","bytes":2048804,"width":3840,"height":3112}}',
    want: '3840/3112'
  },
  {
    // `output` is 400x324 here; returning it means reading the transformation.
    why: 'image resource type, TRANSFORMED — input and output disagree',
    body: '{"input":{"width":3840,"height":3112,"bytes":1979016},"resize":[{"x_factor":0.10416666666666667,"y_factor":0.10411311053984576}],"output":{"format":"png","bytes":38530,"width":400,"height":324}}',
    want: '3840/3112'
  },
  {
    why: 'video resource type via its first frame (fl_getinfo,so_0)',
    body: '{"input":{"width":1280,"height":724,"bytes":32571},"output":{"format":"png","bytes":188722,"width":1280,"height":724}}',
    want: '1280/724'
  },
  {
    why: 'video first frame, TRANSFORMED — input and output disagree',
    body: '{"input":{"width":1280,"height":724,"bytes":32571},"resize":[{"x_factor":0.3125,"y_factor":0.31215469613259667}],"output":{"format":"png","bytes":24859,"width":400,"height":226}}',
    want: '1280/724'
  }
]

const REJECT_FIXTURES = [
  {
    why: 'an empty object — what the video resource type answers on a plain URL',
    body: '{}'
  },
  {
    why: 'only `output` dimensions — plausible integers, wrong box',
    body: '{"output":{"format":"png","bytes":38530,"width":400,"height":324}}'
  },
  {
    why: 'a zero dimension',
    body: '{"input":{"width":3840,"height":0,"bytes":1979016}}'
  },
  {
    why: 'a missing dimension',
    body: '{"input":{"width":3840,"bytes":1979016}}'
  },
  {
    why: 'an empty body — a video id asked of the image resource type 404s with no bytes',
    body: ''
  }
]

// --- the two directions ---------------------------------------------------------------

let accepted = 0
for (const f of ACCEPT_FIXTURES) {
  let got
  try {
    got = ratioFromGetInfo(f.body, f.why)
  } catch (err) {
    fail(`accept: ${f.why}\n        refused: ${err.message}`)
    continue
  }
  if (got === f.want) {
    accepted++
    if (REPORT) console.log(`  ok   ${f.why} -> ${got}`)
  } else {
    fail(`accept: ${f.why}\n        want: ${f.want}\n        got:  ${got}`)
  }
}
console.log(`getinfo: ${accepted}/${ACCEPT_FIXTURES.length} accept fixtures parse`)

let rejected = 0
for (const f of REJECT_FIXTURES) {
  try {
    const got = ratioFromGetInfo(f.body, f.why)
    fail(`reject: ${f.why}\n        returned ${JSON.stringify(got)} instead of refusing`)
    if (REPORT) console.log(`  MISS ${f.why}`)
  } catch {
    rejected++
    if (REPORT) console.log(`  ok   refused: ${f.why}`)
  }
}
console.log(`getinfo: ${rejected}/${REJECT_FIXTURES.length} reject fixtures refused`)

if (problems.length) {
  console.error(`\nFAILED (${problems.length}):`)
  for (const p of problems) console.error('  ' + p)
  process.exit(1)
}
console.log('getinfo: clean')
