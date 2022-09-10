import { getContentBySlug } from '$lib/content/utils'

import type { Project } from '$contentlayer'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async function ({ params, setHeaders }) {
  const { slug } = params
  const project = getContentBySlug<Project>(slug, 'projects')

  setHeaders({ 'cache-control': 'public, max-age=86400' })
  return project
}
