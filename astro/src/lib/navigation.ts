/**
 * The footer's link data.
 *
 * Its source is `navigation.yml` in the private `content/` submodule, which ticket 13
 * ports as the fifth Astro collection. Until then this is the seam: `Base.astro` reads
 * `getNavigation()` and does not care where the data comes from, so 13 replaces the
 * body of this file and touches nothing else.
 *
 * TODO(13): read the `navigation` collection instead of returning empty lists.
 */
export type NavLink = { key: string; label: string; url: string }

export type Navigation = { navigation: NavLink[]; contact: NavLink[] }

export function getNavigation(): Navigation {
  return { navigation: [], contact: [] }
}
