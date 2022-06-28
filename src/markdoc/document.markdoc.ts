import pkg from '@markdoc/markdoc'
const { Tag } = pkg
import type { Schema } from '@markdoc/markdoc'

export const document: Schema = {
  attributes: { frontmatter: { default: {} } },
  transform(node, config) {
    const attributes = node.transformAttributes(config)
    const children = node.transformChildren(config)

    return new Tag('article', { class: 'prose mt-10', ...attributes }, children)
  },
}
