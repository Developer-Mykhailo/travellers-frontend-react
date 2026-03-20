import MenuIcon from '../../assets/icons/menu.svg?react';
import Container from '../Container/Container';

import Logo from '../Logo/Logo';
import Button from '../UI/Button/Button';

import css from './Header.module.css';

const Header = () => {
  // JSX
  return (
    <>
      <header className={css.header}>
        <Container>
          <nav className={css.nav}>
            <Logo />

            <Button variant="accent">
              <MenuIcon />
            </Button>
          </nav>
        </Container>
      </header>
    </>
  );
};

export default Header;
