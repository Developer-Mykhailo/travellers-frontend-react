import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TravellersList from '../../features/travellers/components/TravellersList/TravellersList';
import { fetchTravellersApi } from '../../features/travellers/store/operation';
import { selectTravellers } from '../../features/travellers/store/selectors';
import { setTravellers } from '../../features/travellers/store/slice';
import Container from '../common/Container/Container';
import Section from '../Section/Section';
import Button from '../UI/Button/Button';

import css from './OurTravellers.module.css';

const OurTravellers = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(selectTravellers); //state

  const [page, setPage] = useState(1);

  const visibleCount = page * 4;
  const visibleTravellers = items.slice(0, visibleCount);

  //! effects
  useEffect(() => {
    fetchTravellers();

    async function fetchTravellers() {
      try {
        const response = await fetchTravellersApi();

        dispatch(setTravellers(response));
      } catch (error) {
        console.log(error);
      }
    }
    // eslint-disable-next-line
  }, []);

  //todo handlers
  const handleClick = () => {
    setPage((prev) => prev + 1);
  };

  // JSX
  return (
    <Section className={css.travellers}>
      <Container>
        <h2 className={css.title}>Our Travellers</h2>

        <TravellersList travellers={visibleTravellers} />

        {visibleCount < items.length && (
          <Button onClick={handleClick} className={css.viewMoreBtn}>
            View more
          </Button>
        )}
      </Container>
    </Section>
  );
};

export default OurTravellers;
