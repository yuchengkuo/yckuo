import { getContentBySlug } from '$lib/content/utils'

import type { PageServerLoad } from './$types'
import type { Project } from '$contentlayer'

export const load: PageServerLoad = async function () {
  const project = getContentBySlug<Project>('sandbox', 'projects')

  return project
}
