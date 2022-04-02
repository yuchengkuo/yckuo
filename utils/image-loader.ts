import { ImageLoaderProps } from 'next/image'

export const loader = ({ src, width, quality }: ImageLoaderProps) => {
  return `https://res.cloudinary.com/yucheng/image/upload/f_auto,w_${width},q_${
    quality || 75
  }/${src}`
}

export const getBlurredData = async (src: string) => {
  const baseURL = `https://res.cloudinary.com/yucheng/image/upload/w_50/${src}.jpg`
  const arrayBuffer = await (await fetch(baseURL)).arrayBuffer()
  const base64 = Buffer.from(arrayBuffer).toString('base64')
  return `data:image/jpeg;base64,${base64}`
}
