import type { Org, Page, Project, Work } from '$content'

export async function load({ fetch }) {
  const page = (await fetch('/api/content/entry/index').then((res) => res.json())) as Page

  const works = (await fetch('/api/content/collection/works/published:desc').then((res) =>
    res.json()
  )) as Work[]
  const projects = (await fetch('/api/content/collection/projects/published:desc').then((res) =>
    res.json()
  )) as Project[]

  return {
    ...page,
    works,
    projects
  }
}
