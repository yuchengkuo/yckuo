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
    <div className="mt-20">
      <h2 className="text-xl">Currently Playing</h2>
      <p className="text-sm font-freak freak-font-settings text-gray8 dark:text-gray6">Spotify</p>
      <div className="mt-4 font-apfel">
        {now && now.isPlaying ? (
          <div className="flex">
            <p>{(now && now.artist) || now.show}&nbsp;-&nbsp;</p>
            <a href={now.url} className="hover:underline">
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
    <div>
      <h2 className="text-xl">Stats</h2>
      <p className="text-sm font-freak freak-font-settings text-gray8 dark:text-gray6">
        This week's (so far) stats by Last.fm
      </p>
      <div className="body-font-settings mt-4">
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
    <m.div className="mt-20">
      <h2 className="text-xl">Weekly Top Albums</h2>
      {albums ? (
        handleArraySplit(albums, 4).map((items: Albums[], group) => (
          <div key={group} className="inline-flex flex-wrap gap-12 mt-6">
            <LayoutGroup>
              {items.map((album, i) => (
                <CardWithCover key={album.title} index={group * 4 + i} album={album} />
              ))}
            </LayoutGroup>
          </div>
        ))
      ) : (
        <div className="inline-grid grid-cols-4 gap-12 mt-6">
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
    <div className="mt-20 flex gap-10">
      <div className="w-1/3">
        <h2 className="text-xl">Recent Top Songs</h2>
        <p className="text-sm font-freak freak-font-settings text-gray8 dark:text-gray6">
          Most played songs this month
        </p>
        <ul className="mt-6">
          {tracks
            ? tracks.map((track, i) => <ListCard key={track.title} track={track} index={i + 1} />)
            : Array(5)
                .fill(1)
                .map((_, i) => <ListCard key={i} loading />)}
        </ul>
      </div>

      <div className="w-1/3">
        <h2 className="text-xl">Recent Top Artists</h2>
        <p className="text-sm font-freak freak-font-settings text-gray8 dark:text-gray6">
          Favorite artists this month
        </p>
        <ul className="mt-6">
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
    <Layout title="Listening">
      <LazyMotion features={domMax}>
        <NowPlaying />
        <div className="flex mt-20 gap-20">
          <Statistic />
          <div className="">
            <h2 className="text-xl">Category</h2>
          </div>
        </div>
        <TopAlbums />
        <TopSongsArtists />
      </LazyMotion>
    </Layout>
  )
}
