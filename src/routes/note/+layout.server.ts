import { compareDesc } from 'date-fns'
import countBy from 'lodash/countBy'

import { getAllContentMeta } from '$lib/content/utils'

import type { Note } from '$contentlayer'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async function ({ setHeaders }) {
  setHeaders({ 'cache-control': 'public, s-maxage=86400, stale-while-revalidate=43200' })

  const unsorted = await getAllContentMeta<Note>('notes')
  const notes = unsorted.sort((a, b) => compareDesc(new Date(a.time), new Date(b.time)))
  const tags = Object.entries(countBy(notes.flatMap((b) => b.tag))).sort((a, b) => b[1] - a[1])

  return { notes, tags }
}
