import pkg from 'npm:@markdoc/markdoc'
const { Tag } = pkg
import type { Schema } from 'npm:@markdoc/markdoc'

export const gallery: Schema = {
  render: 'gallery',
  async transform(node, config) {
    const attributes = node.transformAttributes(config)
    const children = await node.transformChildren(config)

    return new Tag(this.render, attributes, children)
  },
}
