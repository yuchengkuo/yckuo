import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import Markdoc from '@markdoc/markdoc'
import { config } from '$schema/markdoc.config'
import { load } from 'js-yaml'

const contentPath = 'content'

export function getContentBySlug(params: string) {
  const dirs = readdirSync(contentPath, { withFileTypes: true })

  const file = dirs.find((f) => f.isFile() && f.name === `${params}.md`)

  if (file) {
    return transformContent(readFileSync(join(contentPath, file.name), 'utf-8'))
  }

  throw new Error(`File ${params}.md does not exist`)
}

export function getDataBySlug(params: string) {
  const dirs = readdirSync(contentPath, { withFileTypes: true })

  const file = dirs.find((f) => f.isFile() && f.name === `${params}.yaml`)

  const data = load(readFileSync(join(contentPath, file.name), 'utf-8'))

  if (data) {
    findMarkdown(data)
    return data
  }

  throw new Error(`File ${params}.yaml does not exist`)
}

function findMarkdown(data: Object & { markdown?: string }) {
  if (data.hasOwnProperty('markdown')) {
    const { content } = transformContent(data.markdown)
    data.markdown = content as unknown as string
  }
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'object') {
      findMarkdown(data[key])
    }
  }
}

function transformContent(raw: string) {
  const ast = Markdoc.parse(raw)
  const error = Markdoc.validate(ast, config)

  if (error.length) console.warn('Error while validating content', error)

  const frontmatter = ast.attributes.frontmatter ? load(ast.attributes.frontmatter) : {}
  config.variables = { frontmatter, ...config.variables }

  return { content: Markdoc.transform(ast, config), frontmatter }
}
