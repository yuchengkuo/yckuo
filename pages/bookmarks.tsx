import { BookmarkCard } from '@components/card/word'
import Layout from '@components/layout/Layout'
import fetcher from '@utils/fetcher'
import { domMax, LayoutGroup, LazyMotion } from 'framer-motion'
import useSWR from 'swr'
import { Bookmark } from 'types/types'

export default function BookmarkPage() {
  const { data: bookmarks } = useSWR<Bookmark[]>('/api/bookmarks', fetcher)
  return (
    <Layout title="Bookmarks" animateChildren>
      <p className="body-font-settings">
        A little collection of interesting things on the internet.
      </p>
      <LazyMotion features={domMax}>
        <div className="flex flex-col gap-2 max-w-[720px] mt-8">
          {bookmarks
            ? bookmarks.map((bookmark) => (
                <LayoutGroup key={bookmark.title}>
                  <BookmarkCard bookmark={bookmark} />
                </LayoutGroup>
              ))
            : Array(6)
                .fill(1)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-20 mb-4 bg-gray-5 dark:bg-grayDark-5 animate-pulse duration-500"
                  />
                ))}
        </div>
      </LazyMotion>
    </Layout>
  )
}
