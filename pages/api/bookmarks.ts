import { getBookmarks } from '@utils/api/raindrop'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const bookmarkRes = await getBookmarks('20734001')
  const bookmarks = await bookmarkRes.json()
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=43200')
  return res.status(200).json(bookmarks.items)
}
