import { Link } from 'react-router-dom';
import clsx from 'clsx';

import Container from '../common/Container/Container';
import Section from '../Section/Section';

import css from './Hero.module.css';
import ui from '../UI/ui.module.css';

const Hero = () => {
  return (
    <Section className={css.hero}>
      <Container>
        <div>
          <h1 className={css.heroTitle}>
            Discover the world of travel with us!
          </h1>
          <p className={css.heroDescr}>
            Join our community of travellers where you can share their stories
            and get inspired for new adventures. Open it in new places for
            yourself and find like-minded people!
          </p>
        </div>
        <a className={clsx(ui.shared, ui.primary, css.link)} href="#join">
          Join
        </a>
      </Container>
    </Section>
  );
};

export default Hero;
