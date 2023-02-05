import { getAllContentMeta } from '$lib/content/utils'
import { compareDesc } from 'date-fns'
import countBy from 'lodash/countBy'

import type { LayoutServerLoad } from './$types'
import type { Project } from '$contentlayer'

export const load: LayoutServerLoad = async function ({ setHeaders }) {
  setHeaders({ 'cache-control': 'public, max-age=86400, stale-while-revalidate=43200' })
  const allProjects = await getAllContentMeta<Project>('projects')
  allProjects.sort((a, b) => compareDesc(new Date(a.time), new Date(b.time)))
  const tags = Object.entries(countBy(allProjects.flatMap((b) => b.tag))).sort(
    (a, b) => b[1] - a[1]
  )

  return { allProjects, tags }
}
