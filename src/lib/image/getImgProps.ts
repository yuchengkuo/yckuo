import { buildImageUrl, setConfig } from 'cloudinary-build-url'

import type { TransformerOption, TransformerVideoOption } from '@cld-apis/types'

setConfig({ cloudName: 'yucheng' })

export function getImgProps({
  id,
  widths,
  transformations,
}: {
  id: string
  widths: Array<number>
  transformations?: TransformerOption | TransformerVideoOption
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
        ...transformations,
        resize: { width: averageSize, ...transformations?.resize },
      },
      cloud: {
        storageType: isRemote ? 'fetch' : 'upload',
      },
    }),
    srcset: widths
      .map((width) =>
        [
          buildImageUrl(isRemote ? url.toString() : id, {
            transformations: {
              quality: 'auto',
              format: 'auto',
              ...transformations,
              resize: { width: width, ...transformations?.resize },
            },
            cloud: {
              storageType: isRemote ? 'fetch' : 'upload',
            },
          }),
          `${width}w`,
        ].join(' ')
      )
      .join(', '),
  }
}
