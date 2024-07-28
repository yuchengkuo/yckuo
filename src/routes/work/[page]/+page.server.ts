import { error } from '@sveltejs/kit'

import type { Work } from '$content'

export async function load({ params, fetch }) {
  const { page: slug } = params

  const res = await fetch(`/api/content/entry/${encodeURIComponent(`work/${slug}`)}`)
  if (!res.ok) error(404, 'Work not found or removed.')

  return (await res.json()) as Work
}
