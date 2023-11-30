import {
  buildImageUrl,
  buildVideoUrl,
  setConfig,
} from 'npm:cloudinary-build-url'
import { blurDataCache } from './cache.ts'

import type { CldOptions } from 'npm:@cld-apis/types'

setConfig({ cloudName: 'yucheng' })

export async function getBlurDataUrl(id: string, isVideo = false, cld = true) {
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
      effect: {
        name: 'blur',
        value: '1000',
      },
    },
    cloud: {
      storageType: isRemote ? 'fetch' : 'upload',
    },
  }
  const imageURL = isVideo
    ? buildVideoUrl(id, options)
    : buildImageUrl(id, options)

  return await getDataUrlForImage(cld ? imageURL : id)
}

async function getDataUrlForImage(imageUrl: string) {
  const blurDataUrl = blurDataCache.get(imageUrl)
  if (blurDataUrl) return blurDataUrl

  try {
    console.log(`Getting blur data url for image ${imageUrl}...`)
    const res = await fetch(imageUrl)
    const arrayBuffer = await res.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')
    const mime = res.headers.get('Content-Type') ?? 'image/webp'
    const dataUrl = `data:${mime};base64,${base64}`

    blurDataCache.set(imageUrl, dataUrl)
    return dataUrl
  } catch (e) {
    console.error(`Error while getting blur data url for ${imageUrl}: ${e}`)
  }
}
