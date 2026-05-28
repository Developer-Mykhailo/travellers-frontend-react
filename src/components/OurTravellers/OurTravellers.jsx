import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TravellersList from '../../features/travellers/components/TravellersList/TravellersList';
import { fetchTravellersApi } from '../../features/travellers/store/operation';
import { selectTravellers } from '../../features/travellers/store/selectors';
import {
  appendTravellers,
  setTravellers,
} from '../../features/travellers/store/slice';
import Container from '../common/Container/Container';
import Section from '../Section/Section';
import Button from '../UI/Button/Button';

import css from './OurTravellers.module.css';

const OurTravellers = () => {
  const dispatch = useDispatch();
  const { items, hasNextPage } = useSelector(selectTravellers); //state

  const [page, setPage] = useState(1);

  //! effects
  useEffect(() => {
    fetchTravellers();

    async function fetchTravellers() {
      try {
        const response = await fetchTravellersApi(page);

        page === 1
          ? dispatch(setTravellers(response))
          : dispatch(appendTravellers(response));
      } catch (error) {
        console.log(error);
      }
    }
    // eslint-disable-next-line
  }, [page]);

  //todo handlers
  const handleClick = () => {
    setPage((prev) => prev + 1);
  };

  // JSX
  return (
    <Section className={css.travellers}>
      <Container>
        <h2 className={css.title}>Our Travellers</h2>

        <TravellersList travellers={items} />

        {hasNextPage && (
          <Button onClick={handleClick} className={css.viewMoreBtn}>
            View more
          </Button>
        )}
      </Container>
    </Section>
  );
};

export default OurTravellers;
