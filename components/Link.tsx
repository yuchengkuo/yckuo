import { slideUp } from '@utils/animation';
import { domAnimation, LazyMotion, m } from 'framer-motion';
import Link from 'next/link';

export const NavLink = ({ label, url, ...props }: { label: string; url: string }) => {
  return (
    <LazyMotion features={domAnimation}>
      {url.startsWith('http') ? (
        <m.a
          className="font-freak text-lg nav-settings hover:tracking-wide transition-all ease-out hover:text-cheese5 duration-200"
          href={url}
          rel="noopener noreferrer"
          {...props}
        >
          {label}
        </m.a>
      ) : (
        <Link href={url} passHref>
          <m.a
            className="font-freak text-lg nav-settings hover:tracking-wide transition-all ease-out hover:text-cheese5 duration-200"
            rel="noopener noreferrer"
            {...props}
          >
            {label}
          </m.a>
        </Link>
      )}
    </LazyMotion>
  );
};
