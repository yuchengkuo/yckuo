import pkg from '@markdoc/markdoc'
const { Tag } = pkg
import type { Schema } from '@markdoc/markdoc'

export const grid: Schema = {
  render: 'grid',
  transform(node, config) {
    const children = node.transformChildren(config)
    const attributes = node.transformAttributes(config)

    return new Tag(this.render, attributes, children)
  },
}
