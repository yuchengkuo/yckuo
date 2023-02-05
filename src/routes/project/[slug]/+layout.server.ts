import { getContentBySlug } from '$lib/content/utils'

import type { Project } from '$contentlayer'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async function ({ params, parent }) {
  const { slug } = params
  const project = await getContentBySlug<Project>(slug, 'projects')

  const { tags } = await parent()

  return { project, tags }
}
