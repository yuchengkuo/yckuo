import { getContentBySlug } from '$lib/content/utils'

import type { Note } from '$contentlayer'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async function ({ params, parent }) {
  const { slug } = params
  const note = getContentBySlug<Note>(slug, 'notes')

  const { tags } = await parent()

  return { note, tags }
}
