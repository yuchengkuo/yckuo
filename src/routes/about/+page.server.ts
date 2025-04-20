import type { Page } from '$content'

export async function load({ fetch }) {
  const data = (await fetch('/api/content/entry/about').then((res) => res.json())) as Page

  return { ...data }
}
