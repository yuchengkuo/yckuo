import { ReactChildren } from 'react'
import Link from 'next/link'
import NextImg from 'next/image'
import { loader } from '@utils/image-loader'
import { useScrollBoost } from 'react-scrollbooster'

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

function Image(props) {
  return (
    <figure data-image>
      <NextImg
        {...props}
        loader={loader}
        placeholder="blur"
        objectFit="cover"
        className="rounded shadow overflow-hidden bg-gray-3 dark:bg-grayDark-3"
      />
      <figcaption className="text-sm w-fit font-medium text-gray-11 dark:text-grayDark-11">
        {props.caps || props.alt}
      </figcaption>
    </figure>
  )
}

function Carousel({ images }) {
  const [viewport] = useScrollBoost({
    direction: 'horizontal',
    scrollMode: 'native',
    pointerMode: 'all',
    bounceForce: 1,
  })
  return (
    <div data-carousel ref={viewport}>
      <div className="w-fit flex gap-6">
        {images.map((props) => (
          <figure data-carousel-image className="relative w-full h-fit" key={props.src}>
            <NextImg
              {...props}
              className="rounded shadow bg-gray-3 dark:bg-grayDark-3"
              layout="fixed"
              objectFit="cover"
              loader={loader}
            />
            <figcaption className="text-sm w-fit font-medium text-gray-11 dark:text-grayDark-11">
              {props.caps || props.alt}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

const MDXComponents = {
  a: AnchorTag,
  img: Image,
  Image,
  Carousel,
}

export default MDXComponents
