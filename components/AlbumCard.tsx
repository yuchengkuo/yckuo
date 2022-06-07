import { fade, fadeRight, scale, slideDown } from '@utils/animation'
import Image from 'next/image'
import { m } from 'framer-motion'
import { UpRightArrowIcon } from './Icons'
import { Album } from 'types/types'
import splitbee from '@splitbee/web'

export default function AlbumCard({
  album,
  index,
  loading = false,
}: {
  album?: Album
  index?: number
  loading?: boolean
}) {
  if (loading)
    return <div className="bg-gray-4 dark:bg-grayDark-4 h-60 w-60 animate-pulse rounded" />
  return (
    <m.a
      href={album.spotifyUrl}
      onClick={() => splitbee.track('music', { destination: album.spotifyUrl })}
      title={album.title}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:bg-gray-4 dark:hover:bg-grayDark-3 group relative -m-4 rounded-md px-4 pt-2 pb-4"
      variants={{ ...fade, 1: { y: -4 } }}
      initial="0"
      animate="visible"
      whileInView="visible"
      whileTap={{ scale: 0.99 }}
      whileHover="1"
      layout
    >
      <m.div
        variants={slideDown}
        className="text-gray-11 dark:text-grayDark-11 mb-2 flex justify-between font-medium body-font-settings"
      >
        <m.p className="text-xs tabular-nums">0{index + 1}</m.p>
        <m.p className="text-xs">
          {album.releaseYear} ⋅ {album.trackNum} tracks
        </m.p>
      </m.div>

      <m.div className="mb-3 max-w-[240px] overflow-hidden rounded" layout>
        {album.imageUrl ? (
          <Image
            src={album.imageUrl}
            alt={'Album cover of ' + album.title + 'by' + album.artist}
            width={240}
            height={240}
            className="overflow-hidden rounded"
          />
        ) : (
          <div className="bg-gray-6 dark:bg-grayDark-6 h-60 w-60" />
        )}
        <m.div
          className="flex flex-col"
          initial="0"
          animate="1"
          transition={{ delayChildren: 0.3, staggerChildren: 0.06 }}
          layout
        >
          <div className="whitespace-nowrap font-medium body-font-settings">
            <m.p variants={fadeRight} className="overflow-hidden overflow-ellipsis text-base">
              {album.title}
            </m.p>
            <m.p
              variants={fadeRight}
              className="text-gray-11 dark:text-grayDark-11 overflow-hidden overflow-ellipsis text-sm"
            >
              {album.artist}
            </m.p>
          </div>
        </m.div>
      </m.div>

      <m.div variants={scale} className="absolute right-4 bottom-4 h-4 w-4">
        <UpRightArrowIcon />
      </m.div>
    </m.a>
  )
}
