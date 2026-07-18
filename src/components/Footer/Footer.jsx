import { useLocation } from 'react-router-dom';
import Container from '../common/Container/Container';
import Logo from '../common/Logo/Logo';
import Social from '../common/Social/Social';
import Navigation from '../Navigation/Navigation';

import css from './Footer.module.css';

const Footer = () => {
  const location = useLocation();
  const forbidden = ['/auth/register', '/auth/login'];

  // JSX
  return (
    <>
      {!forbidden.includes(location.pathname) && (
        <footer className={css.footer}>
          <Container className={css.footerContainer}>
            <Logo place="footer" localClass={css.footerLogo} />
            <Social />

            <Navigation classList={css.footerNav} place="footer" />

            <span className={css.copyright}>
              <small>© 2025 Travellers. All rights reserved.</small>
            </span>
          </Container>
        </footer>
      )}
    </>
  );
};

export default Footer;
