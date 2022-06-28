import type { TransformerOption, TransformerVideoOption } from '@cld-apis/types'
import { buildImageUrl, setConfig } from 'cloudinary-build-url'

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

  return {
    src: buildImageUrl(id, {
      transformations: {
        quality: 'auto',
        format: 'auto',
        ...transformations,
        resize: { width: averageSize, ...transformations?.resize },
      },
    }),
    srcset: widths
      .map((width) =>
        [
          buildImageUrl(id, {
            transformations: {
              quality: 'auto',
              format: 'auto',
              ...transformations,
              resize: { width: width, ...transformations?.resize },
            },
          }),
          `${width}w`,
        ].join(' ')
      )
      .join(', '),
  }
}
