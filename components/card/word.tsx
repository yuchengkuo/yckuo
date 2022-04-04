import { MicroBlog, Post, Project, ProjectLink } from '.contentlayer/generated'
import { RightArrowIcon, UpRightArrowIcon } from '@components/Icons'
import { fade, scale, slideDown } from '@utils/animation'
import { loader } from '@utils/image-loader'
import { format, getUnixTime, parseISO } from 'date-fns'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { m } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Bookmark } from 'types/types'
import MDXComponents from '@components/MDXComp'

export const PostCard = ({ post }: { post: Post }) => {
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

export const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link href={`/projects/${project.slug}`} passHref>
      <m.a
        className="p-4 -mx-4 block rounded hover:bg-gray-3 dark:hover:bg-grayDark-3 transition-colors duration-200 ease-out active:bg-gray-4 dark:active:bg-grayDark-4"
        variants={{ ...fade, 1: { y: -4 } }}
        initial="0"
        whileInView="visible"
        viewport={{ margin: '-20px' }}
        whileHover="1"
        whileTap={{ scale: 0.998 }}
      >
        <div className="flex justify-between">
          <time className="font-medium body-font-settings text-sm text-gray-11 dark:text-grayDark-11">
            {new Date(project.year).getFullYear()}
          </time>
          <m.div variants={scale} className="w-4 h-4">
            <RightArrowIcon />
          </m.div>
        </div>
        <div>
          <h2 className="text-2xl">{project.title}</h2>
          <p className="font-medium body-font-settings text-sm text-gray-11 dark:text-grayDark-11">
            {project.subtitle}
          </p>
        </div>
        <div className="flex gap-4 mt-2">
          <div className="w-2/3 h-40 relative rounded bg-gray-3 dark:bg-grayDark-3 border border-gray-6 dark:border-grayDark-6 shadow">
            {project.cover && (
              <Image
                src={project.cover[0]}
                loader={loader}
                placeholder="blur"
                blurDataURL={project.blurDataURL[0]}
                objectFit="cover"
                layout="fill"
                sizes="30vw"
                className="rounded"
              />
            )}
          </div>
          <div className="w-1/3 h-40 relative rounded bg-gray-3 dark:bg-grayDark-3 border border-gray-6 dark:border-grayDark-6 shadow">
            {project.cover && (
              <Image
                src={project.cover[1]}
                loader={loader}
                placeholder="blur"
                blurDataURL={project.blurDataURL[1]}
                objectFit="cover"
                layout="fill"
                sizes="30vw"
                className="rounded"
              />
            )}
          </div>
        </div>
      </m.a>
    </Link>
  )
}

export const ProjectLinkCard = ({ projectLink }: { projectLink: ProjectLink }) => {
  return (
    <m.a
      href={projectLink.url}
      className="p-4 -mx-4 block rounded hover:bg-gray-3 dark:hover:bg-grayDark-3 transition-colors duration-200 ease-out active:bg-gray-4 dark:active:bg-grayDark-4"
      variants={{ ...fade, 1: { y: -4 } }}
      initial="0"
      whileInView="visible"
      viewport={{ margin: '-20px' }}
      whileHover="1"
      whileTap={{ scale: 0.998 }}
    >
      <div className="flex justify-between">
        <time className="font-medium body-font-settings text-sm text-gray-11 dark:text-grayDark-11">
          {new Date(projectLink.year).getFullYear()}
        </time>
        <m.div variants={scale} className="w-4 h-4">
          <UpRightArrowIcon />
        </m.div>
      </div>
      <div>
        <h2 className="text-2xl">{projectLink.title}</h2>
        <p className="font-medium body-font-settings text-sm text-gray-11 dark:text-grayDark-11">
          {projectLink.subtitle}
        </p>
      </div>
      <div className="flex gap-4 mt-2">
        <div className="w-2/3 h-40 relative rounded bg-gray-3 dark:bg-grayDark-3 border border-gray-6 dark:border-grayDark-6 shadow">
          {projectLink.cover && (
            <Image
              src={projectLink.cover[0]}
              loader={loader}
              // placeholder="blur"
              // blurDataURL={projectLink.blurDataURL[0]}
              objectFit="cover"
              layout="fill"
              sizes="30vw"
              className="rounded"
            />
          )}
        </div>
        <div className="w-1/3 h-40 relative rounded bg-gray-3 dark:bg-grayDark-3 border border-gray-6 dark:border-grayDark-6 shadow">
          {projectLink.cover && (
            <Image
              src={projectLink.cover[1]}
              loader={loader}
              // placeholder="blur"
              // blurDataURL={projectLink.blurDataURL[1]}
              objectFit="cover"
              layout="fill"
              sizes="30vw"
              className="rounded"
            />
          )}
        </div>
      </div>
    </m.a>
  )
}

export const BookmarkCard = ({ bookmark }: { bookmark: Bookmark }) => {
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

export const MicroCard = ({ micro }: { micro: MicroBlog }) => {
  const Content = useMDXComponent(micro.content.code)
  return (
    <div
      className="scroll-mt-20 max-w-[48ch] pb-12 phone:pb-6 not-last:border-b  border-gray-6 dark:border-grayDark-6"
      id={`${getUnixTime(parseISO(micro.date))}`}
    >
      <Link href={`/micro/#${getUnixTime(parseISO(micro.date))}`} passHref>
        <a>
          <time className="text-sm font-medium body-font-settings text-gray-11 dark:text-grayDark-11">
            {format(parseISO(micro.date), 'MMM dd, yyyy')}
          </time>
        </a>
      </Link>
      <h3 className="">{micro.title}</h3>
      <div className="flex gap-2 text-sm font-medium body-font-settings text-indigo-10 dark:text-indigoDark-11">
        {micro.tag && micro.tag.map((t) => <p>#{t}</p>)}
      </div>
      <div className="body-font-settings mt-2 micro">
        <Content components={MDXComponents} />
      </div>
    </div>
  )
}
