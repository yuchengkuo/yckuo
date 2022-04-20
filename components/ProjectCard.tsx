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
        className="p-4 -mx-4 block rounded hover:bg-gray-4 dark:hover:bg-grayDark-4 transition-colors duration-200 ease-out active:bg-gray-5 dark:active:bg-grayDark-5"
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
          {project.cover && (
            <div className="w-2/3 h-40 relative rounded bg-gray-3 dark:bg-grayDark-3 border border-gray-6 dark:border-grayDark-6 shadow">
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
            <div className="w-1/3 h-40 relative rounded bg-gray-3 dark:bg-grayDark-3 border border-gray-6 dark:border-grayDark-6 shadow">
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
