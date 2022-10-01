import { buildImageUrl, setConfig } from 'cloudinary-build-url'
import { ratioMap } from './map'

setConfig({ cloudName: 'yucheng' })

export async function getAspectRatio(id: string) {
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
      flags: 'getinfo',
    },
    cloud: {
      storageType: isRemote ? 'fetch' : 'upload',
    },
  })

  return await getAspectRatioForImage(imageURL)
}

export async function getAspectRatioForImage(imageUrl: string): Promise<string> {
  const aspectRatio = ratioMap.get(imageUrl)
  if (aspectRatio) return aspectRatio

  try {
    console.log(`Getting aspect ratio for image ${imageUrl}...`)
    const res = await fetch(imageUrl)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = (await res.json()) as any

    const { width, height } = result.output

    ratioMap.set(imageUrl, `${height}/${width}`)

    return `${height}/${width}`
  } catch (e) {
    console.error(`Error while getting aspect ratio for ${imageUrl}: ${e}`)
  }
}
