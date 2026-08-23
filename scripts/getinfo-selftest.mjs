#!/usr/bin/env node
/**
 * getinfo-selftest.mjs — the proof behind `ratioFromGetInfo()`.
 *
 *     node scripts/getinfo-selftest.mjs             run every fixture
 *     node scripts/getinfo-selftest.mjs --report    name each fixture as it passes
 *
 * This proof exists for one thing the build gate CANNOT see: a ratio that is valid but
 * wrong. A12 checks that every emitted `aspect-ratio` parses as two positive integers and
 * that the boxes are all there — a parser reading `output` instead of `input` satisfies
 * both while reserving the wrong box on every transformed asset. Only a recorded payload
 * where the two blocks DISAGREE can tell the two parsers apart, which is what the two
 * transformed accept fixtures below are for. The untransformed responses cannot: their
 * `input` and `output` are identical, so they pass either way.
 *
 * Every fixture is a body recorded verbatim from `res.cloudinary.com`, so the proof runs
 * with no network and no content checkout.
 *
 * THE GATES RUN IN BOTH DIRECTIONS, following the converter proof: accept fixtures must
 * pass, and reject fixtures must EACH throw. A parser that has quietly stopped refusing
 * is as bad as one that misreads, and only the reverse direction catches it.
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

/** Bodies the parser must read, and the ratio each one means. */
const ACCEPT_FIXTURES = [
  {
    why: 'image resource type, untransformed',
    body: '{"input":{"width":3840,"height":3112,"bytes":1979016},"output":{"format":"png","bytes":2048804,"width":3840,"height":3112}}',
    want: '3840/3112'
  },
  {
    // The fixture the whole proof turns on. `output` is 400x324 here; anything that
    // returns it is reading the transformation, not the asset.
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

/**
 * Bodies the parser must REFUSE. The first three are the real traps; the fourth is what
 * Cloudinary actually returns when a video id is asked of the image resource type, and it
 * is here because a 404 with an empty body is the one failure that looks like nothing at
 * all.
 */
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
