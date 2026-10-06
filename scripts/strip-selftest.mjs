#!/usr/bin/env node
/**
 * strip-selftest.mjs — the proof behind `strip()`.
 *
 *     node scripts/strip-selftest.mjs             run every fixture
 *
 * A strip that quietly drops, repeats or reorders an item still renders a plausible row of
 * images, and A12 counts from the same function, so neither the page nor the gate notices.
 */
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const { strip } = await import(
  pathToFileURL(path.join(import.meta.dirname, '..', 'src/lib/media/strip.ts')).href
)

const problems = []
const fail = (msg) => problems.push(msg)

const show = (items) => items.map((m) => (m.isVideo ? `${m.id}(v)` : m.id)).join(', ')

function expect(name, body, thumbnail, want) {
  const got = show(strip(body, thumbnail))
  if (got !== want) fail(`${name}: got [${got}], expected [${want}]`)
}

const body = [
  'Context paragraph.',
  '',
  '![First](/work/a "caption") {% .span-6 %}',
  '',
  '{% grid %}',
  '',
  '![Second](/work/b)',
  '',
  '![A clip](/work/c) {% image_isvideo=true %}',
  '',
  '{% /grid %}',
  '',
  '```md',
  '![Inside a fence](/work/fenced)',
  '```',
  '',
  '![Remote](https://example.com/x.png)',
  '',
  '![Again](/work/a)',
  '',
  '![[nested] alt](/work/d)'
].join('\n')

expect('thumbnail leads, body follows in order', body, 'work/t', 'work/t, work/a, work/b, work/c(v), work/d')
expect('no thumbnail', body, undefined, 'work/a, work/b, work/c(v), work/d')
expect('thumbnail repeated in the body appears once, first', body, 'work/b', 'work/b, work/a, work/c(v), work/d')
expect('thumbnail only', 'Prose, no media.', 'work/t', 'work/t')
expect('nothing at all', '', undefined, '')

// Reject direction: without the dedupe, the fixture must produce a repeat.
const raw = strip(body.replace('/work/a)', '/work/z)'), undefined)
if (raw.length !== 5) fail(`fixture no longer exercises the dedupe: ${show(raw)}`)

if (problems.length) {
  console.error(`\nFAILED (${problems.length}):`)
  for (const p of problems) console.error('  ' + p)
  process.exit(1)
}
console.log('gates: clean')
