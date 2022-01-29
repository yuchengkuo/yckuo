import mdx from '@mdx-js/mdx'
import visit from 'unist-util-visit'
import { toString } from 'mdast-util-to-string'
import slugify from 'slugify'

export default function getHeadings(src) {
  const data = []
  let mdast = {}

  mdx.sync(src, {
    skipExport: true,
    remarkPlugins: [
      () => (ast) => {
        mdast = ast
        return ast
      },
    ],
  })

  visit(
    mdast,
    (node) => node.type === 'heading' && node.depth === 2,
    (node) => {
      data.push({
        id: slugify(toString(node), { lower: true }),
        title: node.children[0].value,
      })
    }
  )

  return {
    ids: data,
  }
}
