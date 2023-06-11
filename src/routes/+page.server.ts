import { compareDesc } from 'date-fns'

import { allNotes, allProjects, allWorks } from '$contentlayer'

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async function ({ setHeaders }) {
  setHeaders({ 'cache-control': 'public, max-age=432000, stale-while-revalidate=86400' })

  const blocks = Array.from([...allProjects, ...allWorks, ...allNotes])
    .filter((p) => p.featured)
    .sort((a, b) => compareDesc(new Date(a.time), new Date(b.time)))

  return { blocks }
}
