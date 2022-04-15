import {
  defineDocumentType,
  makeSource,
  ComputedFields,
  defineNestedType,
} from 'contentlayer/source-files'
import remarkSlug from 'remark-slug'
import remarkDirective from 'remark-directive'
import readingTime from 'reading-time'
import remarkUnwrapImages from 'remark-unwrap-images'
import remarkSectionize from './utils/remark-sectionize'
import remarkGetBlurDataURL from './utils/remark-getblurdata'
import rehypeImages from './utils/rehype-images'
import { getBlurDataURL } from './utils/image-loader'

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: { type: 'string', resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx/, '') },
  blurDataURL: {
    type: 'json',
    resolve: async (doc) => await getBlurDataURL(doc.cover),
  },
}

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    cover: { type: 'string' },
    layout: { type: 'enum', options: ['default', 'two-col'], default: 'default' },
  },
  computedFields,
}))

export const Micro = defineDocumentType(() => ({
  name: 'Micro',
  filePathPattern: `posts/*.yaml`,
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
    content: { type: 'mdx', required: true },
  },
}))

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `projects/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    subtitle: { type: 'string', required: true },
    published: { type: 'boolean', required: true },
    info: { type: 'json', required: true },
    year: { type: 'date', required: true },
    cover: { type: 'list', of: { type: 'string' } },
    layout: { type: 'enum', options: ['default', 'two-col'], default: 'default' },
  },
  computedFields,
}))

export const LinkProject = defineDocumentType(() => ({
  name: 'LinkProject',
  filePathPattern: 'projects/*.yaml',
  contentType: 'data',
  fields: {
    projectLinks: { type: 'list', of: ProjectLink },
  },
  isSingleton: true,
}))

export const ProjectLink = defineNestedType(() => ({
  name: 'ProjectLink',
  fields: {
    title: { type: 'string', required: true },
    subtitle: { type: 'string', required: true },
    published: { type: 'boolean', required: true },
    year: { type: 'date', required: true },
    url: { type: 'string', required: true },
    cover: { type: 'list', of: { type: 'string' } },
  },
}))

export const Other = defineDocumentType(() => ({
  name: 'Other',
  filePathPattern: '*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Micro, Project, LinkProject, Other],
  mdx: {
    remarkPlugins: [
      remarkSlug,
      remarkDirective,
      remarkSectionize,
      remarkGetBlurDataURL,
      remarkUnwrapImages,
    ],
    rehypePlugins: [rehypeImages],
  },
})
