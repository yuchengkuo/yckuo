import { dev } from '$app/environment'
import { error, json } from '@sveltejs/kit'

import * as all from '$content'

export async function GET({ params }) {
  const { slug } = params

  const entries = Object.values(all).flat()
  const entry = entries
    /* filter out drafts in production */
    .filter((entry) => !entry.draft || dev)
    .find((entry) => entry.slug === slug)

  if (!entry) error(500, `Entry /${slug} does not exist.`)
  return json(entry)
}
