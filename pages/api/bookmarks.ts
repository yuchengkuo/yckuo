import { getBookmarks } from '@utils/api/raindrop'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const bookmarkRes = await getBookmarks('20734001')
  const bookmarks = await bookmarkRes.json()
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=43200')
  const query = new URLSearchParams(req.query as any)
  // return res
  //   .status(200)
  //   .json(bookmarks.items.filter((b) => !!!req.query.tag || b.tags.includes(req.query.tag)))
  return res.status(200).json(bookmarks.items)
}
