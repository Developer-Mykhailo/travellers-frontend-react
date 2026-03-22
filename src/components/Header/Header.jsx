import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router-dom';
import MenuIcon from '../../assets/icons/menu.svg?react';
import Container from '../Container/Container';

import Logo from '../common/Logo/Logo';
import Navigation from '../Navigation/Navigation';
import Button from '../UI/Button/Button';

import UserBar from '../../features/auth/components/UserBar/UserBar';

import css from './Header.module.css';

const Header = () => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });
  const isLoggedIn = true;
  // const isLoggedIn = false;

  const location = useLocation();
  const isHome = location.pathname === '/';

  // JSX
  return (
    <>
      <header className={css.header}>
        <Container className={css.headerContainer}>
          <nav className={css.nav}>
            <Logo place="header" />

            {(isDesktop || isTablet) && (
              <Navigation place="header" classList={isHome && css.classList} />
            )}

            {!isDesktop && (
              <Button
                className={css.menuBtn}
                variant={isHome ? 'accent2' : 'secondary'}
              >
                <MenuIcon />
              </Button>
            )}
          </nav>

          {isLoggedIn && <UserBar />}
        </Container>
      </header>
    </>
  );
};

export default Header;
