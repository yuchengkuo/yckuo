#!/usr/bin/env node
/**
 * mediaurl-selftest.mjs — the proof behind the media URL builders.
 *
 *     node scripts/mediaurl-selftest.mjs             run every fixture
 *     node scripts/mediaurl-selftest.mjs --report    name each fixture as it passes
 *
 * Every fault pinned here fails silently — re-add `dpr_auto` and the site looks identical
 * while overfetching, drop the video's `limit` crop and portrait sources upscale. Nothing
 * breaks a build, moves a layout, or shows a defect, so only a fixture can catch them.
 *
 * Accept fixtures pin the whole emitted string, so a transformation quietly *added* fails
 * as surely as one removed.
 *
 * Tripwires run the opposite direction: a `dpr_` the accept fixtures can never see is a
 * `dpr_` they do not really forbid. They also record the limit of a unit proof — a call
 * site passing its own transformations reintroduces every fault, and only a `dist/`-reading
 * rung in `port-guard.mjs` would reach that far.
 *
 * Fixture ids only, never the ratio manifest or the corpus, so this needs no network and no
 * content checkout. `getImgProps.ts` and `getVideoProps.ts` must stay free of `astro:*`
 * imports to remain importable here.
 */
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const MEDIA = path.join(import.meta.dirname, '..', 'src/lib/media')

const { getImgProps, DEFAULT_WIDTHS } = await import(
  pathToFileURL(path.join(MEDIA, 'getImgProps.ts')).href
)
const { getVideoProps } = await import(pathToFileURL(path.join(MEDIA, 'getVideoProps.ts')).href)

const argv = process.argv.slice(2)
const has = (f) => argv.includes(f)

if (has('--help') || has('-h')) {
  console.log(`mediaurl-selftest — the proof behind the media URL builders

  node scripts/mediaurl-selftest.mjs             run every fixture
  node scripts/mediaurl-selftest.mjs --report    name each fixture as it passes
  node scripts/mediaurl-selftest.mjs --help      this`)
  process.exit(0)
}

const REPORT = has('--report')

const problems = []
const fail = (msg) => problems.push(msg)

// --- fixtures -----------------------------------------------------------------------

const CDN = 'https://res.cloudinary.com/yucheng'
const UPLOAD_ID = 'work/a-case-study/panel'
const REMOTE_ID = 'https://example.com/a/photo.png'

/* Duplicates `DEFAULT_WIDTHS` on purpose: changing the candidate list should take two
   edits, not one. */
const ADVERTISED = [400, 840, 1100, 1650, 2100]

/* The ceiling of the mean candidate, spelled out rather than recomputed — an expectation
   derived from the code under test proves only that the code agrees with itself. */
const AVERAGED = 1218

const img = (id, transformations) => getImgProps({ id, widths: DEFAULT_WIDTHS, transformations })
const vid = (id, transformations = {}) => getVideoProps({ id, transformations })

const ACCEPT_FIXTURES = [
  {
    why: 'image src: automatic quality and format survive, device pixel ratio does not',
    got: img(UPLOAD_ID).src,
    want: `${CDN}/image/upload/w_${AVERAGED},q_auto,f_auto/${UPLOAD_ID}`
  },
  {
    why: 'image src on a remote id still routes through fetch storage',
    got: img(REMOTE_ID).src,
    want: `${CDN}/image/fetch/w_${AVERAGED},q_auto,f_auto/${REMOTE_ID}`
  },
  {
    why: 'video src caps width with a limit crop, so a narrower source is delivered as-is',
    got: vid(UPLOAD_ID).src,
    want: `${CDN}/video/upload/c_limit,w_1200,q_auto,f_auto/${UPLOAD_ID}`
  },
  {
    why: 'video src on a remote id still routes through fetch storage, cap intact',
    got: vid(REMOTE_ID).src,
    want: `${CDN}/video/fetch/c_limit,w_1200,q_auto,f_auto/${REMOTE_ID}`
  },
  {
    why: 'poster is a zero-offset still cut from the video resource, delivered as an image',
    got: vid(UPLOAD_ID).poster,
    want: `${CDN}/video/upload/c_limit,w_1200,so_0,q_auto,f_jpg/${UPLOAD_ID}`
  },
  {
    why: 'poster on a remote id still routes through fetch storage',
    got: vid(REMOTE_ID).poster,
    want: `${CDN}/video/fetch/c_limit,w_1200,so_0,q_auto,f_jpg/${REMOTE_ID}`
  }
]

let accepted = 0
for (const f of ACCEPT_FIXTURES) {
  if (f.got === f.want) {
    accepted++
    if (REPORT) console.log(`  ok   ${f.why}`)
  } else {
    fail(`accept: ${f.why}\n        want: ${f.want}\n        got:  ${f.got}`)
  }
}
console.log(`mediaurl: ${accepted}/${ACCEPT_FIXTURES.length} accept fixtures emit the exact url`)

