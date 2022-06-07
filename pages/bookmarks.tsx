import BookmarkCard from '@components/BookmarkCard'
import Layout from '@components/layout/Layout'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import fetcher from '@utils/fetcher'
import { domMax, LayoutGroup, LazyMotion } from 'framer-motion'
import { Dispatch, useState } from 'react'
import useSWR from 'swr'
import { Bookmark } from 'types/types'

export default function BookmarkPage() {
  const [tag, setTag] = useState('')
  const query = new URLSearchParams({ tag: tag })
  const { data: bookmarks } = useSWR<Bookmark[]>(`/api/bookmarks`, fetcher)
  return (
    <Layout title="Bookmarks" animateChildren>
      <p className="body-font-settings">
        A little collection of interesting things on the internet.
      </p>
      {bookmarks && (
        <FilterToggle
          filters={bookmarks.map((b) => b.tags[0]).filter((t, i, arr) => arr.indexOf(t) === i)}
          setFilter={setTag}
        />
      )}
      <LazyMotion features={domMax}>
        <div className="mt-8 flex max-w-[720px] flex-col gap-2">
          <LayoutGroup>
            {bookmarks
              ? bookmarks
                  .filter((b) => !!!tag || b.tags.includes(tag))
                  .map((bookmark) => <BookmarkCard key={bookmark.title} bookmark={bookmark} />)
              : Array(6)
                  .fill(1)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="bg-gray-5 dark:bg-grayDark-5 mb-4 h-20 animate-pulse duration-500"
                    />
                  ))}
          </LayoutGroup>
        </div>
      </LazyMotion>
    </Layout>
  )
}

function FilterToggle({ filters, setFilter }: { filters: string[]; setFilter: Dispatch<string> }) {
  return (
    <ToggleGroup.Root
      type="single"
      onValueChange={(v) => setFilter(v)}
      className="mt-6 flex gap-2 overflow-scroll scrollbar-hide phone:-mx-5 phone:px-5"
    >
      {filters.map((filter) => (
        <ToggleGroup.Item
          key={filter}
          className="border-gray-7 hover:border-gray-8 hover:bg-gray-3 dark:hover:bg-grayDark-3 dark:border-grayDark-7 dark:hover:border-grayDark-8 state:bg-indigo-9 state:text-gray-1 dark:state:bg-indigoDark-10 w-fit whitespace-nowrap rounded-full border px-2.5 py-1 text-sm font-medium transition-all duration-200 body-font-settings"
          value={filter}
        >
          {filter}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  )
}
