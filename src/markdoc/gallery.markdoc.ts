import { Tag } from '@markdoc/markdoc'
import type { Schema } from '@markdoc/markdoc'

export const gallery: Schema = {
  render: 'gallery',
  transform(node, config) {
    const children = node.transformChildren(config)
    const attributes = node.transformAttributes(config)

    return new Tag(this.render, attributes, children)
  },
}
