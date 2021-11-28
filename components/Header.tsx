import { domAnimation, LazyMotion, m } from 'framer-motion';
import Link from 'next/link';
import { LogoIcon } from './Icons';

const Header = () => {
  return (
    <header className="flex items-center p-10 gap-2">
      <LazyMotion features={domAnimation}>
        <Link href="" passHref>
          <m.a
            className="box-border block w-8 h-8 hover:text-marine6"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <LogoIcon />
          </m.a>
        </Link>
      </LazyMotion>
    </header>
  );
};

export default Header;
