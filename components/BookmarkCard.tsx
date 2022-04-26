import { fade, scale, slideDown } from '@utils/animation'
import { Bookmark } from 'types/types'
import { m } from 'framer-motion'
import { UpRightArrowIcon } from './Icons'

export default function BookmarkCard({ bookmark }: { bookmark: Bookmark }) {
  return (
    <m.a
      className="px-4 -mx-4 py-2 flex items-center rounded hover:bg-gray-4 dark:hover:bg-grayDark-4 active:bg-gray-5 dark:active:bg-grayDark-5 transition-colors duration-200"
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
        <p className="inline-flex items-baseline text-sm font-medium body-font-settings text-gray-11 dark:text-grayDark-11">
          #{bookmark.tags[0]} • {bookmark.domain}
        </p>
        <h3>{bookmark.title}</h3>
        <m.p
          variants={slideDown}
          className="text-sm font-medium body-font-settings text-gray-11 dark:text-grayDark-11 line-clamp-1"
        >
          {bookmark.excerpt}
        </m.p>
      </m.div>
      <m.div className="w-4 h-4 ml-auto shrink-0" variants={scale}>
        <UpRightArrowIcon />
      </m.div>
    </m.a>
  )
}