// --- the opposite direction -------------------------------------------------------------

const TRIPWIRE_FIXTURES = [
  {
    why: 'a caller can put dpr back into the image src, and no builder stops it',
    got: img(UPLOAD_ID, { dpr: 'auto' }).src,
    carries: 'dpr_auto'
  },
  {
    why: 'a caller can put dpr back into every srcset entry too',
    got: img(UPLOAD_ID, { dpr: 'auto' }).srcset,
    carries: 'dpr_auto'
  },
  {
    why: 'a caller can replace the limit crop and upscale a portrait video',
    got: vid(UPLOAD_ID, { resize: { type: 'scale', width: 1920 } }).src,
    carries: 'c_scale,w_1920'
  }
]

let tripped = 0
for (const f of TRIPWIRE_FIXTURES) {
  if (f.got.includes(f.carries)) {
    tripped++
    if (REPORT) console.log(`  ok   ${f.why}`)
  } else {
    fail(
      `tripwire: ${f.why}\n        expected to carry: ${f.carries}\n        got:  ${f.got}\n` +
        '        A fault the fixtures cannot reproduce is one they are not really forbidding.'
    )
  }
}
console.log(`mediaurl: ${tripped}/${TRIPWIRE_FIXTURES.length} tripwires reproduce the fault`)

// --- the candidate list ---------------------------------------------------------------

/* The builder joins candidates with `, ` and transformations with a bare comma, so
   comma-space cannot cut a URL in half. */
const parse = (srcset) =>
  srcset.split(/,\s+/).map((entry) => {
    const [url, descriptor] = entry.trim().split(/\s+/)
    return { url, descriptor }
  })

if (
  DEFAULT_WIDTHS.length !== ADVERTISED.length ||
  DEFAULT_WIDTHS.some((w, i) => w !== ADVERTISED[i])
) {
  fail(
    `candidate list: the advertised widths changed\n        want: ${ADVERTISED.join(', ')}\n        got:  ${DEFAULT_WIDTHS.join(', ')}`
  )
}

const entries = parse(img(UPLOAD_ID).srcset)
if (entries.length !== ADVERTISED.length) {
  fail(`candidate list: srcset advertises ${entries.length} candidates, not ${ADVERTISED.length}`)
}

let paired = 0
for (const [i, { url, descriptor }] of entries.entries()) {
  const want = ADVERTISED[i]
  // A browser pairs these two; a mismatch makes it choose by one number and fetch another.
  const wantUrl = `${CDN}/image/upload/w_${want},q_auto,f_auto/${UPLOAD_ID}`

  if (descriptor === `${want}w` && url === wantUrl) {
    paired++
    if (REPORT) console.log(`  ok   candidate ${want}w matches its own transformation`)
  } else {
    fail(`candidate ${i}:\n        want: ${wantUrl} ${want}w\n        got:  ${url} ${descriptor}`)
  }
}
console.log(`mediaurl: ${paired}/${ADVERTISED.length} candidates match their own descriptor`)

// --- sweep ------------------------------------------------------------------------------

/* Catches a pairing that holds only at the shipped list length — a builder reusing the
   src's averaged width passes a single-candidate list and fails every other. */
const SWEEP = [
  { why: 'a single candidate, where an averaged width is indistinguishable', widths: [320] },
  { why: 'two candidates, where it is not', widths: [320, 640] },
  { why: 'an even-length list', widths: [100, 200, 400, 800] },
  { why: 'a list longer than the shipped one', widths: [1, 2, 3, 4, 5, 6, 7] },
  { why: 'the shipped list', widths: ADVERTISED }
]

let swept = 0
for (const { why, widths } of SWEEP) {
  const got = parse(getImgProps({ id: UPLOAD_ID, widths }).srcset)
  const ok =
    got.length === widths.length &&
    got.every(
      ({ url, descriptor }, i) =>
        descriptor === `${widths[i]}w` &&
        url === `${CDN}/image/upload/w_${widths[i]},q_auto,f_auto/${UPLOAD_ID}`
    )
  if (ok) {
    swept++
    if (REPORT) console.log(`  ok   sweep: ${why}`)
  } else {
    fail(`sweep: ${why} — [${widths.join(', ')}] did not round-trip its own widths`)
  }
}
console.log(`mediaurl: ${swept}/${SWEEP.length} sweep lists round-trip their own widths`)

if (problems.length) {
  console.error(`\nFAILED (${problems.length}):`)
  for (const p of problems) console.error('  ' + p)
  process.exit(1)
}
console.log('mediaurl: clean')
