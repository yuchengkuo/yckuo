import type { About } from '$content'

export async function load({ fetch }) {
  const data = (await fetch('/api/content/entry/about').then((res) =>
    res.json()
  )) as About

  return { ...data }
}
