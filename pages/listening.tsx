import AlbumCard from '@components/AlbumCard'
import Layout from '@components/layout/Layout'
import ListCard from '@components/ListCard'
import fetcher from '@utils/fetcher'
import { domMax, LayoutGroup, LazyMotion, m } from 'framer-motion'
import useSWR from 'swr'
import { Album, Artist, NowPlayingTrack, Stats, Track } from 'types/types'

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
    <div className="">
      <h2>Currently</h2>
      <p className="font-spectral text-base italic text-secondary dark:text-darkSecondary">
        Spotify
      </p>
      <div className="font-apfel mt-2 phone:mt-1">
        {now && now.isPlaying ? (
          <div className="flex flex-wrap">
            <p>{(now && now.artist) || now.show}&nbsp;-&nbsp;</p>
            <a
              href={now.url}
              className="underline decoration-gray7/70 hover:decoration-inherit transition-all duration-200 ease-out"
            >
              {now.title}
            </a>
          </div>
        ) : (
          <p>Offline for now...</p>
        )}
      </div>
    </div>
  )
}

function Statistic() {
  const { data: stats } = useSWR<Stats>('/api/stats', fetcher)
  return (
    <div className="mt-16 phone:mt-8">
      <h2>Stats</h2>
      <p className="font-spectral italic text-base text-secondary dark:text-darkSecondary">
        This week&apos;s (so far) stats by Last.fm
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
  const { data: albums } = useSWR<Album[]>('/api/top-albums', fetcher)
  return (
    <m.div className="mt-16 phone:mt-8">
      <h2>Weekly Top Albums</h2>
      <p className="font-spectral text-base italic text-secondary dark:text-darkSecondary">
        Current album hooks
      </p>
      <div className="flex flex-wrap gap-12 phone:row-gap-2 mt-8 phone:mt-2 max-w-7xl">
        {albums
          ? albums.map((album, index) => (
              <LayoutGroup key={album.spotifyUrl}>
                <AlbumCard index={index} album={album} />
              </LayoutGroup>
            ))
          : Array(8)
              .fill(1)
              .map((_, i) => <AlbumCard key={i} loading />)}
      </div>
    </m.div>
  )
}

function TopSongs() {
  const { data: tracks } = useSWR<Track[]>('/api/top-tracks', fetcher)
  return (
    <div className="mt-16 phone:mt-8 flex flex-col items-start">
      <h2>Recent Top Songs</h2>
      <p className="font-spectral text-base italic text-secondary dark:text-darkSecondary">
        Most played songs this month
      </p>
      <ul className="mt-2 phone:mt-1 w-fit max-w-full">
        {tracks
          ? tracks.map((track, i) => (
              <ListCard
                key={track.title}
                title={track.title}
                subtitle={track.artists}
                url={track.songUrl}
                index={i + 1}
              />
            ))
          : Array(5)
              .fill(1)
              .map((_, i) => <ListCard key={i} loading />)}
      </ul>
    </div>
  )
}

function TopArtists() {
  const { data: artists } = useSWR<Artist[]>('/api/top-artists', fetcher)
  return (
    <div className="mt-16 phone:mt-8 flex flex-col items-start">
      <h2>Recent Top Artists</h2>
      <p className="font-spectral italic text-base text-secondary dark:text-darkSecondary">
        Favorite artists this month
      </p>
      <ul className="mt-2 phone:mt-1 w-fit max-w-full">
        {artists
          ? artists.map((artist, i) => (
              <ListCard
                key={artist.name}
                title={artist.name}
                subtitle={artist.genres}
                url={artist.external_urls}
                index={i + 1}
              />
            ))
          : Array(5)
              .fill(1)
              .map((_, i) => <ListCard key={i} loading />)}
      </ul>
    </div>
  )
}
export default function ListeningPage() {
  return (
    <Layout title="Listening" subtitle="A list of recent favorite 🎧" animateChildren>
      <LazyMotion features={domMax}>
        <NowPlaying />
        <TopSongs />
        <TopAlbums />
        <TopArtists />
      </LazyMotion>
    </Layout>
  )
}
