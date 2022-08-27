import {
  defineDocumentType,
  makeSource,
  ComputedFields,
  defineNestedType,
} from 'contentlayer/source-files'
import readingTime from 'reading-time'

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: { type: 'string', resolve: (doc) => doc._raw.sourceFileName.replace(/\.md/, '') },
}

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/*.md',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    cover: { type: 'string' },
  },
  computedFields,
}))

export const Micro = defineDocumentType(() => ({
  name: 'Micro',
  filePathPattern: 'posts/*.yaml',
  contentType: 'data',
  fields: {
    micro: { type: 'list', of: MicroBlog },
  },
  isSingleton: true,
}))

export const MicroBlog = defineNestedType(() => ({
  name: 'MicroBlog',
  fields: {
    date: { type: 'date', required: true },
    title: { type: 'string' },
    tag: { type: 'list', of: { type: 'string' } },
    content: { type: 'markdown', required: true },
  },
}))

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: 'projects/*.md',
  fields: {
    title: { type: 'string', required: true },
    excerpt: { type: 'string', required: true },
    tag: { type: 'list', of: { type: 'string' } },
    image: { type: 'list', of: { type: 'string' } },
    time: { type: 'date', required: true },
    link: { type: 'string' },
    featured: { type: 'boolean' },
  },
  computedFields,
}))

export const About = defineDocumentType(() => ({
  name: 'About',
  filePathPattern: 'about.md',
  isSingleton: true,
  fields: {
    title: { type: 'string', required: true },
    links: { type: 'list', of: { type: 'string' } },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Project, About, Post, Micro],
  disableImportAliasWarning: true,
})
