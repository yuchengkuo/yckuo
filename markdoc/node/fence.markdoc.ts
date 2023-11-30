import Markdoc, { type Schema } from 'npm:@markdoc/markdoc'
import { getHighlighter, type ThemedToken, bundledLanguages } from 'npm:shikiji'

export async function fence(): Promise<Schema> {
  const highlighter = await getHighlighter({
    themes: ['slack-ochin', 'slack-dark'],
    langs: Object.keys(bundledLanguages),
  })

  return {
    children: ['inline', 'text'],
    attributes: {
      content: { type: String, render: false },
      language: { type: String },
      process: { type: Boolean, render: false },
      highlight: { type: Array },
    },
    transform(node, config) {
      const attributes = node.transformAttributes(config)
      const children = node.transformChildren(config)

      const lang = attributes.language || 'text'
      const code =
        (typeof children[0] === 'string' && children[0]) ||
        node.attributes.content
      const highlight = attributes.highlight as Array<number | Array<number>>

      const tokens = highlighter.codeToThemedTokens(code, { lang })
      const darkTokens = highlighter.codeToThemedTokens(code, {
        lang,
        theme: 'slack-dark',
      })

      const lightTree = getRenderableTree(tokens, highlight)
      const darkTree = getRenderableTree(darkTokens, highlight)

      const lightAttr = {
        ...attributes,
        class: 'shiki shiki-light',
      }
      const darkAttr = {
        ...attributes,
        class: 'shiki shiki-dark',
      }

      return new Markdoc.Tag(
        'div',
        { ...attributes, class: 'shiki-container' },
        [
          new Markdoc.Tag('pre', lightAttr, [lightTree]),
          new Markdoc.Tag('pre', darkAttr, [darkTree]),
        ]
      )
    },
  }
}

function getRenderableTree(
  tokens: ThemedToken[][],
  highlights?: (number | number[])[]
) {
  const lines = highlights?.filter((h) => !Array.isArray(h)) as number[]
  const ranges = (
    highlights?.filter((h) => Array.isArray(h)) as number[][]
  )?.map((h) => {
    if (h.length !== 2)
      throw Error('Highlight range must be in ["start", "end"] format')
    const start = Math.min(h[0], h[1])
    const end = Math.max(h[0], h[1])
    return [start, end]
  })

  return new Markdoc.Tag(
    'code',
    {},
    tokens.map((tokenArr, index) => {
      const target = index + 1
      const highlight =
        lines?.includes(target) ||
        ranges?.some((range) => target >= range[0] && target <= range[1])
          ? 'highlight'
          : highlights?.length
          ? 'no-highlight'
          : ''

      const rangeStart = ranges?.some((range) => target === range[0])
        ? 'highlight-start'
        : ''
      const rangeEnd = ranges?.some((range) => target === range[1])
        ? 'highlight-end'
        : ''
      return new Markdoc.Tag(
        'div',
        { class: ['line', highlight, rangeStart, rangeEnd].join(' ') },
        tokenArr.map((token) => {
          const { color, content, fontStyle } = token

          const text = `color: ${color}`
          const bold = fontStyle === 2 && 'font-weight: bold;'
          const italic = fontStyle === 1 && 'font-style: italic;'
          const underline = fontStyle === 4 && 'text-decoration: underline;'

          const style = [text, bold, italic, underline]
            .filter((i) => i)
            .join(' ')
          return new Markdoc.Tag('span', { style }, [content])
        })
      )
    })
  )
}
