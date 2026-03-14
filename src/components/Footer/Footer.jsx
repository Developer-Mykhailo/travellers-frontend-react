import Container from '../Container/Container';
import css from './Footer.module.css';

const Footer = () => {
  return (
    <>
      <footer className={css.footer}>
        <Container>
          <p>footer</p>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
