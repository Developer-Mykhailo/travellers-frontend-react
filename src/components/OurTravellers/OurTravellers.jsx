import { useMediaQuery } from 'react-responsive';
import TravellersList from '../../features/travellers/TravellersList/TravellersList';
import Container from '../common/Container/Container';
import Section from '../Section/Section';
import Button from '../UI/Button/Button';

import css from './OurTravellers.module.css';

const OurTravellers = () => {
  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });

  // JSX
  return (
    <Section className={css.travellers}>
      <Container>
        <h2 className={css.title}>Our Travellers</h2>

        <TravellersList />

        {isTablet && <Button className={css.viewAllBtn}>View All</Button>}
      </Container>
    </Section>
  );
};

export default OurTravellers;
