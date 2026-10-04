import type { TransformerOption } from '@cld-apis/types'
import { buildVideoUrl, setConfig } from 'cloudinary-build-url'

setConfig({ cloudName: 'yucheng' })

/* Not derived from the layout — it mirrors the animated-WebP branch in `getImgProps.ts`. */
const WIDTH_CAP = 1200

export function getVideoProps({
  id,
  transformations
}: {
  id: string
  transformations: TransformerOption
}) {
  let isRemote: boolean
  let url: URL | string

  try {
    url = new URL(id)
    isRemote = true
  } catch (_) {
    url = ''
    isRemote = false
  }

  const publicId = isRemote ? url.toString() : id
  const storageType = isRemote ? ('fetch' as const) : ('upload' as const)

  /* Portrait sources are narrower than the cap; a bare width would upscale them. */
  const resize = { type: 'limit' as const, width: WIDTH_CAP, ...transformations?.resize }

  return {
    src: buildVideoUrl(publicId, {
      transformations: { quality: 'auto', format: 'auto', ...transformations, resize },
      cloud: { storageType }
    }),
    /*
     * String construction, never a probe: a production build makes no network call
     * (`docs/adr/0001-committed-ratio-manifest.md`). `mediaurl-selftest.mjs` pins the URL.
     *
     * - `start` must be the string `'0'` — the builder drops a falsy start, emitting no `so_`.
     * - `f_jpg` is what delivers an image. The resource type stays `video`, since the still
     *   is cut from the video, and `f_auto` there transcodes a video.
     * - The caller's `transformations` reach `src` but not this, which takes only `resize`.
     *   An inconsistency, not a decision; no call site passes any, so it has never bitten.
     * - Same cap as the video, so the poster is never visibly softer than what replaces it.
     */
    poster: buildVideoUrl(publicId, {
      transformations: { quality: 'auto', format: 'jpg', offset: { start: '0' }, resize },
      cloud: { storageType }
    })
  }
}
