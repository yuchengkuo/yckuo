/**
 * corpus.mjs — what the content corpus contains, read once.
 *
 * The collection globs are read out of `src/content.config.ts` rather than restated, so
 * every caller derives its expectation from whatever is DECLARED. That is what keeps the
 * build gate's corpus rungs revision-independent, and it is why a mistyped `base` shows
 * up as an empty result everywhere at once instead of in one place.
 *
 * One copy, imported by the gate and by the ratio generator. The fenced-code rule already
 * proved the alternative: two copies of a scan is how they came to disagree.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
/* `census()` there means image CALL SITES; `census()` in `port-guard.mjs` means recorded
   provenance. Renamed at the import so one file never carries both meanings. */
import { census as imageCallSites } from './slashify.mjs'

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CONTENT_CONFIG = path.join(ROOT, 'src/content.config.ts')

export function walk(dir) {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]))
}

/**
 * A single star does not cross a path separator; a double star matches zero or more
 * directories.
 *
 * That distinction is load-bearing rather than pedantic: it is what keeps
 * `docs/CONTEXT.md` out of the corpus. `pages` is `*.mdoc`, root-only, so a file one
 * directory down is matched by no collection glob and stays documentation. Reproducing
 * the semantics here means the callers keep deriving that result instead of restating it.
 */
export function globMatcher(pattern) {
  const source = pattern
    .split('/')
    .map((seg, i, all) => {
      if (seg === '**') return '(?:[^/]+/)*'
      const escaped = seg.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '[^/]*')
      return i === all.length - 1 ? escaped : `${escaped}/`
    })
    .join('')
  const rx = new RegExp(`^${source}$`)
  return (rel) => rx.test(rel.split(path.sep).join('/'))
}

/** The `{ pattern, base }` pairs `content.config.ts` declares. */
export function collectionGlobs() {
  const src = fs.readFileSync(CONTENT_CONFIG, 'utf8')
  const globs = [
    ...src.matchAll(/glob\(\{\s*pattern:\s*'([^']+)'\s*,\s*base:\s*'([^']+)'\s*\}\)/g)
  ].map(([, pattern, base]) => ({ pattern, base }))
  if (globs.length === 0)
    throw new Error(`no glob({pattern,base}) pairs found in ${CONTENT_CONFIG}`)
  return globs
}

/** Every `.mdoc` the declared collection globs actually resolve to. */
export function collectionFiles() {
  const seen = new Set()
  for (const { pattern, base } of collectionGlobs()) {
    if (!pattern.endsWith('.mdoc')) continue
    const dir = path.resolve(ROOT, base)
    if (!fs.existsSync(dir)) continue
    const matches = globMatcher(pattern)
    for (const abs of walk(dir)) if (matches(path.relative(dir, abs))) seen.add(abs)
  }
  return [...seen]
}

/**
 * The content root — the submodule itself. Anything living BESIDE the content (the ratio
 * manifest, `navigation.yml`) resolves from here rather than from a second hard-coded path
 * that could drift away from the one `content.config.ts` declares.
 *
 * That has one answer only while every collection shares one `base`, which is a property of
 * `content.config.ts` and not of this file — so it is CHECKED, not assumed. A single
 * divergent base would otherwise relocate the manifest silently.
 */
export function contentRoot() {
  const bases = [...new Set(collectionGlobs().map((g) => g.base))]
  if (bases.length !== 1)
    throw new Error(
      `content.config.ts declares ${bases.length} different collection bases (${bases.join(', ')}), ` +
        `so there is no single content root for the ratio manifest to sit beside.`
    )
  return path.resolve(ROOT, bases[0])
}

/** Frontmatter fields that name a Cloudinary id. Both are optional in their schema. */
const FRONTMATTER_MEDIA = ['thumbnail', 'cover']

/**
 * Every Cloudinary asset the corpus references, as
 * `{ id, isVideo, draft, from, file, line }`.
 *
 * `id` is normalised the way the render path normalises it: **the leading `/` is a marker,
 * not a path**, and the paragraph transform strips it before the id reaches Cloudinary.
 * The frontmatter fields are written WITHOUT one, which is why normalising here rather
 * than at each call site is what lets body media and frontmatter media share a manifest.
 *
 * `isVideo` comes from the `image_isvideo` annotation, which is the corpus's only record
 * of an asset's resource type — and the resource type decides which `fl_getinfo` URL
 * shape can answer at all.
 *
 * Body sites come through `census()`, the same scanner the converter proof is built on,
 * so an image inside a fenced code block is code here too.
 *
 * `draft` is carried rather than filtered: a draft entry renders in `astro dev` and not in
 * a build, so the ratio generator wants its ids and a rung counting BOXES IN `dist/` does
 * not. Callers decide, because the two answers are both correct.
 */
export function mediaSites() {
  const sites = []
  for (const file of collectionFiles()) {
    const raw = fs.readFileSync(file, 'utf8')
    const lines = raw.split('\n')
    const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw)?.[1] ?? ''
    const draft = /^draft:[ \t]*true[ \t]*$/m.test(frontmatter)

    for (const site of imageCallSites(raw)) {
      const src = site.src
      /* An absolute URL is somebody else's asset: no Cloudinary id, so nothing to key a
         manifest entry on and nothing `fl_getinfo` can answer. Skipping it keeps the
         generator from asking — it does NOT soften the outcome. `Img.astro` resolves a
         ratio for every box it renders and throws when it cannot, so the first absolute
         URL written into the corpus fails the build. None today. */
      if (/^[a-z][a-z0-9+.-]*:/i.test(src) || src === '') continue
      sites.push({
        id: src.replace(/^\//, ''),
        isVideo: /image_isvideo\s*=\s*true/.test(lines[site.line - 1] ?? ''),
        draft,
        from: 'body',
        file,
        line: site.line
      })
    }

    for (const field of FRONTMATTER_MEDIA) {
      const m = new RegExp(`^${field}:[ \\t]*(\\S+)[ \\t]*$`, 'm').exec(frontmatter)
      if (!m) continue
      sites.push({
        id: m[1].replace(/^['"]|['"]$/g, '').replace(/^\//, ''),
        isVideo: false,
        draft,
        from: field,
        file,
        line: 0
      })
    }
  }
  return sites
}
