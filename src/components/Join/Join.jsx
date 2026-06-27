import clsx from 'clsx';
import { Link } from 'react-router-dom';
import Container from '../common/Container/Container';
import Section from '../Section/Section';

import ui from '../UI/ui.module.css';
import css from './Join.module.css';

const Join = () => {
  return (
    <Section className={css.join} id="join">
      <Container>
        <div className={css.content}>
          <h2 className={css.title}>Join our growing community today</h2>
          <p className={css.descr}>
            Join a community of travelers who share their stories and inspire
            unforgettable new adventures.
          </p>
          <Link
            to="/auth/login"
            className={clsx(ui.shared, ui.primary, css.signUp)}
          >
            Sign up
          </Link>
        </div>
      </Container>
    </Section>
  );
};

export default Join;
