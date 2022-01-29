import { defineDocumentType, makeSource, ComputedFields } from 'contentlayer/source-files'
import remarkSlug from 'remark-slug'
import remarkDirective from 'remark-directive'
import readingTime from 'reading-time'

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: { type: 'string', resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx/, '') },
}

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/*.mdx`,
  bodyType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
  },
  computedFields,
}))

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `projects/*.mdx`,
  bodyType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    subtitle: { type: 'string', required: true },
    published: { type: 'boolean', required: true },
    info: { type: 'json', required: true },
    year: { type: 'date', required: true },
  },
  computedFields,
}))

export const Other = defineDocumentType(() => ({
  name: 'Other',
  filePathPattern: '*.mdx',
  bodyType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Project, Other],
  mdx: { remarkPlugins: [remarkSlug, remarkDirective] },
})
