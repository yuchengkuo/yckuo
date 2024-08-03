import { error } from '@sveltejs/kit'

import type { Page } from '$content'

export async function load({ params, fetch }) {
  const { page: slug } = params

  const res = await fetch(`/api/content/entry/${encodeURIComponent(slug)}`)
  if (!res.ok) error(404, 'Page not found or removed.')

  return (await res.json()) as Page
}
