#!/usr/bin/env node
/**
 * order-selftest.mjs — the proof behind `featuredFirst()`.
 *
 *     node scripts/order-selftest.mjs             run every fixture
 *
 * `work/[slug].astro`'s "Next" link and the homepage must walk the same order. In
 * `getWorks()`'s date order, a featured entry's neighbour can be a non-featured one that
 * the homepage shows after the whole featured block.
 *
 * `featuredFirst()` stays in `src/lib/util.ts`, free of `astro:content`, so plain Node can
 * import it.
 */
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const { featuredFirst } = await import(
  pathToFileURL(path.join(import.meta.dirname, '..', 'src/lib/util.ts')).href
)

const problems = []
const fail = (msg) => problems.push(msg)

const entry = (id, featured) => ({ id, data: { featured } })

// Featured and non-featured interleaved by date, as `getWorks()` returns them.
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

// Walking `list[i + 1]` from a featured entry must land on the next featured entry.
const featuredIds = ordered.filter((e) => e.data.featured).map((e) => e.id)
ordered.forEach((entry, i) => {
  if (!entry.data.featured) return
  const next = ordered[i + 1 === ordered.length ? 0 : i + 1]
  const posInFeatured = featuredIds.indexOf(entry.id)
  const expectedNext = featuredIds[(posInFeatured + 1) % featuredIds.length]
  if (posInFeatured < featuredIds.length - 1 && next.id !== expectedNext)
    fail(`${entry.id}: next is "${next.id}", expected featured neighbour "${expectedNext}"`)
})

// Reject direction: the raw date order must fail, or the check above proves nothing.
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
