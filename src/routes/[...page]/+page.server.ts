import { error } from '@sveltejs/kit'

import type { Page } from '$content'

export async function load({ params, fetch }) {
  const { page: slug } = params
  const data = (await fetch(`/api/content/entry/${encodeURIComponent(slug)}`).then((res) =>
    res.json()
  )) as Page

  if (!data) error(404)
  return data
}
