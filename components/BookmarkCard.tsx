import { fade, scale, slideDown } from '@utils/animation'
import { Bookmark } from 'types/types'
import { m } from 'framer-motion'
import { UpRightArrowIcon } from './Icons'

export default function BookmarkCard({ bookmark }: { bookmark: Bookmark }) {
  return (
    <m.a
      className="hover:bg-gray-4 dark:hover:bg-grayDark-4 active:bg-gray-5 dark:active:bg-grayDark-5 -mx-4 flex items-center rounded px-4 py-2 transition-colors duration-200"
      variants={{ ...fade, 1: { y: -4 } }}
      initial="0"
      whileInView="visible"
      whileHover="1"
      whileTap={{ scale: 0.99 }}
      href={bookmark.link}
      layout
      layoutId={bookmark.title}
    >
      <m.div>
        <p className="text-gray-11 dark:text-grayDark-11 inline-flex items-baseline text-sm font-medium body-font-settings">
          #{bookmark.tags[0]} • {bookmark.domain}
        </p>
        <h3>{bookmark.title}</h3>
        <m.p
          variants={slideDown}
          className="text-gray-11 dark:text-grayDark-11 text-sm font-medium line-clamp-1 body-font-settings"
        >
          {bookmark.excerpt}
        </m.p>
      </m.div>
      <m.div className="ml-auto h-4 w-4 shrink-0" variants={scale}>
        <UpRightArrowIcon />
      </m.div>
    </m.a>
  )
}
