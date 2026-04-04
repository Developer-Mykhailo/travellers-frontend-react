import Container from '../../components/common/Container/Container';
import Section from '../../components/Section/Section';
import Button from '../../components/UI/Button/Button';
import TravellersStories from '../../features/stories/components/TravellersStories/TravellersStories';
import TravellerInfo from '../../features/travellers/components/TravellerInfo/TravellerInfo';

import css from './TravellerPage.module.css';

const TravellerPage = () => {
  return (
    <Section className={css.travellerSection}>
      <Container>
        <TravellerInfo />

        <article className={css.travellerStrories}>
          <h1 className={css.title}>Traveller's Stories</h1>

          <TravellersStories />

          <Button className={css.showMoreBtn}>Show more</Button>
        </article>
      </Container>
    </Section>
  );
};

export default TravellerPage;
