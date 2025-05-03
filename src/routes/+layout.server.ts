export const prerender = true

import type { Navigation, Project, Work } from '$content'

export async function load({ fetch }) {
  const { navigation } = (await fetch('/api/content/entry/navigation').then((res) =>
    res.json()
  )) as Navigation

  const works = (await fetch('/api/content/collection/works/published:desc').then((res) =>
    res.json()
  )) as Work[]
  const projects = (await fetch('/api/content/collection/projects').then((res) =>
    res.json()
  )) as Project[]

  return { navigation, works, projects }
}
