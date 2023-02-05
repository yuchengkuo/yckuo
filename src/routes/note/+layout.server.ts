import { compareDesc } from 'date-fns'

import { getAllContentMeta } from '$lib/content/utils'

import type { Note } from '$contentlayer'
import type { LayoutServerLoad } from './$types'
import countBy from 'lodash/countBy'

export const load: LayoutServerLoad = async function ({ setHeaders }) {
  setHeaders({ 'cache-control': 'public, s-maxage=86400, stale-while-revalidate=43200' })

  const unsorted = await getAllContentMeta<Note>('notes')
  const notes = unsorted.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
  const tags = Object.entries(countBy(notes.flatMap((b) => b.tag))).sort((a, b) => b[1] - a[1])

  return { notes, tags }
}
