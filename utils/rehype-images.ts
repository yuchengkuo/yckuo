import { Processor } from 'unified'
import { Element } from 'hast'
import { visit } from 'unist-util-visit'
import cloudinary from 'cloudinary'
import { getBlurDataURL } from './image-loader'

cloudinary.v2.config({
  cloud_name: 'yucheng',
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

interface ImgNode extends Element {
  type: 'element'
  tagName: 'img'
  properties: {
    src: string
    height?: number
    width?: number
    aspect_ratio?: number
    blurDataURL?: string
  }
}

/**
 * Append img metaData from Cloudinary to Image node
 */

export default function (this: Processor) {
  return async function (tree: Element) {
    const imgNode: ImgNode[] = []
    visit(
      tree,
      (node: Element) => node.type === 'element' && node.tagName === 'img',
      (node: ImgNode) => {
        imgNode.push(node)
      }
    )
    for (const node of imgNode) {
      const plugin_id = node.properties.src
      const asset = await cloudinary.v2.api.resource(plugin_id)
      node.properties.width = asset.width
      node.properties.height = asset.height
      node.properties.aspect_ratio = asset.width / asset.height
      node.properties.blurDataURL = (await getBlurDataURL(plugin_id)) as string
    }
  }
}
