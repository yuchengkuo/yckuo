import { getContentBySlug } from '$lib/content/utils'

import type { Note } from '$contentlayer'
import type { PageServerLoad } from './$types'

export const load = async function ({ params }) {
  const { slug } = params
  const note = getContentBySlug<Note>(slug, 'notes')

  return { note }
} satisfies PageServerLoad
