import Logo from '../common/Logo/Logo';
import Social from '../common/Social/Social';
import Container from '../Container/Container';
import Navigation from '../Navigation/Navigation';
import css from './Footer.module.css';

const Footer = () => {
  const footer = true;

  // JSX
  return (
    <>
      <footer className={css.footer}>
        <Container>
          <Logo footer={footer} className={css.logo} />
          <Social />
          <Navigation footer={footer} />
          <span className={css.copyriht}>
            <small>© 2025 Travellers. All rights reserved.</small>
          </span>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
