import { fade, scale } from '@utils/animation'
import { UpRightArrowIcon } from './Icons'
import { m } from 'framer-motion'

export default function ListCard({
  url,
  title,
  subtitle,
  index,
  loading = false,
}: {
  url?: string
  title?: string
  subtitle?: string
  index?: number
  loading?: boolean
}) {
  if (loading)
    return (
      <div className="bg-gray-4 dark:bg-grayDark-3 rounded w-[480px] max-w-full h-10 mb-2 animate-pulse" />
    )
  return (
    <m.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-baseline min-w-fit flex-wrap gap-4 phone:gap-2 p-2 -mx-2 rounded hover:bg-gray-4 dark:hover:bg-grayDark-4 transition-colors ease-out body-font-settings font-medium"
      variants={{ ...fade, 1: { y: -4 } }}
      initial="0"
      animate="visible"
      whileHover="1"
      whileTap={{ scale: 0.99 }}
    >
      <p className="text-xs text-gray-11 dark:text-grayDark-11 tabular-nums">0{index}</p>
      <p className="text-base">{title}</p>
      <p className="text-sm text-gray-11 dark:text-grayDark-11 phone:w-full phone:pl-6">
        {subtitle}
      </p>
      <m.div variants={scale} className="ml-auto w-4 h-4 align-baseline phone:hidden">
        <UpRightArrowIcon />
      </m.div>
    </m.a>
  )
}
