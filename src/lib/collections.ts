/*
 * `Array.prototype.sort` is stable, so entries sharing a `published` value keep the
 * loader's order, which is the glob's alphabetical order.
 */
import { getCollection } from 'astro:content'

/* `published` is optional, so this is reachable, and `WorkRow.astro` relies on undated
   entries sorting first. */
const UNPUBLISHED = new Date('2048-01').getTime()

type Dated = { data: { published?: Date } }

const publishedTime = (entry: Dated) => entry.data.published?.getTime() ?? UNPUBLISHED

const byPublishedDesc = (a: Dated, b: Dated) => publishedTime(b) - publishedTime(a)

const isVisible = ({ data }: { data: { draft: boolean } }) => !data.draft || import.meta.env.DEV

export async function getWorks() {
  return (await getCollection('works', isVisible)).sort(byPublishedDesc)
}

export async function getProjects() {
  return (await getCollection('projects', isVisible)).sort(byPublishedDesc)
}

export async function getPages() {
  return await getCollection('pages', isVisible)
}

/* Unsorted on purpose: `/note` lists in filename order, and sorting it by date is a design
   decision about the section, not a fix. */
export async function getNotes() {
  return await getCollection('notes', isVisible)
}
