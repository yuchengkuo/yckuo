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

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/*.md',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    cover: { type: 'string' },
    tag: { type: 'list', of: { type: 'string' } },
  },
  computedFields,
}))

const Note = defineDocumentType(() => ({
  name: 'Note',
  filePathPattern: 'notes/*.md',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tag: { type: 'list', of: { type: 'string' } },
    feature: { type: 'boolean' },
    meta: { type: 'list', of: Meta },
  },
  computedFields,
}))

const Micro = defineDocumentType(() => ({
  name: 'Micro',
  filePathPattern: 'posts/*.yaml',
  contentType: 'data',
  fields: {
    micro: { type: 'list', of: MicroBlog },
  },
  isSingleton: true,
}))

const MicroBlog = defineNestedType(() => ({
  name: 'MicroBlog',
  fields: {
    date: { type: 'date', required: true },
    title: { type: 'string' },
    tag: { type: 'list', of: { type: 'string' } },
    content: { type: 'markdown', required: true },
  },
}))

const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: 'projects/*.md',
  fields: {
    title: { type: 'string', required: true },
    excerpt: { type: 'string', required: true },
    tag: { type: 'list', of: { type: 'string' } },
    image: { type: 'list', of: Image },
    hideCover: { type: 'boolean', default: false },
    time: { type: 'date', required: true },
    link: { type: 'string', description: 'Provide link for project without page.' },
    featured: { type: 'boolean' },
    action: { type: 'list', of: Link },
    meta: { type: 'list', of: Meta },
  },
  computedFields,
}))

const Work = defineDocumentType(() => ({
  name: 'Work',
  filePathPattern: 'work/*.md',
  fields: {
    title: { type: 'string', required: true },
    url: { type: 'string' },
    duration: { type: 'string', required: true },
    excerpt: { type: 'string' },
  },
}))

const About = defineDocumentType(() => ({
  name: 'About',
  filePathPattern: 'about.md',
  isSingleton: true,
  fields: {
    title: { type: 'string', required: true },
    links: { type: 'list', of: Link },
  },
}))

const Link = defineNestedType(() => ({
  name: 'Link',
  fields: {
    label: { type: 'string', required: true },
    url: { type: 'string', required: true },
  },
}))

const Meta = defineNestedType(() => ({
  name: 'Meta',
  fields: {
    title: { type: 'string', required: true },
    content: { type: 'string', required: true },
  },
}))

const Image = defineNestedType(() => ({
  name: 'Image',
  fields: {
    id: { type: 'string', required: true },
    alt: { type: 'string', default: '' },
    blurDataUrl: { type: 'string' },
    aspectRatio: { type: 'string' },
    isVideo: { type: 'boolean', default: false },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Project, About, Note, Work],
  disableImportAliasWarning: true,
})
