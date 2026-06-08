import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TravellersList from '../../features/travellers/components/TravellersList/TravellersList';
import { fetchTravellers } from '../../features/travellers/store/operation';
import { selectTravellers } from '../../features/travellers/store/selectors';
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
    dispatch(fetchTravellers({ page, perPage: 4 }));
  }, [dispatch, page]);

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
