import { getContentBySlug, getDataBySlug } from '$lib/markdoc/utils'
import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async function ({ params, url }) {
  const { slug } = params

  if (url.searchParams.has('data')) {
    const data = getDataBySlug(slug)

    if (data) {
      return new Response(JSON.stringify({ data }))
    }
  }

  const { content, frontmatter } = getContentBySlug(slug)

  if (content) {
    return new Response(JSON.stringify({ content, frontmatter }), {
      headers: { 'content-type': 'application/json;' },
    })
  }

  return new Response(undefined, { status: 404 })
}
