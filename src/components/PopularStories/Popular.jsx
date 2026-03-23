import TravellersStoriesItem from '../../features/stories/components/TravellersStoriesItem/TravellersStoriesItem';
import Container from '../common/Container/Container';
import Section from '../Section/Section';

import css from './Popular.module.css';

const Popular = () => {
  return (
    <Section className={css.popularSection}>
      <Container>
        <TravellersStoriesItem />
      </Container>
    </Section>
  );
};

export default Popular;
