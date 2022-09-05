import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import Markdoc, { type RenderableTreeNode } from '@markdoc/markdoc'
import { config } from '$schema/markdoc.config'
import { load } from 'js-yaml'
import readingTime from 'reading-time'
import { instanceToPlain } from 'class-transformer'

const contentPath = 'content'

export function getAllContentMeta<T extends Record<string, unknown>>(folder = ''): Array<T> {
  const dirs = readdirSync(join(contentPath, folder), { withFileTypes: true })

  const files = dirs.filter((f) => f.isFile() && f.name.endsWith('.md'))

  if (files) {
    return files.map((f) => ({
      ...parseContent<T>(readFileSync(join(contentPath, folder, f.name), 'utf-8')),
      slug: f.name.replace(/\.md/, ''),
    }))
  }
}

export function getContentBySlug<T extends Record<string, unknown>>(params: string, folder = '') {
  const dirs = readdirSync(join(contentPath, folder), { withFileTypes: true })

  const file = dirs.find((f) => f.isFile() && f.name === `${params}.md`)

  if (file) {
    return parseContent<T>(readFileSync(join(contentPath, folder, file.name), 'utf-8'))
  }

  throw new Error(`File ${params}.md does not exist`)
}

export function getDataBySlug<T extends Record<string, unknown>>(params: string, folder = '') {
  const dirs = readdirSync(join(contentPath, folder), { withFileTypes: true })

  const file = dirs.find((f) => f.isFile() && f.name === `${params}.yaml`)

  const data = load(readFileSync(join(contentPath, folder, file.name), 'utf-8')) as T

  if (data) {
    findMarkdown<T>(data)
    return data
  }

  throw new Error(`File ${params}.yaml does not exist`)
}

function findMarkdown<T>(data: T & { markdown?: string | RenderableTreeNode }) {
  if ('markdown' in data && typeof data.markdown === 'string') {
    const { content } = parseContent(data.markdown)
    data.markdown = content
  }
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'object') {
      findMarkdown(data[key])
    }
  }
}

function parseContent<T extends Record<string, unknown>>(raw: string) {
  const ast = Markdoc.parse(raw)
  const error = Markdoc.validate(ast, config)

  if (error.length) console.error('Error while validating content', error)

  const frontmatter = (ast.attributes.frontmatter ? load(ast.attributes.frontmatter) : {}) as T
  config.variables = { frontmatter, ...config.variables }
  ast.attributes.frontmatter = frontmatter

  return {
    content: instanceToPlain(Markdoc.transform(ast, config)) as RenderableTreeNode,
    readingTime: readingTime(raw),
    ...frontmatter,
  }
}
