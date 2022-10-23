import { getContentBySlug, getDataBySlug } from '$lib/content/utils'
import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async function ({ params, url }) {
  const { slug } = params

  if (url.searchParams.has('data')) {
    const data = getDataBySlug(slug)

    return json({ data }, { headers: { 'content-type': 'application/json;' } })
  }

  const { content, ...frontmatter } = await getContentBySlug(slug)

  return json({ content, frontmatter }, { headers: { 'content-type': 'application/json;' } })
}
