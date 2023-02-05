import { getAllContentMeta } from '$lib/content/utils'
import { compareDesc } from 'date-fns'

import type { PageServerLoad } from './$types'
import type { Project, Work } from '$contentlayer'

export const load: PageServerLoad = async function ({ setHeaders }) {
  setHeaders({ 'cache-control': 'public, max-age=432000, stale-while-revalidate=86400' })

  const allProjects = await getAllContentMeta<Project>('projects')
  const projectsAmount = allProjects.length
  const projects = allProjects
    .filter((p) => p.featured)
    .sort((a, b) => compareDesc(new Date(a.time), new Date(b.time)))

  const works = await getAllContentMeta<Work>('work')

  return { projects, projectsAmount, works }
}
