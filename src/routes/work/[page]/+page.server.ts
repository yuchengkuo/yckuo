import { error } from '@sveltejs/kit'

import type { Work } from '$content'

export async function load({ params, fetch }) {
  const { page: slug } = params
  const data = (await fetch(
    `/api/content/entry/${encodeURIComponent(`work/${slug}`)}`
  ).then((res) => res.json())) as Work

  if (!data) error(404)
  return data
}
