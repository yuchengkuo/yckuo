import { getAspectRatio } from '$lib/media/getAspectRatio'
import { getBlurDataUrl } from '$lib/media/getBlurDataUrl'
import pkg from '@markdoc/markdoc'
const { Tag } = pkg
import type { Schema } from '@markdoc/markdoc'

export const video: Schema = {
  render: 'Video',
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

    const blurDataUrl = await getBlurDataUrl(id, true)
    const aspectRatio = await getAspectRatio(id, true)

    return new Tag(this.render, { blurDataUrl, aspectRatio, ...attributes }, children)
  },
}
