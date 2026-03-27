import Container from '../../components/common/Container/Container';
import Section from '../../components/Section/Section';
import TravellerInfo from '../../features/travellers/TravellerInfo/TravellerInfo';

import css from './TravellerPage.module.css';

const TravellerPage = () => {
  return (
    <Section className={css.travellerSection}>
      <Container>
        <TravellerInfo />
      </Container>
    </Section>
  );
};

export default TravellerPage;
