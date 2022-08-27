import { error } from '@sveltejs/kit'
import { getAllContentMeta, getDataBySlug } from '$lib/markdoc/utils'
import type { PageServerLoad } from './$types'
import { compareDesc } from 'date-fns'
import type { Project } from '$contentlayer'

export const load: PageServerLoad = async function ({ setHeaders }) {
  const data = getDataBySlug('home')
  const allProjects = getAllContentMeta<Project>('projects')
  const projects = allProjects
    .filter((p) => p.featured)
    .sort((a, b) => compareDesc(new Date(a.time), new Date(b.time)))

  if (data && projects) {
    setHeaders({ 'cache-control': 'public, max-age=86400' })
    return { ...data, projects }
  }
  throw error(404)
}
