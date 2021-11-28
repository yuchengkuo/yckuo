import { domAnimation, LazyMotion, m } from 'framer-motion';
import Link from 'next/link';

export const NavLink = ({ label, url, ...props }: { label: string; url: string }) => {
  return (
    <LazyMotion features={domAnimation}>
      <Link href={url} passHref>
        <m.a
          className="font-freak py-1 tracking-wide text-lg nav-settings hover:tracking-wider transition-all ease-out hover:text-marine6 duration-200 dark:hover:text-cheese5 inline-block"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.9 }}
          {...props}
        >
          {label}
        </m.a>
      </Link>
    </LazyMotion>
  );
};
