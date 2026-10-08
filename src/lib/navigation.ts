import { getEntry } from 'astro:content'

export type NavLink = { key: string; label: string; url: string }

export type Navigation = { navigation: NavLink[]; contact: NavLink[] }

export async function getNavigation(): Promise<Navigation> {
  const entry = await getEntry('navigation', 'navigation')
  if (!entry) return { navigation: [], contact: [] }
  return { navigation: entry.data.navigation, contact: entry.data.contact }
}
