/*
 * Collection access: draft filtering and sorting, in one place.
 *
 *   - The draft filter is `!page.draft || dev` — drafts stay visible in `astro dev` and
 *     disappear from the build. No entry in today's corpus sets `draft`.
 *   - An entry with no `published` sorts as `2048-01`, i.e. ahead of everything real
 *     under `desc`. `published` is optional in the schema, so that branch is REACHABLE
 *     — `WorkRow.astro` depends on it being handled rather than tidied away.
 *
 * `Array.prototype.sort` is stable, so entries sharing a `published` value keep the
 * loader's order, which is the glob's alphabetical order.
 */
import { getCollection } from 'astro:content'

/** The no-`published` fallback, as a timestamp: ahead of everything real. */
const UNPUBLISHED = new Date('2048-01').getTime()

type Dated = { data: { published?: Date } }

const publishedTime = (entry: Dated) => entry.data.published?.getTime() ?? UNPUBLISHED

const byPublishedDesc = (a: Dated, b: Dated) => publishedTime(b) - publishedTime(a)

const isVisible = ({ data }: { data: { draft: boolean } }) => !data.draft || import.meta.env.DEV

/** Works, newest first. */
export async function getWorks() {
  return (await getCollection('works', isVisible)).sort(byPublishedDesc)
}

/** Projects, newest first. */
export async function getProjects() {
  return (await getCollection('projects', isVisible)).sort(byPublishedDesc)
}

/*
 * The two reads below carry the draft filter and NO sort.
 *
 * `getNotes()` is the surprise: `/note` has ALWAYS listed in alphabetical filename order
 * (figma-shortcut, markdoc-sectionize, markdoc-shiki, sveltekit-parent, unocss-scanning,
 * windicss), never by date, and this reproduces that. It looks like an oversight and is
 * not one — sorting the list by date is a design decision about the section, and would
 * silently reorder it.
 */

/** The `pages` collection, drafts filtered. */
export async function getPages() {
  return await getCollection('pages', isVisible)
}

/** Notes, in alphabetical filename order — unsorted on purpose; see above. */
export async function getNotes() {
  return await getCollection('notes', isVisible)
}
