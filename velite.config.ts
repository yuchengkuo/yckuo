import { defineCollection, defineConfig, s } from 'velite'
import Markdoc, { type RenderableTreeNode } from '@markdoc/markdoc'
import markdocConfig from './markdoc.config'

/**
 * Markdoc content schema
 */
const markdoc = function () {
  return s
    .custom<string>()
    .transform<RenderableTreeNode>(async (value, { meta: { records, content }, addIssue }) => {
      value = value ?? content
      if (value == null) {
        addIssue({ code: 'custom', message: 'No content found' })
        return null as never
      }
      try {
        const errors = Markdoc.validate(Markdoc.parse(value), markdocConfig)
        if (errors) errors.forEach((e) => addIssue({ code: 'custom', message: e.error.message }))
        const output = Markdoc.transform(Markdoc.parse(value), {
          ...markdocConfig,
          variables: { ...(records as object), ...markdocConfig.variables }
        })
        return output
      } catch (err: any) {
        addIssue({ code: 'custom', message: err.message })
        return null as never
      }
    })
}

const sharedSchema = s.object({
  title: s.string(),
  description: s.markdown().optional(),
  slug: s.path(),
  subtitle: s.string().optional(),
  sidenote: s.string().optional(), //Tertiary Heading
  date: s.isodate().optional(),
  published: s.isodate().optional(),
  updated: s.isodate(),
  draft: s.boolean().default(false)
})

const navigation = defineCollection({
  name: 'Navigation',
  pattern: 'navigation.yml',
  single: true,
  schema: s
    .object({
      navigation: s.array(
        s.object({
          key: s.string(),
          label: s.string(),
          url: s.string(),
          include: s.array(s.string()).optional()
        })
      )
    })
    .merge(sharedSchema)
})

const pages = defineCollection({
  name: 'Page',
  pattern: '*.md',
  schema: s
    .object({
      content: markdoc()
    })
    .merge(sharedSchema)
})

const works = defineCollection({
  name: 'Work',
  pattern: 'work/*.md',
  schema: s
    .object({
      content: markdoc(),
      org: s.string(), // Reference to name in orgs collection
      category: s.array(s.string().max(15)),
      intro: s.markdown().optional(),
      meta: s
        .record(s.string(), s.union([s.string(), s.array(s.string()), s.string().url()]))
        .optional(),
      tagline: s.string().optional(),
      summary: s.record(s.string(), s.markdown()).optional()
    })
    .merge(sharedSchema)
    .transform((data) => ({ subtitle: 'Work', ...data }))
})

const orgs = defineCollection({
  name: 'Org',
  pattern: 'work/org/*.yml',
  schema: s
    .object({
      name: s.string(),
      description: s.markdown(),
      duration: s.string(),
      url: s.string().url()
    })
    .merge(sharedSchema)
})

const projects = defineCollection({
  name: 'Project',
  pattern: 'project/**/*.md',
  schema: s
    .object({
      content: markdoc(),
      cover: s.string().optional(),
      tags: s.array(s.string()).optional(),
      category: s.array(s.string().max(15))
    })
    .merge(sharedSchema)
})

const notes = defineCollection({
  name: 'Note',
  pattern: 'note/**/*.md',
  schema: s
    .object({
      content: markdoc(),
      tags: s.array(s.string()).optional()
    })
    .merge(sharedSchema)
})

const posts = defineCollection({
  name: 'Post',
  pattern: 'post/**/*.md',
  schema: s
    .object({
      metadata: s.metadata(),
      excerpt: s.excerpt(),
      content: markdoc()
    })
    .merge(sharedSchema)
})

export default defineConfig({
  output: { assets: 'static' },
  collections: {
    navigation,
    pages,
    orgs,
    works,
    projects,
    posts,
    notes
  }
})
