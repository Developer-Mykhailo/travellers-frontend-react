import Container from '../Container/Container';

import css from './Header.module.css';

const Header = () => {
  return (
    <>
      <header className={css.header}>
        <Container>
          <p>header</p>
        </Container>
      </header>
    </>
  );
};

export default Header;
