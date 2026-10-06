import { buildImageUrl, buildVideoUrl, setConfig } from 'cloudinary-build-url'

import type { TransformerOption, TransformerVideoOption } from '@cld-apis/types'

setConfig({ cloudName: 'yucheng' })

/* Lives here rather than in `Image.svelte`: `mediaurl-selftest.mjs` must walk the shipped
   widths, and plain Node cannot import a `.svelte` file. */
export const DEFAULT_WIDTHS = [400, 840, 1100, 1650, 2100]

export function getImgProps({
  id,
  widths,
  transformations
}: {
  id: string
  widths: Array<number>
  transformations?: TransformerOption
}) {
  const averageSize = Math.ceil(widths.reduce((a, s) => a + s) / widths.length)
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

  /*
   * No `dpr`. The `srcset`/`sizes` pair already resolves device pixel ratio, from
   * information the browser has and the server does not; `dpr_auto` additionally needs the
   * `Sec-CH-DPR` client hint this site never opts into. Running both is either inert or a
   * fetch of four times the pixels asked for, and splits the Cloudinary cache either way.
   * `mediaurl-selftest.mjs` pins its absence.
   *
   * `quality` and `format` are redundant — `cloudinary-build-url` defaults both to `auto` —
   * and written out anyway, because that default is the library's to change.
   */
  const at = (width: number) =>
    buildImageUrl(publicId, {
      transformations: {
        quality: 'auto',
        format: 'auto',
        ...transformations,
        resize: { width, ...transformations?.resize }
      },
      cloud: { storageType }
    })

  return {
    src: at(averageSize),
    srcset: widths.map((width) => `${at(width)} ${width}w`).join(', ')
  }
}

export function getAWebpProps({
  id,
  width,
  transformations
}: {
  id: string
  width: number
  transformations?: TransformerVideoOption
}) {
  return {
    src: buildVideoUrl(id, {
      transformations: {
        quality: 'auto',
        format: 'webp',
        resize: {
          type: 'scale',
          width
        },
        // The flag type has no dot-joined form, which Cloudinary accepts.
        flags: 'animated.awebp' as 'awebp',
        effect: {
          name: 'loop',
          ...transformations?.effect
        }
      },
      cloud: {
        resourceType: 'video',
        storageType: 'upload'
      }
    })
  }
}
