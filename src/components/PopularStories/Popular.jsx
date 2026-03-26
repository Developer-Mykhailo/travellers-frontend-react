import { useMediaQuery } from 'react-responsive';
import TravellersStoriesItem from '../../features/stories/components/TravellersStoriesItem/TravellersStoriesItem';
import Container from '../common/Container/Container';
import Section from '../Section/Section';
import Button from '../UI/Button/Button';

import css from './Popular.module.css';

const Popular = () => {
  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });

  // JSX
  return (
    <Section className={css.popularSection}>
      <Container>
        <h2 className={css.title}>Popular stories</h2>

        <TravellersStoriesItem />

        {isTablet && <Button className={css.viewMoreBtn}>View more</Button>}
      </Container>
    </Section>
  );
};

export default Popular;
