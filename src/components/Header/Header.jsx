import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router-dom';
import MenuIcon from '../../assets/icons/menu.svg?react';
import UserBar from '../../features/auth/components/UserBar/UserBar';
import { selectIsAuth } from '../../features/auth/store/selectors';
import Container from '../common/Container/Container';
import Logo from '../common/Logo/Logo';
import Navigation from '../Navigation/Navigation';
import Button from '../UI/Button/Button';

import css from './Header.module.css';

const Header = () => {
  const isAuth = useSelector(selectIsAuth);

  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });

  const location = useLocation();
  const isHome = location.pathname === '/';

  const register = location.pathname === '/auth/register';
  const login = location.pathname === '/auth/login';

  // JSX
  return (
    <>
      <header className={css.header}>
        <Container className={css.headerContainer}>
          <nav className={css.nav}>
            <Logo place="header" />

            {!register && !login && (
              <>
                {(isDesktop || isTablet) && (
                  <Navigation
                    place="header"
                    classList={isHome && css.classList}
                  />
                )}

                {!isDesktop && (
                  <Button
                    className={css.menuBtn}
                    variant={isHome ? 'accent2' : 'secondary'}
                  >
                    <MenuIcon />
                  </Button>
                )}
              </>
            )}
          </nav>

          {!register && !login && isAuth && isDesktop && <UserBar />}
        </Container>
      </header>
    </>
  );
};

export default Header;
