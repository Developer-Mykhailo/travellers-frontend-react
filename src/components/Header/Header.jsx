// import clsx from 'clsx';
import { useMediaQuery } from 'react-responsive';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '../../assets/icons/menu.svg?react';
import Container from '../Container/Container';

import Logo from '../common/Logo/Logo';
import Navigation from '../Navigation/Navigation';
import Button from '../UI/Button/Button';

// import ui from '../UI/ui.module.css';
import css from './Header.module.css';

const Header = () => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });

  const location = useLocation();
  const isHome = location.pathname === '/';

  // JSX
  return (
    <>
      <header className={css.header}>
        <Container>
          <nav className={css.nav}>
            <Logo place="header" />

            {(isDesktop || isTablet) && (
              <Navigation place="header" classList={isHome && css.classList} />
            )}

            {!isDesktop && (
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
