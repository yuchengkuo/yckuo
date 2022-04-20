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
        <div className="flex flex-col gap-2 max-w-[720px] mt-8">
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
                      className="h-20 mb-4 bg-gray-5 dark:bg-grayDark-5 animate-pulse duration-500"
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
      className="flex gap-2 mt-6 phone:-mx-5 phone:px-5 overflow-scroll scrollbar-hide"
    >
      {filters.map((filter) => (
        <ToggleGroup.Item
          key={filter}
          className="text-sm w-fit whitespace-nowrap font-medium body-font-settings px-2.5 py-1 rounded-full border border-gray-7 hover:border-gray-8 hover:bg-gray-3 dark:hover:bg-grayDark-3 dark:border-grayDark-7 dark:hover:border-grayDark-8 state:bg-indigo-9 state:text-gray-1 dark:state:bg-indigoDark-10 transition-all duration-200"
          value={filter}
        >
          {filter}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  )
}
