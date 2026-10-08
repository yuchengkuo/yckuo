/*
 * Generated at build, not shipped from `public/`, so the cache name is a build constant. A
 * worker script re-runs on every worker startup (idle workers stop after ~30s), so a name
 * computed there — `Date.now()` — orphans the precache on the first restart. The name
 * hashes the precached bytes; a new name is what makes `activate` drop the old cache.
 *
 * `ASSETS` entries are matched against the percent-encoded `URL.pathname`: bracketed
 * names are written encoded, as their preloads in `Base.astro` are, or never match.
 */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { APIRoute } from 'astro'

const ASSETS = [
  '/fonts/brockmann-regular.woff2',
  '/fonts/GeistMono%5Bwght%5D.woff2',
  '/fonts/GeistMono-Italic%5Bwght%5D.woff2',
  '/fonts/Newsreader-Italic-Variable.woff2',
  '/fonts/Newsreader-Variable.woff2',
  '/og/default.png',
  '/favicons/favicon.svg',
  '/favicons/favicon.ico'
]

/* `process.cwd()`: the build runs this file from a bundle elsewhere, so `import.meta.url`
   is wrong. A missing asset fails the build here rather than the install. */
const hash = createHash('sha256')
for (const asset of ASSETS) {
  hash.update(readFileSync(join(process.cwd(), 'public', decodeURIComponent(asset))))
}
const CACHE = `cache-${hash.digest('hex').slice(0, 12)}`

const worker = /* js */ `
const CACHE = ${JSON.stringify(CACHE)}

const ASSETS = ${JSON.stringify(ASSETS)}

self.addEventListener('install', (event) => {
  async function addFilesToCache() {
    const cache = await caches.open(CACHE)
    const results = await Promise.allSettled(ASSETS.map((asset) => cache.add(asset)))

    results.forEach((result, i) => {
      if (result.status === 'rejected') {
        console.warn('Failed to cache:', ASSETS[i], result.reason)
      }
    })
  }

  event.waitUntil(addFilesToCache())
})

self.addEventListener('activate', (event) => {
  async function deleteOldCaches() {
    for (const key of await caches.keys()) {
      if (key !== CACHE) await caches.delete(key)
    }
  }

  event.waitUntil(deleteOldCaches())
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  async function respond() {
    const url = new URL(event.request.url)
    const cache = await caches.open(CACHE)

    if (url.origin === location.origin && ASSETS.includes(url.pathname)) {
      const response = await cache.match(url.pathname)

      if (response) {
        return response
      }
    }

    try {
      const response = await fetch(event.request)

      // if we're offline, fetch can return a value that is not a Response
      // instead of throwing - and we can't pass this non-Response to respondWith
      if (!(response instanceof Response)) {
        throw new Error('invalid response from fetch')
      }

      if (response.status === 200) {
        cache.put(event.request, response.clone())
      }

      return response
    } catch (err) {
      const response = await cache.match(event.request)

      if (response) {
        return response
      }

      throw err
    }
  }

  event.respondWith(respond())
})
`

export const GET: APIRoute = () =>
  new Response(worker, { headers: { 'Content-Type': 'text/javascript' } })
