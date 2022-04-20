import { MicroBlog } from 'contentlayer/generated'
import { format, getUnixTime, parseISO } from 'date-fns'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Link from 'next/link'
import MDXComponents from './MDXComponents'

export default function MicroCard({ micro }: { micro: MicroBlog }) {
  const Content = useMDXComponent(micro.content.code)
  return (
    <div
      className="scroll-mt-20 max-w-[48ch] pb-12 phone:pb-6 not-last:border-b  border-gray-6 dark:border-grayDark-6"
      id={`${getUnixTime(parseISO(micro.date))}`}
    >
      <Link href={`/micro/#${getUnixTime(parseISO(micro.date))}`} passHref>
        <a>
          <time className="text-sm font-medium body-font-settings text-gray-11 dark:text-grayDark-11">
            {format(parseISO(micro.date), 'MMM dd, yyyy')}
          </time>
        </a>
      </Link>
      <h3 className="">{micro.title}</h3>
      <div className="flex gap-2 text-sm font-medium body-font-settings text-indigo-10 dark:text-indigoDark-11">
        {micro.tag && micro.tag.map((t) => <p key={t}>#{t}</p>)}
      </div>
      <div className="body-font-settings mt-2 micro">
        <Content components={MDXComponents} />
      </div>
    </div>
  )
}
