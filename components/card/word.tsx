import { Post, Project } from '.contentlayer/types'
import { RightArrowIcon, UpRightArrowIcon } from '@components/Icons'
import { fade, scale, slideDown } from '@utils/animation'
import { m } from 'framer-motion'
import Link from 'next/link'
import { Bookmark } from 'types/types'

export const PostCard = ({ post }: { post: Post }) => {
  return (
    <Link href={`/posts/${post.slug}`} passHref>
      <m.a
        className="px-4 -mx-4 py-2 flex items-center rounded hover:bg-gray/10 transition-colors duration-200"
        variants={{ ...fade, 1: { y: -4 } }}
        initial="0"
        whileInView="visible"
        whileHover="1"
        whileTap={{ scale: 0.99 }}
      >
        <div>
          <time className="text-sm font-medium body-font-settings text-secondary dark:text-darkSecondary">
            {new Date(post.date).toDateString().substring(4)}
          </time>
          <h2>{post.title}</h2>
        </div>
        <m.div className="w-4 h-4 ml-auto text-secondary dark:text-darkSecondary" variants={scale}>
          <RightArrowIcon />
        </m.div>
      </m.a>
    </Link>
  )
}

export const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link href={`/projects/${project.slug}`} passHref>
      <m.a
        className="p-4 -mx-4 block rounded hover:bg-gray/10 transition-colors duration-200 ease-out"
        variants={{ ...fade, 1: { y: -4 } }}
        initial="0"
        whileInView="visible"
        viewport={{ margin: '-20px' }}
        whileHover="1"
        whileTap={{ scale: 0.998 }}
      >
        <div className="flex justify-between">
          <time className="font-medium body-font-settings text-sm text-secondary dark:text-darkSecondary">
            {new Date(project.year).getFullYear()}
          </time>
          <m.div variants={scale} className="w-4 h-4 text-secondary dark:text-darkSecondary">
            <RightArrowIcon />
          </m.div>
        </div>
        <div>
          <h2 className="text-2xl">{project.title}</h2>
          <p className="font-medium body-font-settings text-sm text-secondary dark:text-darkSecondary">
            {project.subtitle}
          </p>
        </div>
        <div className="flex gap-4 mt-2">
          <div className="w-1/3 h-40 rounded bg-gray/30" />
          <div className="w-2/3 h-40 rounded bg-gray/30" />
        </div>
      </m.a>
    </Link>
  )
}

export const BookmarkCard = ({ bookmark }: { bookmark: Bookmark }) => {
  return (
    <m.a
      className="px-4 -mx-4 py-2 flex items-center rounded hover:bg-gray/10 transition-colors duration-200"
      variants={{ ...fade, 1: { y: -4 } }}
      initial="0"
      whileInView="visible"
      whileHover="1"
      whileTap={{ scale: 0.99 }}
      href={bookmark.link}
      layout
    >
      <m.div>
        <p className="text-sm font-medium body-font-settings text-secondary dark:text-darkSecondary">
          #{bookmark.tags[0]} • {bookmark.domain}
        </p>
        <h3>{bookmark.title}</h3>
        <m.p
          variants={slideDown}
          className="text-sm font-medium body-font-settings text-secondary dark:text-darkSecondary line-clamp-1"
        >
          {bookmark.excerpt}
        </m.p>
      </m.div>
      <m.div className="w-4 h-4 ml-auto text-secondary dark:text-darkSecondary" variants={scale}>
        <UpRightArrowIcon />
      </m.div>
    </m.a>
  )
}
