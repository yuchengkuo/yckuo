import { ReactChildren } from 'react'
import Link from 'next/link'

function AnchorTag({ href, children, ...props }: { href: string; children: ReactChildren }) {
  if (href.startsWith('https' || 'http')) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  } else {
    return (
      <Link href={href} passHref>
        <a {...props}>{children}</a>
      </Link>
    )
  }
}

const MDXComponents = {
  a: AnchorTag,
}

export default MDXComponents
