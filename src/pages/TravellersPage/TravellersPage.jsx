import Section from '../../components/Section/Section.jsx';
import Button from '../../components/UI/Button/Button.jsx';
import Container from '../../components/common/Container/Container';
import TravellersList from '../../features/travellers/TravellersList/TravellersList.jsx';

import css from './TravellersPage.module.css';

const TravellersPage = () => {
  return (
    <Section className={css.travellersSection}>
      <Container>
        <h1 className={css.travellersTitle}>Travellers</h1>

        <TravellersList />

        <Button className={css.showMoreBtn}>Show more</Button>
      </Container>
    </Section>
  );
};

export default TravellersPage;
