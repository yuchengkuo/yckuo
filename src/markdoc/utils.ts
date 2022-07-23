import pkg from '@markdoc/markdoc'
const { Tag } = pkg
import type { RenderableTreeNode, Tag as TagType } from '@markdoc/markdoc'

// visist renderable tree with callback when pass the test function
export function visit(
  tree: RenderableTreeNode[],
  test: (node: TagType) => boolean,
  callback: (node: TagType, parent: TagType[]) => void
) {
  const parent = tree
  tree.forEach((node) => {
    if (typeof node === 'string') return

    if (Boolean(test.call(this, node))) {
      callback.call(this, node, parent)
    }

    if (node.children) {
      visit(node.children, test, callback)
    }
  })
}

// wrap h2 and following content with `section` and others with `div`
export function sectionize(node: TagType, parent: TagType[]) {
  const start = node
  const depth = node.attributes.level

  const startIndex = parent.indexOf(start)

  let end: TagType

  //look for heading from start node
  let index = startIndex
  while (++index < parent.length) {
    if (parent[index].name.match(/h\d/) && parent[index].attributes.level <= depth) {
      end = parent[index]
      break
    }
  }

  const endIndex = parent.indexOf(end)

  const between = parent.slice(startIndex, endIndex > 0 ? endIndex : undefined)

  const section = new Tag(
    depth > 2 ? 'div' : 'section',
    { id: `${start.attributes.id}-section` },
    between
  )

  parent.splice(startIndex, between.length, section)
}
