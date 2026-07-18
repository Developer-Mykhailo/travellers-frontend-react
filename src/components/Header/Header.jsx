import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router-dom';
import MenuIcon from '../../assets/icons/menu.svg?react';
import CloseMenuIcon from '../../assets/icons/close.svg?react';
import UserBar from '../../features/auth/components/UserBar/UserBar';
import { selectIsAuth } from '../../features/auth/store/selectors';
import Container from '../common/Container/Container';
import Logo from '../common/Logo/Logo';
import MobileMenu from '../common/MobileMenu/MobileMenu';
import Navigation from '../Navigation/Navigation';
import Button from '../UI/Button/Button';

import css from './Header.module.css';
import PublishStoryLink from '../PublishStoryLink/PublishStoryLink';

const Header = () => {
  const isAuth = useSelector(selectIsAuth);

  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1439 });

  const location = useLocation();
  const isHome = location.pathname === '/';

  const isAuthPage =
    location.pathname === '/auth/login' ||
    location.pathname === '/auth/register';

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // JSX
  return (
    <>
      <header className={css.header}>
        <Container className={css.headerContainer}>
          <nav className={css.nav}>
            <Logo place="header" isMenuOpen={isMenuOpen} />

            {!isAuthPage && (
              <>
                {/* Desktop navigation */}
                {isDesktop && (
                  <Navigation
                    place="header"
                    classList={isHome && css.classList}
                  />
                )}

                {/* Link on tablet */}
                <div>
                  {isAuth && isTablet && !isMenuOpen && <PublishStoryLink />}
                </div>

                {/* Mobile burger */}
                {!isDesktop && (
                  <Button
                    className={css.menuBtn}
                    variant={isHome ? 'accent2' : 'secondary'}
                    onClick={toggleMenu}
                  >
                    {isMenuOpen ? <CloseMenuIcon /> : <MenuIcon />}
                  </Button>
                )}
              </>
            )}
          </nav>

          {!isAuthPage && isAuth && isDesktop && <UserBar />}
        </Container>
      </header>

      {/* Mobile menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={toggleMenu} />
    </>
  );
};

export default Header;
