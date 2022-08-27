import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import { getContentBySlug } from '$lib/markdoc/utils'
import type { Project } from '$contentlayer'

// @ts-expect-error RenderableTreeNode
export const load: PageServerLoad = async function ({ params, setHeaders }) {
  const { slug } = params
  const project = getContentBySlug<Project>(slug, 'projects')

  if (project) {
    setHeaders({ 'cache-control': 'public, max-age=86400' })
    return project
  }
  throw error(404)
}
