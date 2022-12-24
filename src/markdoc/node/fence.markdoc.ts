import pkg, { type Schema } from '@markdoc/markdoc'
const { Tag } = pkg
import shiki, { FontStyle, type IThemedToken } from 'shiki'

import grammar from '../markdoc.tmLanguage.json'

export const fence: Schema = {
  children: ['inline', 'text'],
  attributes: {
    content: { type: String, render: false },
    language: { type: String },
    process: { type: Boolean, render: false },
    highlight: { type: Array },
  },
  async transform(node, config) {
    const attributes = node.transformAttributes(config)
    const children = node.transformChildren(config)

    const theme = {
      light: 'slack-ochin',
      dark: 'slack-dark',
    }

    const highlighter = await shiki.getHighlighter({
      theme: theme.light,
      themes: [theme.dark],
    })

    const markdoc = {
      id: 'Markdoc',
      scopeName: 'text.html.markdoc',
      grammar,
      aliases: ['markdoc'],
    }
    //@ts-expect-error import json with vitejs
    await highlighter.loadLanguage(markdoc)

    const lang = attributes.language || 'text'
    const code = (typeof children[0] === 'string' && children[0]) || node.attributes.content
    const highlight = attributes.highlight as Array<number | Array<number>>

    const tokens = highlighter.codeToThemedTokens(code, lang)
    const darkTokens = highlighter.codeToThemedTokens(code, lang, theme.dark)

    const lightTree = getRenderableTree(tokens, highlight)
    const darkTree = getRenderableTree(darkTokens, highlight)
    const lightBG = highlighter.getBackgroundColor()
    const darkBG = highlighter.getBackgroundColor(theme.dark)

    const lightAttr = {
      ...attributes,
      class: 'shiki shiki-light',
      style: `background-color: ${lightBG};`,
    }
    const darkAttr = {
      ...attributes,
      class: 'shiki shiki-dark',
      style: `background-color: ${darkBG};`,
    }

    return new Tag('div', { ...attributes, class: 'shiki-container' }, [
      new Tag('pre', lightAttr, [lightTree]),
      new Tag('pre', darkAttr, [darkTree]),
    ])
  },
}

function getRenderableTree(tokens: IThemedToken[][], highlights?: (number | number[])[]) {
  const lines = highlights?.filter((h) => !Array.isArray(h)) as number[]
  const ranges = (highlights?.filter((h) => Array.isArray(h)) as number[][])?.map((h) => {
    if (h.length !== 2) throw Error('Highlight range must be in ["start", "end"] format')
    const start = Math.min(h[0], h[1])
    const end = Math.max(h[0], h[1])
    return [start, end]
  })

  return new Tag(
    'code',
    {},
    tokens.map((tokenArr, index) => {
      const target = index + 1
      const highlight =
        lines?.includes(target) || ranges?.some((range) => target >= range[0] && target <= range[1])
          ? 'highlight'
          : highlights?.length
          ? 'no-highlight'
          : ''

      const rangeStart = ranges?.some((range) => target === range[0]) ? 'highlight-start' : ''
      const rangeEnd = ranges?.some((range) => target === range[1]) ? 'highlight-end' : ''
      return new Tag(
        'div',
        { class: ['line', highlight, rangeStart, rangeEnd].join(' ') },
        tokenArr.map((token) => {
          const { color, content, fontStyle } = token
          const text = `color: ${color}`
          const bold = fontStyle === FontStyle['Bold'] && 'font-weight: bold;'
          const italic = fontStyle === FontStyle['Italic'] && 'font-style: italic;'
          const underline = fontStyle === FontStyle['Underline'] && 'text-decoration: underline;'
          const style = [text, bold, italic, underline].filter((i) => i).join(' ')
          return new Tag('span', { style }, [content])
        })
      )
    })
  )
}