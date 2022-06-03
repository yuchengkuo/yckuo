import { MicroBlog } from 'contentlayer/generated'
import { format, getUnixTime, parseISO } from 'date-fns'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Link from 'next/link'
import MDXComponents from './MDXComponents'

export default function MicroCard({ micro }: { micro: MicroBlog }) {
  const Content = useMDXComponent(micro.content.code)
  return (
    <div
      className="border-gray-6 dark:border-grayDark-6 max-w-[48ch] scroll-mt-20 pb-12  not-last:border-b phone:pb-6"
      id={`${getUnixTime(parseISO(micro.date))}`}
    >
      <Link href={`/micro/#${getUnixTime(parseISO(micro.date))}`} passHref>
        <a>
          <time className="text-gray-11 dark:text-grayDark-11 text-sm font-medium body-font-settings">
            {format(parseISO(micro.date), 'MMM dd, yyyy')}
          </time>
        </a>
      </Link>
      <h3 className="">{micro.title}</h3>
      <div className="text-indigo-10 dark:text-indigoDark-11 flex gap-2 text-sm font-medium body-font-settings">
        {micro.tag && micro.tag.map((t) => <p key={t}>#{t}</p>)}
      </div>
      <div className="micro mt-2 body-font-settings">
        <Content components={MDXComponents} />
      </div>
    </div>
  )
}
