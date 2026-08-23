/*
 * The one ratio lookup. Body media and frontmatter media resolve through it identically —
 * they differ in where the id comes from and in nothing else, and two resolution paths of
 * differing strength is the shape this whole mechanism exists to remove.
 *
 * The manifest is a STATIC IMPORT, not a filesystem read, and it is imported here rather
 * than anywhere upstream. Neither `markdoc.config.mjs` (which `port-guard.mjs` imports
 * directly, so a new failure surface there is a new way for the gate itself to die) nor
 * the collection schemas (where a throw on a missing ratio would be a schema demanding a
 * content edit — the one thing `content.config.ts` rules out) may learn about ratios.
 *
 * The file lives inside the private content submodule, so a clone without content has
 * neither the images nor their dimensions and cannot reach this code at all.
 */
import ratios from '../../../content/aspect-ratios.json'

const RATIOS: Record<string, string> = ratios

/**
 * The CSS ratio for a Cloudinary id, e.g. `'3840/3112'`.
 *
 * THROWS on anything it cannot resolve, and that is the feature. There is no default
 * ratio: a default reserves the wrong box, still shifts the page, and looks deliberate —
 * strictly worse than a build that stops and names the id. `pnpm ratios` records a
 * missing one; `pnpm dev` does it unprompted.
 */
export function aspectRatio(id: string | undefined): string {
  if (!id)
    throw new Error(
      'a media box was rendered with no Cloudinary id, so its ratio cannot be resolved. ' +
        'A remote `src` has no recordable dimensions; there are none in the corpus.'
    )

  const ratio = RATIOS[id]
  if (!ratio)
    throw new Error(
      `no recorded aspect ratio for '${id}'. Run \`pnpm ratios\` (or \`pnpm dev\`) to fetch it ` +
        `from Cloudinary and commit the manifest alongside the content edit. ` +
        `A video also needs its \`image_isvideo=true\` annotation before it can be fetched at all.`
    )
  return ratio
}
