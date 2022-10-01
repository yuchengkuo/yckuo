import { buildImageUrl, setConfig } from 'cloudinary-build-url'
import { blurDataMap } from './map'

setConfig({ cloudName: 'yucheng' })

export async function getBlurDataUrl(id: string) {
  let isRemote: boolean

  try {
    new URL(id)
    isRemote = true
  } catch (_) {
    isRemote = false
  }
  const imageURL = buildImageUrl(id, {
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
  })

  return await getDataUrlForImage(imageURL)
}

async function getDataUrlForImage(imageUrl: string) {
  const blurDataUrl = blurDataMap.get(imageUrl)
  if (blurDataUrl) return blurDataUrl

  try {
    console.log(`Getting blur data url for image ${imageUrl}...`)
    const res = await fetch(imageUrl)
    const arrayBuffer = await res.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')
    const mime = res.headers.get('Content-Type') ?? 'image/webp'
    const dataUrl = `data:${mime};base64,${base64}`

    blurDataMap.set(imageUrl, dataUrl)
    return dataUrl
  } catch (e) {
    console.error(`Error while getting blur data url for ${imageUrl}: ${e}`)
  }
}
