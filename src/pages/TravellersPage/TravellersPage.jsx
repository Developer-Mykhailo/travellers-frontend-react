import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import Section from '../../components/Section/Section.jsx';
import Button from '../../components/UI/Button/Button.jsx';
import Container from '../../components/common/Container/Container';
import { PER_PAGE } from '../../constants/pagination.js';
import TravellersList from '../../features/travellers/components/TravellersList/TravellersList.jsx';
import { fetchTravellers } from '../../features/travellers/store/operation.js';
import {
  selectTravellers,
  selectTravellersStorePage,
} from '../../features/travellers/store/selectors.js';

import css from './TravellersPage.module.css';
import { setTravellersStorePage } from '../../features/travellers/store/slice.js';

const TravellersPage = () => {
  const dispatch = useDispatch();
  const { items, hasNextPage, totalItems } = useSelector(selectTravellers);
  const storePage = useSelector(selectTravellersStorePage); //state

  const isDeskTop = useMediaQuery({ minWidth: 1440 });

  const [visibleCount, setVisibleCount] = useState(isDeskTop ? 12 : 8);

  //! effects
  // fetch travellers first time
  useEffect(() => {
    if (items.length > 0) return;

    dispatch(fetchTravellers({ page: 1, perPage: PER_PAGE }));
  }, [dispatch, items.length]);

  /** next loading */
  useEffect(() => {
    const hasTobePage = Math.ceil(items.length / PER_PAGE);

    if (storePage === 1 || hasTobePage >= storePage) return;

    dispatch(fetchTravellers({ page: storePage, perPage: PER_PAGE }));
  }, [dispatch, storePage, items.length]);

  // change breakepoint
  useEffect(() => {
    //eslint-disable-next-line
    setVisibleCount(isDeskTop ? 12 : 8);
  }, [isDeskTop]);

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
    <Section className={css.travellersSection}>
      <Container>
        <h1 className={css.travellersTitle}>Travellers</h1>

        <TravellersList travellers={visibleTravellers} />

        {totalItems > visibleTravellers.length && (
          <Button onClick={handleClick} className={css.showMoreBtn}>
            Show more
          </Button>
        )}
      </Container>
    </Section>
  );
};

export default TravellersPage;
