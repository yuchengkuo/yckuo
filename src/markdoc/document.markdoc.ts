import pkg from '@markdoc/markdoc'
const { Tag } = pkg
import type { Schema } from '@markdoc/markdoc'
import { sectionize, visit } from './utils'

export const document: Schema = {
  render: 'article',
  attributes: { frontmatter: { default: {} } },
  transform(node, config) {
    const attributes = node.transformAttributes(config)
    const children = node.transformChildren(config)

    // wrap only h2 and following content by `section`
    for (let depth = 2; depth > 0; depth--) {
      visit(
        children,
        (node) => node.name.match(/h\d/) && node.attributes.level === depth,
        sectionize
      )
    }

    return new Tag(this.render, attributes, children)
  },
}
