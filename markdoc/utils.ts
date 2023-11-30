import pkg from 'npm:@markdoc/markdoc'
const { Tag } = pkg
import {
  type Scalar,
  type RenderableTreeNode,
  type Tag as TagType,
} from 'npm:@markdoc/markdoc'

// visist renderable tree with callback when pass the test function
export function visit(
  tree: RenderableTreeNode[],
  test: (node: TagType) => boolean,
  callback: (node: TagType, parent: RenderableTreeNode[]) => void
) {
  const parent = tree
  tree.forEach((node) => {
    if (isScalar(node)) return

    if (test(node)) {
      callback(node, parent)
    }

    if (node.children) {
      visit(node.children, test, callback)
    }
  })
}

export function isScalar(node: RenderableTreeNode): node is Scalar {
  return (
    typeof node === 'boolean' ||
    typeof node === 'number' ||
    typeof node === 'string'
  )
}

// wrap h2 and following content with `section` and others with `div`
export function sectionize(
  node: TagType,
  parent: RenderableTreeNode[],
  test?: (node: RenderableTreeNode) => boolean
) {
  const start = node
  const depth = !isScalar(node) && node.attributes.level

  const startIndex = parent.indexOf(start)

  let end: RenderableTreeNode = parent[parent.length]

  //look for heading from start node
  let index = startIndex

  while (++index < parent.length) {
    const target = parent[index]
    if (
      (!isScalar(target) &&
        target.name.match(/h\d/) &&
        target.attributes.level <= depth) ||
      (test && test(target))
    ) {
      end = target
      break
    }
  }

  const endIndex = parent.indexOf(end)

  const between = parent.slice(startIndex, endIndex > 0 ? endIndex : undefined)

  const section = new Tag(
    depth > 2 ? 'div' : 'section',
    start.attributes.id ? { id: `${start.attributes.id}-section` } : undefined,
    between
  )

  parent.splice(startIndex, between.length, section)
}
