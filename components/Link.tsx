import { domAnimation, LazyMotion, m } from 'framer-motion'
import Link from 'next/link'

export const NavLink = ({ label, url, ...props }: { label: string; url: string }) => {
  return (
    <LazyMotion features={domAnimation}>
      <Link href={url} key={url} passHref>
        <m.a
          className="font-freak freak-font-settings py-1 tracking-wide text-lg hover:tracking-wider transition-all ease-out hover:text-marine6 duration-200 dark:hover:text-cheese5 inline-block"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.9 }}
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
