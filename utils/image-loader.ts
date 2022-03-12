import { encode } from 'base64-arraybuffer'
import { ImageLoaderProps } from 'next/image'

export const loader = ({ src, width, quality }: ImageLoaderProps) => {
  return `https://res.cloudinary.com/yucheng/image/upload/f_auto,w_${width},q_${
    quality || 75
  }/${src}`
}

export const getBlurredData = async (src) => {
  const baseURL = `https://res.cloudinary.com/yucheng/image/upload/w_50/${src}.jpg`
  const buffer = await (await fetch(baseURL)).arrayBuffer()
  const base64 = await encode(buffer)
  return `data:image/jpeg;base64,${base64}`
}
