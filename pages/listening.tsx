import { CardWithCover, ListCard } from '@components/card/music';
import Layout from '@components/layout/Layout';
import fetcher from '@utils/fetcher';
import { domMax, LayoutGroup, LazyMotion, m } from 'framer-motion';
import { GetStaticProps } from 'next';
import useSWR from 'swr';
import { Albums, Artists, NowPlayingTrack, Tracks } from 'types/types';

export default function ListeningPage() {
  const { data: albums } = useSWR<Albums[]>('/api/top-albums', fetcher);
  const { data: tracks } = useSWR<Tracks[]>('/api/top-tracks', fetcher);
  const { data: artists } = useSWR<Artists[]>('/api/top-artists', fetcher);
  const { data: now } = useSWR<NowPlayingTrack>('/api/now-playing', fetcher);
  return (
    <Layout title="Listening">
      <LazyMotion features={domMax}>
        <p className="font-apfel mt-4">
          {now && now.isPlaying
            ? `Currently: ${(now && now.artist) || now.show} - ${now.title}`
            : `Currently Offline`}
        </p>

        <div className="mt-20">
          <h2 className="text-xl">Category</h2>
        </div>

        <div className="mt-20">
          <h2 className="text-xl mb-4">Stats</h2>
          <p>1234 plays</p>
          <p>45 albums</p>
          <p>36 artists</p>
        </div>

        <m.div
          className="mt-20"
          initial="0"
          whileInView="1"
          viewport={{ amount: 0.25 }}
          transition={{ staggerChildren: 0.02 }}
        >
          <h2 className="text-xl">Weekly Top Albums</h2>
          <div className="inline-flex flex-wrap gap-12">
            <LayoutGroup>
              {albums &&
                albums
                  .slice(0, 4)
                  .map((album, i) => <CardWithCover key={album.title} index={i} album={album} />)}
            </LayoutGroup>
          </div>
          <div className="inline-flex flex-wrap mt-6 gap-12">
            <LayoutGroup>
              {albums &&
                albums
                  .slice(4, 8)
                  .map((album, i) => (
                    <CardWithCover key={album.title} index={i + 4} album={album} />
                  ))}
            </LayoutGroup>
          </div>
        </m.div>

        <div className="mt-20 flex gap-5">
          <div className="w-1/3">
            <h2 className="text-xl">Recent Top Songs</h2>
            <ul className="mt-6">
              {tracks && tracks.map((track, i) => <ListCard track={track} index={i + 1} />)}
            </ul>
          </div>

          <div className="w-1/3">
            <h2 className="text-xl">Recent Top Artists</h2>
            <ul className="mt-6">
              {artists && artists.map((artist, i) => <ListCard artist={artist} index={i + 1} />)}
            </ul>
          </div>
        </div>
      </LazyMotion>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
