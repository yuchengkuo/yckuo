import { Post } from '.contentlayer/types'
import { RightArrowIcon } from '@components/Icons'
import { fade, scale } from '@utils/animation'
import { domAnimation, LazyMotion, m } from 'framer-motion'
import Link from 'next/link'

export const PostCard = ({ post }: { post: Post }) => {
  return (
    <LazyMotion features={domAnimation}>
      <Link href={`/posts/${post.slug}`} passHref>
        <m.a
          variants={{ ...fade, visible: { opacity: 1 }, 1: { y: -4 } }}
          className="px-4 -mx-4 py-2 flex items-center rounded hover:bg-gray7 hover:bg-opacity-10 transition-colors duration-200"
          initial="0"
          whileInView="visible"
          whileHover="1"
          whileTap={{ scale: 0.98 }}
        >
          <div className="">
            <time className="text-sm font-freak freak-font-settings text-gray8 dark:text-gray6">
              {new Date(post.date).toDateString()}
            </time>
            <h2 className="text-2xl">{post.title}</h2>
          </div>
          <m.div className="w-5 h-5 ml-auto text-gray8 dark:text-gray6" variants={scale}>
            <RightArrowIcon />
          </m.div>
        </m.a>
      </Link>
    </LazyMotion>
  )
}
