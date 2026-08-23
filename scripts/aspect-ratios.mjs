#!/usr/bin/env node
/**
 * aspect-ratios.mjs — the ratio manifest and its generator.
 *
 *     pnpm ratios          fetch every id the manifest lacks, write it, report
 *     pnpm ratios --dry    say what it would fetch, touch nothing
 *
 * Every media box on the site is sized from `aspect-ratios.json`, a committed file at the
 * root of the private content submodule. The ratio is a **discovered fact about the
 * asset**, never an authored decision: nobody types one, and no content file changes when
 * one is recorded.
 *
 * GENERATION IS LOCAL-AND-COMMITTED; CI ONLY READS. The dev hook below is gated on the
 * `dev` command, so a production build makes no network call and writes nothing. That is
 * not a preference — Vercel's build filesystem is ephemeral, so a manifest generated
 * there could never persist back, and a build that fetches gets to fail because
 * Cloudinary is briefly unreachable. `docs/adr/0001-committed-ratio-manifest.md` records
 * the reasoning.
 *
 * Steady state is zero network calls: the generator diffs the corpus against the manifest
 * and fetches only what is missing, so adding one image costs exactly one request.
 */
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { ROOT, contentRoot, mediaSites } from './corpus.mjs'
import { getInfoUrl, ratioFromGetInfo } from './getinfo.mjs'

/** Named for what it holds. It sits beside `navigation.yml`, inside the submodule. */
export const MANIFEST_FILE = 'aspect-ratios.json'

export function manifestPath() {
  return path.join(contentRoot(), MANIFEST_FILE)
}

export function readManifest() {
  const file = manifestPath()
  if (!fs.existsSync(file)) return {}
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

/**
 * Sorted, one id per line, trailing newline. Sorting is what makes recording a new asset
 * an INSERTION rather than a reflow — a hundred-line diff for one added image is a diff
 * nobody reads.
 */
function writeManifest(ratios) {
  const sorted = Object.fromEntries(
    Object.keys(ratios)
      .sort()
      .map((k) => [k, ratios[k]])
  )
  fs.writeFileSync(manifestPath(), JSON.stringify(sorted, null, 2) + '\n')
}

/**
 * Every id the corpus references, mapped to its resource type.
 *
 * Cloudinary namespaces ids by resource type, so an image and a video could in principle
 * share one. There are zero collisions today, and this THROWS if one ever appears rather
 * than pre-building a keying scheme for a case that does not exist — the flat map is
 * correct until it is loudly not.
 */
export function corpusIds() {
  const byId = new Map()
  for (const site of mediaSites()) {
    const seen = byId.get(site.id)
    if (!seen) {
      byId.set(site.id, { isVideo: site.isVideo, where: [describe(site)] })
      continue
    }
    if (seen.isVideo !== site.isVideo)
      throw new Error(
        `'${site.id}' is referenced as both an image and a video (${seen.where[0]}, ${describe(site)}). ` +
          `Cloudinary namespaces ids by resource type, so these are two different assets sharing one manifest key. ` +
          `The manifest is flat because nothing had ever collided; this is the case it was left open for.`
      )
    seen.where.push(describe(site))
  }
  return byId
}

const describe = (site) =>
  `${path.relative(ROOT, site.file)}${site.line ? `:${site.line}` : ` (${site.from})`}`

/**
 * Fetch and record every id the manifest lacks. Returns a report; never throws for a
 * single unreadable asset — that id simply stays unrecorded, and the build says so by
 * name when something tries to render it.
 */
export async function generateRatios({
  log = consoleLog,
  dry = false,
  fetch = globalThis.fetch
} = {}) {
  const ids = corpusIds()
  if (ids.size === 0) return { skipped: 'no content — run `git submodule update --init`' }

  const ratios = readManifest()
  const missing = [...ids.keys()].filter((id) => !(id in ratios))
  const unreferenced = Object.keys(ratios).filter((id) => !ids.has(id))

  const failures = []
  for (const id of missing) {
    const url = getInfoUrl(id, ids.get(id).isVideo)
    if (dry) {
      log.info(`  would fetch ${id} <- ${url}`)
      continue
    }
    try {
      const response = await fetch(url)
      ratios[id] = ratioFromGetInfo(await response.text(), id)
      log.info(`  ${id} ${ratios[id]}`)
    } catch (err) {
      failures.push(`${id}: ${err.message}`)
    }
  }

  /* No write when nothing was added: regenerating an up-to-date manifest must produce no
     diff at all, not an identical file with a new mtime. */
  if (!dry && missing.length > failures.length) writeManifest(ratios)

  return {
    total: ids.size,
    recorded: Object.keys(ratios).length,
    added: dry ? 0 : missing.length - failures.length,
    missing: missing.length,
    unreferenced: unreferenced.length,
    failures
  }
}

/**
 * The dev-only hook. It lives here rather than inline in `astro.config.mjs` because that
 * config already carries an integration-ordering hazard and should not grow a second
 * concern.
 */
export function aspectRatios() {
  return {
    name: 'aspect-ratios',
    hooks: {
      'astro:config:setup': async ({ command, logger }) => {
        if (command !== 'dev') return
        const report = await generateRatios({ log: logger })
        if (report.skipped) return
        if (report.added) logger.info(`recorded ${report.added} new aspect ratio(s)`)
        for (const f of report.failures) logger.error(f)
      }
    }
  }
}

const consoleLog = { info: console.log, warn: console.warn, error: console.error }

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const dry = process.argv.includes('--dry')
  const report = await generateRatios({ dry })
  if (report.skipped) {
    console.log(`aspect-ratios: skipped — ${report.skipped}`)
    process.exit(0)
  }
  console.log(
    `aspect-ratios: ${report.recorded} recorded for ${report.total} corpus id(s)` +
      `, ${report.added} added` +
      (report.unreferenced ? `, ${report.unreferenced} no longer referenced` : '')
  )
  for (const f of report.failures) console.error(`  refused ${f}`)
  process.exit(report.failures.length ? 1 : 0)
}
