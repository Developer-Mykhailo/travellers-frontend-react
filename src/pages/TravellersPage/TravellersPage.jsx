import { useDispatch, useSelector } from 'react-redux';
import Section from '../../components/Section/Section.jsx';
import Button from '../../components/UI/Button/Button.jsx';
import Container from '../../components/common/Container/Container';
import TravellersList from '../../features/travellers/components/TravellersList/TravellersList.jsx';

import css from './TravellersPage.module.css';
import { selectTravellers } from '../../features/travellers/store/selectors.js';
import { useEffect, useState } from 'react';
import { fetchTravellersApi } from '../../features/travellers/store/operation.js';
import {
  appendTravellers,
  setTravellers,
} from '../../features/travellers/store/slice.js';
import { useMediaQuery } from 'react-responsive';

const TravellersPage = () => {
  const dispatch = useDispatch();
  const { items, hasNextPage } = useSelector(selectTravellers);

  const isDeskTop = useMediaQuery({ minWidth: 1440 });

  const [page, setPage] = useState(1);

  const initialPerPage = isDeskTop ? 12 : 8;

  //! effects
  useEffect(() => {
    fetchTravellers();

    async function fetchTravellers() {
      try {
        const currentPerPage = page === 1 ? (isDeskTop ? 12 : 8) : 4;

        const response = await fetchTravellersApi(page, currentPerPage);

        page === 1
          ? dispatch(setTravellers(response))
          : dispatch(appendTravellers(response));
      } catch (error) {
        console.log(error);
      }
    }
  }, [page, dispatch]);

  //todo handlers
  const handleClick = () => {
    if (page === 1) {
      setPage(initialPerPage / 4 + 1);
      return;
    }

    setPage((prev) => prev + 1);
  };

  // JSX
  return (
    <Section className={css.travellersSection}>
      <Container>
        <h1 className={css.travellersTitle}>Travellers</h1>

        <TravellersList travellers={items} />

        {hasNextPage && (
          <Button onClick={handleClick} className={css.showMoreBtn}>
            Show more
          </Button>
        )}
      </Container>
    </Section>
  );
};

export default TravellersPage;
