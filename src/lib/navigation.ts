/**
 * The footer's link data.
 *
 * Ticket 11 stood this up as a stub returning empty lists, so that `astro/` stayed
 * buildable from a fresh clone with no submodule access. Ticket 13 fills it in, and the
 * seam it was built as holds: `Base.astro` calls `getNavigation()` and still does not
 * care where the data comes from — only the body of this file changed, plus the `await`
 * the collection API forces.
 *
 * The empty-list fallback survives on purpose. `navigation.yml` reaches
 * `astro/src/content/` through `pnpm sync`, which a clone without submodule access
 * cannot run; without the fallback the footer would throw rather than render bare, and
 * "clone builds without the private content" is ticket 11's exit condition, not a
 * convenience.
 */
import { getEntry } from 'astro:content'

export type NavLink = { key: string; label: string; url: string; include?: string[] }

export type Navigation = { navigation: NavLink[]; contact: NavLink[] }

export async function getNavigation(): Promise<Navigation> {
  const entry = await getEntry('navigation', 'navigation')
  if (!entry) return { navigation: [], contact: [] }
  return { navigation: entry.data.navigation, contact: entry.data.contact }
}
