import clsx from 'clsx';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import TravellersList from '../../features/travellers/components/TravellersList/TravellersList';
import Container from '../common/Container/Container';
import Section from '../Section/Section';

import ui from '../../components/UI/ui.module.css';
import css from './OurTravellers.module.css';

const OurTravellers = () => {
  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });

  // JSX
  return (
    <Section className={css.travellers}>
      <Container>
        <h2 className={css.title}>Our Travellers</h2>

        <TravellersList />

        {isTablet && (
          <Link
            to="/travellers"
            className={clsx(ui.shared, ui.primary, css.viewAllBtn)}
          >
            View All
          </Link>
        )}
      </Container>
    </Section>
  );
};

export default OurTravellers;
