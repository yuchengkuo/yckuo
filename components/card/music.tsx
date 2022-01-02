import { UpRightArrowIcon } from '@components/Icons'
import { fade, fadeRight, scale } from '@utils/animation'
import { m } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Albums, Artists, Tracks } from 'types/types'

export const CardWithCover = ({
  album,
  index,
  loading = false,
}: {
  album?: Albums
  index?: number
  loading?: boolean
}) => {
  const [isVisible, setVisible] = useState(false)
  useEffect(() => {
    if (window.innerWidth < 700) setVisible(true)
  })
  if (loading) return <div className="bg-gray7/50 rounded w-40 h-40 animate-pulse" />
  return (
    <m.a
      href={album.spotifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-6 p-4 -mx-4 rounded hover:bg-gray7/10"
      variants={fade}
      initial="0"
      animate="1"
      whileInView="1"
      transition={{ type: 'spring', damping: 20, mass: 1 }}
      whileTap={{ scale: 0.94 }}
      onHoverStart={() => setVisible(true)}
      onHoverEnd={() => setVisible(false)}
      layout
    >
      <m.div
        layout
        className="bg-gray5 rounded overflow-hidden w-40 h-40 flex-none phone:w-32 phone:h-32"
      >
        <Image src={album.imageUrl} width={160} height={160} />
      </m.div>
      {isVisible && (
        <m.div
          className="inline-flex flex-col py-px w-56 flex-none"
          initial="0"
          animate="1"
          transition={{ delayChildren: 0.3, staggerChildren: 0.06 }}
          layout
        >
          <m.div variants={fadeRight} className="mb-auto inline-flex justify-between">
            <m.p className="font-freak freak-font-settings text-xs text-gray8 dark:text-gray6">
              {album.releaseDate} • {album.trackNum} tracks
            </m.p>
            <m.div className="w-4 h-4 text-gray8 dark:text-gray6">
              <UpRightArrowIcon />
            </m.div>
          </m.div>
          <m.p
            variants={fadeRight}
            className="font-freak inline-block freak-font-settings text-xs text-gray8 dark:text-gray6"
          >
            0{index + 1}
          </m.p>
          <m.p variants={fadeRight} className="body-font-settings font-medium inline-block">
            {album.title}
          </m.p>
          <m.p
            variants={fadeRight}
            className="body-font-settings text-sm inline-block text-gray8 dark:text-gray6"
          >
            {album.artist}
          </m.p>
        </m.div>
      )}
    </m.a>
  )
}

export const ListCard = ({
  track,
  artist,
  index,
  loading = false,
}: {
  track?: Tracks
  artist?: Artists
  index?: number
  loading?: boolean
}) => {
  if (loading) return <div className="bg-gray7/50 rounded h-10 mb-2 animate-pulse" />
  return (
    <m.a
      href={(track && track.songUrl) || artist.external_urls}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-baseline gap-4 p-2 -mx-2 rounded hover:bg-gray7/10 transition-colors ease-out"
      variants={{ 1: { y: -4 } }}
      initial="0"
      whileHover="1"
      whileTap={{ scale: 0.98 }}
    >
      <p className="font-freak freak-font-settings text-xs text-gray8 dark:text-gray6">0{index}</p>
      <p className="body-font-settings font-medium">{(track && track.title) || artist.name}</p>
      <p className="body-font-settings text-sm text-gray8 dark:text-gray6">
        {(track && track.artists) || artist.genres}
      </p>
      <m.div variants={scale} className="ml-auto w-4 h-4 text-gray8 dark:text-gray6 align-baseline">
        <UpRightArrowIcon />
      </m.div>
    </m.a>
  )
}
