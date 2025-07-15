import { dev } from '$app/environment'
import { error, json } from '@sveltejs/kit'

import * as all from '$content'
import type { Page } from '$content'

export async function GET({ params }) {
  const { key, sort } = params

  const collection = Object.entries(all)
    .find(([k]) => k === key)
    ?.at(1)

  if (!collection) error(500, `Collection ${key} does not exist.`)

  let data = (collection as unknown as Page[]) /* filter out drafts in production */
    .filter((page) => !page.draft || dev)

  /* Sort by update date or published date */
  if (sort) {
    const [sortKey, sortDirection] = sort.split(':')
    if (
      (sortKey === 'updated' || sortKey === 'published') &&
      (sortDirection === 'asc' || sortDirection === 'desc')
    ) {
      data = data.sort((a, b) => {
        const dateA = new Date(
          sortKey === 'updated' ? a.updated : (a.published ?? '2048-01')
        ).getTime()
        const dateB = new Date(
          sortKey === 'updated' ? b.updated : (b.published ?? '2048-01')
        ).getTime()
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA
      })
    }
  }

  return json(data)
}
