import type { Page } from '$content'

export async function load({ fetch }) {
  const data = (await fetch('api/content/entry/index').then((res) =>
    res.json()
  )) as Page

  return data
}
