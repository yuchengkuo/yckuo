import pkg from '@markdoc/markdoc'
const { Tag } = pkg
import type { RenderableTreeNode, Schema } from '@markdoc/markdoc'

export const heading: Schema = {
  children: ['inline'],
  attributes: {
    id: { type: String },
    level: { type: Number, required: true, default: 1 },
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config)
    const children = node.transformChildren(config)

    const id = generateID(children, attributes)

    return new Tag(`h${node.attributes['level']}`, { ...attributes, id }, [
      new Tag('a', { href: `#${id}` }, children),
    ])
  },
}

function generateID(children: Array<RenderableTreeNode>, attributes: any) {
  if (attributes.id && typeof attributes.id === 'string') {
    return attributes.id
  }
  return children
    .filter((child) => typeof child === 'string')
    .join(' ')
    .replace(/[?]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
}
