import Logo from '../common/Logo/Logo';
import Social from '../common/Social/Social';
import Container from '../common/Container/Container';
import Navigation from '../Navigation/Navigation';

import css from './Footer.module.css';

const Footer = () => {
  // JSX
  return (
    <>
      <footer className={css.footer}>
        <Container className={css.footerContainer}>
          <Logo place="footer" localClass={css.footerLogo} />
          <Social />

          <Navigation classList={css.footerNav} place="footer" />

          <span className={css.copyriht}>
            <small>© 2025 Travellers. All rights reserved.</small>
          </span>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
