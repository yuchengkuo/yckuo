import { getContentBySlug } from '$lib/content/utils'

import type { Work } from '$contentlayer'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async function ({ params }) {
  const { slug } = params
  const work = await getContentBySlug<Work>(slug, 'work')

  return { work }
}
