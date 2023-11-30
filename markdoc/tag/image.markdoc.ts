import pkg from 'npm:@markdoc/markdoc'
const { Tag } = pkg
import type { Schema } from 'npm:@markdoc/markdoc'
import { getBlurDataUrl } from '../../lib/media/getBlurDataUrl.ts'
import { getAspectRatio } from '../../lib/media/getAspectRatio.ts'

export const image: Schema = {
  render: 'Image',
  attributes: {
    id: { required: true, type: String },
    alt: { type: String, default: '' },
    width: { type: Number },
    height: { type: Number },
    showcap: { type: Boolean, default: false },
    full: { type: Boolean, default: false },
    isVideo: { type: Boolean, default: false },
  },
  selfClosing: true,
  async transform(node, config) {
    const attributes = node.transformAttributes(config)
    const children = node.transformChildren(config)

    const id = attributes['id']

    const blurDataUrl = await getBlurDataUrl.ts(id)
    const aspectRatio = await getAspectRatio(id)

    return new Tag(
      this.render,
      { blurDataUrl, aspectRatio, ...attributes },
      children
    )
  },
}
