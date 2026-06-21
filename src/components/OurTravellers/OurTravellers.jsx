import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PER_PAGE } from '../../constants/pagination';
import TravellersList from '../../features/travellers/components/TravellersList/TravellersList';
import { fetchTravellers } from '../../features/travellers/store/operation';
import {
  selectTravellers,
  selectTravellersStorePage,
} from '../../features/travellers/store/selectors';
import { setTravellersStorePage } from '../../features/travellers/store/slice';
import Container from '../common/Container/Container';
import Section from '../Section/Section';
import Button from '../UI/Button/Button';

import css from './OurTravellers.module.css';

const OurTravellers = () => {
  const dispatch = useDispatch();
  const { items, hasNextPage, totalItems } = useSelector(selectTravellers); //state
  const storePage = useSelector(selectTravellersStorePage); //state

  const [visibleCount, setVisibleCount] = useState(4);

  //! effects
  /**fist loading */
  useEffect(() => {
    if (items.length > 0) return;

    dispatch(fetchTravellers({ page: 1, perPage: PER_PAGE }));
  }, [dispatch, items.length]);

  useEffect(() => {
    const hasTobePage = Math.ceil(items.length / PER_PAGE);

    if (storePage === 1 || hasTobePage >= storePage) return;

    dispatch(fetchTravellers({ page: storePage, perPage: PER_PAGE }));
  }, [dispatch, items.length, storePage]);

  //todo handlers
  const handleClick = () => {
    const nextVisibleCount = visibleCount + 4;

    if (items.length >= nextVisibleCount) {
      setVisibleCount(nextVisibleCount);

      return;
    }

    setVisibleCount(nextVisibleCount);

    hasNextPage && dispatch(setTravellersStorePage(storePage + 1));
  };

  const visibleTravellers = items.slice(0, visibleCount);

  // JSX
  return (
    <Section className={css.travellers}>
      <Container>
        <h2 className={css.title}>Our Travellers</h2>

        <TravellersList travellers={visibleTravellers} />

        {totalItems > visibleTravellers.length && (
          <Button onClick={handleClick} className={css.viewMoreBtn}>
            View more
          </Button>
        )}
      </Container>
    </Section>
  );
};

export default OurTravellers;
