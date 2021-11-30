import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import remarkSlug from 'remark-slug';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.mdx`,
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
  },
}));

export const Projects = defineDocumentType(() => ({
  name: 'Projects',
  filePathPattern: `projects/**/*.mdx`,
  fields: {
    title: {
      type: 'string',
      description: 'The title of the project',
      required: true,
    },
    subtitle: {
      type: 'string',
      description: 'The subtitle of the project',
      required: true,
    },
    published: {
      type: 'boolean',
      required: true,
    },
    info: {
      type: 'json',
      required: true,
    },
  },
}));

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Post, Projects],
  markdown: { remarkPlugins: remarkSlug },
});
