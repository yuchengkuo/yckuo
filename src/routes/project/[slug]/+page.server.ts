import { getContentBySlug } from '$lib/markdoc/utils'
import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'

export const load: PageServerLoad = async function ({ params, setHeaders }) {
  const { slug } = params

  const { content, frontmatter } = getContentBySlug(slug, 'projects')

  if (content) {
    setHeaders({ 'cache-control': 'public, max-age=86400' })
    return { content: content as string, frontmatter }
  }

  throw error(404)
}
