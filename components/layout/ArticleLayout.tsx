import Head from '@components/Head'
import { fade, fadeUp } from '@utils/animation'
import { loader } from '@utils/image-loader'
import type { Post } from 'contentlayer/generated'
import { domAnimation, LazyMotion, m } from 'framer-motion'
import Image from 'next/image'

export default function ArticleLayout({
  children,
  post,
}: {
  children: JSX.Element | JSX.Element[]
  post: Post
}) {
  return (
    <LazyMotion features={domAnimation}>
      <Head title={post.title} date={post.date} />
      <main>
        {post.date && (
          <m.p
            className="font-medium body-font-settings text-sm mb-1 text-gray-11 dark:text-grayDark-11"
            variants={fade}
            initial="0"
            animate="1"
          >
            {new Date(post.date).toDateString().substring(4)} ⋅ {post.readingTime.text}
          </m.p>
        )}
        <m.h1
          variants={fadeUp}
          initial="0"
          animate="1"
          transition={{ type: 'spring', damping: 20, mass: 1 }}
          className="max-w-lg"
        >
          {post.title}
        </m.h1>
        {post.cover && (
          <m.div variants={fade} initial="0" animate="1" className="mt-10">
            <div className="w-1/2 h-80 relative bg-gray-4 dark:bg-grayDark-4">
              <Image
                src={post.cover}
                loader={loader}
                placeholder="blur"
                blurDataURL={post.blurDataURL}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
          </m.div>
        )}
        <m.article
          variants={fade}
          initial="0"
          animate="1"
          className={`mt-10 prose ${post.layout}-layout`}
        >
          {children}
        </m.article>
      </main>
    </LazyMotion>
  )
}
