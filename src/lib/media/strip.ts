/*
 * A work's strip is derived from its own media, never authored — see CONTEXT.md's *Strip*.
 * `corpus.mjs` builds A12's expectation from these same functions, so the homepage and the
 * gate cannot disagree about what a case study contains.
 *
 * Free of `astro:content` so plain Node can import it: the gate and `strip-selftest.mjs` do.
 */
import { census } from '../../../scripts/slashify.mjs'

export type Media = { id: string; isVideo: boolean }

const ABSOLUTE_URL = /^[a-z][a-z0-9+.-]*:/i

/** Every media call site in `text`, in document order. `line` is 1-based within `text`. */
export function bodyMedia(text: string): Array<Media & { line: number }> {
  const lines = text.split('\n')
  return (
    census(text)
      /* An absolute URL has no Cloudinary id to record. Skipping it softens nothing:
         `aspectRatio()` still throws when it renders. */
      .filter(({ src }: { src: string }) => src !== '' && !ABSOLUTE_URL.test(src))
      .map(({ src, line }: { src: string; line: number }) => ({
        /* The leading `/` is a marker for Astro, not part of the id. */
        id: src.replace(/^\//, ''),
        /* The annotation on the same line is the corpus's only record of resource type. */
        isVideo: /image_isvideo\s*=\s*true/.test(lines[line - 1] ?? ''),
        line
      }))
  )
}

/** The thumbnail first, then the body in the order written, each id once where it first appears. */
export function strip(body: string, thumbnail?: string): Media[] {
  const seen = new Set<string>()
  const items: Media[] = []
  const all = [...(thumbnail ? [{ id: thumbnail, isVideo: false }] : []), ...bodyMedia(body)]
  for (const { id, isVideo } of all) {
    if (seen.has(id)) continue
    seen.add(id)
    items.push({ id, isVideo })
  }
  return items
}
