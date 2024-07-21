import { dev } from '$app/environment'
import { error, json } from '@sveltejs/kit'

import * as all from '$content'
import type { Page } from '$content'

export async function GET({ params }) {
  const { key } = params

  const collection = Object.entries(all)
    .find(([k]) => k === key)
    ?.at(1)

  if (!collection) error(500, `Collection ${key} does not exist.`)

  /* Singular collection  */
  if (typeof collection === 'object') {
    return json(collection)
  }

  const data = (collection as unknown as Page[]) /* filter out drafts in production */
    .filter((page) => !page.draft || dev)

  return json(data)
}
