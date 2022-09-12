import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import Markdoc, { type RenderableTreeNode } from '@markdoc/markdoc'
import { config } from '$schema/markdoc.config'
import { load } from 'js-yaml'
import readingTime from 'reading-time'
import { instanceToPlain } from 'class-transformer'
import { error } from '@sveltejs/kit'
import { getBlurDataUrl } from '$lib/image/getBlurDataUrl'
import { getAspectRatio } from '$lib/image/getAspectRatio'

const contentPath = 'content'

export async function getAllContentMeta<T extends Record<string, unknown>>(
  folder = ''
): Promise<Array<T>> {
  const dirs = readdirSync(join(contentPath, folder), { withFileTypes: true })

  const files = dirs.filter((f) => f.isFile() && f.name.endsWith('.md'))

  if (files) {
    return Promise.all(
      files.map(async (f) => ({
        ...(await parseContent<T>(readFileSync(join(contentPath, folder, f.name), 'utf-8'))),
        slug: f.name.replace(/\.md/, ''),
      }))
    )
  }
}

export async function getContentBySlug<T extends Record<string, unknown>>(
  params: string,
  folder = ''
) {
  const dirs = readdirSync(join(contentPath, folder), { withFileTypes: true })

  const file = dirs.find((f) => f.isFile() && f.name === `${params}.md`)

  if (file) {
    return await parseContent<T>(readFileSync(join(contentPath, folder, file.name), 'utf-8'))
  }

  throw error(404, `File ${params}.md does not exist`)
}

export async function getDataBySlug<T extends Record<string, unknown>>(
  params: string,
  folder = ''
) {
  const dirs = readdirSync(join(contentPath, folder), { withFileTypes: true })

  const file = dirs.find((f) => f.isFile() && f.name === `${params}.yaml`)

  const data = load(readFileSync(join(contentPath, folder, file.name), 'utf-8')) as T

  if (data) {
    await findMarkdown<T>(data)
    return data
  }

  throw error(404, `File ${params}.yaml does not exist`)
}

async function findMarkdown<T>(data: T & { markdown?: string | RenderableTreeNode }) {
  if ('markdown' in data && typeof data.markdown === 'string') {
    const { content } = await parseContent(data.markdown)
    data.markdown = content
  }
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'object') {
      await findMarkdown(data[key])
    }
  }
}

async function parseContent<T extends Record<string, unknown>>(raw: string) {
  const ast = Markdoc.parse(raw)
  const error = Markdoc.validate(ast, config)

  if (error.length) console.error('Error while validating content', error)

  const frontmatter = (ast.attributes.frontmatter ? load(ast.attributes.frontmatter) : {}) as T

  parseImage(frontmatter)

  config.variables = { frontmatter, ...config.variables }
  ast.attributes.frontmatter = null

  return {
    // async transform for Markdoc
    content: instanceToPlain(await Markdoc.transform(ast, config)) as RenderableTreeNode,
    readingTime: readingTime(raw),
    ...frontmatter,
  }
}

async function parseImage(frontmatter: Record<string, unknown>) {
  if (!frontmatter) return

  for (const [key, value] of Object.entries(frontmatter)) {
    if (key === 'image') {
      const images = frontmatter['image']
      if (Array.isArray(images)) {
        images.forEach(async (img) => {
          const id = img['id'] as string
          if (!id) return
          img['blurDataUrl'] = await getBlurDataUrl(id)
          img['aspectRatio'] = await getAspectRatio(id)
        })
      }
    }

    if (typeof value === 'object') {
      parseImage(value[key])
    }
  }
}
