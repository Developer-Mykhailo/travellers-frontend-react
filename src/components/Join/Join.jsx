import css from './Join.module.css';

import Container from '../common/Container/Container';
import Section from '../Section/Section';
import { Link } from 'react-router-dom';
import ui from '../UI/ui.module.css';
import clsx from 'clsx';

const Join = () => {
  return (
    <Section className={css.join}>
      <Container>
        <div className={css.content}>
          <h2 className={css.title}>Join our growing community today</h2>
          <p className={css.descr}>
            Join a community of travelers who share their stories and inspire
            unforgettable new adventures.
          </p>
          <Link className={clsx(ui.shared, ui.primary, css.signUp)}>
            Sign up
          </Link>
        </div>
      </Container>
    </Section>
  );
};

export default Join;
