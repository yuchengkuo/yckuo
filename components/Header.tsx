import { domAnimation, LazyMotion, m } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { LeftArrowIcon, LogoIcon } from './Icons';

const Header = () => {
  const router = useRouter();
  function handleRouter(path: string) {
    const arr = path.split('/');
    const title = arr.slice(-1)[0];
    arr.splice(-1, 1);
    return {
      backHref: arr.length === 1 ? '/' : arr.join('/'),
      title: title.replace(/[a-z]/, (str) => str.toUpperCase()).replace(/-/g, ' '),
    };
  }
  return (
    <header className="sticky top-0 flex items-center p-10 gap-4 phone:px-5 bg-marine9 bg-opacity-50 backdrop-blur-sm">
      <LazyMotion features={domAnimation}>
        <Link href={handleRouter(router.asPath).backHref} passHref>
          <m.a
            className="box-border block w-8 h-8 text-gray9 dark:text-gray5 hover:text-marine6 dark:hover:text-cheese5"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {router.asPath === '/' ? <LogoIcon /> : <LeftArrowIcon />}
          </m.a>
        </Link>

        <p className="body-font-settings">{handleRouter(router.asPath).title}</p>
      </LazyMotion>
    </header>
  );
};

export default Header;
