import { readdirSync, readFileSync } from 'fs'
import Markdoc, { type RenderableTreeNode } from '@markdoc/markdoc'
import { config } from '$schema/markdoc.config'
import { load } from 'js-yaml'
import readingTime from 'reading-time'
import { instanceToPlain } from 'class-transformer'
import { error } from '@sveltejs/kit'
import { getBlurDataUrl } from '$lib/image/getBlurDataUrl'
import { getAspectRatio } from '$lib/image/getAspectRatio'

const contentPath = './content'

/**
 * Return array of frontmatter in provided folder path
 */
export async function getAllContentMeta<T extends Record<string, unknown>>(
  folder = ''
): Promise<Array<T>> {
  const dirs = readdirSync(`${contentPath}/${folder}`, { withFileTypes: true })
  const files = dirs.filter((f) => f.isFile() && f.name.endsWith('.md'))

  if (files) {
    return Promise.all(
      files.map(async (f) => ({
        ...(await parseFrontmatter<T>(readFileSync(`${contentPath}/${folder}/${f.name}`, 'utf-8'))),
        slug: f.name.replace(/\.md/, ''),
      }))
    )
  }
}

/**
 * Get RenderableTree from provided param and folder
 */
export async function getContentBySlug<T extends Record<string, unknown>>(
  params: string,
  folder = '',
  variables = {}
) {
  const dirs = readdirSync(`${contentPath}/${folder}`, { withFileTypes: true })
  const file = dirs.find((f) => f.isFile() && f.name === `${params}.md`)

  if (file) {
    return await parseContent<T>(
      readFileSync(`${contentPath}/${folder}/${file.name}`, 'utf-8'),
      variables
    )
  }
  throw error(404, `File ${params}.md does not exist`)
}

/**
 * Parse provided markdown raw string with js-yaml, parse images and return frontmatter
 */
async function parseFrontmatter<T extends Record<string, unknown>>(raw: string) {
  const ast = Markdoc.parse(raw)
  const frontmatter = (ast.attributes.frontmatter ? load(ast.attributes.frontmatter) : {}) as T
  await parseImage(frontmatter)
  return frontmatter
}

/**
 * Parse provided markdown raw string with Markdoc and return RenderalbeTree and frontmatter,
 * with additional variables to pass to Markdoc
 */
async function parseContent<T extends Record<string, unknown>>(raw: string, variables = {}) {
  const ast = Markdoc.parse(raw)

  const frontmatter = await parseFrontmatter<T>(raw)
  config.variables = { frontmatter, ...variables, ...config.variables }

  const error = Markdoc.validate(ast, config)

  if (error.length) console.error('Error while validating content', error)

  const content = await Markdoc.transform(ast, config)
  return {
    // async transform for Markdoc
    content: instanceToPlain(content) as RenderableTreeNode,
    readingTime: readingTime(raw),
    ...frontmatter,
  }
}

/**
 * Parse frontmatter with 'image' key and provided 'id' for blurDataUrl and aspect ratio
 */
async function parseImage(frontmatter: Record<string, unknown>) {
  if (!frontmatter) return

  for (const [key, value] of Object.entries(frontmatter)) {
    if (key === 'image') {
      const images = frontmatter['image']
      if (Array.isArray(images)) {
        frontmatter['image'] = await Promise.all(
          images.map(async (img) => {
            const id = img['id'] as string
            const isVideo = img['isVideo'] as boolean
            if (!id) return img
            img['blurDataUrl'] = await getBlurDataUrl(id, isVideo)
            img['aspectRatio'] = await getAspectRatio(id, isVideo)
            return img
          })
        )
      }
    }

    if (typeof value === 'object') {
      await parseImage(value[key])
    }
  }
}
