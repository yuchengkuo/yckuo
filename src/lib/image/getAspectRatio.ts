import { buildImageUrl, setConfig } from 'cloudinary-build-url'

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
  try {
    const res = await fetch(imageUrl)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = (await res.json()) as any

    const { width, height } = result.output

    return `${height}/${width}`
  } catch (e) {
    console.error(`Error while getting aspect ratio for ${imageUrl}: ${e}`)
  }
}
