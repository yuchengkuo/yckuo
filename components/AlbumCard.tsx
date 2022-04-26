import { fade, fadeRight, scale, slideDown } from '@utils/animation'
import Image from 'next/image'
import { m } from 'framer-motion'
import { UpRightArrowIcon } from './Icons'
import { Album } from 'types/types'

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
    return <div className="bg-gray-4 dark:bg-grayDark-4 rounded w-60 h-60 animate-pulse" />
  return (
    <m.a
      href={album.spotifyUrl}
      title={album.title}
      target="_blank"
      rel="noopener noreferrer"
      className="px-4 pt-2 pb-4 -m-4 rounded-md hover:bg-gray-4 dark:hover:bg-grayDark-3 group relative"
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
        className="flex justify-between mb-2 body-font-settings font-medium text-gray-11 dark:text-grayDark-11"
      >
        <m.p className="tabular-nums text-xs">0{index + 1}</m.p>
        <m.p className="text-xs">
          {album.releaseYear} ⋅ {album.trackNum} tracks
        </m.p>
      </m.div>

      <m.div className="rounded overflow-hidden max-w-[240px] mb-3" layout>
        {album.imageUrl ? (
          <Image
            src={album.imageUrl}
            alt={'Album cover of ' + album.title + 'by' + album.artist}
            width={240}
            height={240}
            className="rounded overflow-hidden"
          />
        ) : (
          <div className="w-60 h-60 bg-gray-6 dark:bg-grayDark-6" />
        )}
        <m.div
          className="flex flex-col"
          initial="0"
          animate="1"
          transition={{ delayChildren: 0.3, staggerChildren: 0.06 }}
          layout
        >
          <div className="body-font-settings font-medium whitespace-nowrap">
            <m.p variants={fadeRight} className="text-base overflow-hidden overflow-ellipsis">
              {album.title}
            </m.p>
            <m.p
              variants={fadeRight}
              className="text-sm overflow-hidden overflow-ellipsis text-gray-11 dark:text-grayDark-11"
            >
              {album.artist}
            </m.p>
          </div>
        </m.div>
      </m.div>

      <m.div variants={scale} className="w-4 h-4 absolute right-4 bottom-4">
        <UpRightArrowIcon />
      </m.div>
    </m.a>
  )
}
