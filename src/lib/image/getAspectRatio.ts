import type { CldOptions } from '@cld-apis/types'
import { buildImageUrl, buildVideoUrl, setConfig } from 'cloudinary-build-url'
import { ratioCache } from './cache'

setConfig({ cloudName: 'yucheng' })

export async function getAspectRatio(id: string, isVideo = false) {
  let isRemote: boolean

  try {
    new URL(id)
    isRemote = true
  } catch (_) {
    isRemote = false
  }

  const options: CldOptions = {
    transformations: {
      resize: { width: 100 },
      quality: 'auto',
      format: 'webp',
      flags: 'getinfo',
    },
    cloud: {
      storageType: isRemote ? 'fetch' : 'upload',
    },
  }
  const imageURL = isVideo ? buildVideoUrl(id, options) : buildImageUrl(id, options)

  return await getAspectRatioForImage(imageURL)
}

export async function getAspectRatioForImage(imageUrl: string): Promise<string> {
  const aspectRatio = ratioCache.get(imageUrl)
  if (aspectRatio) return aspectRatio

  try {
    console.log(`Getting aspect ratio for image ${imageUrl}...`)
    const res = await fetch(imageUrl)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = (await res.json()) as any

    const { width, height } = result.output

    ratioCache.set(imageUrl, `${height}/${width}`)

    return `${height}/${width}`
  } catch (e) {
    console.error(`Error while getting aspect ratio for ${imageUrl}: ${e}`)
  }
}
