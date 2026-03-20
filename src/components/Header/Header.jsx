import { useMediaQuery } from 'react-responsive';
import MenuIcon from '../../assets/icons/menu.svg?react';
import Container from '../Container/Container';

import Logo from '../common/Logo/Logo';
import Navigation from '../Navigation/Navigation';
import Button from '../UI/Button/Button';

import css from './Header.module.css';

const Header = () => {
  const isBigScreen = useMediaQuery({ query: '(min-width: 1440px)' });
  // JSX
  return (
    <>
      <header className={css.header}>
        <Container>
          <nav className={css.nav}>
            <Logo />

            {isBigScreen ? (
              <Navigation />
            ) : (
              <Button variant="accent">
                <MenuIcon />
              </Button>
            )}
          </nav>
        </Container>
      </header>
    </>
  );
};

export default Header;
