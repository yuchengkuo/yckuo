import { getAllContentMeta } from '$lib/markdoc/utils'
import type { RequestHandler } from '@sveltejs/kit'
import type { JSONObject } from '@sveltejs/kit/types/private'
import { compareDesc } from 'date-fns'

export const GET: RequestHandler = async function () {
  const allProjects = await getAllContentMeta('projects')

  allProjects.sort((a, b) => compareDesc(new Date(a.time), new Date(b.time)))

  return {
    status: 200,
    body: { allProjects } as JSONObject,
  }
}
