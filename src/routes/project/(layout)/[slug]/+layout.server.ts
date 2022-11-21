import { getContentBySlug } from '$lib/content/utils'

import type { Project } from '$contentlayer'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async function ({ params, setHeaders }) {
  const { slug } = params
  const project = await getContentBySlug<Project>(slug, 'projects')

  setHeaders({ 'cache-control': 'public, max-age=86400, stale-while-revalidate=43200' })
  return project
}
