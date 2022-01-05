import { domAnimation, LazyMotion, m } from 'framer-motion'
import Link from 'next/link'
import Tag from './Tag'

export const NavLink = ({
  label,
  url,
  wip = false,
  ...props
}: {
  label: string
  url: string
  wip?: boolean
}) => {
  if (wip)
    return (
      <>
        <p className="font-freak freak-font-settings py-1 tracking-wide text-gray6 cursor-not-allowed">
          {label}
        </p>
        <Tag label="WIP" />
      </>
    )
  return (
    <LazyMotion features={domAnimation}>
      <Link href={url} key={url} passHref>
        <m.a
          className="font-freak freak-font-settings py-1 transition-all ease-out duration-500 inline-block text-gray9 hover:text-gray10 dark:text-gray5 dark:hover:text-gray4 hover:tracking-wider"
          whileTap={{ scale: 0.95 }}
          // data-splitbee-event="Nav Links"
          // data-splitbee-event-type={label}
          {...props}
        >
          {label}
        </m.a>
      </Link>
    </LazyMotion>
  )
}
