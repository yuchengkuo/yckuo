import { CardWithCover, ListCard } from '@components/card/music'
import Layout from '@components/layout/Layout'
import fetcher from '@utils/fetcher'
import { domMax, LayoutGroup, LazyMotion, m } from 'framer-motion'
import useSWR from 'swr'
import { Albums, Artists, NowPlayingTrack, Stats, Tracks } from 'types/types'

function handleArraySplit(arr: any[], size: number) {
  const res = []
  for (let i = 0; i < arr.length; i += size) {
    const chunk = arr.slice(i, i + size)
    res.push(chunk)
  }
  return res
}

function NowPlaying() {
  const { data: now } = useSWR<NowPlayingTrack>('/api/now-playing', fetcher)
  return (
    <div className="basis-[33.33%]">
      <h2>Currently Playing</h2>
      <p className="font-spectral italic text-gray8 dark:text-gray6">Spotify</p>
      <div className="mt-4 phone:mt-2 font-apfel">
        {now && now.isPlaying ? (
          <div className="flex flex-wrap">
            <p>{(now && now.artist) || now.show}&nbsp;-&nbsp;</p>
            <a
              href={now.url}
              className="underline decoration-gray7 hover:decoration-inherit transition-all duration-200 ease-out"
            >
              {now.title}
            </a>
          </div>
        ) : (
          <p>Currently Offline</p>
        )}
      </div>
    </div>
  )
}

function Statistic() {
  const { data: stats } = useSWR<Stats>('/api/stats', fetcher)
  return (
    <div className="basis-[33.33%]">
      <h2>Stats</h2>
      <p className="font-spectral italic text-gray8 dark:text-gray6">
        This week's (so far) stats by Last.fm
      </p>
      <div className="body-font-settings mt-4 phone:mt-2">
        {stats ? (
          <>
            <p>{stats.tracks} plays</p>
            <p>{stats.albums} albums</p>
            <p>{stats.artists} artists</p>
          </>
        ) : (
          <div className="animate-pulse">
            <p>--- plays</p>
            <p>--- albums</p>
            <p>--- artists</p>
          </div>
        )}
      </div>
    </div>
  )
}

function TopAlbums() {
  const { data: albums } = useSWR<Albums[]>('/api/top-albums', fetcher)
  return (
    <m.div className="mt-16 phone:mt-8">
      <h2>Weekly Top Albums</h2>
      <p className="font-spectral italic text-gray8 dark:text-gray6">
        A little album chart for this week.
      </p>
      {albums ? (
        handleArraySplit(albums, 4).map((items: Albums[], group) => (
          <div key={group} className="inline-flex flex-wrap gap-12 mt-6 phone:gap-4 phone:mt-3">
            <LayoutGroup>
              {items.map((album, i) => (
                <CardWithCover key={album.title} index={group * 4 + i} album={album} />
              ))}
            </LayoutGroup>
          </div>
        ))
      ) : (
        <div className="inline-flex flex-wrap gap-12 mt-6 phone:gap-4 phone:mt-3">
          {Array(8)
            .fill(1)
            .map((i) => (
              <CardWithCover key={i} loading />
            ))}
        </div>
      )}
    </m.div>
  )
}

function TopSongsArtists() {
  const { data: tracks } = useSWR<Tracks[]>('/api/top-tracks', fetcher)
  const { data: artists } = useSWR<Artists[]>('/api/top-artists', fetcher)

  return (
    <div className="mt-16 phone:mt-8 flex gap-10 phone:flex-col">
      <div className="basis-[33.33%]">
        <h2>Recent Top Songs</h2>
        <p className="font-spectral italic text-gray8 dark:text-gray6">
          Most played songs this month
        </p>
        <ul className="mt-6 phone:mt-3">
          {tracks
            ? tracks.map((track, i) => <ListCard key={track.title} track={track} index={i + 1} />)
            : Array(5)
                .fill(1)
                .map((_, i) => <ListCard key={i} loading />)}
        </ul>
      </div>

      <div className="basis-[33.33%]">
        <h2>Recent Top Artists</h2>
        <p className="font-spectral italic text-gray8 dark:text-gray6">
          Favorite artists this month
        </p>
        <ul className="mt-6 phone:mt-3">
          {artists
            ? artists.map((artist, i) => (
                <ListCard key={artist.name} artist={artist} index={i + 1} />
              ))
            : Array(5)
                .fill(1)
                .map((_, i) => <ListCard key={i} loading />)}
        </ul>
      </div>
    </div>
  )
}

export default function ListeningPage() {
  return (
    <Layout title="Listening" subtitle="What I've been listening" animateChildren>
      <LazyMotion features={domMax}>
        <p className="text-lg body-font-settings text-gray10 dark:text-gray4 w-[500px]">
          A list of recent favorite music and artist.🎧
        </p>
        <TopSongsArtists />
        <div className="flex mt-16 phone:mt-8 gap-10">
          <Statistic />
          <NowPlaying />
        </div>
        <TopAlbums />
      </LazyMotion>
    </Layout>
  )
}
