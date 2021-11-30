import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import remarkSlug from 'remark-slug';
import remarkSectionize from 'remark-sectionize';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/*.mdx`,
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
  },
}));

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `projects/*.mdx`,
  fields: {
    title: { type: 'string', required: true },
    subtitle: { type: 'string', required: true },
    published: { type: 'boolean', required: true },
    info: { type: 'json', required: true },
  },
}));

export const Other = defineDocumentType(() => ({
  name: 'Other',
  filePathPattern: '*.mdx',
  fields: {
    title: { type: 'string', required: true },
  },
}));

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Post, Project, Other],
  markdown: { remarkPlugins: [remarkSlug, remarkSectionize] },
});
