import { error } from '@sveltejs/kit'

import type { Note } from '$content'

export async function load({ fetch, params }) {
  const { page } = params

  const encodedPage = encodeURIComponent('note/' + page)
  const res = await fetch(`/api/content/entry/${encodedPage}`)
  if (!res.ok) error(404, `Note not found or removed.`)

  return (await res.json()) as Note
}
