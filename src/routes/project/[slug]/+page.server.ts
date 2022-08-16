import { getContentBySlug } from '$lib/markdoc/utils'
import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'

export const load: PageServerLoad = async function ({ params }) {
  const { slug } = params

  const { content, frontmatter } = getContentBySlug(slug, 'projects')

  if (content) {
    return { content: content as string, frontmatter }
  }

  throw error(404)
}
