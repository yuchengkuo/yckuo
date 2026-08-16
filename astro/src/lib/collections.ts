/*
 * The seam that replaces `/api/content/collection/<key>/published:desc`.
 *
 * SvelteKit's routes fetched their collections over HTTP from
 * `src/routes/api/content/collection/[key]/[[sort]]/+server.ts`, which did exactly two
 * things beyond handing back the array: filtered drafts out in production, and sorted.
 * `getCollection()` replaces the transport; these two functions replace the two things.
 *
 * Both are ported behaviours, not new ones:
 *
 *   - The draft filter is `!page.draft || dev` — drafts stay visible in `astro dev` and
 *     disappear from the build, which is what the endpoint did with `$app/environment`'s
 *     `dev`. No entry in today's corpus sets `draft`, so this is parity insurance.
 *   - The sort key is the endpoint's, including its fallback: an entry with no
 *     `published` sorted as `2048-01`, i.e. ahead of everything real under `desc`.
 *     Kept rather than tidied — `published` is optional in the schema, so the fallback
 *     is reachable, and changing it would reorder the homepage the first time someone
 *     omits the field.
 *
 * `Array.prototype.sort` is stable, so entries sharing a `published` value keep the
 * loader's order, which is the glob's alphabetical order — the same tie-break velite's
 * generated JSON gave the endpoint.
 */
import { getCollection } from 'astro:content'

/** The endpoint's `a.published ?? '2048-01'`, as a timestamp. */
const UNPUBLISHED = new Date('2048-01').getTime()

type Dated = { data: { published?: Date } }

const publishedTime = (entry: Dated) => entry.data.published?.getTime() ?? UNPUBLISHED

const byPublishedDesc = (a: Dated, b: Dated) => publishedTime(b) - publishedTime(a)

const isVisible = ({ data }: { data: { draft: boolean } }) => !data.draft || import.meta.env.DEV

/** `/api/content/collection/works/published:desc` */
export async function getWorks() {
  return (await getCollection('works', isVisible)).sort(byPublishedDesc)
}

/** `/api/content/collection/projects/published:desc` */
export async function getProjects() {
  return (await getCollection('projects', isVisible)).sort(byPublishedDesc)
}
