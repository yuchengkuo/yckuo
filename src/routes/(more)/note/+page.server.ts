import type { Note } from '$content'

export async function load({ fetch }) {
  const notes = (await fetch('/api/content/collection/notes/desc').then((res) =>
    res.json()
  )) as Note[]

  return {
    notes
  }
}
