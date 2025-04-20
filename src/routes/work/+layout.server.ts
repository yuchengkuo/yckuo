import { type Work } from '$content'

export async function load({ fetch }) {
  const works = (await fetch(`/api/content/collection/works?sort=published:desc`).then((res) =>
    res.json()
  )) as Work[]

  return { works }
}
