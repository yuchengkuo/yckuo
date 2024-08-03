---
title: Shiki syntax highlighting in Markdoc
description: |
  Snippet to trasform Shiki themed tokens into Mrakdoc renderalbe tree, and some further implementations.
published: 2022-11-08
tags:
  - Shiki
  - Markdoc
  - Snippet
updated: 2024-02-03
---

[Shiki](https://shiki.matsu.io/) is a simple and beautiful syntax highlighter using TextMate grammar to tokenize strings. To use it in [Markdoc](https://markdoc.dev) we need to transform Shiki themed tokens into Markdoc renderable tree.

## Basic usage

Transform Shiki themed tokens into Markdoc renderable tree in `fence` tag,

```ts
// fence.markdoc.ts
import { Tag, type Schema } from '@markdoc/markdoc'
import shiki, { FontStyle } from 'shiki'

export const fence: Schema = {
  children: ['inline', 'text'],
  attributes: {
    content: { type: String, render: false },
    language: { type: String },
    process: { type: Boolean, render: false }
  },
  async transform(node, config) {
    const attributes = node.transformAttributes(config)
    const children = node.transformChildren(config)

    const highlighter = await shiki.getHighlighter({ theme: 'nord' })

    const lang = attributes.language || 'text'
    const code = (typeof children[0] === 'string' && children[0]) || node.attributes.content

    const tokens = highlighter.codeToThemedTokens(code, lang)

    const tree = getRenderableTree(tokens)
    const bg = highlighter.getBackgroundColor()

    const attr = {
      ...attributes,
      class: 'shiki',
      style: `background-color: ${bg};`
    }

    return new Tag('pre', attr, [tree])
  }
}

function getRenderableTree(tokens: IThemedToken[][]) {
  // <code> wrapper
  return new Tag(
    'code',
    {},
    // line
    tokens.map((tokenArr) =>
      Tag(
        'div',
        { class: 'line' },
        // tokens
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
    )
  )
}
```

## Dark mode

Generate two different trees for each light and dark theme, and use the appended class to determine which Shiki code block to show,

```ts {16-54}
// fence.markdoc.ts
import { Tag, type Schema } from '@markdoc/markdoc'
import shiki, { FontStyle } from 'shiki'

export const fence: Schema = {
  children: ['inline', 'text'],
  attributes: {
    content: { type: String, render: false },
    language: { type: String },
    process: { type: Boolean, render: false }
  },
  async transform(node, config) {
    const attributes = node.transformAttributes(config)
    const children = node.transformChildren(config)

    // [!code highlight:30]
    const theme = {
      light: 'min-light',
      dark: 'min-dark'
    }

    const highlighter = await shiki.getHighlighter({
      theme: theme.light,
      themes: [theme.dark]
    })

    const lang = attributes.language || 'text'
    const code = (typeof children[0] === 'string' && children[0]) || node.attributes.content

    const tokens = highlighter.codeToThemedTokens(code, lang)
    const darkTokens = highlighter.codeToThemedTokens(code, lang, theme.dark)

    const lightTree = getRenderableTree(tokens)
    const darkTree = getRenderableTree(darkTokens)
    const lightBG = highlighter.getBackgroundColor()
    const darkBG = highlighter.getBackgroundColor(theme.dark)

    const lightAttr = {
      ...attributes,
      class: 'shiki shiki-light',
      style: `background-color: ${lightBG};`
    }
    const darkAttr = {
      ...attributes,
      class: 'shiki shiki-dark',
      style: `background-color: ${darkBG};`
    }

    // Render two trees for each theme
    return new Tag('div', { ...attributes, class: 'shiki-container' }, [
      new Tag('pre', lightAttr, [lightTree]),
      new Tag('pre', darkAttr, [darkTree])
    ])
  }
}

function getRenderableTree(tokens: IThemedToken[][]) {
  return new Tag(
    'code',
    {},
    tokens.map((tokenArr) =>
      Tag(
        'div',
        { class: 'line' },
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
    )
  )
}
```

Then use `.shiki-light` and `.shiki-dark` classes to show the desired element with the choice of dark mode implementations, `.dark` class for example,

```css
html.dark .shiki-light {
  display: none;
}

html:not(.dark) .shiki-dark {
  display: none;
}
```

## Highlights

With the help of Markdoc [attributes](https://markdoc.dev/docs/attributes), we can pass data to Markdoc tag like this,

````liquid {% process=false %}
```css {% highlight=[] %}
.class {
  color: red;
}
```
````

Update `fence` tag attributes to add `.hightlight` class for highlighted code inside Markdoc schema,

```ts {11,29,34,35,57-64,69-79,82}
// fence.markdoc.ts
import { Tag, type Schema } from '@markdoc/markdoc'
import shiki, { FontStyle } from 'shiki'

export const fence: Schema = {
  children: ['inline', 'text'],
  attributes: {
    content: { type: String, render: false },
    language: { type: String },
    process: { type: Boolean, render: false },
    highlight: { type: Array }
  },
  async transform(node, config) {
    const attributes = node.transformAttributes(config)
    const children = node.transformChildren(config)

    const theme = {
      light: 'slack-ochin',
      dark: 'slack-dark'
    }

    const highlighter = await shiki.getHighlighter({
      theme: theme.light,
      themes: [theme.dark]
    })

    const lang = attributes.language || 'text'
    const code = (typeof children[0] === 'string' && children[0]) || node.attributes.content
    const highlight = attributes.highlight as Array<number | Array<number>>

    const tokens = highlighter.codeToThemedTokens(code, lang)
    const darkToens = highlighter.codeToThemedTokens(code, lang, theme.dark)

    const lightTree = getRenderableTree(tokens, highlight)
    const darkTree = getRenderableTree(darkToens, highlight)
    const lightBG = highlighter.getBackgroundColor()
    const darkBG = highlighter.getBackgroundColor(theme.dark)

    const lightAttr = {
      ...attributes,
      class: 'shiki shiki-light',
      style: `background-color: ${lightBG};`
    }
    const darkAttr = {
      ...attributes,
      class: 'shiki shiki-dark',
      style: `background-color: ${darkBG};`
    }

    return new Tag('div', { ...attributes, class: 'shiki-container' }, [
      new Tag('pre', lightAttr, [lightTree]),
      new Tag('pre', darkAttr, [darkTree])
    ])
  }
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
```

Then use `.highlight` and `.no-highlight` classes to style it up!

```css
.highlight {
  background-color: red;
}

.no-hightlight {
  color: gray;
}
```

## More to play around

- Diffs
- Highlight words
- Copy code
- Indicate line number, language

## Reference

- [Shiki](https://shiki.matsu.io/)
- [Markdoc](https://markdoc.dev)
- [`fence` Documentation](https://markdoc.dev/docs/nodes#built-in-nodes)
- [`markdown-it-shiki`](https://github.com/antfu/markdown-it-shiki)
