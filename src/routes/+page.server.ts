import type { Org, Page, Project, Work } from '$content'

export async function load({ fetch, parent }) {
  const page = (await fetch('/api/content/entry/index').then((res) => res.json())) as Page

  const orgs = (await fetch('/api/content/collection/orgs').then((res) => res.json())) as Org[]

  const { works, projects } = await parent()

  return {
    ...page,
    worksByOrg: orgs.map((org) => {
      const worksInOrg = works?.filter((work) => work.org === org.name)
      return { ...org, works: worksInOrg }
    }),
    projects
  }
}
