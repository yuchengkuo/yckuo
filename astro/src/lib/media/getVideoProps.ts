import type { TransformerOption } from '@cld-apis/types'
import { buildVideoUrl, setConfig } from 'cloudinary-build-url'

setConfig({ cloudName: 'yucheng' })

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

  return {
    src: buildVideoUrl(isRemote ? url.toString() : id, {
      transformations: { quality: 'auto', format: 'auto', ...transformations },
      cloud: {
        storageType: isRemote ? 'fetch' : 'upload'
      }
    })
  }
}
