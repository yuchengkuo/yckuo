/*
 * Imported here and nowhere upstream. `markdoc.config.mjs` is imported by `port-guard.mjs`,
 * so a throw there kills the gate itself; a throw in a collection schema would be a schema
 * demanding a content edit, which `content.config.ts` rules out.
 */
import ratios from '../../../content/aspect-ratios.json'

const RATIOS: Record<string, string> = ratios

/**
 * Returns a CSS ratio, e.g. `'3840/3112'`. Throws on a missing id or one the manifest lacks
 * — there is no default, per `docs/adr/0001-committed-ratio-manifest.md`.
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
