import { getAllContentMeta } from '$lib/markdoc/utils'
import type { RequestHandler } from '@sveltejs/kit'
import type { JSONObject } from '@sveltejs/kit/types/private'

export const GET: RequestHandler = async function () {
  const allProjects = await getAllContentMeta('projects')

  return {
    status: 200,
    body: { allProjects } as JSONObject,
  }
}
