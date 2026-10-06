/**
 * The collection globs are read out of `src/content.config.ts` rather than restated, so
 * the gate's corpus rungs derive their expectation from whatever is declared.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { bodyMedia, strip } from '../src/lib/media/strip.ts'

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CONTENT_CONFIG = path.join(ROOT, 'src/content.config.ts')

export function walk(dir) {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]))
}

/* `*` must not cross a `/`: that is what keeps `docs/CONTEXT.md` out of root-only `pages`. */
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

/** Throws unless every collection shares one `base`; otherwise the manifest has no home. */
export function contentRoot() {
  const bases = [...new Set(collectionGlobs().map((g) => g.base))]
  if (bases.length !== 1)
    throw new Error(
      `content.config.ts declares ${bases.length} different collection bases (${bases.join(', ')}), ` +
        `so there is no single content root for the ratio manifest to sit beside.`
    )
  return path.resolve(ROOT, bases[0])
}

const FRONTMATTER_MEDIA = ['thumbnail', 'cover']

/**
 * Every Cloudinary asset the corpus references, as `{ id, isVideo, draft, from, file, line }`.
 *
 * `id` has its leading `/` stripped, as the render path does; frontmatter ids have none.
 * `isVideo` comes from `image_isvideo`, the corpus's only record of resource type.
 * `draft` is carried, not filtered: the ratio generator wants draft ids, a rung counting
 * boxes in `dist/` does not.
 */
export function mediaSites() {
  const sites = []
  for (const file of collectionFiles()) {
    const raw = fs.readFileSync(file, 'utf8')
    const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw)?.[1] ?? ''
    const draft = /^draft:[ \t]*true[ \t]*$/m.test(frontmatter)

    for (const { id, isVideo, line } of bodyMedia(raw))
      sites.push({ id, isVideo, draft, from: 'body', file, line })

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

/**
 * One site per strip item on the homepage: every non-draft work, through the same `strip()`
 * `WorkRow.astro` renders. Kept out of `mediaSites()` — these are second boxes for ids it
 * already lists, which the ratio generator has no use for.
 */
export function stripSites() {
  const src = fs.readFileSync(CONTENT_CONFIG, 'utf8')
  const m =
    /const works = defineCollection\(\{\s*loader:\s*glob\(\{\s*pattern:\s*'([^']+)'\s*,\s*base:\s*'([^']+)'/.exec(
      src
    )
  if (!m) throw new Error(`no glob({pattern,base}) for the works collection in ${CONTENT_CONFIG}`)
  const [, pattern, base] = m
  const dir = path.resolve(ROOT, base)
  const matches = globMatcher(pattern)

  const sites = []
  for (const file of walk(dir)) {
    if (!matches(path.relative(dir, file))) continue
    const raw = fs.readFileSync(file, 'utf8')
    const fm = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw)
    const frontmatter = fm?.[1] ?? ''
    if (/^draft:[ \t]*true[ \t]*$/m.test(frontmatter)) continue
    const thumbnail = /^thumbnail:[ \t]*(\S+)[ \t]*$/m
      .exec(frontmatter)?.[1]
      .replace(/^['"]|['"]$/g, '')
    const body = fm ? raw.slice(fm[0].length) : raw
    for (const { id, isVideo } of strip(body, thumbnail))
      sites.push({ id, isVideo, draft: false, from: 'strip', file, line: 0 })
  }
  return sites
}
