import { getAllContentMeta } from '$lib/markdoc/utils'
import { error } from '@sveltejs/kit'
import { compareDesc } from 'date-fns'
import type { PageServerLoad } from './$types'

type Project = {
  title: string
  excerpt: string
  tag: string[]
  image: string[]
  slug: string
  link?: string
  time: string
}

export const load: PageServerLoad = async function () {
  const allProjects = getAllContentMeta('projects') as unknown as Project[]
  allProjects.sort((a, b) => compareDesc(new Date(a.time), new Date(b.time)))

  if (allProjects) return { allProjects }

  throw error(404)
}
