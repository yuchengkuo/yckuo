import { getAllContentMeta } from '$lib/content/utils'
import { compareDesc } from 'date-fns'

import type { PageServerLoad } from './$types'
import type { Project } from '$contentlayer'

export const load: PageServerLoad = async function ({ setHeaders }) {
  const allProjects = await getAllContentMeta<Project>('projects')
  const projects = allProjects
    .filter((p) => p.featured)
    .sort((a, b) => compareDesc(new Date(a.time), new Date(b.time)))

  setHeaders({ 'cache-control': 'public, max-age=432000' })
  return { projects }
}