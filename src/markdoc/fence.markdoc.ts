import pkg, { type Schema } from '@markdoc/markdoc'
const { Tag } = pkg
import shiki, { type IThemedToken } from 'shiki'

export const fence: Schema = {
  render: 'Fence',
  children: ['inline', 'text'],
  attributes: {
    content: { type: String, render: false },
    language: { type: String },
    process: { type: Boolean, render: false },
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

    const lang = attributes.language || 'text'
    const code = typeof children[0] === 'string' && children[0]

    const tokens = highlighter.codeToThemedTokens(code, lang)
    const darkToens = highlighter.codeToThemedTokens(code, lang, theme.dark)

    const lightTree = getRenderableTree(tokens)
    const darkTree = getRenderableTree(darkToens)
    const lightBG = highlighter.getBackgroundColor()
    const darkBG = highlighter.getBackgroundColor(theme.dark)

    const lightAttr = {
      ...attributes,
      class: 'shiki shiki-light dark:hidden',
      style: `background-color: ${lightBG};`,
    }
    const darkAttr = {
      ...attributes,
      class: 'shiki shiki-dark hidden dark:block',
      style: `background-color: ${darkBG};`,
    }

    return new Tag('pre', { ...attributes, class: 'shiki-container block' }, [
      new Tag('pre', lightAttr, [lightTree]),
      new Tag('pre', darkAttr, [darkTree]),
    ])
  },
}

function getRenderableTree(tokens: IThemedToken[][]) {
  return new Tag(
    'code',
    { class: 'inline' },
    tokens.map(
      (tokenArr) =>
        new Tag(
          'div',
          { class: 'line' },
          tokenArr.map(
            (token) => new Tag('span', { style: `color: ${token.color}` }, [token.content])
          )
        )
    )
  )
}
