import pkg from '@markdoc/markdoc'
const { Tag } = pkg
import type { Schema } from '@markdoc/markdoc'
import { getBlurDataUrl } from '$lib/image/getBlurDataUrl'
import { getAspectRatio } from '$lib/image/getAspectRatio'

export const image: Schema = {
  render: 'Image',
  attributes: {
    id: { required: true, type: String },
    alt: { type: String, default: '' },
    width: { type: Number },
    height: { type: Number },
    showcap: { type: Boolean, default: false },
    full: { type: Boolean, default: false },
  },
  selfClosing: true,
  async transform(node, config) {
    const attributes = node.transformAttributes(config)
    const children = node.transformChildren(config)

    const id = attributes['id']

    const blurDataUrl = await getBlurDataUrl(id)
    const aspectRatio = await getAspectRatio(id)

    return new Tag(this.render, { blurDataUrl, aspectRatio, ...attributes }, children)
  },
}
