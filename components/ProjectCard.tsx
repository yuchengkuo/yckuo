import { fade, scale } from '@utils/animation'
import { Project, ProjectLink } from 'contentlayer/generated'
import Link from 'next/link'
import { m } from 'framer-motion'
import { RightArrowIcon } from './Icons'
import Image from 'next/image'
import { loader } from '@utils/image-loader'

export default function ProjectCard({ project }: { project: Project | ProjectLink }) {
  return (
    <Link href={project.type === 'Project' ? `/projects/${project.slug}` : project.url} passHref>
      <m.a
        className="hover:bg-gray-4 dark:hover:bg-grayDark-4 active:bg-gray-5 dark:active:bg-grayDark-5 -mx-4 block rounded p-4 transition-colors duration-200 ease-out"
        variants={{ ...fade, 1: { y: -4 } }}
        initial="0"
        whileInView="visible"
        viewport={{ margin: '-20px' }}
        whileHover="1"
        whileTap={{ scale: 0.998 }}
      >
        <div className="flex justify-between">
          <time className="text-gray-11 dark:text-grayDark-11 text-sm font-medium body-font-settings">
            {new Date(project.year).getFullYear()}
          </time>
          <m.div variants={scale} className="h-4 w-4">
            <RightArrowIcon />
          </m.div>
        </div>
        <div>
          <h2 className="text-2xl">{project.title}</h2>
          <p className="text-gray-11 dark:text-grayDark-11 text-sm font-medium body-font-settings">
            {project.subtitle}
          </p>
        </div>
        <div className="mt-2 flex gap-4">
          {project.cover && (
            <div className="bg-gray-3 dark:bg-grayDark-3 border-gray-6 dark:border-grayDark-6 relative h-40 w-2/3 rounded border shadow">
              <Image
                src={project.cover[0]}
                alt=""
                loader={loader}
                placeholder="blur"
                blurDataURL={project.type === 'Project' && project.blurDataURL[0]}
                objectFit="cover"
                layout="fill"
                sizes="30vw"
                className="rounded"
              />
            </div>
          )}
          {project.cover && (
            <div className="bg-gray-3 dark:bg-grayDark-3 border-gray-6 dark:border-grayDark-6 relative h-40 w-1/3 rounded border shadow">
              <Image
                src={project.cover[1]}
                alt=""
                loader={loader}
                placeholder="blur"
                blurDataURL={project.type === 'Project' && project.blurDataURL[1]}
                objectFit="cover"
                layout="fill"
                sizes="30vw"
                className="rounded"
              />
            </div>
          )}
        </div>
      </m.a>
    </Link>
  )
}
