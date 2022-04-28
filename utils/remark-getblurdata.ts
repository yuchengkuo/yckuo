/**
 * @typedef {import('mdast').Root} Root
 */

import { Processor } from 'unified'
import { Node } from 'unist'
import { visit } from 'unist-util-visit'
import { getBlurDataURL } from './image-loader'

interface MDXElementNode extends Node {
  type: 'mdxJsxFlowElement'
  name: string
  attributes?: {
    type: 'mdxJsxAttribute'
    name: string
    value: string
  }[]
}

/**
 * Append img metaData from Cloudinary to Image node
 *
 * @type {import('unified').Plugin<void[], Root>}
 */

export default function plugin(this: Processor) {
  return async function (tree: MDXElementNode) {
    const promises = []
    visit(
      tree,
      (node: MDXElementNode) => node.type === 'mdxJsxFlowElement' && node.name === 'Image',
      (node) => {
        const base64 = getBlurDataURL(
          node.attributes.find((attribute) => attribute.name === 'src').value
        ).then((res) =>
          node.attributes.push({
            type: 'mdxJsxAttribute',
            name: 'blurDataURL',
            value: res as string,
          })
        )
        promises.push(base64)
      }
    )
    await Promise.all(promises)
    // visit(
    //   tree,
    //   (node) => node.type === 'mdxJsxFlowElement' && node.name === 'Carousel',
    //   appendCarouselAttribute
    // )

    // function appendCarouselAttribute(node) {
    //   const childrenPromises = node.children.map((child, i) => {
    //     const base64 = getBlurDataURL(
    //       child.attributes.filter((attribute) => attribute.name === 'src')[0].value
    //     )
    //       .then((res) =>
    //         child.attributes.push({
    //           type: 'mdxJsxAttribute',
    //           name: 'blurDataURL',
    //           value: res,
    //         })
    //       )
    //       .catch((err) => console.log(err))
    //     return base64
    //   })
    //   // console.log(childrenPromises);
    //   promises.push(Promise.all(childrenPromises))
    // }
  }
}
