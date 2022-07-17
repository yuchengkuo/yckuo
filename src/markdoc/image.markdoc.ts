import pkg from '@markdoc/markdoc'
const { Tag } = pkg
import type { Schema } from '@markdoc/markdoc'

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
  transform(node, config) {
    const attributes = node.transformAttributes(config)
    const children = node.transformChildren(config)

    return new Tag(this.render, { ...attributes }, children)
  },
}
