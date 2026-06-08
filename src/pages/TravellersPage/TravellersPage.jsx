import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import Section from '../../components/Section/Section.jsx';
import Button from '../../components/UI/Button/Button.jsx';
import Container from '../../components/common/Container/Container';
import { PER_PAGE } from '../../constants/pagination.js';
import TravellersList from '../../features/travellers/components/TravellersList/TravellersList.jsx';
import { fetchTravellers } from '../../features/travellers/store/operation.js';
import { selectTravellers } from '../../features/travellers/store/selectors.js';

import css from './TravellersPage.module.css';

const TravellersPage = () => {
  const dispatch = useDispatch();
  const { items, hasNextPage, totalItems } = useSelector(selectTravellers);

  const isDeskTop = useMediaQuery({ minWidth: 1440 });

  const [page, setPage] = useState(1);
  const [visibleCount, setVisibleCount] = useState(isDeskTop ? 12 : 8);

  //! effects
  // fetch travellers
  useEffect(() => {
    dispatch(fetchTravellers({ page, perPage: PER_PAGE }));
  }, [dispatch, page]);

  // change breakepoint
  useEffect(() => {
    //eslint-disable-next-line
    setVisibleCount(isDeskTop ? 12 : 8);
  }, [isDeskTop]);

  //todo handlers
  const handleClick = () => {
    const increment = 4;

    const nextVisibleCount = visibleCount + increment;

    if (items.length >= nextVisibleCount) {
      setVisibleCount(nextVisibleCount);
      return;
    }

    setVisibleCount(nextVisibleCount);

    hasNextPage && setPage((prev) => prev + 1);
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
