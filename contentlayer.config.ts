import {
  makeSource,
  defineDocumentType,
  defineNestedType,
  defineComputedFields,
  defineFields,
} from 'contentlayer/source-files'
import readingTime from 'reading-time'
import { getBlurDataUrl } from './src/lib/media/getBlurDataUrl'
import { getAspectRatio } from './src/lib/media/getAspectRatio'

/**
 * Nested items
 */

const Route = defineNestedType(() => ({
  name: 'Route',
  fields: {
    label: { type: 'string', required: true },
    title: { type: 'string', required: true },
    description: { type: 'string' },
    excerpt: { type: 'markdown' },
    url: { type: 'string', required: true },
    icon: { type: 'string' },
    kbd: { type: 'number', required: true },
    group: { type: 'list', of: Route },
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

/**
 * (Computed) field items
 */

const computedFields = defineComputedFields({
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: { type: 'string', resolve: (doc) => doc._raw.sourceFileName.replace(/\.md/, '') },
  // Append props to image field
  image: {
    type: 'list',
    resolve: async (doc) =>
      Promise.all(
        Array.from<typeof Image>(doc.image ?? []).map(async (img) => {
          const id = img['id'] as string
          const isVideo = img['isVideo'] as boolean
          if (!id) return img
          img['blurDataUrl'] = await getBlurDataUrl(id, isVideo)
          img['aspectRatio'] = await getAspectRatio(id, isVideo)
          return img
        })
      ),
  },
})

const sharedFields = defineFields({
  title: { type: 'string', required: true },
  time: { type: 'date', required: true },
  featured: { type: 'boolean', default: false },
  image: { type: 'list', of: Image },
  excerpt: { type: 'string', default: '' },
})

/**
 * Document items
 */

const Config = defineDocumentType(() => ({
  name: 'Config',
  filePathPattern: 'config.yaml',
  contentType: 'data',
  isSingleton: true,
  fields: {
    routes: { type: 'list', of: Route, required: true },
    connect: { type: 'list', of: Link, required: true },
  },
}))

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/*.md',
  fields: {
    ...sharedFields,
    cover: { type: 'nested', of: Image },
    tag: { type: 'list', of: { type: 'string' } },
  },
  computedFields,
}))

const Note = defineDocumentType(() => ({
  name: 'Note',
  filePathPattern: 'notes/*.md',
  fields: {
    ...sharedFields,
    tag: { type: 'list', of: { type: 'string' } },
    meta: { type: 'list', of: Meta },
  },
  computedFields,
}))

const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: 'projects/*.md',
  fields: {
    ...sharedFields,
    tag: { type: 'list', of: { type: 'string' } },
    image: { type: 'list', of: Image },
    hideCover: { type: 'boolean', default: false },
    link: { type: 'string', description: 'Provide link for project without page.' },
    action: { type: 'list', of: Link },
    meta: { type: 'list', of: Meta },
  },
  computedFields,
}))

const Work = defineDocumentType(() => ({
  name: 'Work',
  filePathPattern: 'work/*.md',
  fields: {
    ...sharedFields,
    url: { type: 'string', required: true },
    tagline: { type: 'string', required: true },
    duration: { type: 'string', required: true },
    role: { type: 'string', required: true },
    brief: { type: 'string' },
    highlight: { type: 'list', of: Link },
    tag: { type: 'list', of: { type: 'string' } },
    image: { type: 'list', of: Image },
    action: { type: 'list', of: Link },
  },
  computedFields,
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

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Config, Project, About, Note, Work, Post],
  disableImportAliasWarning: true,
})
