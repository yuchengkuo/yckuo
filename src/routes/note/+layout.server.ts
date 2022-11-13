import { compareDesc } from 'date-fns'

import { getAllContentMeta } from '$lib/content/utils'

import type { Note } from '$contentlayer'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async function ({ setHeaders }) {
  const unsorted = await getAllContentMeta<Note>('notes')
  const notes = unsorted.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  setHeaders({ 'cache-control': 'public, s-maxage=86400, stale-while-revalidate=43200' })
  return { notes }
}
