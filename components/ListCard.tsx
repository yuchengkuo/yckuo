import { fade, scale } from '@utils/animation'
import { UpRightArrowIcon } from './Icons'
import { m } from 'framer-motion'
import splitbee from '@splitbee/web'

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
      <div className="bg-gray-4 dark:bg-grayDark-3 mb-2 h-10 w-[480px] max-w-full animate-pulse rounded" />
    )
  return (
    <m.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => splitbee.track('music', { destination: url })}
      className="hover:bg-gray-4 dark:hover:bg-grayDark-4 -mx-2 flex min-w-fit flex-wrap items-baseline gap-4 rounded p-2 font-medium transition-colors ease-out body-font-settings phone:gap-2"
      variants={{ ...fade, 1: { y: -4 } }}
      initial="0"
      animate="visible"
      whileHover="1"
      whileTap={{ scale: 0.99 }}
    >
      <p className="text-gray-11 dark:text-grayDark-11 text-xs tabular-nums">0{index}</p>
      <p className="text-base">{title}</p>
      <p className="text-gray-11 dark:text-grayDark-11 text-sm phone:w-full phone:pl-6">
        {subtitle}
      </p>
      <m.div variants={scale} className="ml-auto h-4 w-4 align-baseline phone:hidden">
        <UpRightArrowIcon />
      </m.div>
    </m.a>
  )
}
