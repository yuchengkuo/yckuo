import pkg, { type Schema } from '@markdoc/markdoc'
const { Tag } = pkg

export const code: Schema = {
  attributes: {
    content: { type: String, required: true },
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config)

    return new Tag('code', attributes, ['`', attributes.content, '`'])
  },
}
