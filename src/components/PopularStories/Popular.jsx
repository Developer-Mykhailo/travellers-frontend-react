import { useMediaQuery } from 'react-responsive';
import TravellersStories from '../../features/stories/components/TravellersStories/TravellersStories';
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

        <TravellersStories />

        {isTablet && <Button className={css.viewMoreBtn}>View more</Button>}
      </Container>
    </Section>
  );
};

export default Popular;
