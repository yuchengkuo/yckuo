import { Post, Project } from '.contentlayer/types'
import { RightArrowIcon } from '@components/Icons'
import { fade, scale } from '@utils/animation'
import { domAnimation, LazyMotion, m } from 'framer-motion'
import Link from 'next/link'

export const PostCard = ({ post }: { post: Post }) => {
  return (
    <LazyMotion features={domAnimation}>
      <Link href={`/posts/${post.slug}`} passHref>
        <m.a
          className="px-4 -mx-4 py-2 flex items-center rounded hover:bg-gray7 hover:bg-opacity-10 transition-colors duration-200"
          variants={{ ...fade, visible: { opacity: 1 }, 1: { y: -4 } }}
          initial="0"
          whileInView="visible"
          whileHover="1"
          whileTap={{ scale: 0.99 }}
        >
          <div>
            <time className="text-sm font-freak freak-font-settings text-gray8 dark:text-gray6">
              {new Date(post.date).toDateString().substring(4)}
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

export const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link href={`/projects/${project.slug}`} passHref>
      <m.a
        className="p-4 -mx-4 block rounded hover:bg-gray7 hover:bg-opacity-10 transition-colors duration-200 ease-out"
        variants={{ ...fade, visible: { opacity: 1 }, 1: { y: -4 } }}
        initial="0"
        whileInView="visible"
        viewport={{ margin: '-20px' }}
        whileHover="1"
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex justify-between">
          <time className="font-freak freak-font-settings text-sm text-gray8 dark:text-gray6">
            {new Date(project.year).getFullYear()}
          </time>
          <m.div variants={scale} className="w-4 h-4 text-gray8 dark:text-gray6">
            <RightArrowIcon />
          </m.div>
        </div>
        <div>
          <h2 className="text-2xl">{project.title}</h2>
          <p className="font-freak freak-font-settings text-sm text-gray8 dark:text-gray6">
            {project.subtitle}
          </p>
        </div>
        <div className="flex gap-4 mt-2">
          <div className="w-1/3 h-40 rounded bg-gray7" />
          <div className="w-2/3 h-40 rounded bg-gray7" />
        </div>
      </m.a>
    </Link>
  )
}
