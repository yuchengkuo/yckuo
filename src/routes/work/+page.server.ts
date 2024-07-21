import { type Work, type Project } from '$content'

export async function load({ fetch }) {
  const works = (await fetch(`/api/content/collection/works`).then((res) => res.json())) as Work[]
  const projects = (await fetch(`api/content/collection/projects`).then((res) =>
    res.json()
  )) as Project[]

  const data = [works, projects].flat()

  return { works: data }
}
