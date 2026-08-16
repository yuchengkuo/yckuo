import { buildImageUrl, buildVideoUrl, setConfig } from 'cloudinary-build-url'

import type { TransformerOption, TransformerVideoOption } from '@cld-apis/types'

setConfig({ cloudName: 'yucheng' })

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

  return {
    src: buildImageUrl(isRemote ? url.toString() : id, {
      transformations: {
        quality: 'auto',
        format: 'auto',
        dpr: 'auto',
        ...transformations,
        resize: { width: averageSize, ...transformations?.resize }
      },
      cloud: {
        storageType: isRemote ? 'fetch' : 'upload'
      }
    }),
    srcset: widths
      .map((width) =>
        [
          buildImageUrl(isRemote ? url.toString() : id, {
            transformations: {
              quality: 'auto',
              format: 'auto',
              dpr: 'auto',
              ...transformations,
              resize: { width: width, ...transformations?.resize }
            },
            cloud: {
              storageType: isRemote ? 'fetch' : 'upload'
            }
          }),
          `${width}w`
        ].join(' ')
      )
      .join(', ')
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
        // bug in `cloudinary-build-url`
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
