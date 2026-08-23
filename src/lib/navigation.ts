/**
 * The footer's link data.
 *
 * The empty-list fallback is load-bearing, not defensive. `navigation.yml` lives in the
 * private `content` submodule, which a clone without access cannot check out; without
 * the fallback the footer throws instead of rendering bare, and a clone builds without
 * the private content by design.
 */
import { getEntry } from 'astro:content'

export type NavLink = { key: string; label: string; url: string; include?: string[] }

export type Navigation = { navigation: NavLink[]; contact: NavLink[] }

export async function getNavigation(): Promise<Navigation> {
  const entry = await getEntry('navigation', 'navigation')
  if (!entry) return { navigation: [], contact: [] }
  return { navigation: entry.data.navigation, contact: entry.data.contact }
}
