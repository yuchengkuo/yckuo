#!/usr/bin/env node
/**
 * order-selftest.mjs — the proof behind `featuredFirst()`.
 *
 *     node scripts/order-selftest.mjs             run every fixture
 *
 * `featuredFirst()` is what `[slug].astro`'s `getStaticPaths()` sorts through to build the
 * "Next" link, and what `index.astro` sorts projects through for the homepage. Both must
 * walk the SAME order — featured entries first, then the rest, each half keeping its
 * incoming order — or a work's "Next" link stops matching what the homepage shows after it
 * the moment a featured and a non-featured entry interleave by date.
 *
 * `getWorks()` alone returns one list merged by `published:desc` across both groups, which
 * is the bug this proof pins down: a featured entry's next-door neighbour in that merged
 * list can be a non-featured entry that sits further down the homepage, several rows past
 * where the featured block ends. Fixture below reproduces that exact shape (two featured
 * entries with a non-featured entry dated between them) with no content checkout.
 *
 * Runs with no network, no astro:content — `featuredFirst()` lives in `src/lib/util.ts`
 * precisely so it is importable with plain Node's native TypeScript support.
 */
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const { featuredFirst } = await import(
  pathToFileURL(path.join(import.meta.dirname, '..', 'src/lib/util.ts')).href
)

const problems = []
const fail = (msg) => problems.push(msg)

const entry = (id, featured) => ({ id, data: { featured } })

// Mirrors the real corpus shape that produced the bug: featured and non-featured entries
// interleaved by `published:desc`, i.e. `getWorks()`'s actual return order.
const dateMerged = [
  entry('design-system', true),
  entry('website-builder', true),
  entry('payments', true),
  entry('creator-platform', true),
  entry('custom-websites', false), // sits between two featured entries by date
  entry('client-onboarding', false),
  entry('nccu-donation-website', true),
  entry('checkout-revamp', true),
  entry('homepage', false),
  entry('attendee-checkin', false)
]

const ordered = featuredFirst(dateMerged)

const expected = [
  'design-system',
  'website-builder',
  'payments',
  'creator-platform',
  'nccu-donation-website',
  'checkout-revamp',
  'custom-websites',
  'client-onboarding',
  'homepage',
  'attendee-checkin'
]

if (ordered.map((e) => e.id).join(',') !== expected.join(','))
  fail(`featured-first order wrong: got ${ordered.map((e) => e.id).join(' -> ')}`)

// The regression this proof exists for: with the merged (unordered) input, walking
// `next = list[index + 1]` from a featured entry must land on the NEXT FEATURED entry,
// never on a non-featured one that only appears earlier because of a date tie-break.
const featuredIds = ordered.filter((e) => e.data.featured).map((e) => e.id)
ordered.forEach((entry, i) => {
  if (!entry.data.featured) return
  const next = ordered[i + 1 === ordered.length ? 0 : i + 1]
  const posInFeatured = featuredIds.indexOf(entry.id)
  const expectedNext = featuredIds[(posInFeatured + 1) % featuredIds.length]
  // A featured entry's next is only allowed to be non-featured once every featured
  // entry has been walked (i.e. this is the last featured entry, handing off into the
  // additional block) — never mid-sequence.
  if (posInFeatured < featuredIds.length - 1 && next.id !== expectedNext)
    fail(`${entry.id}: next is "${next.id}", expected featured neighbour "${expectedNext}"`)
})

// Reject direction: the OLD bug (walking `dateMerged` directly, unordered) must actually
// fail this same check — otherwise the check above is too weak to catch the regression.
let caughtOldBug = false
dateMerged.forEach((entry, i) => {
  if (!entry.data.featured) return
  const next = dateMerged[i + 1 === dateMerged.length ? 0 : i + 1]
  if (!next.data.featured) caughtOldBug = true
})
if (!caughtOldBug) fail('fixture no longer reproduces the pre-fix bug on raw getWorks() order')

if (problems.length) {
  console.error(`\nFAILED (${problems.length}):`)
  for (const p of problems) console.error('  ' + p)
  process.exit(1)
}
console.log('gates: clean')
