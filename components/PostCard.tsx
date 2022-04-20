import { Post } from 'contentlayer/generated'
import Link from 'next/link'
import { m } from 'framer-motion'
import { fade, scale } from '@utils/animation'
import { RightArrowIcon } from './Icons'

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.slug}`} passHref>
      <m.a
        className="px-4 -mx-4 py-2 flex items-center rounded hover:bg-gray-3 dark:hover:bg-grayDark-3 active:bg-gray-4 dark:active:bg-grayDark-4 transition-colors duration-200"
        variants={{ ...fade, 1: { y: -4 } }}
        initial="0"
        whileInView="visible"
        whileHover="1"
        whileTap={{ scale: 0.99 }}
      >
        <div>
          <time className="text-sm font-medium body-font-settings text-gray-11 dark:text-grayDark-11">
            {new Date(post.date).toDateString().substring(4)}
          </time>
          <h2>{post.title}</h2>
        </div>
        <m.div className="w-4 h-4 ml-auto" variants={scale}>
          <RightArrowIcon />
        </m.div>
      </m.a>
    </Link>
  )
}
