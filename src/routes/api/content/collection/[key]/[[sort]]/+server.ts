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

  /* Sort by update date */
  if (sort === 'asc' || sort === 'desc') {
    data = data.sort((a, b) => {
      const dateA = new Date(a.updated).getTime()
      const dateB = new Date(b.updated).getTime()
      return sort === 'asc' ? dateA - dateB : dateB - dateA
    })
  }

  return json(data)
}
