import Communication from '../../assets/icons/communication.svg?react';
import Travel_luggage from '../../assets/icons/travel_luggage_and_bags.svg?react';
import Wand_stars from '../../assets/icons/wand_stars.svg?react';
import Container from '../Container/Container';
import Section from '../Section/Section';

import css from './About.module.css';

const About = () => {
  return (
    <Section className={css.about}>
      <Container>
        <div className={css.wrapper}>
          <h2 className={css.title}>
            A project made for those who sincerely live for travel
          </h2>
          <p className={css.descr}>
            Every travel, in our opinion, is a special tale that should be told
            to others. Our platform was carefully designed to unite individuals
            who are enthusiastic in exploring new locations and experiences. You
            can connect with like-minded individuals, share your own travel
            experiences, and get ideas for your upcoming thrilling excursions
            here.
          </p>
        </div>

        <ul className={css.list}>
          <li className={css.item}>
            <Wand_stars className={css.icon} />
            <h3 className={css.itemTitle}>Our mission</h3>
            <p className={css.itemDescr}>
              To unite people through the love of adventure and inspire new
              discoveries.
            </p>
          </li>
          <li className={css.item}>
            <Travel_luggage className={css.icon} />
            <h3 className={css.itemTitle}>Authentic stories</h3>
            <p className={css.itemDescr}>
              We value authentic, unedited experiences from travelers around the
              world.
            </p>
          </li>
          <li className={css.item}>
            <Communication className={css.icon} />
            <h3 className={css.itemTitle}>Your community</h3>
            <p className={css.itemDescr}>
              Become part of a community where everyone can be both an author
              and a reader.
            </p>
          </li>
        </ul>
      </Container>
    </Section>
  );
};

export default About;
