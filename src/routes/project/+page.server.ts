import { getAllContentMeta } from '$lib/content/utils'
import { compareDesc } from 'date-fns'

import type { PageServerLoad } from './$types'
import type { Project } from '$contentlayer'

export const load: PageServerLoad = async function ({ setHeaders }) {
  const allProjects = await getAllContentMeta<Project>('projects')
  allProjects.sort((a, b) => compareDesc(new Date(a.time), new Date(b.time)))

  setHeaders({ 'cache-control': 'public, max-age=86400' })
  return { allProjects }
}