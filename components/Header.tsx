import { box } from '@styles/box';
import { LogoIcon } from './Icons';

const Header = () => {
  return (
    <header className={box({ p: 40 })}>
      <LogoIcon />
    </header>
  );
};

export default Header;
